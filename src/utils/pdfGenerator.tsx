import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { FormData, ScoreResult } from '../types/form';
import { calculateAllScores, calculateGlobalScore, calculateMaskingIndex, MaskingResult } from './scoreCalculator';

// ─── Colors ──────────────────────────────────────────────────────────────────
// Amber = Enfance  |  Indigo = Actuel
// Both remain distinguishable in B&W (amber → mid-gray, indigo → dark gray)
const C = {
  accent:      '#4A90A4',
  enfance:     '#d97706', // amber-600
  enfanceBg:   '#fef3c7', // amber-100
  actuel:      '#4f46e5', // indigo-600
  actuelBg:    '#e0e7ff', // indigo-100
  masking:     '#7c3aed', // violet-700
  maskingBg:   '#f5f3ff', // violet-50
  maskingBord: '#8b5cf6', // violet-500
  sev:         { Sévère: '#dc2626', Modéré: '#d97706', Léger: '#16a34a', Aucun: '#9ca3af' },
  sevBg:       { Sévère: '#fee2e2', Modéré: '#fef3c7', Léger: '#dcfce7', Aucun: '#f3f4f6' },
} as const;

const maskingGaugeColor = (v: number) =>
  v <= 20 ? '#16a34a' : v <= 40 ? '#d97706' : v <= 65 ? '#ea580c' : v <= 80 ? '#dc2626' : '#7f1d1d';

// ─── StyleSheet ──────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page:        { padding: 30, fontSize: 10, fontFamily: 'Helvetica' },
  header:      { marginBottom: 15, borderBottom: `2 solid ${C.accent}`, paddingBottom: 10 },
  title:       { fontSize: 20, fontWeight: 'bold', color: C.accent, marginBottom: 5 },
  subtitle:    { fontSize: 10, color: '#666', marginBottom: 2 },
  confidential:{ fontSize: 8, color: '#999', fontStyle: 'italic', marginTop: 5 },
  section:     { marginTop: 12, marginBottom: 10 },
  sectionTitle:{ fontSize: 14, fontWeight: 'bold', color: C.accent, marginBottom: 8, borderBottom: '1 solid #ccc', paddingBottom: 4 },
  subsection:  { fontSize: 11, fontWeight: 'bold', color: '#333', marginTop: 8, marginBottom: 4 },
  field:       { marginBottom: 6, flexDirection: 'row', flexWrap: 'wrap' },
  fieldLabel:  { fontWeight: 'bold', color: '#333', width: '35%', marginRight: 8, fontSize: 9 },
  fieldValue:  { color: '#666', width: '60%', fontSize: 9 },
  listItem:    { marginLeft: 8, marginBottom: 2, fontSize: 9 },
  footer:      { position: 'absolute', bottom: 20, left: 30, right: 30, textAlign: 'center', fontSize: 8, color: '#999', borderTop: '1 solid #ccc', paddingTop: 8 },
  pageNumber:  { position: 'absolute', bottom: 10, right: 30, fontSize: 8, color: '#999' },
  globalBox:   { backgroundColor: '#EFF6FF', padding: 12, borderRadius: 6, marginBottom: 14, borderWidth: 2, borderStyle: 'solid', borderColor: C.accent },
  globalTitle: { fontSize: 12, fontWeight: 'bold', color: C.accent, marginBottom: 5 },
  globalValue: { fontSize: 24, fontWeight: 'bold', color: '#1E40AF', textAlign: 'center' },
});

const formatValue = (value: unknown): string => {
  if (value === null || value === undefined || value === '') return 'Non renseigné';
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.length === 0 ? 'Aucun' : value.join(', ');
  return String(value);
};

