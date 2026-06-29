import React, { useMemo } from 'react';
import { Download, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { NavigationButtons } from '../components/NavigationButtons';
import { DossierTransfert } from '../components/DossierTransfert';
import { calculateAllScores, calculateGlobalScore } from '../utils/scoreCalculator';
import { ScoreResult } from '../types/form';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

export const SummarySection: React.FC = () => {
  const { formData } = useFormContext();

  const scores = useMemo(() => calculateAllScores(formData), [formData]);
  const globalScore = useMemo(() => calculateGlobalScore(scores), [scores]);

  const radarData = scores.map((score) => ({
    domain: score.domain,
    enfance: score.maxScoreEnfance > 0 ? (score.enfanceScore / score.maxScoreEnfance) * 100 : 0,
    actuel: score.maxScoreActuel > 0 ? (score.actuelScore / score.maxScoreActuel) * 100 : 0,
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Aucun':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300';
      case 'Léger':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Modéré':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Sévère':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return '';
    }
  };

  const getBarColor = (severity: string, variant: 'enfance' | 'actuel') => {
    if (variant === 'enfance') {
      switch (severity) {
        case 'Aucun': return 'bg-blue-200';
        case 'Léger': return 'bg-blue-300';
        case 'Modéré': return 'bg-blue-500';
        case 'Sévère': return 'bg-blue-700';
        default: return 'bg-blue-400';
      }
    } else {
      switch (severity) {
        case 'Aucun': return 'bg-emerald-200';
        case 'Léger': return 'bg-emerald-300';
        case 'Modéré': return 'bg-emerald-500';
        case 'Sévère': return 'bg-emerald-700';
        default: return 'bg-emerald-400';
      }
    }
  };

  const getDeltaIndicator = (score: ScoreResult) => {
    const enfancePct = score.maxScoreEnfance > 0 ? (score.enfanceScore / score.maxScoreEnfance) * 100 : 0;
    const actuelPct = score.maxScoreActuel > 0 ? (score.actuelScore / score.maxScoreActuel) * 100 : 0;
    const diff = actuelPct - enfancePct;

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

  const getGlobalSeverity = () => {
    if (globalScore < 30) return 'Léger';
    if (globalScore < 60) return 'Modéré';
    return 'Sévère';
  };

  const pointsAttention = useMemo(() => {
    const points: string[] = [];
    scores.forEach((score) => {
      if (score.severityEnfance === 'Sévère' && score.severityActuel === 'Sévère') {
        points.push(`Difficultés sévères persistantes dans le domaine ${score.domain} (Enfance & Actuel)`);
      } else if (score.severityEnfance === 'Sévère') {
        points.push(`Difficultés sévères en enfance dans le domaine ${score.domain} — possible compensation à l'âge adulte`);
      } else if (score.severityActuel === 'Sévère') {
        points.push(`Difficultés sévères actuelles dans le domaine ${score.domain}`);
      }
    });
    if (formData.mentalHealth?.ideesSuicidaires === 'Oui actuellement') {
      points.push('⚠️ URGENT: Idées suicidaires actuelles - Contactez le 3114');
    }
    if (formData.behavior?.burnoutAutistique === 'Oui') {
      points.push('Burnout autistique rapporté');
    }
    if (formData.mentalHealth?.tdah === 'Oui' || formData.mentalHealth?.tdah === 'Suspicion') {
      points.push('TDAH évoqué ou suspecté');
    }
    return points;
  }, [scores, formData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Récapitulatif de vos réponses et scores
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ces scores sont indicatifs et doivent être interprétés par un professionnel de santé
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Score Global TSA</h3>
              <div className="text-5xl font-bold mb-2">{globalScore}%</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                globalScore < 30 ? 'bg-green-500' : globalScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
              } bg-opacity-30`}>
                {getGlobalSeverity()}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Profil TSA (Graphique Radar)
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#cbd5e0" />
                  <PolarAngleAxis dataKey="domain" tick={{ fill: 'currentColor', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Enfance" dataKey="enfance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Actuel" dataKey="actuel" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Scores par domaine clinique
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
                Profil Enfance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-emerald-500" />
                Profil Actuel
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((score, index) => {
              const enfancePct = score.maxScoreEnfance > 0
                ? Math.min(Math.round((score.enfanceScore / score.maxScoreEnfance) * 100), 100)
                : 0;
              const actuelPct = score.maxScoreActuel > 0
                ? Math.min(Math.round((score.actuelScore / score.maxScoreActuel) * 100), 100)
                : 0;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{score.icon}</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {score.domain}
                      </span>
                    </div>
                    {getDeltaIndicator(score)}
                  </div>

                  {/* Profil Enfance */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                        Profil Enfance
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                          {score.enfanceScore.toFixed(1)}&thinsp;/&thinsp;{score.maxScoreEnfance}
                          &ensp;({enfancePct}%)
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityColor(score.severityEnfance)}`}>
                          {score.severityEnfance}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-blue-50 dark:bg-blue-950/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(score.severityEnfance, 'enfance')}`}
                        style={{ width: `${enfancePct}%` }}
                      />
                    </div>
                  </div>

                  {/* Profil Actuel */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                        Profil Actuel
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                          {score.actuelScore.toFixed(1)}&thinsp;/&thinsp;{score.maxScoreActuel}
                          &ensp;({actuelPct}%)
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${getSeverityColor(score.severityActuel)}`}>
                          {score.severityActuel}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(score.severityActuel, 'actuel')}`}
                        style={{ width: `${actuelPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-4 bg-slate-50 dark:bg-gray-900/50 rounded-xl border border-slate-200 dark:border-gray-700 text-xs text-slate-600 dark:text-slate-400">
            <strong className="text-slate-700 dark:text-slate-300">Lecture des scores : </strong>
            Le <span className="text-blue-600 dark:text-blue-400 font-semibold">Profil Enfance</span> reflète l'apparition des particularités lors du développement précoce.
            Le <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Profil Actuel</span> reflète le fonctionnement présent.
            Un score Enfance nettement supérieur au score Actuel peut indiquer un phénomène de <span className="text-violet-600 dark:text-violet-400 font-semibold">compensation / masking</span>.
          </div>
        </div>

        {pointsAttention.length > 0 && (
          <div className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                  Points d'attention
                </h3>
                <ul className="space-y-1">
                  {pointsAttention.map((point, index) => (
                    <li key={index} className="text-red-800 dark:text-red-300 text-sm">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <DossierTransfert />

        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={() => alert('Fonction PDF en développement')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Télécharger le PDF complet
            </button>
            <button
              onClick={() => alert('Fonction PDF scores en développement')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              PDF scores uniquement
            </button>
          </div>
          <NavigationButtons nextLabel="Valider et envoyer" />
        </div>
      </div>
    </div>
  );
};
