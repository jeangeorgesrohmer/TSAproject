import React, { useMemo, useState } from 'react';
import { Download, AlertCircle, EyeOff, TrendingDown, TrendingUp } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { NavigationButtons } from '../components/NavigationButtons';
import { DossierTransfert } from '../components/DossierTransfert';
import { calculateAllScores, calculateGlobalScore, calculateMaskingIndex } from '../utils/scoreCalculator';
import { generatePDF, generateScoresPDF } from '../utils/pdfGenerator';
import { ScoreResult } from '../types/form';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Legend,
} from 'recharts';

// ─── Circular gauge (SVG, no dep) ────────────────────────────────────────────

const maskingColor = (v: number) =>
  v <= 20 ? '#22c55e'
  : v <= 40 ? '#f59e0b'
  : v <= 65 ? '#f97316'
  : v <= 80 ? '#ef4444'
  : '#991b1b';

const MaskingGauge: React.FC<{ value: number }> = ({ value }) => {
  const pct = Math.min(Math.max(Math.round(value), 0), 100);
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = (circ * (1 - pct / 100)).toFixed(2);
  const color = maskingColor(pct);

  return (
    <svg viewBox="0 0 128 128" style={{ width: 140, height: 140 }}>
      {/* track */}
      <circle cx={64} cy={64} r={r} fill="none" stroke="#e5e7eb" strokeWidth={11} />
      {/* progress */}
      <circle
        cx={64} cy={64} r={r}
        fill="none"
        stroke={color}
        strokeWidth={11}
        strokeDasharray={circ.toFixed(2)}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 64 64)"
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34,1.56,0.64,1)' }}
      />
      <text x={64} y={57} textAnchor="middle" fontSize={24} fontWeight="bold" fill={color}>
        {pct}
      </text>
      <text x={64} y={74} textAnchor="middle" fontSize={12} fill={color}>
        %
      </text>
      <text x={64} y={96} textAnchor="middle" fontSize={9} fill="#9ca3af" letterSpacing={1}>
        MASQUAGE
      </text>
    </svg>
  );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Aucun':   return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
    case 'Léger':   return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Modéré':  return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    case 'Sévère':  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:        return '';
  }
};

const getBarColor = (severity: string, variant: 'enfance' | 'actuel') => {
  if (variant === 'enfance') {
    // Warm amber/orange
    switch (severity) {
      case 'Aucun':  return 'bg-amber-200';
      case 'Léger':  return 'bg-amber-300';
      case 'Modéré': return 'bg-amber-500';
      case 'Sévère': return 'bg-orange-600';
      default:       return 'bg-amber-400';
    }
  } else {
    // Cool indigo/blue
    switch (severity) {
      case 'Aucun':  return 'bg-indigo-200';
      case 'Léger':  return 'bg-indigo-300';
      case 'Modéré': return 'bg-indigo-500';
      case 'Sévère': return 'bg-indigo-700';
      default:       return 'bg-indigo-400';
    }
  }
};

