import { FormData, ScoreResult } from '../types/form';
import { MaskingResult } from './scoreCalculator';

const pct = (score: number, max: number) =>
  max > 0 ? Math.round((score / max) * 100) : 0;

const domainAlertLine = (s: ScoreResult): string | null => {
  const ePct = pct(s.enfanceScore, s.maxScoreEnfance);
  const aPct = pct(s.actuelScore, s.maxScoreActuel);

  if (s.severityActuel === 'Sévère') {
    return `— Domaine ${s.domain} : difficultés actuelles sévères (${aPct}%), nécessitant une attention clinique prioritaire.`;
  }
  if (s.severityEnfance === 'Sévère' && s.severityActuel !== 'Sévère') {
    const drop = ePct - aPct;
    if (drop > 15) {
      return `— Domaine ${s.domain} : profil d'enfance sévère (${ePct}%) avec atténuation apparente à l'âge adulte (${aPct}%), évocateur d'un mécanisme de compensation.`;
    }
  }
  if (s.severityActuel === 'Modéré') {
    return `— Domaine ${s.domain} : difficultés modérées actuelles (${aPct}%).`;
  }
  return null;
};

export const generateClinicalDraft = (
  formData: Partial<FormData>,
  scores: ScoreResult[],
  masking: MaskingResult,
): string => {
  const id = formData.identification;
  const prenom = id?.prenom?.trim() || 'le/la patient(e)';
  const nom = id?.nom?.trim() || '';
  const fullName = nom ? `${prenom} ${nom}` : prenom;
  const dateJour = id?.dateJour
    ? new Date(id.dateJour).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  const lines: string[] = [];

  // ── Header ────────────────────────────────────────────────────────────────
  lines.push(`Compte-rendu d'entretien clinique — ${dateJour}`);
  lines.push('');

  // ── Présentation ──────────────────────────────────────────────────────────
  const genreLabel = id?.genre === 'Femme' ? 'une femme'
    : id?.genre === 'Homme' ? 'un homme'
    : 'une personne';
  const age = id?.dateNaissance
    ? (() => {
        const birth = new Date(id.dateNaissance);
        const ref = id?.dateJour ? new Date(id.dateJour) : new Date();
        let a = ref.getFullYear() - birth.getFullYear();
        const m = ref.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) a--;
        return `${a} ans`;
      })()
    : null;

  const intro = age
    ? `${fullName} est ${genreLabel} âgé(e) de ${age}, reçu(e) en consultation pour une évaluation diagnostique TSA.`
    : `${fullName} est ${genreLabel}, reçu(e) en consultation pour une évaluation diagnostique TSA.`;
  lines.push(intro);
  lines.push('');

  // ── Profil de scores ──────────────────────────────────────────────────────
  lines.push('PROFIL CLINIQUE OBSERVÉ');
  lines.push('');

  const alerts = scores
    .map(domainAlertLine)
    .filter((l): l is string => l !== null);

  if (alerts.length > 0) {
    alerts.forEach((a) => lines.push(a));
  } else {
    lines.push('Les scores ne font pas ressortir de domaine à sévérité marquée sur la base du questionnaire.');
  }
  lines.push('');

  // ── Trajectoire Enfance → Adulte ──────────────────────────────────────────
  const severeEnfance = scores.filter((s) => s.severityEnfance === 'Sévère');
  const severeActuel  = scores.filter((s) => s.severityActuel  === 'Sévère');
  const compensated   = scores.filter((s) => {
    const ep = pct(s.enfanceScore, s.maxScoreEnfance);
    const ap = pct(s.actuelScore,  s.maxScoreActuel);
    return ep - ap > 20 && s.severityEnfance !== 'Aucun';
  });

  lines.push('TRAJECTOIRE DÉVELOPPEMENTALE');
  lines.push('');

  if (severeEnfance.length > 0 && compensated.length > 0) {
    lines.push(
      `L'analyse comparative révèle un profil d'enfance marqué (${severeEnfance.map((s) => s.domain).join(', ')}), ` +
      `avec une atténuation significative à l'âge adulte dans les domaines : ${compensated.map((s) => s.domain).join(', ')}. ` +
      `Cette configuration est typique d'un phénomène de compensation développementale pouvant masquer l'intensité réelle des difficultés.`
    );
  } else if (severeActuel.length > 0 && severeEnfance.length === 0) {
    lines.push(
      `Le profil présente une émergence ou une aggravation des difficultés à l'âge adulte, sans antécédents sévères clairement identifiés en enfance ` +
      `(domaines actuellement sévères : ${severeActuel.map((s) => s.domain).join(', ')}). ` +
      `À explorer : évolution contextuelles, augmentation des exigences sociales et professionnelles.`
    );
  } else if (severeEnfance.length > 0 && severeActuel.length > 0) {
    lines.push(
      `Les difficultés apparaissent stables et persistantes depuis l'enfance, ` +
      `avec des sévérités concordantes entre les profils précoce et actuel.`
    );
  } else {
    lines.push(
      `La trajectoire développementale ne montre pas de rupture majeure entre profil d'enfance et profil actuel.`
    );
  }
  lines.push('');

  // ── Masking / Compensation ────────────────────────────────────────────────
  lines.push('INDICE DE COMPENSATION / MASKING');
  lines.push('');

  if (masking.value >= 65) {
    lines.push(
      `L'indice de compensation est élevé (${masking.value}/100 — ${masking.label}). ` +
      `${masking.clinicalNote} ` +
      `Ce niveau de camouflage est associé à un coût cognitif et émotionnel important, ` +
      `pouvant contribuer à l'épuisement autistique et à une sous-estimation des besoins réels.`
    );
  } else if (masking.value >= 40) {
    lines.push(
      `L'indice de compensation est modéré (${masking.value}/100 — ${masking.label}). ` +
      `${masking.clinicalNote}`
    );
  } else {
    lines.push(
      `L'indice de compensation est faible à modéré (${masking.value}/100 — ${masking.label}). ` +
      `${masking.clinicalNote}`
    );
  }
  lines.push('');

  // ── Comorbidités ──────────────────────────────────────────────────────────
  const comorbidites: string[] = [];
  if (formData.mentalHealth?.tdah === 'Oui' || formData.mentalHealth?.tdah === 'Suspicion') {
    comorbidites.push('TDAH (signalé ou suspecté)');
  }
  if (formData.mentalHealth?.troublesAnxieux && formData.mentalHealth.troublesAnxieux.length > 0) {
    comorbidites.push(`troubles anxieux (${formData.mentalHealth.troublesAnxieux.join(', ')})`);
  }
  if (formData.mentalHealth?.episodesDepressifs && formData.mentalHealth.episodesDepressifs !== 'Non') {
    comorbidites.push('épisodes dépressifs');
  }
  if (formData.behavior?.burnoutAutistique === 'Oui') {
    comorbidites.push('burnout autistique');
  }

  if (comorbidites.length > 0) {
    lines.push('COMORBIDITÉS ET ÉLÉMENTS ASSOCIÉS');
    lines.push('');
    lines.push(
      `Les données recueillies évoquent la présence de : ${comorbidites.join(', ')}. ` +
      `Ces éléments devront être pris en compte dans le plan d'accompagnement et les orientations proposées.`
    );
    lines.push('');
  }

  // ── Orientations ──────────────────────────────────────────────────────────
  lines.push('ORIENTATIONS ET RECOMMANDATIONS');
  lines.push('');
  lines.push('[À compléter par le clinicien]');
  lines.push('');
  lines.push('—');
  lines.push('');
  lines.push(
    'Ce document constitue une trame d\'aide à la rédaction. ' +
    'Il ne remplace pas le jugement clinique du professionnel et doit être revu, complété et validé avant tout usage officiel.'
  );

  return lines.join('\n');
};
