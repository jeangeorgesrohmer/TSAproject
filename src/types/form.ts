export type YesNoUnknown = 'Oui' | 'Non' | 'Je ne sais pas';
export type YesNoSometimes = 'Oui' | 'Non' | 'Parfois';
export type FrequencyScale = 'jamais' | 'parfois' | 'souvent' | 'tout le temps';

export interface ExamenPasse {
  fait: boolean;
  annee?: string;
  lieu?: string;
  resultat?: string;
}

export interface DiagnosticEvoque {
  nomProfessionnel: string;
  fonction: string;
  diagnostic: string;
  annee: string;
}

export interface MedicamentActuel {
  nom: string;
  dosage: string;
  indication: string;
  duree: string;
}

export interface IdentificationData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  dateJour: string;
  genre: string;
}

export interface DemographicData {
  situationFamiliale: string;
  situationLogement: string;
  hasEnfants: boolean;
  nombreEnfants?: number;
  agesEnfants?: string;
  emploiActuel: string;
  posteActuel?: string;
  typeContrat?: string;
  situationActuelle?: string;
  diplomes: string;
  anneeDiplome?: number;
}

export interface MedicalHistoryData {
  examens: {
    genetique: ExamenPasse;
    neurologique: ExamenPasse;
    psychiatrique: ExamenPasse;
    orthophonique: ExamenPasse;
    psychomoteur: ExamenPasse;
    autres: ExamenPasse;
  };
  diagnosticsEvoques: boolean;
  diagnostics: DiagnosticEvoque[];
}

export interface PhysicalHealthData {
  maladiesSomatiques: boolean;
  detailsSomatiques?: string;
  maladiesPsy: boolean;
  detailsPsy?: string;
  maladiesNeuro: boolean;
  detailsNeuro?: string;
  epilepsie: string;
  epilepsieType?: string;
  epilepsieFrequence?: string;
  epilepsieTraitement?: string;
  accidentsLesions: boolean;
  detailsAccidents?: string;
  handicapsSensoriels: string[];
  detailsHandicaps?: string;
  troublesDigestifs: string[];
  regimeAlimentaire: string[];
  restrictionsTexture: boolean;
  alimentsEvites?: string;
  safeFoods: boolean;
  safeFoodsList?: string;
  cycleMenstruel?: {
    regularite: string;
    douleurs: boolean;
    syndromePre: boolean;
    aggravationTSA: boolean;
  };
}

export interface MentalHealthData {
  troublesAnxieux: string[];
  symptomesAnxieux?: string;
  episodesDepressifs: string;
  detailsDepression?: string;
  ideesSuicidaires: string;
  detailsSuicide?: string;
  tentativesSuicide: string;
  detailsTentatives?: string;
  tdah: string;
  symptomesTdah?: string;
  troublesAlimentaires: string[];
  detailsTroublesAlim?: string;
  troublesSommeil: string[];
  heureCoucher?: string;
  heureLever?: string;
  dureeMoyenne?: number;
  fatigueDiurne: string;
  sommeilReparateur: string;
  rituelCoucher?: string;
  cauchemars: string;
  somnambulisme: string;
}

export interface AddictionsData {
  hasAddictions: string;
  typeAddictions: string[];
  impactAddictions?: string;
  medicamentsPasses: boolean;
  listeMedicamentsPasses?: string;
  medicamentsActuels: boolean;
  listeMedicamentsActuels: MedicamentActuel[];
}

export interface FamilyHistoryData {
  antecedentsFamiliaux: string;
  maladiesSomatiques?: string;
  maladiesPsy?: string;
  troublesNeurodev?: string;
  particularitesNeuroatypiques?: string;
}

export interface DevelopmentData {
  grossesseAnomalies: string;
  detailsGrossesse?: string;
  prematurite: string;
  moisPrematurite?: number;
  accouchementComplications: string;
  detailsAccouchement?: string;
  hospitalisationNeo: string;
  dureeHospitalisation?: string;
  raisonHospitalisation?: string;
  petiteEnfanceDifficulties: string;
  detailsPetiteEnfance?: string;
}