// ─── Masking section (shared) ────────────────────────────────────────────────
const MaskingSection = ({ masking }: { masking: MaskingResult }) => {
  const gc = maskingGaugeColor(masking.value);
  return (
    <View style={{ marginBottom: 14, padding: 10, backgroundColor: C.maskingBg, borderLeftWidth: 4, borderLeftStyle: 'solid', borderLeftColor: C.maskingBord, borderRadius: 4 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: C.masking, marginBottom: 2 }}>
            Indice de Compensation / Masking
          </Text>
          <Text style={{ fontSize: 8, color: C.masking }}>
            Estimation de l'effort d'adaptation sociale
          </Text>
        </View>
        {/* Circular-style box */}
        <View style={{ width: 54, height: 54, borderRadius: 27, borderWidth: 4, borderStyle: 'solid', borderColor: gc, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: gc, textAlign: 'center' }}>
            {masking.value}%
          </Text>
        </View>
      </View>

      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#374151', marginBottom: 4 }}>
        {masking.label}
      </Text>
      <Text style={{ fontSize: 8, color: '#6b7280', marginBottom: 10 }}>
        {masking.clinicalNote}
      </Text>

      {/* Sub-bars */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 7, color: C.masking }}>Masquage explicite</Text>
            <Text style={{ fontSize: 7, color: C.masking, fontWeight: 'bold' }}>{masking.explicitScore}%</Text>
          </View>
          <View style={{ height: 5, backgroundColor: '#ede9fe', borderRadius: 2 }}>
            <View style={{ width: `${masking.explicitScore}%`, height: 5, backgroundColor: C.masking, borderRadius: 2 }} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 7, color: C.enfance }}>Delta Enfance→Adulte</Text>
            <Text style={{ fontSize: 7, color: C.enfance, fontWeight: 'bold' }}>{masking.deltaScore}%</Text>
          </View>
          <View style={{ height: 5, backgroundColor: C.enfanceBg, borderRadius: 2 }}>
            <View style={{ width: `${masking.deltaScore}%`, height: 5, backgroundColor: C.enfance, borderRadius: 2 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

// ─── Domain dual-bar row ─────────────────────────────────────────────────────
const DomainRow = ({ score }: { score: ScoreResult }) => {
  const ePct = score.maxScoreEnfance > 0
    ? Math.min(Math.round((score.enfanceScore / score.maxScoreEnfance) * 100), 100) : 0;
  const aPct = score.maxScoreActuel > 0
    ? Math.min(Math.round((score.actuelScore  / score.maxScoreActuel)  * 100), 100) : 0;

  const delta = aPct - ePct;
  const deltaLabel = Math.abs(delta) >= 10
    ? (delta < 0 ? '↓ Compensation probable' : '↑ Impact croissant')
    : null;

  return (
    <View style={{ marginBottom: 10, paddingBottom: 8, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#e5e7eb' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#1f2937', flex: 1 }}>
          {score.domain}
        </Text>
        {deltaLabel && (
          <Text style={{ fontSize: 7, color: delta < 0 ? '#7c3aed' : '#f97316', fontStyle: 'italic' }}>
            {deltaLabel}
          </Text>
        )}
      </View>

      {/* Enfance row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
        <Text style={{ width: '15%', fontSize: 8, color: C.enfance, fontWeight: 'bold' }}>Enf.</Text>
        <View style={{ flex: 1, height: 8, backgroundColor: C.enfanceBg, borderRadius: 3 }}>
          <View style={{ width: `${ePct}%`, height: 8, backgroundColor: C.enfance, borderRadius: 3 }} />
        </View>
        <Text style={{ width: '10%', fontSize: 8, color: '#555', textAlign: 'right' }}>{ePct}%</Text>
        <Text style={{ width: '18%', fontSize: 7, color: '#888', textAlign: 'right' }}>
          {score.enfanceScore.toFixed(1)}/{score.maxScoreEnfance}
        </Text>
        <View style={{
          marginLeft: 5, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3,
          backgroundColor: (C.sevBg as Record<string, string>)[score.severityEnfance] ?? '#f3f4f6',
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: (C.sev as Record<string, string>)[score.severityEnfance] ?? '#9ca3af' }}>
            {score.severityEnfance}
          </Text>
        </View>
      </View>

      {/* Actuel row */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ width: '15%', fontSize: 8, color: C.actuel, fontWeight: 'bold' }}>Act.</Text>
        <View style={{ flex: 1, height: 8, backgroundColor: C.actuelBg, borderRadius: 3 }}>
          <View style={{ width: `${aPct}%`, height: 8, backgroundColor: C.actuel, borderRadius: 3 }} />
        </View>
        <Text style={{ width: '10%', fontSize: 8, color: '#555', textAlign: 'right' }}>{aPct}%</Text>
        <Text style={{ width: '18%', fontSize: 7, color: '#888', textAlign: 'right' }}>
          {score.actuelScore.toFixed(1)}/{score.maxScoreActuel}
        </Text>
        <View style={{
          marginLeft: 5, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3,
          backgroundColor: (C.sevBg as Record<string, string>)[score.severityActuel] ?? '#f3f4f6',
        }}>
          <Text style={{ fontSize: 7, fontWeight: 'bold', color: (C.sev as Record<string, string>)[score.severityActuel] ?? '#9ca3af' }}>
            {score.severityActuel}
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Scores page ─────────────────────────────────────────────────────────────
const ScoresPage = ({
  scores,
  globalScore,
  masking,
  patientName = '',
}: {
  scores: ScoreResult[];
  globalScore: number;
  masking: MaskingResult;
  patientName?: string;
}) => (
  <Page size="A4" style={s.page}>
    <View style={s.header}>
      <Text style={s.title}>Synthèse des Scores TSA</Text>
      <Text style={s.subtitle}>Profil Enfance vs Profil Actuel — Évaluation par Domaine Clinique</Text>
      {patientName ? <Text style={s.subtitle}>Patient : {patientName}</Text> : null}
      <Text style={s.confidential}>
        Ces scores sont indicatifs et doivent être interprétés par un professionnel de santé qualifié
      </Text>
    </View>

    {/* Global score */}
    <View style={s.globalBox}>
      <Text style={s.globalTitle}>Score Global TSA</Text>
      <Text style={s.globalValue}>{globalScore}%</Text>
      <Text style={{ fontSize: 10, textAlign: 'center', marginTop: 4, color: '#666' }}>
        {globalScore < 30 ? 'Léger' : globalScore < 60 ? 'Modéré' : 'Sévère'}
      </Text>
    </View>

    {/* Masking */}
    <MaskingSection masking={masking} />

    {/* Legend */}
    <View style={{ flexDirection: 'row', marginBottom: 8, gap: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ width: 14, height: 8, backgroundColor: C.enfance, borderRadius: 2 }} />
        <Text style={{ fontSize: 8, color: '#555' }}>Profil Enfance (Enf.)</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <View style={{ width: 14, height: 8, backgroundColor: C.actuel, borderRadius: 2 }} />
        <Text style={{ fontSize: 8, color: '#555' }}>Profil Actuel (Act.)</Text>
      </View>
    </View>

    <Text style={s.sectionTitle}>Scores par Domaine Clinique</Text>
    {scores.map((score, i) => <DomainRow key={i} score={score} />)}

    {/* Reading note */}
    <View style={{ marginTop: 10, padding: 8, backgroundColor: '#fef3c7', borderLeftWidth: 3, borderLeftStyle: 'solid', borderLeftColor: '#f59e0b', borderRadius: 3 }}>
      <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 3, color: '#92400e' }}>Lecture des scores :</Text>
      <Text style={{ fontSize: 8, marginBottom: 2, color: '#78350f' }}>
        • Un score Enfance nettement supérieur au score Actuel (↓) peut indiquer un phénomène de compensation / masking
      </Text>
      <Text style={{ fontSize: 8, marginBottom: 2, color: '#78350f' }}>
        • Le Profil Enfance est calculé sur les réponses rétrospectives (Oui/Non), le Profil Actuel sur les réponses présentes (Oui/Parfois/Non)
      </Text>
      <Text style={{ fontSize: 8, color: '#78350f' }}>
        • Ces scores sont des indicateurs et ne constituent pas un diagnostic
      </Text>
    </View>

    <View style={s.footer}><Text>TSA DATA — Document confidentiel — Scores indicatifs</Text></View>
    <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
  </Page>
);

// ─── Full document ────────────────────────────────────────────────────────────
const PDFDocument = ({
  data,
  includeScores = true,
}: {
  data: Partial<FormData>;
  includeScores?: boolean;
}) => {
  const scores      = includeScores ? calculateAllScores(data) : [];
  const globalScore = includeScores ? calculateGlobalScore(scores) : 0;
  const masking     = includeScores ? calculateMaskingIndex(data) : { value: 0, label: '', clinicalNote: '', explicitScore: 0, deltaScore: 0 };
  const patientName = data.identification
    ? `${data.identification.prenom} ${data.identification.nom}`.trim()
    : '';

  return (
    <Document>
      {/* Page 1: Identification + Santé physique */}
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.title}>TSA DATA — Recueil d'informations</Text>
          <Text style={s.subtitle}>Évaluation TSA Adulte</Text>
          {data.identification && (
            <>
              <Text style={s.subtitle}>Patient : {data.identification.prenom} {data.identification.nom}</Text>
              <Text style={s.subtitle}>Date de naissance : {data.identification.dateNaissance || 'Non renseignée'}</Text>
              <Text style={s.subtitle}>Genre : {data.identification.genre || 'Non renseigné'}</Text>
              <Text style={s.subtitle}>Date du questionnaire : {data.identification.dateJour || format(new Date(), 'dd/MM/yyyy')}</Text>
            </>
          )}
          <Text style={s.confidential}>Document confidentiel — strictement réservé aux professionnels de santé</Text>
        </View>

        {data.demographic && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 1 : Informations Démographiques</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Situation familiale:</Text><Text style={s.fieldValue}>{formatValue(data.demographic.situationFamiliale)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Situation de logement:</Text><Text style={s.fieldValue}>{formatValue(data.demographic.situationLogement)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Enfants:</Text><Text style={s.fieldValue}>{data.demographic.hasEnfants ? `Oui (${data.demographic.nombreEnfants ?? 'N/A'}) - Âges: ${data.demographic.agesEnfants ?? 'N/A'}` : 'Non'}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Emploi actuel:</Text><Text style={s.fieldValue}>{formatValue(data.demographic.emploiActuel)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Diplômes:</Text><Text style={s.fieldValue}>{formatValue(data.demographic.diplomes)}</Text></View>
          </View>
        )}

        {data.physicalHealth && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 3 : Santé Physique</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Maladies somatiques:</Text><Text style={s.fieldValue}>{data.physicalHealth.maladiesSomatiques ? data.physicalHealth.detailsSomatiques || 'Oui' : 'Non'}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Troubles digestifs:</Text><Text style={s.fieldValue}>{formatValue(data.physicalHealth.troublesDigestifs)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Régime alimentaire:</Text><Text style={s.fieldValue}>{formatValue(data.physicalHealth.regimeAlimentaire)}</Text></View>
          </View>
        )}

        <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
        <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 2: Santé mentale + Développement */}
      {data.mentalHealth && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 4 : Santé Mentale et Comorbidités</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Troubles anxieux:</Text><Text style={s.fieldValue}>{formatValue(data.mentalHealth.troublesAnxieux)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Épisodes dépressifs:</Text><Text style={s.fieldValue}>{formatValue(data.mentalHealth.episodesDepressifs)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>TDAH:</Text><Text style={s.fieldValue}>{formatValue(data.mentalHealth.tdah)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Troubles du sommeil:</Text><Text style={s.fieldValue}>{formatValue(data.mentalHealth.troublesSommeil)}</Text></View>
          </View>
          {data.development && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Section 7 : Développement</Text>
              <View style={s.field}><Text style={s.fieldLabel}>Anomalies grossesse:</Text><Text style={s.fieldValue}>{formatValue(data.development.grossesseAnomalies)}</Text></View>
              <View style={s.field}><Text style={s.fieldLabel}>Prématurité:</Text><Text style={s.fieldValue}>{formatValue(data.development.prematurite)}</Text></View>
            </View>
          )}
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 3: Motricité + Sensoriel */}
      {data.motorSkills && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 8 : Habiletés Motrices</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Âge de la marche:</Text><Text style={s.fieldValue}>{formatValue(data.motorSkills.ageMarche)} mois</Text></View>
            <Text style={s.subsection}>Difficultés enfance :</Text>
            {(['enfanceManqueEquilibre','enfanceSeCogner','enfanceGestesQuotidiens','enfanceBalles','enfanceLaisserEchapper','enfanceEcriture','enfanceOrganisationEspace','enfanceVelo'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.motorSkills![k])}</Text>
            ))}
          </View>
          {data.sensory && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Section 9 : Perception Sensorielle</Text>
              <Text style={s.subsection}>Difficultés enfance :</Text>
              {(['enfanceTextures','enfanceTouche','enfanceAliments','enfanceOdeurs','enfanceBoucherOreilles','enfancePlusieursPersonnes','enfanceLumiere','enfanceManege','enfanceDouleur','enfanceFaimSoif','enfanceIsoler'] as const).map((k) => (
                <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.sensory![k])}</Text>
              ))}
            </View>
          )}
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 4: Langage */}
      {data.language && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 10 : Langage et Communication</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Âge premiers mots:</Text><Text style={s.fieldValue}>{formatValue(data.language.agePremiersMotsMois)} mois</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Âge premières phrases:</Text><Text style={s.fieldValue}>{formatValue(data.language.agePremieresPhraseMois)} mois</Text></View>
            <Text style={s.subsection}>Difficultés enfance :</Text>
            {(['enfancePrononciation','enfanceConstructionPhrases','enfanceComprehension','enfanceRepetitifs','enfancePronoms','enfanceCreationMots'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.language![k])}</Text>
            ))}
          </View>
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 5: Social + Masking */}
      {data.social && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 11 : Interactions Sociales</Text>
            <Text style={s.subsection}>Compréhension sociale enfance :</Text>
            {(['enfancePremierDegre','enfanceEvitementRegard','enfanceComprendreIntentions','enfanceSeFaireAmis','enfanceManqueAmis','enfanceIsolement'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.social![k])}</Text>
            ))}
            <Text style={s.subsection}>Anxiété sociale enfance :</Text>
            {(['enfanceSentimentIsolement','enfanceEnvieMaisPeur','enfanceInquietudeGroupe','enfancePeurParler'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.social![k])}</Text>
            ))}
            <Text style={s.subsection}>Stratégies de masquage :</Text>
            <Text style={s.listItem}>• Imiter les autres: {formatValue(data.social.maskingImiter)}</Text>
            <Text style={s.listItem}>• Copier les comportements: {formatValue(data.social.maskingCopier)}</Text>
            <Text style={s.listItem}>• Préparer à l'avance: {formatValue(data.social.maskingPreparer)}</Text>
            <Text style={s.listItem}>• Jouer un rôle: {formatValue(data.social.maskingRole)}</Text>
            {data.social.impactMasking && data.social.impactMasking.length > 0 && (
              <>
                <Text style={s.subsection}>Impact du masquage :</Text>
                <Text style={s.listItem}>{formatValue(data.social.impactMasking)}</Text>
              </>
            )}
            {data.social.epuisementSocial && (
              <Text style={s.listItem}>• Épuisement social rapporté — durée récupération: {data.social.dureeEpuisement ?? 'Non précisé'}</Text>
            )}
          </View>
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 6: Comportements */}
      {data.behavior && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 12 : Comportements et Intérêts</Text>
            <Text style={s.subsection}>Difficultés enfance :</Text>
            {(['enfanceGestesRepetitifs','enfanceGestesViolents','enfanceInteretsBizarres','enfanceInteretsIntenses','enfancePlaisirAligner','enfanceGeneChangements'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.behavior![k])}</Text>
            ))}
            {data.behavior.burnoutAutistique && (
              <>
                <Text style={s.subsection}>Burnout Autistique :</Text>
                <View style={s.field}><Text style={s.fieldLabel}>Déjà vécu:</Text><Text style={s.fieldValue}>{formatValue(data.behavior.burnoutAutistique)}</Text></View>
                {data.behavior.descriptionBurnout && <View style={s.field}><Text style={s.fieldLabel}>Description:</Text><Text style={s.fieldValue}>{formatValue(data.behavior.descriptionBurnout)}</Text></View>}
              </>
            )}
          </View>
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 7: Attention */}
      {data.attention && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 13 : Attention et Organisation (TDAH)</Text>
            <Text style={s.subsection}>Difficultés enfance :</Text>
            {(['enfanceInattentif','enfanceDanger','enfanceDesorganise','enfancePerdreObjectif','enfanceImpulsif','enfanceNotionTemps','enfanceColérique','enfanceSautesHumeur','enfancePerdreObjets','enfanceAttendre','enfanceBavardage','enfanceOpposition','enfanceResterSansRien','enfanceBouger'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('enfance','')}: {formatValue(data.attention![k])}</Text>
            ))}
          </View>
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 8: Éducation + Professionnel */}
      {data.education && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 14 : Parcours Scolaire</Text>
            <View style={s.field}><Text style={s.fieldLabel}>Dernière classe:</Text><Text style={s.fieldValue}>{formatValue(data.education.derniereClasse)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Diplôme le plus élevé:</Text><Text style={s.fieldValue}>{formatValue(data.education.diplomeEleve)}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Redoublement:</Text><Text style={s.fieldValue}>{data.education.redoublement ? 'Oui' : 'Non'}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>Scolarité adaptée:</Text><Text style={s.fieldValue}>{data.education.scolariteAdaptee ? 'Oui' : 'Non'}</Text></View>
            <View style={s.field}><Text style={s.fieldLabel}>AVS/AESH:</Text><Text style={s.fieldValue}>{data.education.avsAesh ? 'Oui' : 'Non'}</Text></View>
          </View>
          {data.professional && (
            <View style={s.section}>
              <Text style={s.sectionTitle}>Section 15 : Vie Professionnelle</Text>
              <View style={s.field}><Text style={s.fieldLabel}>Statut professionnel:</Text><Text style={s.fieldValue}>{formatValue(data.professional.statutProfessionnel)}</Text></View>
              <View style={s.field}><Text style={s.fieldLabel}>RQTH:</Text><Text style={s.fieldValue}>{formatValue(data.professional.rqth)}</Text></View>
              <View style={s.field}><Text style={s.fieldLabel}>Burnout professionnel:</Text><Text style={s.fieldValue}>{data.professional.burnoutProfessionnel ? 'Oui' : 'Non'}</Text></View>
            </View>
          )}
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Page 9: Situation actuelle */}
      {data.currentSituation && (
        <Page size="A4" style={s.page}>
          <View style={s.section}>
            <Text style={s.sectionTitle}>Section 18 : Situation Actuelle et Besoins</Text>
            {data.currentSituation.difficultePrioritaires && <View style={s.field}><Text style={s.fieldLabel}>Difficultés prioritaires:</Text><Text style={s.fieldValue}>{formatValue(data.currentSituation.difficultePrioritaires)}</Text></View>}
            {data.currentSituation.attentesEvaluation && <View style={s.field}><Text style={s.fieldLabel}>Attentes:</Text><Text style={s.fieldValue}>{formatValue(data.currentSituation.attentesEvaluation)}</Text></View>}
            <Text style={s.subsection}>Besoins d'aide au quotidien :</Text>
            {(['besoinOrganisation','besoinCourses','besoinMenage','besoinRepas','besoinBudget','besoinDeplacements','besoinDemarches'] as const).map((k) => (
              <Text key={k} style={s.listItem}>• {k.replace('besoin','')}: {formatValue(data.currentSituation![k])}</Text>
            ))}
          </View>
          <View style={s.footer}><Text>TSA DATA — Document confidentiel</Text></View>
          <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      )}

      {/* Scores page */}
      {includeScores && <ScoresPage scores={scores} globalScore={globalScore} masking={masking} patientName={patientName} />}

      {/* Clinical conclusion — only if the clinician filled it in */}
      {(data.clinicalConclusion?.trim()) && (
        <ClinicalConclusionPage
          clinicalConclusion={data.clinicalConclusion}
          clinicalNotes={data.clinicalNotes}
          patientName={patientName}
        />
      )}

      {/* Standard conclusion */}
      <Page size="A4" style={s.page}>
        <View style={s.section}>
          <Text style={s.sectionTitle}>Conclusion</Text>
          <Text style={{ fontSize: 10, color: '#666', marginTop: 10, marginBottom: 8 }}>
            Ce document présente un résumé complet du questionnaire de recueil préalable d'informations pour l'évaluation du Trouble du Spectre de l'Autisme chez l'adulte.
          </Text>
          <Text style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>
            Les informations contenues dans ce document sont strictement confidentielles et ne doivent être partagées qu'avec les professionnels de santé impliqués dans le suivi.
          </Text>
          {includeScores && (
            <Text style={{ fontSize: 10, color: '#666', marginBottom: 8 }}>
              Les scores présentés sont des indicateurs automatiques. Ils ne constituent pas un diagnostic et doivent être interprétés par un professionnel qualifié dans le cadre d'une évaluation complète.
            </Text>
          )}
          <View style={{ marginTop: 20, padding: 10, backgroundColor: '#EFF6FF', borderWidth: 1, borderStyle: 'solid', borderColor: C.accent, borderRadius: 4 }}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', marginBottom: 5 }}>Numéros d'urgence :</Text>
            <Text style={{ fontSize: 9 }}>• Numéro national de prévention du suicide : 3114 (gratuit, 24h/24)</Text>
            <Text style={{ fontSize: 9 }}>• SAMU : 15  •  Urgences : 112</Text>
          </View>
        </View>
        <View style={s.footer}><Text>TSA DATA — Document confidentiel — Fin du document</Text></View>
        <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
};

