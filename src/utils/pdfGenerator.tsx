import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { FormData, ScoreResult } from '../types/form';
import { calculateAllScores, calculateGlobalScore } from './scoreCalculator';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 15,
    borderBottom: '2 solid #4A90A4',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90A4',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  confidentialNote: {
    fontSize: 8,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 5,
  },
  section: {
    marginTop: 12,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90A4',
    marginBottom: 8,
    borderBottom: '1 solid #ccc',
    paddingBottom: 4,
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  field: {
    marginBottom: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#333',
    width: '35%',
    marginRight: 8,
    fontSize: 9,
  },
  fieldValue: {
    color: '#666',
    width: '60%',
    fontSize: 9,
  },
  arrayItem: {
    marginLeft: 12,
    marginBottom: 3,
    fontSize: 9,
  },
  listItem: {
    marginLeft: 8,
    marginBottom: 2,
    fontSize: 9,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#999',
    borderTop: '1 solid #ccc',
    paddingTop: 8,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    fontSize: 8,
    color: '#999',
  },
  scoreTable: {
    marginTop: 10,
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #ddd',
    paddingVertical: 6,
  },
  scoreHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    borderBottom: '2 solid #4A90A4',
    fontWeight: 'bold',
  },
  scoreCell: {
    fontSize: 9,
    paddingHorizontal: 4,
  },
  scoreCellIcon: {
    width: '25%',
  },
  scoreCellNumber: {
    width: '20%',
    textAlign: 'center',
  },
  scoreCellSeverity: {
    width: '15%',
    textAlign: 'center',
  },
  globalScoreBox: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    border: '2 solid #4A90A4',
  },
  globalScoreTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A90A4',
    marginBottom: 5,
  },
  globalScoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E40AF',
    textAlign: 'center',
  },
});

const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') return 'Non renseigné';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    if (value.length === 0) return 'Aucun';
    return value.join(', ');
  }
  return String(value);
};

interface PDFDocumentProps {
  data: Partial<FormData>;
  includeScores?: boolean;
}

const severityPdfColor = (severity: string): string => {
  switch (severity) {
    case 'Sévère': return '#dc2626';
    case 'Modéré': return '#d97706';
    case 'Léger': return '#16a34a';
    default: return '#9ca3af';
  }
};