export interface MotorSkillsData {
  ageMarche?: number;
  enfanceManqueEquilibre: YesNoUnknown;
  enfanceSeCogner: YesNoUnknown;
  enfanceGestesQuotidiens: YesNoUnknown;
  enfanceBalles: YesNoUnknown;
  enfanceLaisserEchapper: YesNoUnknown;
  enfanceEcriture: YesNoUnknown;
  enfanceOrganisationEspace: YesNoUnknown;
  enfanceVelo: YesNoUnknown;
  difficultePersistante?: string;
  actuelConduire: YesNoSometimes;
  actuelSportEquipe: YesNoSometimes;
  actuelCoordination: YesNoSometimes;
  actuelEcriture: YesNoSometimes;
  actuelTachesManuelles: YesNoSometimes;
}

export interface SensoryData {
  enfanceTextures: YesNoUnknown;
  enfanceTouche: YesNoUnknown;
  enfanceAliments: YesNoUnknown;
  enfanceOdeurs: YesNoUnknown;
  enfanceBoucherOreilles: YesNoUnknown;
  enfancePlusieursPersonnes: YesNoUnknown;
  enfanceLumiere: YesNoUnknown;
  enfanceManege: YesNoUnknown;
  enfanceDouleur: YesNoUnknown;
  enfanceFaimSoif: YesNoUnknown;
  enfanceIsoler: YesNoUnknown;
  difficultePersistante?: string;
  tactileSensibiliteVetements: YesNoSometimes;
  tactileGeneEtreTouche: YesNoSometimes;
  tactileBesoinToucher: YesNoSometimes;
  tactilePressions: YesNoSometimes;
  auditifIntolerance: YesNoSometimes;
  auditifBouchons: YesNoSometimes;
  auditifFiltrer: YesNoSometimes;
  auditifBruitsSoudains: YesNoSometimes;
  visuelLunettes: YesNoSometimes;
  visuelLumiereArtificielle: YesNoSometimes;
  visuelEnvironnementsCharges: YesNoSometimes;
  olfactifSensibilite: YesNoSometimes;
  olfactifInsupportable: YesNoSometimes;
  gustatifTextures: YesNoSometimes;
  gustatifCouleurs: YesNoSometimes;
  gustatifSafeFoods: YesNoSometimes;
  proprioceptionPosition: YesNoSometimes;
  proprioceptionMaladresse: YesNoSometimes;
  proprioceptionForce: YesNoSometimes;
  interoceptionFaim: YesNoSometimes;
  interoceptionSoif: YesNoSometimes;
  interoceptionUrine: YesNoSometimes;
  interoceptionTemperature: YesNoSometimes;
  interoceptionFatigue: YesNoSometimes;
  interoceptionBattements: YesNoSometimes;
  strategiesSensorielles?: string;
}

export interface LanguageData {
  agePremiersMotsMois?: number;
  agePremieresPhraseMois?: number;
  enfancePrononciation: YesNoUnknown;
  enfanceConstructionPhrases: YesNoUnknown;
  enfanceComprehension: YesNoUnknown;
  enfanceRepetitifs: YesNoUnknown;
  enfancePronoms: YesNoUnknown;
  enfanceCreationMots: YesNoUnknown;
  difficultePersistante?: string;
  actuelComprendreRapidement: YesNoSometimes;
  actuelHumour: YesNoSometimes;
  actuelMetaphores: YesNoSometimes;
  actuelLitteralement: YesNoSometimes;
  actuelSousEntendus: YesNoSometimes;
  actuelConversationGroupe: YesNoSometimes;
  actuelTempsTraitement: YesNoSometimes;
  actuelTrouverMots: YesNoSometimes;
  actuelParlerInterets: YesNoSometimes;
  actuelAdapterDiscours: YesNoSometimes;
  actuelMonotonie: YesNoSometimes;
  actuelDebit: YesNoSometimes;
  actuelVolume: YesNoSometimes;
  actuelContactVisuel: YesNoSometimes;
  actuelExpressionsAutres: YesNoSometimes;
  actuelGestesAutres: YesNoSometimes;
  actuelUtiliserGestes: YesNoSometimes;
  actuelAdapterExpression: YesNoSometimes;
  actuelAppels: YesNoSometimes;
  actuelPreferenceEcrit: YesNoSometimes;
  actuelScripts: YesNoSometimes;
  actuelAnxiete: YesNoSometimes;
}