// ─── Clinical conclusion page ─────────────────────────────────────────────────
const ClinicalConclusionPage = ({
  clinicalConclusion,
  clinicalNotes,
  patientName,
}: {
  clinicalConclusion: string;
  clinicalNotes?: string;
  patientName?: string;
}) => {
  const paragraphs = clinicalConclusion.split('\n');

  return (
    <Page size="A4" style={s.page}>
      <View style={s.header}>
        <Text style={s.title}>Conclusion Clinique et Orientations</Text>
        {patientName ? <Text style={s.subtitle}>Patient : {patientName}</Text> : null}
        <Text style={s.confidential}>
          Document réservé au professionnel de santé — à valider avant tout usage officiel
        </Text>
      </View>

      {/* Main conclusion block */}
      <View style={{
        padding: 14,
        backgroundColor: '#f8fafc',
        borderLeftWidth: 4,
        borderLeftStyle: 'solid',
        borderLeftColor: C.accent,
        borderRadius: 4,
        marginBottom: 16,
      }}>
        {paragraphs.map((line, i) => {
          const trimmed = line.trim();
          if (!trimmed) return <View key={i} style={{ marginBottom: 4 }} />;
          // Section headers (ALL CAPS lines)
          if (trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.startsWith('—') && !trimmed.startsWith('•')) {
            return (
              <Text key={i} style={{ fontSize: 10, fontWeight: 'bold', color: C.accent, marginTop: 8, marginBottom: 3 }}>
                {trimmed}
              </Text>
            );
          }
          return (
            <Text key={i} style={{ fontSize: 9, color: '#374151', marginBottom: 3, lineHeight: 1.5 }}>
              {trimmed}
            </Text>
          );
        })}
      </View>

      {/* Clinical notes block */}
      {clinicalNotes && clinicalNotes.trim() && (
        <View style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#374151', marginBottom: 6 }}>
            Notes cliniques libres
          </Text>
          <View style={{
            padding: 10,
            backgroundColor: '#fefce8',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#fde68a',
            borderRadius: 4,
          }}>
            {clinicalNotes.split('\n').map((line, i) => (
              line.trim()
                ? <Text key={i} style={{ fontSize: 9, color: '#374151', marginBottom: 2, lineHeight: 1.5 }}>{line.trim()}</Text>
                : <View key={i} style={{ marginBottom: 3 }} />
            ))}
          </View>
        </View>
      )}

      <View style={s.footer}><Text>TSA DATA — Conclusion Clinique — Document confidentiel</Text></View>
      <Text style={s.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
    </Page>
  );
};

// ─── Exports ──────────────────────────────────────────────────────────────────

const download = async (doc: React.ReactElement, filename: string) => {
  const blob = await pdf(doc).toBlob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generatePDF = async (data: Partial<FormData>, includeScores = true) => {
  const nom  = data.identification?.nom || 'Patient';
  const date = format(new Date(), 'yyyy-MM-dd');
  await download(
    <PDFDocument data={data} includeScores={includeScores} />,
    `Questionnaire_TSA_${nom}_${date}.pdf`
  );
};

export const generateScoresPDF = async (data: Partial<FormData>) => {
  const scores      = calculateAllScores(data);
  const globalScore = calculateGlobalScore(scores);
  const masking     = calculateMaskingIndex(data);
  const patientName = data.identification
    ? `${data.identification.prenom} ${data.identification.nom}`.trim()
    : '';
  const nom  = data.identification?.nom || 'Patient';
  const date = format(new Date(), 'yyyy-MM-dd');

  await download(
    <Document>
      <ScoresPage scores={scores} globalScore={globalScore} masking={masking} patientName={patientName} />
      {data.clinicalConclusion?.trim() && (
        <ClinicalConclusionPage
          clinicalConclusion={data.clinicalConclusion}
          clinicalNotes={data.clinicalNotes}
          patientName={patientName}
        />
      )}
    </Document>,
    `Scores_TSA_${nom}_${date}.pdf`
  );
};