const getDeltaIndicator = (score: ScoreResult) => {
  const ePct = score.maxScoreEnfance > 0 ? (score.enfanceScore / score.maxScoreEnfance) * 100 : 0;
  const aPct = score.maxScoreActuel  > 0 ? (score.actuelScore  / score.maxScoreActuel)  * 100 : 0;
  const diff = aPct - ePct;
  if (Math.abs(diff) < 10) return null;
  if (diff < 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 rounded-full font-medium">
        <TrendingDown className="w-3 h-3" />
        Compensation probable
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300 rounded-full font-medium">
      <TrendingUp className="w-3 h-3" />
      Impact croissant
    </span>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const SummarySection: React.FC = () => {
  const { formData } = useFormContext();
  const [isGeneratingFull,   setIsGeneratingFull]   = useState(false);
  const [isGeneratingScores, setIsGeneratingScores] = useState(false);

  const scores      = useMemo(() => calculateAllScores(formData),   [formData]);
  const globalScore = useMemo(() => calculateGlobalScore(scores),   [scores]);
  const masking     = useMemo(() => calculateMaskingIndex(formData), [formData]);

  const radarData = scores.map((s) => ({
    domain:  s.domain,
    enfance: s.maxScoreEnfance > 0 ? (s.enfanceScore / s.maxScoreEnfance) * 100 : 0,
    actuel:  s.maxScoreActuel  > 0 ? (s.actuelScore  / s.maxScoreActuel)  * 100 : 0,
  }));

  const globalSeverity = globalScore < 30 ? 'Léger' : globalScore < 60 ? 'Modéré' : 'Sévère';

  const pointsAttention = useMemo(() => {
    const pts: string[] = [];
    scores.forEach((s) => {
      if (s.severityEnfance === 'Sévère' && s.severityActuel === 'Sévère') {
        pts.push(`Difficultés sévères persistantes dans le domaine ${s.domain} (Enfance & Actuel)`);
      } else if (s.severityEnfance === 'Sévère') {
        pts.push(`Difficultés sévères en enfance dans le domaine ${s.domain} — possible compensation à l'âge adulte`);
      } else if (s.severityActuel === 'Sévère') {
        pts.push(`Difficultés sévères actuelles dans le domaine ${s.domain}`);
      }
    });
    if (formData.mentalHealth?.ideesSuicidaires === 'Oui actuellement')
      pts.push('URGENT: Idées suicidaires actuelles - Contactez le 3114');
    if (formData.behavior?.burnoutAutistique === 'Oui')
      pts.push('Burnout autistique rapporté');
    if (formData.mentalHealth?.tdah === 'Oui' || formData.mentalHealth?.tdah === 'Suspicion')
      pts.push('TDAH évoqué ou suspecté');
    return pts;
  }, [scores, formData]);

  const handleFullPDF = async () => {
    setIsGeneratingFull(true);
    try { await generatePDF(formData, true); }
    catch { alert('Erreur lors de la génération du PDF. Veuillez réessayer.'); }
    finally { setIsGeneratingFull(false); }
  };

  const handleScoresPDF = async () => {
    setIsGeneratingScores(true);
    try { await generateScoresPDF(formData); }
    catch { alert('Erreur lors de la génération du PDF. Veuillez réessayer.'); }
    finally { setIsGeneratingScores(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Récapitulatif des scores cliniques
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Ces scores sont indicatifs et doivent être interprétés par un professionnel de santé
        </p>

        {/* ── Masking Index ──────────────────────────────────────────── */}
        <div className="mb-8 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border border-violet-200 dark:border-violet-700/50 rounded-2xl overflow-hidden">
          <div className="px-6 pt-5 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <EyeOff className="w-5 h-5 text-violet-600 dark:text-violet-400 flex-shrink-0" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                Indice de Compensation / Masking
              </h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Estimation de l'effort d'adaptation sociale mis en œuvre pour dissimuler les difficultés
            </p>
          </div>

          <div className="px-6 pb-6 pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Gauge */}
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <MaskingGauge value={masking.value} />
                <span
                  className="text-sm font-semibold text-center max-w-[160px] leading-snug"
                  style={{ color: maskingColor(masking.value) }}
                >
                  {masking.label}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-3">
                {/* Sub-bars */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Masquage explicite (questionnaire)
                    </span>
                    <span className="tabular-nums font-semibold text-violet-600 dark:text-violet-400">
                      {masking.explicitScore}%
                    </span>
                  </div>
                  <div className="h-2 bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all duration-700 delay-300"
                      style={{ width: `${masking.explicitScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      Delta Enfance→Adulte (domaines sociaux)
                    </span>
                    <span className="tabular-nums font-semibold text-amber-600 dark:text-amber-400">
                      {masking.deltaScore}%
                    </span>
                  </div>
                  <div className="h-2 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700 delay-500"
                      style={{ width: `${masking.deltaScore}%` }}
                    />
                  </div>
                </div>

                {/* Clinical note */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-violet-100 dark:border-violet-800/50 shadow-sm">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {masking.clinicalNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Global score + Radar ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white shadow-xl h-full flex flex-col justify-center">
              <h3 className="text-lg font-semibold mb-2 opacity-90">Score Global TSA</h3>
              <div className="text-5xl font-bold mb-3">{globalScore}%</div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                globalScore < 30 ? 'bg-green-400/30 text-green-100'
                : globalScore < 60 ? 'bg-yellow-400/30 text-yellow-100'
                : 'bg-red-400/30 text-red-100'
              }`}>
                {globalSeverity}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Profil TSA — Radar comparatif
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#cbd5e0" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: 'currentColor', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Enfance" dataKey="enfance" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Radar name="Actuel"  dataKey="actuel"  stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Domain scores ───────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Scores par domaine clinique
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-amber-500" />
                Profil Enfance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-sm bg-indigo-500" />
                Profil Actuel
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((score, index) => {
              const ePct = score.maxScoreEnfance > 0
                ? Math.min(Math.round((score.enfanceScore / score.maxScoreEnfance) * 100), 100) : 0;
              const aPct = score.maxScoreActuel > 0
                ? Math.min(Math.round((score.actuelScore  / score.maxScoreActuel)  * 100), 100) : 0;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{score.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {score.domain}
                      </span>
                    </div>
                    {getDeltaIndicator(score)}
                  </div>

                  {/* Enfance bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 tracking-wide uppercase">
                        Profil Enfance
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                          {score.enfanceScore.toFixed(1)}&thinsp;/&thinsp;{score.maxScoreEnfance}
                          &ensp;({ePct}%)
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityColor(score.severityEnfance)}`}>
                          {score.severityEnfance}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(score.severityEnfance, 'enfance')}`}
                        style={{ width: `${ePct}%` }}
                      />
                    </div>
                  </div>

                  {/* Actuel bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
                        Profil Actuel
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                          {score.actuelScore.toFixed(1)}&thinsp;/&thinsp;{score.maxScoreActuel}
                          &ensp;({aPct}%)
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityColor(score.severityActuel)}`}>
                          {score.severityActuel}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(score.severityActuel, 'actuel')}`}
                        style={{ width: `${aPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Lecture des scores : </strong>
            Le <span className="text-amber-600 dark:text-amber-400 font-semibold">Profil Enfance</span> reflète l'apparition des particularités lors du développement précoce.
            Le <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Profil Actuel</span> reflète le fonctionnement présent.
            Un score Enfance nettement supérieur au score Actuel peut indiquer un phénomène de <span className="text-violet-600 dark:text-violet-400 font-semibold">compensation / masking</span> détaillé ci-dessus.
          </div>
        </div>

        {/* ── Points d'attention ──────────────────────────────────────── */}
        {pointsAttention.length > 0 && (
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">Points d'attention</h3>
                <ul className="space-y-1">
                  {pointsAttention.map((pt, i) => (
                    <li key={i} className="text-red-800 dark:text-red-300 text-sm">• {pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <DossierTransfert />

        {/* ── Actions ─────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleFullPDF}
              disabled={isGeneratingFull}
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg shadow-md transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              {isGeneratingFull ? 'Génération…' : 'PDF complet'}
            </button>
            <button
              onClick={handleScoresPDF}
              disabled={isGeneratingScores}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              {isGeneratingScores ? 'Génération…' : 'PDF scores'}
            </button>
          </div>
          <NavigationButtons nextLabel="Valider et envoyer" />
        </div>

      </div>
    </div>
  );
};