export interface SocialData {
  enfancePremierDegre: YesNoUnknown;
  enfanceEvitementRegard: YesNoUnknown;
  enfanceComprendreIntentions: YesNoUnknown;
  enfanceParlerInterets: YesNoUnknown;
  enfanceComprendreExpressions: YesNoUnknown;
  enfanceSeFaireAmis: YesNoUnknown;
  enfanceManqueAmis: YesNoUnknown;
  enfanceComprendreAttentes: YesNoUnknown;
  enfanceIsolement: YesNoUnknown;
  enfanceManqueInteret: YesNoUnknown;
  enfanceManqueSensibilite: YesNoUnknown;
  enfanceGrandeSensibilite: YesNoUnknown;
  enfanceComprendreCause: YesNoUnknown;
  enfanceSavoirReagir: YesNoUnknown;
  enfanceIdentifierEmotions: YesNoUnknown;
  difficultePersistanteSocial?: string;
  enfanceSentimentIsolement: YesNoUnknown;
  enfanceEnvieMaisPeur: YesNoUnknown;
  enfanceCrainteSeFaire: YesNoUnknown;
  enfanceInquietudeGroupe: YesNoUnknown;
  enfanceBesoinRassure: YesNoUnknown;
  enfancePeurParler: YesNoUnknown;
  enfanceFaireInvisible: YesNoUnknown;
  enfanceResterSeul: YesNoUnknown;
  enfancePasCompetences: YesNoUnknown;
  enfanceAffutRejet: YesNoUnknown;
  enfanceAccrocher: YesNoUnknown;
  difficultePersistanteAnxiete?: string;
  actuelInitierConversations: YesNoSometimes;
  actuelSavoirQuandParler: YesNoSometimes;
  actuelTerminerConversation: YesNoSometimes;
  actuelCodesImplicites: YesNoSometimes;
  actuelAdapterComportement: YesNoSometimes;
  actuelIsolementVolontaire: YesNoSometimes;
  actuelMaintenirAmities: YesNoSometimes;
  actuelSentimentSolitude: YesNoSometimes;
  actuelReseauLimite: YesNoSometimes;
  actuelIdentifierEmotions: YesNoSometimes;
  actuelExprimerEmotions: YesNoSometimes;
  actuelRegulerEmotions: YesNoSometimes;
  actuelEmotionsIntenses: YesNoSometimes;
  actuelComprendreAutres: YesNoSometimes;
  actuelReconforter: YesNoSometimes;
  actuelAnxieteSituationsSociales: YesNoSometimes;
  actuelEviterParPeur: YesNoSometimes;
  actuelPeurJugement: YesNoSometimes;
  actuelInquietudePrendreParole: YesNoSometimes;
  actuelAnticipationAnxieuse: YesNoSometimes;
  actuelBesoinSortieRapide: YesNoSometimes;
  actuelResteChezSoi: YesNoSometimes;
  actuelMinimiserPresence: YesNoSometimes;
  actuelPeurInconnus: YesNoSometimes;
  actuelAnxietePerformance: YesNoSometimes;
  actuelRuminationApres: YesNoSometimes;
  maskingImiter: FrequencyScale;
  maskingCopier: FrequencyScale;
  maskingPreparer: FrequencyScale;
  maskingRole: FrequencyScale;
  impactMasking: string[];
  dureeRecuperation?: string;
  epuisementSocial: boolean;
  dureeEpuisement?: string;
  activitesRecuperation?: string;
}

export interface BehaviorData {
  enfanceGestesRepetitifs: YesNoUnknown;
  enfanceGestesViolents: YesNoUnknown;
  enfanceInteretsBizarres: YesNoUnknown;
  enfanceInteretsIntenses: YesNoUnknown;
  enfancePlaisirAligner: YesNoUnknown;
  enfanceGeneChangements: YesNoUnknown;
  difficultePersistante?: string;
  actuelGestesRepetitifs: YesNoSometimes;
  actuelGestesViolents: YesNoSometimes;
  actuelInteretsBizarres: YesNoSometimes;
  actuelInteretsIntenses: YesNoSometimes;
  actuelPlaisirAligner: YesNoSometimes;
  actuelGeneChangements: YesNoSometimes;
  stimmingActuel: boolean;
  typesStimming: string[];
  stimmingVisible?: string;
  situationsAugmentation?: string;
  besoinRoutines: boolean;
  detailsRoutines?: string;
  routinePerturbee?: string;
  rituels?: string;
  intoleranceImprevuAnxiete: FrequencyScale;
  intoleranceImprevuPlanifier: FrequencyScale;
  intoleranceImprevuChangements: FrequencyScale;
  intoleranceImprevuNouvelles: FrequencyScale;
  interetsRestreints: boolean;
  listeInterets?: string;
  tempsConsacre?: string;
  bienEtreOuDifficulte?: string;
  interferenceVie?: string;
  burnoutAutistique: string;
  nombreBurnout?: number;
  dureeRecuperationBurnout?: string;
  descriptionBurnout?: string;
  shutdown: string;
  situationsShutdown?: string;
  dureeShutdown?: string;
  meltdown: string;
  descriptionMeltdown?: string;
  dureeMeltdown?: string;
  recuperationMeltdown?: string;
  reperezSignes: boolean;
  signesAvantCoureurs?: string;
  strategiesEvitement?: string;
}