const ScoresPage = ({ scores, globalScore }: { scores: ScoreResult[]; globalScore: number }) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.header}>
      <Text style={styles.title}>Résultats des Scores TSA</Text>
      <Text style={styles.subtitle}>Profil Enfance vs Profil Actuel — Évaluation par Domaine Clinique</Text>
      <Text style={styles.confidentialNote}>
        Ces scores sont indicatifs et doivent être interprétés par un professionnel de santé qualifié
      </Text>
    </View>

    <View style={styles.globalScoreBox}>
      <Text style={styles.globalScoreTitle}>Score Global TSA</Text>
      <Text style={styles.globalScoreValue}>{globalScore}%</Text>
      <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 5, color: '#666' }}>
        {globalScore < 30 ? 'Léger' : globalScore < 60 ? 'Modéré' : 'Sévère'}
      </Text>
    </View>

    {/* Legend */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ width: 12, height: 8, backgroundColor: '#3b82f6', borderRadius: 2 }} />
        <Text style={{ fontSize: 9, color: '#555' }}>Profil Enfance</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ width: 12, height: 8, backgroundColor: '#10b981', borderRadius: 2 }} />
        <Text style={{ fontSize: 9, color: '#555' }}>Profil Actuel</Text>
      </View>
    </View>

    <Text style={styles.sectionTitle}>Scores par Domaine Clinique</Text>

    <View style={styles.scoreTable}>
      {scores.map((score, index) => {
        const enfancePct = score.maxScoreEnfance > 0
          ? Math.min(Math.round((score.enfanceScore / score.maxScoreEnfance) * 100), 100)
          : 0;
        const actuelPct = score.maxScoreActuel > 0
          ? Math.min(Math.round((score.actuelScore / score.maxScoreActuel) * 100), 100)
          : 0;

        return (
          <View key={index} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: '1 solid #e5e7eb' }}>
            <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5, color: '#1f2937' }}>
              {score.icon}  {score.domain}
            </Text>

            {/* Enfance row */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ width: '18%', fontSize: 8, color: '#3b82f6', fontWeight: 'bold' }}>Enfance</Text>
              <View style={{ flex: 1, height: 8, backgroundColor: '#dbeafe', borderRadius: 3 }}>
                <View style={{
                  width: `${enfancePct}%`,
                  height: 8,
                  backgroundColor: '#3b82f6',
                  borderRadius: 3,
                }} />
              </View>
              <Text style={{ width: '12%', fontSize: 8, color: '#555', textAlign: 'right' }}>
                {enfancePct}%
              </Text>
              <Text style={{ width: '18%', fontSize: 8, color: '#555', textAlign: 'right' }}>
                {score.enfanceScore.toFixed(1)}/{score.maxScoreEnfance}
              </Text>
              <View style={{
                marginLeft: 6,
                paddingHorizontal: 5,
                paddingVertical: 2,
                backgroundColor: score.severityEnfance === 'Sévère' ? '#fee2e2'
                  : score.severityEnfance === 'Modéré' ? '#fef3c7'
                  : score.severityEnfance === 'Léger' ? '#dcfce7' : '#f3f4f6',
                borderRadius: 4,
              }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: severityPdfColor(score.severityEnfance) }}>
                  {score.severityEnfance}
                </Text>
              </View>
            </View>

            {/* Actuel row */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: '18%', fontSize: 8, color: '#10b981', fontWeight: 'bold' }}>Actuel</Text>
              <View style={{ flex: 1, height: 8, backgroundColor: '#d1fae5', borderRadius: 3 }}>
                <View style={{
                  width: `${actuelPct}%`,
                  height: 8,
                  backgroundColor: '#10b981',
                  borderRadius: 3,
                }} />
              </View>
              <Text style={{ width: '12%', fontSize: 8, color: '#555', textAlign: 'right' }}>
                {actuelPct}%
              </Text>
              <Text style={{ width: '18%', fontSize: 8, color: '#555', textAlign: 'right' }}>
                {score.actuelScore.toFixed(1)}/{score.maxScoreActuel}
              </Text>
              <View style={{
                marginLeft: 6,
                paddingHorizontal: 5,
                paddingVertical: 2,
                backgroundColor: score.severityActuel === 'Sévère' ? '#fee2e2'
                  : score.severityActuel === 'Modéré' ? '#fef3c7'
                  : score.severityActuel === 'Léger' ? '#dcfce7' : '#f3f4f6',
                borderRadius: 4,
              }}>
                <Text style={{ fontSize: 7, fontWeight: 'bold', color: severityPdfColor(score.severityActuel) }}>
                  {score.severityActuel}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>

    <View style={{ marginTop: 10, padding: 10, backgroundColor: '#FEF3C7', border: '1 solid #F59E0B' }}>
      <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 5 }}>Notes Importantes :</Text>
      <Text style={{ fontSize: 9, marginBottom: 3 }}>
        • Le Profil Enfance est calculé sur les questions rétrospectives (Oui/Non/Je ne sais pas)
      </Text>
      <Text style={{ fontSize: 9, marginBottom: 3 }}>
        • Le Profil Actuel est calculé sur les questions de situation présente (Oui/Non/Parfois)
      </Text>
      <Text style={{ fontSize: 9, marginBottom: 3 }}>
        • Un score Enfance nettement supérieur au score Actuel peut indiquer un phénomène de compensation / masking
      </Text>
      <Text style={{ fontSize: 9 }}>
        • Ces scores sont des indicateurs et ne constituent pas un diagnostic
      </Text>
    </View>

    <View style={styles.footer}>
      <Text>Centre Médico-Psychologique - Document confidentiel - Scores indicatifs</Text>
    </View>
    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
  </Page>
);

