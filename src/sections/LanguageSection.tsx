import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Input, Textarea, RadioGroup, RadioGroupSometimes } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { LanguageData, YesNoUnknown, YesNoSometimes } from '../types/form';

export const LanguageSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<LanguageData>(
    formData.language || {
      agePremiersMotsMois: undefined,
      agePremieresPhraseMois: undefined,
      enfancePrononciation: 'Je ne sais pas' as YesNoUnknown,
      enfanceConstructionPhrases: 'Je ne sais pas' as YesNoUnknown,
      enfanceComprehension: 'Je ne sais pas' as YesNoUnknown,
      enfanceRepetitifs: 'Je ne sais pas' as YesNoUnknown,
      enfancePronoms: 'Je ne sais pas' as YesNoUnknown,
      enfanceCreationMots: 'Je ne sais pas' as YesNoUnknown,
      difficultePersistante: '',
      actuelComprendreRapidement: 'Parfois' as YesNoSometimes,
      actuelHumour: 'Parfois' as YesNoSometimes,
      actuelMetaphores: 'Parfois' as YesNoSometimes,
      actuelLitteralement: 'Parfois' as YesNoSometimes,
      actuelSousEntendus: 'Parfois' as YesNoSometimes,
      actuelConversationGroupe: 'Parfois' as YesNoSometimes,
      actuelTempsTraitement: 'Parfois' as YesNoSometimes,
      actuelTrouverMots: 'Parfois' as YesNoSometimes,
      actuelParlerInterets: 'Parfois' as YesNoSometimes,
      actuelAdapterDiscours: 'Parfois' as YesNoSometimes,
      actuelMonotonie: 'Parfois' as YesNoSometimes,
      actuelDebit: 'Parfois' as YesNoSometimes,
      actuelVolume: 'Parfois' as YesNoSometimes,
      actuelContactVisuel: 'Parfois' as YesNoSometimes,
      actuelExpressionsAutres: 'Parfois' as YesNoSometimes,
      actuelGestesAutres: 'Parfois' as YesNoSometimes,
      actuelUtiliserGestes: 'Parfois' as YesNoSometimes,
      actuelAdapterExpression: 'Parfois' as YesNoSometimes,
      actuelAppels: 'Parfois' as YesNoSometimes,
      actuelPreferenceEcrit: 'Parfois' as YesNoSometimes,
      actuelScripts: 'Parfois' as YesNoSometimes,
      actuelAnxiete: 'Parfois' as YesNoSometimes,
    }
  );

  useEffect(() => {
    updateFormData('language', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg mr-4">
            <MessageSquare className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Langage et Communication
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 10 : Développement du langage et communication actuelle
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Développement précoce du langage
            </h3>
            <div className="space-y-6">
              <Input
                id="agePremiersMotsMois"
                label="Âge des premiers mots (en mois, hors papa/maman)"
                type="number"
                min="1"
                max="120"
                helpText="Indiquez l'âge approximatif où les premiers mots significatifs sont apparus"
                value={data.agePremiersMotsMois || ''}
                onChange={(e) => setData({ ...data, agePremiersMotsMois: e.target.value ? parseInt(e.target.value) : undefined })}
              />

              <Input
                id="agePremieresPhraseMois"
                label="Âge des premières phrases (en mois)"
                type="number"
                min="1"
                max="120"
                helpText="Indiquez l'âge approximatif des premières phrases complètes"
                value={data.agePremieresPhraseMois || ''}
                onChange={(e) => setData({ ...data, agePremieresPhraseMois: e.target.value ? parseInt(e.target.value) : undefined })}
              />

              <RadioGroup
                label="Difficultés de prononciation"
                name="enfancePrononciation"
                value={data.enfancePrononciation}
                onChange={(value) => setData({ ...data, enfancePrononciation: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficultés de construction de phrases"
                name="enfanceConstructionPhrases"
                value={data.enfanceConstructionPhrases}
                onChange={(value) => setData({ ...data, enfanceConstructionPhrases: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficultés de compréhension orale"
                name="enfanceComprehension"
                value={data.enfanceComprehension}
                onChange={(value) => setData({ ...data, enfanceComprehension: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Énoncés répétitifs (écholalie)"
                name="enfanceRepetitifs"
                value={data.enfanceRepetitifs}
                onChange={(value) => setData({ ...data, enfanceRepetitifs: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Mauvaise utilisation des pronoms (confusion tu/je)"
                name="enfancePronoms"
                value={data.enfancePronoms}
                onChange={(value) => setData({ ...data, enfancePronoms: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Création de mots personnels (néologismes)"
                name="enfanceCreationMots"
                value={data.enfanceCreationMots}
                onChange={(value) => setData({ ...data, enfanceCreationMots: value as YesNoUnknown })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Communication actuelle - Compréhension
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à comprendre rapidement ce qu'on vous dit"
                name="actuelComprendreRapidement"
                value={data.actuelComprendreRapidement}
                onChange={(value) => setData({ ...data, actuelComprendreRapidement: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre l'humour, le second degré"
                name="actuelHumour"
                value={data.actuelHumour}
                onChange={(value) => setData({ ...data, actuelHumour: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre les métaphores"
                name="actuelMetaphores"
                value={data.actuelMetaphores}
                onChange={(value) => setData({ ...data, actuelMetaphores: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Tendance à prendre les choses au premier degré (littéralement)"
                name="actuelLitteralement"
                value={data.actuelLitteralement}
                onChange={(value) => setData({ ...data, actuelLitteralement: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre les sous-entendus"
                name="actuelSousEntendus"
                value={data.actuelSousEntendus}
                onChange={(value) => setData({ ...data, actuelSousEntendus: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à suivre les conversations de groupe"
                name="actuelConversationGroupe"
                value={data.actuelConversationGroupe}
                onChange={(value) => setData({ ...data, actuelConversationGroupe: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Besoin de temps pour traiter l'information avant de répondre"
                name="actuelTempsTraitement"
                value={data.actuelTempsTraitement}
                onChange={(value) => setData({ ...data, actuelTempsTraitement: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Communication actuelle - Expression verbale
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à trouver ses mots"
                name="actuelTrouverMots"
                value={data.actuelTrouverMots}
                onChange={(value) => setData({ ...data, actuelTrouverMots: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Tendance à parler longuement de vos intérêts sans percevoir l'ennui des autres"
                name="actuelParlerInterets"
                value={data.actuelParlerInterets}
                onChange={(value) => setData({ ...data, actuelParlerInterets: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à adapter votre discours selon l'interlocuteur"
                name="actuelAdapterDiscours"
                value={data.actuelAdapterDiscours}
                onChange={(value) => setData({ ...data, actuelAdapterDiscours: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Voix monotone, peu de variations d'intonation"
                name="actuelMonotonie"
                value={data.actuelMonotonie}
                onChange={(value) => setData({ ...data, actuelMonotonie: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Débit de parole inhabituel (trop rapide ou trop lent)"
                name="actuelDebit"
                value={data.actuelDebit}
                onChange={(value) => setData({ ...data, actuelDebit: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à contrôler le volume de la voix"
                name="actuelVolume"
                value={data.actuelVolume}
                onChange={(value) => setData({ ...data, actuelVolume: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Communication actuelle - Non-verbal
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à maintenir le contact visuel"
                name="actuelContactVisuel"
                value={data.actuelContactVisuel}
                onChange={(value) => setData({ ...data, actuelContactVisuel: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre les expressions faciales des autres"
                name="actuelExpressionsAutres"
                value={data.actuelExpressionsAutres}
                onChange={(value) => setData({ ...data, actuelExpressionsAutres: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à comprendre les gestes des autres"
                name="actuelGestesAutres"
                value={data.actuelGestesAutres}
                onChange={(value) => setData({ ...data, actuelGestesAutres: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à utiliser des gestes pour accompagner votre discours"
                name="actuelUtiliserGestes"
                value={data.actuelUtiliserGestes}
                onChange={(value) => setData({ ...data, actuelUtiliserGestes: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à adapter votre expression faciale selon le contexte"
                name="actuelAdapterExpression"
                value={data.actuelAdapterExpression}
                onChange={(value) => setData({ ...data, actuelAdapterExpression: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Préférences et stratégies de communication
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté particulière avec les appels téléphoniques"
                name="actuelAppels"
                value={data.actuelAppels}
                onChange={(value) => setData({ ...data, actuelAppels: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Préférence marquée pour la communication écrite"
                name="actuelPreferenceEcrit"
                value={data.actuelPreferenceEcrit}
                onChange={(value) => setData({ ...data, actuelPreferenceEcrit: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Utilisation de scripts ou phrases préparées dans certaines situations"
                name="actuelScripts"
                value={data.actuelScripts}
                onChange={(value) => setData({ ...data, actuelScripts: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Anxiété importante liée à la communication"
                name="actuelAnxiete"
                value={data.actuelAnxiete}
                onChange={(value) => setData({ ...data, actuelAnxiete: value as YesNoSometimes })}
              />

              <Textarea
                id="difficultePersistante"
                label="Difficultés de communication qui persistent actuellement"
                placeholder="Décrivez les difficultés de langage et de communication qui persistent"
                value={data.difficultePersistante}
                onChange={(e) => setData({ ...data, difficultePersistante: e.target.value })}
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
