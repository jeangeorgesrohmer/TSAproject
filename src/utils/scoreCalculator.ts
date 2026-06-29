import {
  FormData,
  ScoreResult,
  ScoreThresholds,
  YesNoUnknown,
  YesNoSometimes,
} from '../types/form';

interface DomainConfig {
  name: string;
  icon: string;
  maxScoreEnfance: number;
  maxScoreActuel: number;
  thresholds: ScoreThresholds;
  calculateEnfance: (data: Partial<FormData>) => number;
  calculateActuel: (data: Partial<FormData>) => number;
}

const calculateYesNoScore = (value?: YesNoUnknown): number => {
  if (value === 'Oui') return 1;
  if (value === 'Non') return 0;
  return 0;
};

const calculateYesNoSometimesScore = (value?: YesNoSometimes): number => {
  if (value === 'Oui') return 1;
  if (value === 'Parfois') return 0.5;
  if (value === 'Non') return 0;
  return 0;
};

const domainConfigs: DomainConfig[] = [
  {
    name: 'Sensoriel',
    icon: '🎧',
    maxScoreEnfance: 11,
    maxScoreActuel: 25,
    thresholds: { leger: 3, modere: 7, severe: 8 },
    calculateEnfance: (data) => {
      const sensory = data.sensory;
      if (!sensory) return 0;

      return (
        calculateYesNoScore(sensory.enfanceTextures) +
        calculateYesNoScore(sensory.enfanceTouche) +
        calculateYesNoScore(sensory.enfanceAliments) +
        calculateYesNoScore(sensory.enfanceOdeurs) +
        calculateYesNoScore(sensory.enfanceBoucherOreilles) +
        calculateYesNoScore(sensory.enfancePlusieursPersonnes) +
        calculateYesNoScore(sensory.enfanceLumiere) +
        calculateYesNoScore(sensory.enfanceManege) +
        calculateYesNoScore(sensory.enfanceDouleur) +
        calculateYesNoScore(sensory.enfanceFaimSoif) +
        calculateYesNoScore(sensory.enfanceIsoler)
      );
    },
    calculateActuel: (data) => {
      const sensory = data.sensory;
      if (!sensory) return 0;

      return (
        calculateYesNoSometimesScore(sensory.tactileSensibiliteVetements) +
        calculateYesNoSometimesScore(sensory.tactileGeneEtreTouche) +
        calculateYesNoSometimesScore(sensory.tactileBesoinToucher) +
        calculateYesNoSometimesScore(sensory.tactilePressions) +
        calculateYesNoSometimesScore(sensory.auditifIntolerance) +
        calculateYesNoSometimesScore(sensory.auditifBouchons) +
        calculateYesNoSometimesScore(sensory.auditifFiltrer) +
        calculateYesNoSometimesScore(sensory.auditifBruitsSoudains) +
        calculateYesNoSometimesScore(sensory.visuelLunettes) +
        calculateYesNoSometimesScore(sensory.visuelLumiereArtificielle) +
        calculateYesNoSometimesScore(sensory.visuelEnvironnementsCharges) +
        calculateYesNoSometimesScore(sensory.olfactifSensibilite) +
        calculateYesNoSometimesScore(sensory.olfactifInsupportable) +
        calculateYesNoSometimesScore(sensory.gustatifTextures) +
        calculateYesNoSometimesScore(sensory.gustatifCouleurs) +
        calculateYesNoSometimesScore(sensory.gustatifSafeFoods) +
        calculateYesNoSometimesScore(sensory.proprioceptionPosition) +
        calculateYesNoSometimesScore(sensory.proprioceptionMaladresse) +
        calculateYesNoSometimesScore(sensory.proprioceptionForce) +
        calculateYesNoSometimesScore(sensory.interoceptionFaim) +
        calculateYesNoSometimesScore(sensory.interoceptionSoif) +
        calculateYesNoSometimesScore(sensory.interoceptionUrine) +
        calculateYesNoSometimesScore(sensory.interoceptionTemperature) +
        calculateYesNoSometimesScore(sensory.interoceptionFatigue) +
        calculateYesNoSometimesScore(sensory.interoceptionBattements)
      );
    },
  },
  {
    name: 'Communication',
    icon: '💬',
    maxScoreEnfance: 6,
    maxScoreActuel: 22,
    thresholds: { leger: 2, modere: 4, severe: 5 },
    calculateEnfance: (data) => {
      const language = data.language;
      if (!language) return 0;

      return (
        calculateYesNoScore(language.enfancePrononciation) +
        calculateYesNoScore(language.enfanceConstructionPhrases) +
        calculateYesNoScore(language.enfanceComprehension) +
        calculateYesNoScore(language.enfanceRepetitifs) +
        calculateYesNoScore(language.enfancePronoms) +
        calculateYesNoScore(language.enfanceCreationMots)
      );
    },
    calculateActuel: (data) => {
      const language = data.language;
      if (!language) return 0;

      return (
        calculateYesNoSometimesScore(language.actuelComprendreRapidement) +
        calculateYesNoSometimesScore(language.actuelHumour) +
        calculateYesNoSometimesScore(language.actuelMetaphores) +
        calculateYesNoSometimesScore(language.actuelLitteralement) +
        calculateYesNoSometimesScore(language.actuelSousEntendus) +
        calculateYesNoSometimesScore(language.actuelConversationGroupe) +
        calculateYesNoSometimesScore(language.actuelTempsTraitement) +
        calculateYesNoSometimesScore(language.actuelTrouverMots) +
        calculateYesNoSometimesScore(language.actuelParlerInterets) +
        calculateYesNoSometimesScore(language.actuelAdapterDiscours) +
        calculateYesNoSometimesScore(language.actuelMonotonie) +
        calculateYesNoSometimesScore(language.actuelDebit) +
        calculateYesNoSometimesScore(language.actuelVolume) +
        calculateYesNoSometimesScore(language.actuelContactVisuel) +
        calculateYesNoSometimesScore(language.actuelExpressionsAutres) +
        calculateYesNoSometimesScore(language.actuelGestesAutres) +
        calculateYesNoSometimesScore(language.actuelUtiliserGestes) +
        calculateYesNoSometimesScore(language.actuelAdapterExpression) +
        calculateYesNoSometimesScore(language.actuelAppels) +
        calculateYesNoSometimesScore(language.actuelPreferenceEcrit) +
        calculateYesNoSometimesScore(language.actuelScripts) +
        calculateYesNoSometimesScore(language.actuelAnxiete)
      );
    },
  },
  {
    name: 'Social',
    icon: '👥',
    maxScoreEnfance: 15,
    maxScoreActuel: 15,
    thresholds: { leger: 5, modere: 10, severe: 11 },
    calculateEnfance: (data) => {
      const social = data.social;
      if (!social) return 0;

      return (
        calculateYesNoScore(social.enfancePremierDegre) +
        calculateYesNoScore(social.enfanceEvitementRegard) +
        calculateYesNoScore(social.enfanceComprendreIntentions) +
        calculateYesNoScore(social.enfanceParlerInterets) +
        calculateYesNoScore(social.enfanceComprendreExpressions) +
        calculateYesNoScore(social.enfanceSeFaireAmis) +
        calculateYesNoScore(social.enfanceManqueAmis) +
        calculateYesNoScore(social.enfanceComprendreAttentes) +
        calculateYesNoScore(social.enfanceIsolement) +
        calculateYesNoScore(social.enfanceManqueInteret) +
        calculateYesNoScore(social.enfanceManqueSensibilite) +
        calculateYesNoScore(social.enfanceGrandeSensibilite) +
        calculateYesNoScore(social.enfanceComprendreCause) +
        calculateYesNoScore(social.enfanceSavoirReagir) +
        calculateYesNoScore(social.enfanceIdentifierEmotions)
      );
    },
    calculateActuel: (data) => {
      const social = data.social;
      if (!social) return 0;

      return (
        calculateYesNoSometimesScore(social.actuelInitierConversations) +
        calculateYesNoSometimesScore(social.actuelSavoirQuandParler) +
        calculateYesNoSometimesScore(social.actuelTerminerConversation) +
        calculateYesNoSometimesScore(social.actuelCodesImplicites) +
        calculateYesNoSometimesScore(social.actuelAdapterComportement) +
        calculateYesNoSometimesScore(social.actuelIsolementVolontaire) +
        calculateYesNoSometimesScore(social.actuelMaintenirAmities) +
        calculateYesNoSometimesScore(social.actuelSentimentSolitude) +
        calculateYesNoSometimesScore(social.actuelReseauLimite) +
        calculateYesNoSometimesScore(social.actuelIdentifierEmotions) +
        calculateYesNoSometimesScore(social.actuelExprimerEmotions) +
        calculateYesNoSometimesScore(social.actuelRegulerEmotions) +
        calculateYesNoSometimesScore(social.actuelEmotionsIntenses) +
        calculateYesNoSometimesScore(social.actuelComprendreAutres) +
        calculateYesNoSometimesScore(social.actuelReconforter)
      );
    },
  },
  {
    name: 'Anxiété Sociale',
    icon: '😰',
    maxScoreEnfance: 11,
    maxScoreActuel: 11,
    thresholds: { leger: 3, modere: 7, severe: 8 },
    calculateEnfance: (data) => {
      const social = data.social;
      if (!social) return 0;

      return (
        calculateYesNoScore(social.enfanceSentimentIsolement) +
        calculateYesNoScore(social.enfanceEnvieMaisPeur) +
        calculateYesNoScore(social.enfanceCrainteSeFaire) +
        calculateYesNoScore(social.enfanceInquietudeGroupe) +
        calculateYesNoScore(social.enfanceBesoinRassure) +
        calculateYesNoScore(social.enfancePeurParler) +
        calculateYesNoScore(social.enfanceFaireInvisible) +
        calculateYesNoScore(social.enfanceResterSeul) +
        calculateYesNoScore(social.enfancePasCompetences) +
        calculateYesNoScore(social.enfanceAffutRejet) +
        calculateYesNoScore(social.enfanceAccrocher)
      );
    },
    calculateActuel: (data) => {
      const social = data.social;
      if (!social) return 0;

      return (
        calculateYesNoSometimesScore(social.actuelAnxieteSituationsSociales) +
        calculateYesNoSometimesScore(social.actuelEviterParPeur) +
        calculateYesNoSometimesScore(social.actuelPeurJugement) +
        calculateYesNoSometimesScore(social.actuelInquietudePrendreParole) +
        calculateYesNoSometimesScore(social.actuelAnticipationAnxieuse) +
        calculateYesNoSometimesScore(social.actuelBesoinSortieRapide) +
        calculateYesNoSometimesScore(social.actuelResteChezSoi) +
        calculateYesNoSometimesScore(social.actuelMinimiserPresence) +
        calculateYesNoSometimesScore(social.actuelPeurInconnus) +
        calculateYesNoSometimesScore(social.actuelAnxietePerformance) +
        calculateYesNoSometimesScore(social.actuelRuminationApres)
      );
    },
  },
  {
    name: 'Comportements Répétitifs',
    icon: '🔄',
    maxScoreEnfance: 6,
    maxScoreActuel: 6,
    thresholds: { leger: 2, modere: 4, severe: 5 },
    calculateEnfance: (data) => {
      const behavior = data.behavior;
      if (!behavior) return 0;

      return (
        calculateYesNoScore(behavior.enfanceGestesRepetitifs) +
        calculateYesNoScore(behavior.enfanceGestesViolents) +
        calculateYesNoScore(behavior.enfanceInteretsBizarres) +
        calculateYesNoScore(behavior.enfanceInteretsIntenses) +
        calculateYesNoScore(behavior.enfancePlaisirAligner) +
        calculateYesNoScore(behavior.enfanceGeneChangements)
      );
    },
    calculateActuel: (data) => {
      const behavior = data.behavior;
      if (!behavior) return 0;

      return (
        calculateYesNoSometimesScore(behavior.actuelGestesRepetitifs) +
        calculateYesNoSometimesScore(behavior.actuelGestesViolents) +
        calculateYesNoSometimesScore(behavior.actuelInteretsBizarres) +
        calculateYesNoSometimesScore(behavior.actuelInteretsIntenses) +
        calculateYesNoSometimesScore(behavior.actuelPlaisirAligner) +
        calculateYesNoSometimesScore(behavior.actuelGeneChangements)
      );
    },
  },
  {
    name: 'Attention/TDAH',
    icon: '🎯',
    maxScoreEnfance: 14,
    maxScoreActuel: 26,
    thresholds: { leger: 4, modere: 9, severe: 10 },
    calculateEnfance: (data) => {
      const attention = data.attention;
      if (!attention) return 0;

      return (
        calculateYesNoScore(attention.enfanceInattentif) +
        calculateYesNoScore(attention.enfanceDanger) +
        calculateYesNoScore(attention.enfanceDesorganise) +
        calculateYesNoScore(attention.enfancePerdreObjectif) +
        calculateYesNoScore(attention.enfanceImpulsif) +
        calculateYesNoScore(attention.enfanceNotionTemps) +
        calculateYesNoScore(attention.enfanceColérique) +
        calculateYesNoScore(attention.enfanceSautesHumeur) +
        calculateYesNoScore(attention.enfancePerdreObjets) +
        calculateYesNoScore(attention.enfanceAttendre) +
        calculateYesNoScore(attention.enfanceBavardage) +
        calculateYesNoScore(attention.enfanceOpposition) +
        calculateYesNoScore(attention.enfanceResterSansRien) +
        calculateYesNoScore(attention.enfanceBouger)
      );
    },
    calculateActuel: (data) => {
      const attention = data.attention;
      if (!attention) return 0;

      return (
        calculateYesNoSometimesScore(attention.actuelMaintenirAttention) +
        calculateYesNoSometimesScore(attention.actuelDistraitExternes) +
        calculateYesNoSometimesScore(attention.actuelDistraitPensees) +
        calculateYesNoSometimesScore(attention.actuelFiltrerInfos) +
        calculateYesNoSometimesScore(attention.actuelHyperfocus) +
        calculateYesNoSometimesScore(attention.actuelPlanifier) +
        calculateYesNoSometimesScore(attention.actuelOrganiserTemps) +
        calculateYesNoSometimesScore(attention.actuelRespecterDelais) +
        calculateYesNoSometimesScore(attention.actuelProcrastiner) +
        calculateYesNoSometimesScore(attention.actuelGererMultiple) +
        calculateYesNoSometimesScore(attention.actuelCommencer) +
        calculateYesNoSometimesScore(attention.actuelTerminer) +
        calculateYesNoSometimesScore(attention.actuelOubliFréquent) +
        calculateYesNoSometimesScore(attention.actuelConsignesMultiples) +
        calculateYesNoSometimesScore(attention.actuelOubliObjets) +
        calculateYesNoSometimesScore(attention.actuelInterrompre) +
        calculateYesNoSometimesScore(attention.actuelRepondreAvant) +
        calculateYesNoSometimesScore(attention.actuelDecisionsImpulsives) +
        calculateYesNoSometimesScore(attention.actuelAttendre) +
        calculateYesNoSometimesScore(attention.actuelColères) +
        calculateYesNoSometimesScore(attention.actuelSautesHumeur) +
        calculateYesNoSometimesScore(attention.actuelGererFrustration) +
        calculateYesNoSometimesScore(attention.actuelEstimerTemps) +
        calculateYesNoSometimesScore(attention.actuelRetard) +
        calculateYesNoSometimesScore(attention.actuelRespecterEmploi) +
        calculateYesNoSometimesScore(attention.actuelPerteNotion)
      );
    },
  },
  {
    name: 'Motricité',
    icon: '🏃',
    maxScoreEnfance: 8,
    maxScoreActuel: 5,
    thresholds: { leger: 2, modere: 5, severe: 6 },
    calculateEnfance: (data) => {
      const motor = data.motorSkills;
      if (!motor) return 0;

      return (
        calculateYesNoScore(motor.enfanceManqueEquilibre) +
        calculateYesNoScore(motor.enfanceSeCogner) +
        calculateYesNoScore(motor.enfanceGestesQuotidiens) +
        calculateYesNoScore(motor.enfanceBalles) +
        calculateYesNoScore(motor.enfanceLaisserEchapper) +
        calculateYesNoScore(motor.enfanceEcriture) +
        calculateYesNoScore(motor.enfanceOrganisationEspace) +
        calculateYesNoScore(motor.enfanceVelo)
      );
    },
    calculateActuel: (data) => {
      const motor = data.motorSkills;
      if (!motor) return 0;

      return (
        calculateYesNoSometimesScore(motor.actuelConduire) +
        calculateYesNoSometimesScore(motor.actuelSportEquipe) +
        calculateYesNoSometimesScore(motor.actuelCoordination) +
        calculateYesNoSometimesScore(motor.actuelEcriture) +
        calculateYesNoSometimesScore(motor.actuelTachesManuelles)
      );
    },
  },
];

