import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Textarea, RadioGroup, RadioGroupSometimes } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { SocialData, YesNoUnknown, YesNoSometimes } from '../types/form';

export const SocialSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<SocialData>(
    formData.social || {
      enfancePremierDegre: 'Je ne sais pas' as YesNoUnknown,
      enfanceEvitementRegard: 'Je ne sais pas' as YesNoUnknown,
      enfanceComprendreIntentions: 'Je ne sais pas' as YesNoUnknown,
      enfanceParlerInterets: 'Je ne sais pas' as YesNoUnknown,
      enfanceComprendreExpressions: 'Je ne sais pas' as YesNoUnknown,
      enfanceSeFaireAmis: 'Je ne sais pas' as YesNoUnknown,
      enfanceManqueAmis: 'Je ne sais pas' as YesNoUnknown,
      enfanceComprendreAttentes: 'Je ne sais pas' as YesNoUnknown,
      enfanceIsolement: 'Je ne sais pas' as YesNoUnknown,
      enfanceManqueInteret: 'Je ne sais pas' as YesNoUnknown,
      enfanceManqueSensibilite: 'Je ne sais pas' as YesNoUnknown,
      enfanceGrandeSensibilite: 'Je ne sais pas' as YesNoUnknown,
      enfanceComprendreCause: 'Je ne sais pas' as YesNoUnknown,
      enfanceSavoirReagir: 'Je ne sais pas' as YesNoUnknown,
      enfanceIdentifierEmotions: 'Je ne sais pas' as YesNoUnknown,
      difficultePersistanteSocial: '',
      enfanceSentimentIsolement: 'Je ne sais pas' as YesNoUnknown,
      enfanceEnvieMaisPeur: 'Je ne sais pas' as YesNoUnknown,
      enfanceCrainteSeFaire: 'Je ne sais pas' as YesNoUnknown,
      enfanceInquietudeGroupe: 'Je ne sais pas' as YesNoUnknown,
      enfanceBesoinRassure: 'Je ne sais pas' as YesNoUnknown,
      enfancePeurParler: 'Je ne sais pas' as YesNoUnknown,
      enfanceFaireInvisible: 'Je ne sais pas' as YesNoUnknown,
      enfanceResterSeul: 'Je ne sais pas' as YesNoUnknown,
      enfancePasCompetences: 'Je ne sais pas' as YesNoUnknown,
      enfanceAffutRejet: 'Je ne sais pas' as YesNoUnknown,
      enfanceAccrocher: 'Je ne sais pas' as YesNoUnknown,
      difficultePersistanteAnxiete: '',
      actuelInitierConversations: 'Parfois' as YesNoSometimes,
      actuelSavoirQuandParler: 'Parfois' as YesNoSometimes,
      actuelTerminerConversation: 'Parfois' as YesNoSometimes,
      actuelCodesImplicites: 'Parfois' as YesNoSometimes,
      actuelAdapterComportement: 'Parfois' as YesNoSometimes,
      actuelIsolementVolontaire: 'Parfois' as YesNoSometimes,
      actuelMaintenirAmities: 'Parfois' as YesNoSometimes,
      actuelSentimentSolitude: 'Parfois' as YesNoSometimes,
      actuelReseauLimite: 'Parfois' as YesNoSometimes,
      actuelIdentifierEmotions: 'Parfois' as YesNoSometimes,
      actuelExprimerEmotions: 'Parfois' as YesNoSometimes,
      actuelRegulerEmotions: 'Parfois' as YesNoSometimes,
      actuelEmotionsIntenses: 'Parfois' as YesNoSometimes,
      actuelComprendreAutres: 'Parfois' as YesNoSometimes,
      actuelReconforter: 'Parfois' as YesNoSometimes,
      actuelAnxieteSituationsSociales: 'Parfois' as YesNoSometimes,
      actuelEviterParPeur: 'Parfois' as YesNoSometimes,
      actuelPeurJugement: 'Parfois' as YesNoSometimes,
      actuelInquietudePrendreParole: 'Parfois' as YesNoSometimes,
      actuelAnticipationAnxieuse: 'Parfois' as YesNoSometimes,
      actuelBesoinSortieRapide: 'Parfois' as YesNoSometimes,
      actuelResteChezSoi: 'Parfois' as YesNoSometimes,
      actuelMinimiserPresence: 'Parfois' as YesNoSometimes,
      actuelPeurInconnus: 'Parfois' as YesNoSometimes,
      actuelAnxietePerformance: 'Parfois' as YesNoSometimes,
      actuelRuminationApres: 'Parfois' as YesNoSometimes,
      maskingImiter: 'parfois',
      maskingCopier: 'parfois',
      maskingPreparer: 'parfois',
      maskingRole: 'parfois',
      impactMasking: [],
      dureeRecuperation: '',
      epuisementSocial: false,
      dureeEpuisement: '',
      activitesRecuperation: '',
    }
  );

  useEffect(() => {
    updateFormData('social', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Interactions Sociales et Anxiété
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 12 : Compétences sociales et anxiété sociale
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Compréhension sociale - Enfance
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Prendre les choses au 1er degré, manque d'humour"
                name="enfancePremierDegre"
                value={data.enfancePremierDegre}
                onChange={(value) => setData({ ...data, enfancePremierDegre: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Évitement du regard"
                name="enfanceEvitementRegard"
                value={data.enfanceEvitementRegard}
                onChange={(value) => setData({ ...data, enfanceEvitementRegard: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les intentions/émotions des autres"
                name="enfanceComprendreIntentions"
                value={data.enfanceComprendreIntentions}
                onChange={(value) => setData({ ...data, enfanceComprendreIntentions: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Ne parler que de ses propres intérêts"
                name="enfanceParlerInterets"
                value={data.enfanceParlerInterets}
                onChange={(value) => setData({ ...data, enfanceParlerInterets: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les expressions du visage, gestes"
                name="enfanceComprendreExpressions"
                value={data.enfanceComprendreExpressions}
                onChange={(value) => setData({ ...data, enfanceComprendreExpressions: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à se faire des amis"
                name="enfanceSeFaireAmis"
                value={data.enfanceSeFaireAmis}
                onChange={(value) => setData({ ...data, enfanceSeFaireAmis: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque ou absence d'amis"
                name="enfanceManqueAmis"
                value={data.enfanceManqueAmis}
                onChange={(value) => setData({ ...data, enfanceManqueAmis: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les attentes des autres"
                name="enfanceComprendreAttentes"
                value={data.enfanceComprendreAttentes}
                onChange={(value) => setData({ ...data, enfanceComprendreAttentes: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Tendance à l'isolement"
                name="enfanceIsolement"
                value={data.enfanceIsolement}
                onChange={(value) => setData({ ...data, enfanceIsolement: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque d'intérêt pour les autres"
                name="enfanceManqueInteret"
                value={data.enfanceManqueInteret}
                onChange={(value) => setData({ ...data, enfanceManqueInteret: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque de sensibilité aux émotions des autres"
                name="enfanceManqueSensibilite"
                value={data.enfanceManqueSensibilite}
                onChange={(value) => setData({ ...data, enfanceManqueSensibilite: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Grande sensibilité aux émotions des autres"
                name="enfanceGrandeSensibilite"
                value={data.enfanceGrandeSensibilite}
                onChange={(value) => setData({ ...data, enfanceGrandeSensibilite: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre la cause des émotions"
                name="enfanceComprendreCause"
                value={data.enfanceComprendreCause}
                onChange={(value) => setData({ ...data, enfanceComprendreCause: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à savoir comment réagir aux émotions des autres"
                name="enfanceSavoirReagir"
                value={data.enfanceSavoirReagir}
                onChange={(value) => setData({ ...data, enfanceSavoirReagir: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à identifier ses propres émotions"
                name="enfanceIdentifierEmotions"
                value={data.enfanceIdentifierEmotions}
                onChange={(value) => setData({ ...data, enfanceIdentifierEmotions: value as YesNoUnknown })}
              />

              <Textarea
                id="difficultePersistanteSocial"
                label="Difficultés sociales qui persistent actuellement"
                placeholder="Décrivez les difficultés de compréhension sociale qui persistent"
                value={data.difficultePersistanteSocial}
                onChange={(e) => setData({ ...data, difficultePersistanteSocial: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Anxiété sociale - Enfance
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Sentiment d'isolement, de solitude"
                name="enfanceSentimentIsolement"
                value={data.enfanceSentimentIsolement}
                onChange={(value) => setData({ ...data, enfanceSentimentIsolement: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Envie d'aller vers les autres mais peur de le faire"
                name="enfanceEnvieMaisPeur"
                value={data.enfanceEnvieMaisPeur}
                onChange={(value) => setData({ ...data, enfanceEnvieMaisPeur: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Crainte de se faire rejeter, moquer, humilier"
                name="enfanceCrainteSeFaire"
                value={data.enfanceCrainteSeFaire}
                onChange={(value) => setData({ ...data, enfanceCrainteSeFaire: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Inquiétude en groupe"
                name="enfanceInquietudeGroupe"
                value={data.enfanceInquietudeGroupe}
                onChange={(value) => setData({ ...data, enfanceInquietudeGroupe: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Besoin de forte rassurance pour participer"
                name="enfanceBesoinRassure"
                value={data.enfanceBesoinRassure}
                onChange={(value) => setData({ ...data, enfanceBesoinRassure: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Peur de prendre la parole en classe"
                name="enfancePeurParler"
                value={data.enfancePeurParler}
                onChange={(value) => setData({ ...data, enfancePeurParler: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Idée de se rendre invisible, passer inaperçu"
                name="enfanceFaireInvisible"
                value={data.enfanceFaireInvisible}
                onChange={(value) => setData({ ...data, enfanceFaireInvisible: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Idée qu'il vaut mieux rester seul"
                name="enfanceResterSeul"
                value={data.enfanceResterSeul}
                onChange={(value) => setData({ ...data, enfanceResterSeul: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Sentiment de manque de compétence/valeur"
                name="enfancePasCompetences"
                value={data.enfancePasCompetences}
                onChange={(value) => setData({ ...data, enfancePasCompetences: value as YesNoUnknown })}
              />

              <RadioGroup
                label="À l'affût des signes de rejet"
                name="enfanceAffutRejet"
                value={data.enfanceAffutRejet}
                onChange={(value) => setData({ ...data, enfanceAffutRejet: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Tendance à s'accrocher aux rares amis"
                name="enfanceAccrocher"
                value={data.enfanceAccrocher}
                onChange={(value) => setData({ ...data, enfanceAccrocher: value as YesNoUnknown })}
              />

              <Textarea
                id="difficultePersistanteAnxiete"
                label="Difficultés liées à l'anxiété qui persistent actuellement"
                placeholder="Décrivez les difficultés liées à l'anxiété sociale qui persistent"
                value={data.difficultePersistanteAnxiete}
                onChange={(e) => setData({ ...data, difficultePersistanteAnxiete: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Compétences sociales - État actuel
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à initier des conversations"
                name="actuelInitierConversations"
                value={data.actuelInitierConversations}
                onChange={(value) => setData({ ...data, actuelInitierConversations: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à savoir quand/comment prendre la parole"
                name="actuelSavoirQuandParler"
                value={data.actuelSavoirQuandParler}
                onChange={(value) => setData({ ...data, actuelSavoirQuandParler: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à savoir comment terminer une conversation"
                name="actuelTerminerConversation"
                value={data.actuelTerminerConversation}
                onChange={(value) => setData({ ...data, actuelTerminerConversation: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté avec les codes sociaux implicites"
                name="actuelCodesImplicites"
                value={data.actuelCodesImplicites}
                onChange={(value) => setData({ ...data, actuelCodesImplicites: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à adapter son comportement au contexte social"
                name="actuelAdapterComportement"
                value={data.actuelAdapterComportement}
                onChange={(value) => setData({ ...data, actuelAdapterComportement: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Isolement social volontaire"
                name="actuelIsolementVolontaire"
                value={data.actuelIsolementVolontaire}
                onChange={(value) => setData({ ...data, actuelIsolementVolontaire: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à maintenir des amitiés"
                name="actuelMaintenirAmities"
                value={data.actuelMaintenirAmities}
                onChange={(value) => setData({ ...data, actuelMaintenirAmities: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Sentiment de solitude, d'incompréhension"
                name="actuelSentimentSolitude"
                value={data.actuelSentimentSolitude}
                onChange={(value) => setData({ ...data, actuelSentimentSolitude: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Réseau social très limité"
                name="actuelReseauLimite"
                value={data.actuelReseauLimite}
                onChange={(value) => setData({ ...data, actuelReseauLimite: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à identifier ses propres émotions"
                name="actuelIdentifierEmotions"
                value={data.actuelIdentifierEmotions}
                onChange={(value) => setData({ ...data, actuelIdentifierEmotions: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à exprimer ses émotions"
                name="actuelExprimerEmotions"
                value={data.actuelExprimerEmotions}
                onChange={(value) => setData({ ...data, actuelExprimerEmotions: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à réguler ses émotions"
                name="actuelRegulerEmotions"
                value={data.actuelRegulerEmotions}
                onChange={(value) => setData({ ...data, actuelRegulerEmotions: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Émotions intenses, disproportionnées"
                name="actuelEmotionsIntenses"
                value={data.actuelEmotionsIntenses}
                onChange={(value) => setData({ ...data, actuelEmotionsIntenses: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre les émotions des autres"
                name="actuelComprendreAutres"
                value={data.actuelComprendreAutres}
                onChange={(value) => setData({ ...data, actuelComprendreAutres: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à réconforter/soutenir les autres"
                name="actuelReconforter"
                value={data.actuelReconforter}
                onChange={(value) => setData({ ...data, actuelReconforter: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Anxiété sociale - État actuel
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Anxiété importante dans les situations sociales"
                name="actuelAnxieteSituationsSociales"
                value={data.actuelAnxieteSituationsSociales}
                onChange={(value) => setData({ ...data, actuelAnxieteSituationsSociales: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Évitement des interactions sociales par peur"
                name="actuelEviterParPeur"
                value={data.actuelEviterParPeur}
                onChange={(value) => setData({ ...data, actuelEviterParPeur: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Peur du jugement des autres"
                name="actuelPeurJugement"
                value={data.actuelPeurJugement}
                onChange={(value) => setData({ ...data, actuelPeurJugement: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Inquiétude excessive avant de prendre la parole"
                name="actuelInquietudePrendreParole"
                value={data.actuelInquietudePrendreParole}
                onChange={(value) => setData({ ...data, actuelInquietudePrendreParole: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Anticipation anxieuse des événements sociaux"
                name="actuelAnticipationAnxieuse"
                value={data.actuelAnticipationAnxieuse}
                onChange={(value) => setData({ ...data, actuelAnticipationAnxieuse: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Besoin de savoir comment sortir rapidement d'une situation"
                name="actuelBesoinSortieRapide"
                value={data.actuelBesoinSortieRapide}
                onChange={(value) => setData({ ...data, actuelBesoinSortieRapide: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Tendance à rester chez soi pour éviter l'anxiété"
                name="actuelResteChezSoi"
                value={data.actuelResteChezSoi}
                onChange={(value) => setData({ ...data, actuelResteChezSoi: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Essayer de passer inaperçu, minimiser sa présence"
                name="actuelMinimiserPresence"
                value={data.actuelMinimiserPresence}
                onChange={(value) => setData({ ...data, actuelMinimiserPresence: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Peur de rencontrer de nouvelles personnes"
                name="actuelPeurInconnus"
                value={data.actuelPeurInconnus}
                onChange={(value) => setData({ ...data, actuelPeurInconnus: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Anxiété de performance sociale (peur de mal faire)"
                name="actuelAnxietePerformance"
                value={data.actuelAnxietePerformance}
                onChange={(value) => setData({ ...data, actuelAnxietePerformance: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Rumination après les interactions sociales"
                name="actuelRuminationApres"
                value={data.actuelRuminationApres}
                onChange={(value) => setData({ ...data, actuelRuminationApres: value as YesNoSometimes })}
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