const PDFDocument = ({ data, includeScores = true }: PDFDocumentProps) => {
  const scores = includeScores ? calculateAllScores(data) : [];
  const globalScore = includeScores ? calculateGlobalScore(scores) : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Recueil préalable d'informations</Text>
          <Text style={styles.subtitle}>Centre Médico-Psychologique - Évaluation TSA Adulte</Text>
          {data.identification && (
            <>
              <Text style={styles.subtitle}>
                Patient: {data.identification.prenom} {data.identification.nom}
              </Text>
              <Text style={styles.subtitle}>
                Date de naissance: {data.identification.dateNaissance || 'Non renseignée'}
              </Text>
              <Text style={styles.subtitle}>
                Genre: {data.identification.genre || 'Non renseigné'}
              </Text>
              <Text style={styles.subtitle}>
                Date du questionnaire: {data.identification.dateJour || format(new Date(), 'dd/MM/yyyy')}
              </Text>
            </>
          )}
          <Text style={styles.confidentialNote}>
            Document confidentiel - Toutes les informations contenues dans ce document restent strictement confidentielles
          </Text>
        </View>

        {data.demographic && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 1 : Informations Démographiques</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Situation familiale:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.demographic.situationFamiliale)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Situation de logement:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.demographic.situationLogement)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Enfants:</Text>
              <Text style={styles.fieldValue}>
                {data.demographic.hasEnfants
                  ? `Oui (${data.demographic.nombreEnfants || 'N/A'}) - Âges: ${data.demographic.agesEnfants || 'N/A'}`
                  : 'Non'}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Emploi actuel:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.demographic.emploiActuel)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Diplômes:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.demographic.diplomes)}</Text>
            </View>
          </View>
        )}

        {data.physicalHealth && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 3 : Santé Physique</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Maladies somatiques:</Text>
              <Text style={styles.fieldValue}>
                {data.physicalHealth.maladiesSomatiques ? data.physicalHealth.detailsSomatiques || 'Oui' : 'Non'}
              </Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Troubles digestifs:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.physicalHealth.troublesDigestifs)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Régime alimentaire:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.physicalHealth.regimeAlimentaire)}</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Centre Médico-Psychologique - Document confidentiel</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {data.mentalHealth && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 4 : Santé Mentale et Comorbidités</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Troubles anxieux:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.mentalHealth.troublesAnxieux)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Épisodes dépressifs:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.mentalHealth.episodesDepressifs)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>TDAH:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.mentalHealth.tdah)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Troubles du sommeil:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.mentalHealth.troublesSommeil)}</Text>
            </View>
          </View>

          {data.development && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Section 7 : Développement</Text>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Anomalies grossesse:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.development.grossesseAnomalies)}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Prématurité:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.development.prematurite)}</Text>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.motorSkills && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 8 : Habiletés Motrices</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Âge de la marche:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.motorSkills.ageMarche)} mois</Text>
            </View>
            <Text style={styles.subsectionTitle}>Difficultés enfance (scorables):</Text>
            <Text style={styles.listItem}>• Manque d'équilibre: {formatValue(data.motorSkills.enfanceManqueEquilibre)}</Text>
            <Text style={styles.listItem}>• Se cogner: {formatValue(data.motorSkills.enfanceSeCogner)}</Text>
            <Text style={styles.listItem}>• Gestes quotidiens: {formatValue(data.motorSkills.enfanceGestesQuotidiens)}</Text>
            <Text style={styles.listItem}>• Balles: {formatValue(data.motorSkills.enfanceBalles)}</Text>
            <Text style={styles.listItem}>• Laisser échapper: {formatValue(data.motorSkills.enfanceLaisserEchapper)}</Text>
            <Text style={styles.listItem}>• Écriture: {formatValue(data.motorSkills.enfanceEcriture)}</Text>
            <Text style={styles.listItem}>• Organisation espace: {formatValue(data.motorSkills.enfanceOrganisationEspace)}</Text>
            <Text style={styles.listItem}>• Vélo: {formatValue(data.motorSkills.enfanceVelo)}</Text>
          </View>

          {data.sensory && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Section 9 : Perception Sensorielle</Text>
              <Text style={styles.subsectionTitle}>Difficultés enfance (scorables):</Text>
              <Text style={styles.listItem}>• Textures: {formatValue(data.sensory.enfanceTextures)}</Text>
              <Text style={styles.listItem}>• Toucher: {formatValue(data.sensory.enfanceTouche)}</Text>
              <Text style={styles.listItem}>• Aliments: {formatValue(data.sensory.enfanceAliments)}</Text>
              <Text style={styles.listItem}>• Odeurs: {formatValue(data.sensory.enfanceOdeurs)}</Text>
              <Text style={styles.listItem}>• Boucher oreilles: {formatValue(data.sensory.enfanceBoucherOreilles)}</Text>
              <Text style={styles.listItem}>• Plusieurs personnes: {formatValue(data.sensory.enfancePlusieursPersonnes)}</Text>
              <Text style={styles.listItem}>• Lumière: {formatValue(data.sensory.enfanceLumiere)}</Text>
              <Text style={styles.listItem}>• Manège: {formatValue(data.sensory.enfanceManege)}</Text>
              <Text style={styles.listItem}>• Douleur: {formatValue(data.sensory.enfanceDouleur)}</Text>
              <Text style={styles.listItem}>• Faim/Soif: {formatValue(data.sensory.enfanceFaimSoif)}</Text>
              <Text style={styles.listItem}>• S'isoler: {formatValue(data.sensory.enfanceIsoler)}</Text>
            </View>
          )}

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.language && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 10 : Langage et Communication</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Âge premiers mots:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.language.agePremiersMotsMois)} mois</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Âge premières phrases:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.language.agePremieresPhraseMois)} mois</Text>
            </View>
            <Text style={styles.subsectionTitle}>Difficultés enfance (scorables):</Text>
            <Text style={styles.listItem}>• Prononciation: {formatValue(data.language.enfancePrononciation)}</Text>
            <Text style={styles.listItem}>• Construction phrases: {formatValue(data.language.enfanceConstructionPhrases)}</Text>
            <Text style={styles.listItem}>• Compréhension: {formatValue(data.language.enfanceComprehension)}</Text>
            <Text style={styles.listItem}>• Énoncés répétitifs: {formatValue(data.language.enfanceRepetitifs)}</Text>
            <Text style={styles.listItem}>• Pronoms: {formatValue(data.language.enfancePronoms)}</Text>
            <Text style={styles.listItem}>• Création de mots: {formatValue(data.language.enfanceCreationMots)}</Text>
          </View>

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.social && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 11 : Interactions Sociales</Text>
            <Text style={styles.subsectionTitle}>Compréhension sociale enfance (scorables):</Text>
            <Text style={styles.listItem}>• Premier degré: {formatValue(data.social.enfancePremierDegre)}</Text>
            <Text style={styles.listItem}>• Évitement regard: {formatValue(data.social.enfanceEvitementRegard)}</Text>
            <Text style={styles.listItem}>• Comprendre intentions: {formatValue(data.social.enfanceComprendreIntentions)}</Text>
            <Text style={styles.listItem}>• Se faire amis: {formatValue(data.social.enfanceSeFaireAmis)}</Text>
            <Text style={styles.listItem}>• Manque d'amis: {formatValue(data.social.enfanceManqueAmis)}</Text>
            <Text style={styles.listItem}>• Isolement: {formatValue(data.social.enfanceIsolement)}</Text>

            <Text style={styles.subsectionTitle}>Anxiété sociale enfance (scorables):</Text>
            <Text style={styles.listItem}>• Sentiment isolement: {formatValue(data.social.enfanceSentimentIsolement)}</Text>
            <Text style={styles.listItem}>• Envie mais peur: {formatValue(data.social.enfanceEnvieMaisPeur)}</Text>
            <Text style={styles.listItem}>• Inquiétude groupe: {formatValue(data.social.enfanceInquietudeGroupe)}</Text>
            <Text style={styles.listItem}>• Peur parler: {formatValue(data.social.enfancePeurParler)}</Text>

            {data.social.impactMasking && data.social.impactMasking.length > 0 && (
              <>
                <Text style={styles.subsectionTitle}>Impact du Masking:</Text>
                <Text style={styles.listItem}>{formatValue(data.social.impactMasking)}</Text>
              </>
            )}
          </View>

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.behavior && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 12 : Comportements et Intérêts</Text>
            <Text style={styles.subsectionTitle}>Difficultés enfance (scorables):</Text>
            <Text style={styles.listItem}>• Gestes répétitifs: {formatValue(data.behavior.enfanceGestesRepetitifs)}</Text>
            <Text style={styles.listItem}>• Gestes violents: {formatValue(data.behavior.enfanceGestesViolents)}</Text>
            <Text style={styles.listItem}>• Intérêts bizarres: {formatValue(data.behavior.enfanceInteretsBizarres)}</Text>
            <Text style={styles.listItem}>• Intérêts intenses: {formatValue(data.behavior.enfanceInteretsIntenses)}</Text>
            <Text style={styles.listItem}>• Plaisir aligner: {formatValue(data.behavior.enfancePlaisirAligner)}</Text>
            <Text style={styles.listItem}>• Gêne changements: {formatValue(data.behavior.enfanceGeneChangements)}</Text>

            {data.behavior.burnoutAutistique && (
              <>
                <Text style={styles.subsectionTitle}>Burnout Autistique:</Text>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Déjà vécu:</Text>
                  <Text style={styles.fieldValue}>{formatValue(data.behavior.burnoutAutistique)}</Text>
                </View>
                {data.behavior.descriptionBurnout && (
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Description:</Text>
                    <Text style={styles.fieldValue}>{formatValue(data.behavior.descriptionBurnout)}</Text>
                  </View>
                )}
              </>
            )}
          </View>

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.attention && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 13 : Attention et Organisation (TDAH)</Text>
            <Text style={styles.subsectionTitle}>Difficultés enfance (scorables):</Text>
            <Text style={styles.listItem}>• Inattentif: {formatValue(data.attention.enfanceInattentif)}</Text>
            <Text style={styles.listItem}>• Danger: {formatValue(data.attention.enfanceDanger)}</Text>
            <Text style={styles.listItem}>• Désorganisé: {formatValue(data.attention.enfanceDesorganise)}</Text>
            <Text style={styles.listItem}>• Perdre objectif: {formatValue(data.attention.enfancePerdreObjectif)}</Text>
            <Text style={styles.listItem}>• Impulsif: {formatValue(data.attention.enfanceImpulsif)}</Text>
            <Text style={styles.listItem}>• Notion temps: {formatValue(data.attention.enfanceNotionTemps)}</Text>
            <Text style={styles.listItem}>• Colérique: {formatValue(data.attention.enfanceColérique)}</Text>
            <Text style={styles.listItem}>• Sautes humeur: {formatValue(data.attention.enfanceSautesHumeur)}</Text>
            <Text style={styles.listItem}>• Perdre objets: {formatValue(data.attention.enfancePerdreObjets)}</Text>
            <Text style={styles.listItem}>• Attendre: {formatValue(data.attention.enfanceAttendre)}</Text>
            <Text style={styles.listItem}>• Bavardage: {formatValue(data.attention.enfanceBavardage)}</Text>
            <Text style={styles.listItem}>• Opposition: {formatValue(data.attention.enfanceOpposition)}</Text>
            <Text style={styles.listItem}>• Rester sans rien: {formatValue(data.attention.enfanceResterSansRien)}</Text>
            <Text style={styles.listItem}>• Bouger: {formatValue(data.attention.enfanceBouger)}</Text>
          </View>

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.education && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 14 : Parcours Scolaire</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Dernière classe:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.education.derniereClasse)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Diplôme le plus élevé:</Text>
              <Text style={styles.fieldValue}>{formatValue(data.education.diplomeEleve)}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Redoublement:</Text>
              <Text style={styles.fieldValue}>{data.education.redoublement ? 'Oui' : 'Non'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Scolarité adaptée:</Text>
              <Text style={styles.fieldValue}>{data.education.scolariteAdaptee ? 'Oui' : 'Non'}</Text>
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>AVS/AESH:</Text>
              <Text style={styles.fieldValue}>{data.education.avsAesh ? 'Oui' : 'Non'}</Text>
            </View>
          </View>

          {data.professional && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Section 15 : Vie Professionnelle</Text>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Statut professionnel:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.professional.statutProfessionnel)}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>RQTH:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.professional.rqth)}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Burnout professionnel:</Text>
                <Text style={styles.fieldValue}>{data.professional.burnoutProfessionnel ? 'Oui' : 'Non'}</Text>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {data.currentSituation && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section 18 : Situation Actuelle et Besoins</Text>
            {data.currentSituation.difficultePrioritaires && (
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Difficultés prioritaires:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.currentSituation.difficultePrioritaires)}</Text>
              </View>
            )}
            {data.currentSituation.attentesEvaluation && (
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Attentes de l'évaluation:</Text>
                <Text style={styles.fieldValue}>{formatValue(data.currentSituation.attentesEvaluation)}</Text>
              </View>
            )}

            <Text style={styles.subsectionTitle}>Besoins d'aide au quotidien:</Text>
            <Text style={styles.listItem}>• Organisation maison: {formatValue(data.currentSituation.besoinOrganisation)}</Text>
            <Text style={styles.listItem}>• Courses: {formatValue(data.currentSituation.besoinCourses)}</Text>
            <Text style={styles.listItem}>• Ménage: {formatValue(data.currentSituation.besoinMenage)}</Text>
            <Text style={styles.listItem}>• Repas: {formatValue(data.currentSituation.besoinRepas)}</Text>
            <Text style={styles.listItem}>• Budget: {formatValue(data.currentSituation.besoinBudget)}</Text>
            <Text style={styles.listItem}>• Déplacements: {formatValue(data.currentSituation.besoinDeplacements)}</Text>
            <Text style={styles.listItem}>• Démarches: {formatValue(data.currentSituation.besoinDemarches)}</Text>
          </View>

          <View style={styles.footer}>
            <Text>Centre Médico-Psychologique - Document confidentiel</Text>
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {includeScores && <ScoresPage scores={scores} globalScore={globalScore} />}

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={{ fontSize: 10, color: '#666', marginTop: 10, marginBottom: 8 }}>
            Ce document présente un résumé complet du questionnaire de recueil préalable d'informations
            pour l'évaluation du Trouble du Spectre de l'Autisme chez l'adulte.
          </Text>
          <Text style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>
            Les informations contenues dans ce document sont strictement confidentielles et ne doivent
            être partagées qu'avec les professionnels de santé impliqués dans le suivi.
          </Text>
          {includeScores && (
            <Text style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>
              Les scores présentés sont des indicateurs automatiques basés sur les réponses du questionnaire.
              Ils ne constituent pas un diagnostic et doivent être interprétés par un professionnel qualifié
              dans le cadre d'une évaluation complète.
            </Text>
          )}
          <Text style={{ fontSize: 10, color: '#666' }}>
            Pour toute question ou complément d'information, veuillez contacter le Centre Médico-Psychologique.
          </Text>

          <View style={{ marginTop: 20, padding: 10, backgroundColor: '#EFF6FF', border: '1 solid #4A90A4' }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 5 }}>Numéros d'urgence :</Text>
            <Text style={{ fontSize: 9 }}>• Numéro national de prévention du suicide : 3114 (gratuit, 24h/24)</Text>
            <Text style={{ fontSize: 9 }}>• SAMU : 15</Text>
            <Text style={{ fontSize: 9 }}>• Urgences : 112</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Centre Médico-Psychologique - Document confidentiel - Fin du document</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

export const generatePDF = async (data: Partial<FormData>, includeScores = true) => {
  const doc = <PDFDocument data={data} includeScores={includeScores} />;
  const asPdf = pdf(doc);
  const blob = await asPdf.toBlob();

  const nom = data.identification?.nom || 'Patient';
  const date = format(new Date(), 'yyyy-MM-dd');
  const filename = `Questionnaire_TSA_${nom}_${date}.pdf`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
