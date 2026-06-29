import React, { useState, useRef, useCallback, DragEvent } from 'react';
import { Download, Upload, FolderOpen, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { exportDossier, importDossier } from '../utils/transfert';
import { FormData } from '../types/form';

interface DossierTransfertProps {
  /** When true, navigates to step 19 (SummarySection) after a successful import */
  goToSummaryOnImport?: boolean;
}

type ImportStatus = 'idle' | 'loading' | 'success' | 'error';

export const DossierTransfert: React.FC<DossierTransfertProps> = ({ goToSummaryOnImport = false }) => {
  const { formData, importFormData, setCurrentStep } = useFormContext();

  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [importStatus, setImportStatus] = useState<ImportStatus>('idle');
  const [importedName, setImportedName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportDossier(formData);
    } catch (err) {
      console.error('Export error:', err);
      alert("Une erreur est survenue lors de l'export. Veuillez réessayer.");
    } finally {
      setIsExporting(false);
    }
  };

  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.tnd')) {
      setImportStatus('error');
      return;
    }

    setImportStatus('loading');
    try {
      const data = await importDossier(file);
      importFormData(data as Partial<FormData>);
      const nom = (data as any).identification?.nom ?? '';
      const prenom = (data as any).identification?.prenom ?? '';
      setImportedName([prenom, nom].filter(Boolean).join(' '));
      setImportStatus('success');

      if (goToSummaryOnImport) {
        setTimeout(() => setCurrentStep(19), 800);
      }
    } catch {
      setImportStatus('error');
    }
  }, [importFormData, setCurrentStep, goToSummaryOnImport]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset so the same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="mt-8 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-5 bg-slate-50 dark:bg-slate-900/40">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <FolderOpen className="w-4 h-4" />
        Transfert de dossier
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Export */}
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Exportez vos données chiffrées pour les transmettre à votre clinicien.
          </p>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium transition-colors shadow-sm"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isExporting ? 'Export en cours…' : 'Exporter mon dossier (.tnd)'}
          </button>
        </div>

        <div className="hidden sm:block w-px bg-slate-200 dark:bg-slate-700 self-stretch" />

        {/* Import */}
        <div className="flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Importez un dossier .tnd — les données seront chargées automatiquement.
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`
              w-full cursor-pointer rounded-lg border-2 border-dashed px-4 py-4
              flex flex-col items-center gap-2 text-center transition-colors
              ${isDragging
                ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10'
              }
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".tnd"
              className="hidden"
              onChange={handleFileChange}
            />

            {importStatus === 'idle' && (
              <>
                <Upload className="w-5 h-5 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Glissez un fichier .tnd ici ou cliquez pour sélectionner
                </span>
              </>
            )}

            {importStatus === 'loading' && (
              <>
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                <span className="text-xs text-blue-600 dark:text-blue-400">Déchiffrement en cours…</span>
              </>
            )}

            {importStatus === 'success' && (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Dossier chargé{importedName ? ` — ${importedName}` : ''}
                </span>
                <span className="text-xs text-slate-400">Cliquer pour importer un autre fichier</span>
              </>
            )}

            {importStatus === 'error' && (
              <>
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Fichier invalide ou corrompu
                </span>
                <span className="text-xs text-slate-400">Cliquer pour réessayer</span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 italic text-center">
        Les fichiers .tnd sont chiffrés (AES-256) — aucun mot de passe requis
      </p>
    </div>
  );
};