export interface AttentionData {
  enfanceInattentif: YesNoUnknown;
  enfanceDanger: YesNoUnknown;
  enfanceDesorganise: YesNoUnknown;
  enfancePerdreObjectif: YesNoUnknown;
  enfanceImpulsif: YesNoUnknown;
  enfanceNotionTemps: YesNoUnknown;
  enfanceColérique: YesNoUnknown;
  enfanceSautesHumeur: YesNoUnknown;
  enfancePerdreObjets: YesNoUnknown;
  enfanceAttendre: YesNoUnknown;
  enfanceBavardage: YesNoUnknown;
  enfanceOpposition: YesNoUnknown;
  enfanceResterSansRien: YesNoUnknown;
  enfanceBouger: YesNoUnknown;
  difficultePersistante?: string;
  actuelMaintenirAttention: YesNoSometimes;
  actuelDistraitExternes: YesNoSometimes;
  actuelDistraitPensees: YesNoSometimes;
  actuelFiltrerInfos: YesNoSometimes;
  actuelHyperfocus: YesNoSometimes;
  actuelPlanifier: YesNoSometimes;
  actuelOrganiserTemps: YesNoSometimes;
  actuelRespecterDelais: YesNoSometimes;
  actuelProcrastiner: YesNoSometimes;
  actuelGererMultiple: YesNoSometimes;
  actuelCommencer: YesNoSometimes;
  actuelTerminer: YesNoSometimes;
  actuelOubliFréquent: YesNoSometimes;
  actuelConsignesMultiples: YesNoSometimes;
  actuelOubliObjets: YesNoSometimes;
  actuelInterrompre: YesNoSometimes;
  actuelRepondreAvant: YesNoSometimes;
  actuelDecisionsImpulsives: YesNoSometimes;
  actuelAttendre: YesNoSometimes;
  actuelColères: YesNoSometimes;
  actuelSautesHumeur: YesNoSometimes;
  actuelGererFrustration: YesNoSometimes;
  actuelEstimerTemps: YesNoSometimes;
  actuelRetard: YesNoSometimes;
  actuelRespecterEmploi: YesNoSometimes;
  actuelPerteNotion: YesNoSometimes;
  ticsMoteurs: boolean;
  descriptionTicsMoteurs?: string;
  ageDebutTicsMoteurs?: number;
  dureeTicsMoteurs?: string;
  ticsActuelsMoteurs?: boolean;
  ticsVocaux: boolean;
  descriptionTicsVocaux?: string;
  ageDebutTicsVocaux?: number;
  dureeTicsVocaux?: string;
  ticsActuelsVocaux?: boolean;
}

export interface EducationData {
  derniereClasse: string;
  anneeFinEtudes?: number;
  diplomeEleve: string;
  redoublement: boolean;
  classesRedoublees?: string;
  sautClasse: boolean;
  classesSautees?: string;
  scolariteAdaptee: boolean;
  typeScolarite?: string;
  anneesScolariteAdaptee?: string;
  etablissement?: string;
  supportRASED: string;
  detailsRASED?: string;
  avsAesh: boolean;
  anneesAVS?: string;
  difficultesLecture: YesNoUnknown;
  difficultesOrthographe: YesNoUnknown;
  difficultesEcriture: YesNoUnknown;
  difficultesComprehension: YesNoUnknown;
  difficultesSyntheses: YesNoUnknown;
  difficultesCalcul: YesNoUnknown;
  difficultesMaths: YesNoUnknown;
  difficultesMemorisation: YesNoUnknown;
  difficultesGeographie: YesNoUnknown;
  difficultesOrganisationFeuille: YesNoUnknown;
  difficultesInteractions: YesNoUnknown;
  difficultesAttention: YesNoUnknown;
  difficultesBavardage: YesNoUnknown;
  difficultesOpposition: YesNoUnknown;
  difficultesInteret: YesNoUnknown;
  difficultesHarcelement: YesNoUnknown;
  coursDifficiles?: string;
  coursApprecies?: string;
}

