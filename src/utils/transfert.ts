import { FormData } from '../types/form';

// Fixed internal passphrase — auto-decryption, no user password needed.
// Security note: this protects against casual inspection; anyone with the source
// can decrypt. Acceptable for a convenience patient→clinician transfer workflow.
const PASSPHRASE = 'TND_TSA_QUESTIONNAIRE_CMP_2024_AES_KEY';
const SALT = new Uint8Array([
  84, 78, 68, 95, 83, 65, 76, 84, 95,
  50, 48, 50, 52, 95, 67, 77, 80, 95, 84, 83, 65,
]);

const FORMAT_MAGIC = 'TND_QUESTIONNAIRE';
const FORMAT_VERSION = '1';

async function deriveKey(): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(PASSPHRASE),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: SALT, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Safe base64 helpers that handle large binary arrays
const toBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const chunk = 8192;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
};

const fromBase64 = (b64: string): Uint8Array => {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};

export async function exportDossier(formData: Partial<FormData>): Promise<void> {
  const key = await deriveKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(formData));

  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);

  const payload = JSON.stringify({
    format: FORMAT_MAGIC,
    version: FORMAT_VERSION,
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(ciphertext)),
  });

  const blob = new Blob([payload], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'anamnese_tsa_export.tnd';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importDossier(file: File): Promise<Partial<FormData>> {
  const text = await file.text();

  let payload: { format: string; version: string; iv: string; data: string };
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error('Fichier invalide ou corrompu');
  }

  if (payload.format !== FORMAT_MAGIC || payload.version !== FORMAT_VERSION) {
    throw new Error('Fichier invalide ou corrompu');
  }

  const key = await deriveKey();
  const iv = fromBase64(payload.iv);
  const ciphertext = fromBase64(payload.data);

  let plaintext: ArrayBuffer;
  try {
    plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  } catch {
    throw new Error('Fichier invalide ou corrompu');
  }

  let formData: Partial<FormData>;
  try {
    formData = JSON.parse(new TextDecoder().decode(plaintext));
  } catch {
    throw new Error('Fichier invalide ou corrompu');
  }

  if (!formData || typeof formData !== 'object' || !formData.identification) {
    throw new Error('Fichier invalide ou corrompu');
  }

  return formData;
}