const getSeverity = (
  score: number,
  thresholds: ScoreThresholds
): 'Léger' | 'Modéré' | 'Sévère' | 'Aucun' => {
  if (score === 0) return 'Aucun';
  if (score <= thresholds.leger) return 'Léger';
  if (score <= thresholds.modere) return 'Modéré';
  return 'Sévère';
};

const getInterpretation = (severity: string): string => {
  switch (severity) {
    case 'Aucun':
      return 'Aucune difficulté significative rapportée dans ce domaine';
    case 'Léger':
      return 'Quelques difficultés dans ce domaine';
    case 'Modéré':
      return 'Difficultés marquées, impact significatif';
    case 'Sévère':
      return 'Difficultés sévères, impact majeur sur le quotidien';
    default:
      return '';
  }
};

export const calculateAllScores = (formData: Partial<FormData>): ScoreResult[] => {
  return domainConfigs.map((config) => {
    const enfanceRaw = config.calculateEnfance(formData);
    const actuelRaw = config.calculateActuel(formData);
    const enfanceScore = Math.round(enfanceRaw * 10) / 10;
    const actuelScore = Math.round(actuelRaw * 10) / 10;

    const severityEnfance = getSeverity(enfanceScore, config.thresholds);
    const severityActuel = getSeverity(actuelScore, config.thresholds);
    const severity = getSeverity(Math.max(enfanceScore, actuelScore), config.thresholds);

    return {
      domain: config.name,
      icon: config.icon,
      enfanceScore,
      actuelScore,
      maxScoreEnfance: config.maxScoreEnfance,
      maxScoreActuel: config.maxScoreActuel,
      severity,
      severityEnfance,
      severityActuel,
      interpretation: getInterpretation(severity),
      interpretationEnfance: getInterpretation(severityEnfance),
      interpretationActuel: getInterpretation(severityActuel),
    };
  });
};

export const calculateGlobalScore = (scores: ScoreResult[]): number => {
  const totalScore = scores.reduce(
    (sum, score) => sum + Math.max(score.enfanceScore, score.actuelScore),
    0
  );
  const maxTotalScore = scores.reduce(
    (sum, score) => sum + Math.max(score.maxScoreEnfance, score.maxScoreActuel),
    0
  );
  return Math.round((totalScore / maxTotalScore) * 100);
};