export interface ProfessionalData {
  statutProfessionnel: string;
  emploisPassesActuels?: string;
  typeEnvironnement: string[];
  difficultesReunions: YesNoSometimes;
  difficultesTravailEquipe: YesNoSometimes;
  difficultesCommCollègues: YesNoSometimes;
  difficultesCommHierarchie: YesNoSometimes;
  difficultesDelais: YesNoSometimes;
  difficultesGestionTemps: YesNoSometimes;
  difficultesAdaptationChangements: YesNoSometimes;
  difficultesBruit: YesNoSometimes;
  difficultesLumiere: YesNoSometimes;
  difficultesCharge: YesNoSometimes;
  difficultesInteractionsInformelles: YesNoSometimes;
  difficultesDeplacements: YesNoSometimes;
  difficultesPresentations: YesNoSometimes;
  amenagements: string;
  detailsAmenagements?: string;
  rqth: string;
  orientationProfessionnelle: boolean;
  detailsOrientation?: string;
  difficultesRechercheEmploi?: string;
  burnoutProfessionnel: boolean;
  nombreBurnout?: number;
  contextesBurnout?: string;
}

export interface RelationshipData {
  situationActuelle: string;
  dureeRelation?: number;
  uniteTemps?: string;
  difficultesRelation: boolean;
  detailsDifficultesRelation?: string;
  codesRelationnels: string;
  detailsCodesRelationnels?: string;
  intimitePhysique: string;
  detailsIntimite?: string;
  harcelementMaltraitance: string;
  detailsHarcelement?: string;
  reseauSoutien: string[];
  nombrePersonnesConfiance: number;
}

export interface AdministrativeData {
  reconnaissances: string[];
  professionnelsActuels: string[];
  structureSuivi: string[];
  difficultesComprendreCourriers: YesNoSometimes;
  difficultesRemplirFormulaires: YesNoSometimes;
  difficultesTelephoner: YesNoSometimes;
  difficultesRespecterDelais: YesNoSometimes;
  difficultesBesoinAide: YesNoSometimes;
  aideFinanciere: string;
  adaptationLogement?: string;
}

export interface CurrentSituationData {
  difficultePrioritaires?: string;
  projetsFuturs?: string;
  besoinOrganisation: YesNoUnknown;
  besoinCourses: YesNoUnknown;
  besoinMenage: YesNoUnknown;
  besoinActivites: YesNoUnknown;
  besoinRepas: YesNoUnknown;
  besoinBudget: YesNoUnknown;
  besoinHygiene: YesNoUnknown;
  besoinHabillement: YesNoUnknown;
  besoinDeplacements: YesNoUnknown;
  besoinMailsTelephone: YesNoUnknown;
  besoinDemarches: YesNoUnknown;
  besoinRechercheEmploi: YesNoUnknown;
  besoinSante: YesNoUnknown;
  besoinRDVSante: YesNoUnknown;
  besoinLoisirs: YesNoUnknown;
  besoinActivitesSociales: YesNoUnknown;
  precisionBesoins?: string;
  attentesEvaluation?: string;
  questionsSupplementaires?: string;
}

export interface FormData {
  identification: IdentificationData;
  demographic: DemographicData;
  medicalHistory: MedicalHistoryData;
  physicalHealth: PhysicalHealthData;
  mentalHealth: MentalHealthData;
  addictions: AddictionsData;
  familyHistory: FamilyHistoryData;
  development: DevelopmentData;
  motorSkills: MotorSkillsData;
  sensory: SensoryData;
  language: LanguageData;
  social: SocialData;
  behavior: BehaviorData;
  attention: AttentionData;
  education: EducationData;
  professional: ProfessionalData;
  relationship: RelationshipData;
  administrative: AdministrativeData;
  currentSituation: CurrentSituationData;
}

export interface ScoreResult {
  domain: string;
  icon: string;
  enfanceScore: number;
  actuelScore: number;
  maxScoreEnfance: number;
  maxScoreActuel: number;
  severity: 'Léger' | 'Modéré' | 'Sévère' | 'Aucun';
  severityEnfance: 'Léger' | 'Modéré' | 'Sévère' | 'Aucun';
  severityActuel: 'Léger' | 'Modéré' | 'Sévère' | 'Aucun';
  interpretation: string;
  interpretationEnfance: string;
  interpretationActuel: string;
}

export interface ScoreThresholds {
  leger: number;
  modere: number;
  severe: number;
}
