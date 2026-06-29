import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import { RadioGroup, RadioGroupSometimes, Checkbox, Textarea, Select, Input } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { BehaviorData, YesNoUnknown, YesNoSometimes, FrequencyScale } from '../types/form';

const frequencyOptions = [
  { value: 'jamais', label: 'Jamais' },
  { value: 'parfois', label: 'Parfois' },
  { value: 'souvent', label: 'Souvent' },
  { value: 'tout le temps', label: 'Tout le temps' },
];

const burnoutOptions = [
  { value: 'non', label: 'Non' },
  { value: 'oui_passe', label: 'Oui, dans le passé' },
  { value: 'oui_actuel', label: 'Oui, actuellement' },
  { value: 'incertain', label: 'Incertain' },
];

const shutdownMeltdownOptions = [
  { value: 'non', label: 'Non' },
  { value: 'oui_rare', label: 'Oui, rarement' },
  { value: 'oui_regulier', label: 'Oui, régulièrement' },
  { value: 'incertain', label: 'Incertain' },
];

export const BehaviorSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<BehaviorData>(
    formData.behavior || {
      enfanceGestesRepetitifs: 'Je ne sais pas' as YesNoUnknown,
      enfanceGestesViolents: 'Je ne sais pas' as YesNoUnknown,
      enfanceInteretsBizarres: 'Je ne sais pas' as YesNoUnknown,
      enfanceInteretsIntenses: 'Je ne sais pas' as YesNoUnknown,
      enfancePlaisirAligner: 'Je ne sais pas' as YesNoUnknown,
      enfanceGeneChangements: 'Je ne sais pas' as YesNoUnknown,
      difficultePersistante: '',
      actuelGestesRepetitifs: 'Parfois' as YesNoSometimes,
      actuelGestesViolents: 'Parfois' as YesNoSometimes,
      actuelInteretsBizarres: 'Parfois' as YesNoSometimes,
      actuelInteretsIntenses: 'Parfois' as YesNoSometimes,
      actuelPlaisirAligner: 'Parfois' as YesNoSometimes,
      actuelGeneChangements: 'Parfois' as YesNoSometimes,
      stimmingActuel: false,
      typesStimming: [],
      stimmingVisible: '',
      situationsAugmentation: '',
      besoinRoutines: false,
      detailsRoutines: '',
      routinePerturbee: '',
      rituels: '',
      intoleranceImprevuAnxiete: 'parfois' as FrequencyScale,
      intoleranceImprevuPlanifier: 'parfois' as FrequencyScale,
      intoleranceImprevuChangements: 'parfois' as FrequencyScale,
      intoleranceImprevuNouvelles: 'parfois' as FrequencyScale,
      interetsRestreints: false,
      listeInterets: '',
      tempsConsacre: '',
      bienEtreOuDifficulte: '',
      interferenceVie: '',
      burnoutAutistique: 'non',
      nombreBurnout: 0,
      dureeRecuperationBurnout: '',
      descriptionBurnout: '',
      shutdown: 'non',
      situationsShutdown: '',
      dureeShutdown: '',
      meltdown: 'non',
      descriptionMeltdown: '',
      dureeMeltdown: '',
      recuperationMeltdown: '',
      reperezSignes: false,
      signesAvantCoureurs: '',
      strategiesEvitement: '',
    }
  );

  useEffect(() => {
    updateFormData('behavior', data);
  }, [data]);

  const stimmingTypes = [
    'Se balancer',
    'Tapoter des doigts',
    'Faire craquer les articulations',
    'Triturer un objet',
    'Mâchonner',
    'Bouger les jambes',
    'Tourner sur soi-même',
    'Battre des mains',
    'Fredonner/répéter des sons',
    'Autre',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
            <RotateCw className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Comportements et Intérêts
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 13 : Comportements répétitifs et intérêts restreints
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Comportements répétitifs - Enfance
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Gestes répétitifs (mains, corps, balancements)"
                name="enfanceGestesRepetitifs"
                value={data.enfanceGestesRepetitifs}
                onChange={(value) => setData({ ...data, enfanceGestesRepetitifs: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gestes violents (auto-agression, vers les autres)"
                name="enfanceGestesViolents"
                value={data.enfanceGestesViolents}
                onChange={(value) => setData({ ...data, enfanceGestesViolents: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Intérêts bizarres non partagés par les autres"
                name="enfanceInteretsBizarres"
                value={data.enfanceInteretsBizarres}
                onChange={(value) => setData({ ...data, enfanceInteretsBizarres: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Intérêts intenses (animaux, sciences, langues, etc.)"
                name="enfanceInteretsIntenses"
                value={data.enfanceInteretsIntenses}
                onChange={(value) => setData({ ...data, enfanceInteretsIntenses: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Plaisir à aligner/classer/empiler des objets"
                name="enfancePlaisirAligner"
                value={data.enfancePlaisirAligner}
                onChange={(value) => setData({ ...data, enfancePlaisirAligner: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne face aux changements/imprévus"
                name="enfanceGeneChangements"
                value={data.enfanceGeneChangements}
                onChange={(value) => setData({ ...data, enfanceGeneChangements: value as YesNoUnknown })}
              />

              <Textarea
                id="difficultePersistante"
                label="Difficultés qui persistent actuellement"
                placeholder="Décrivez les comportements de l'enfance qui persistent"
                value={data.difficultePersistante}
                onChange={(e) => setData({ ...data, difficultePersistante: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Comportements répétitifs - État actuel
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Gestes répétitifs actuels (stimming)"
                name="actuelGestesRepetitifs"
                value={data.actuelGestesRepetitifs}
                onChange={(value) => setData({ ...data, actuelGestesRepetitifs: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Gestes pouvant être perçus comme violents"
                name="actuelGestesViolents"
                value={data.actuelGestesViolents}
                onChange={(value) => setData({ ...data, actuelGestesViolents: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Intérêts considérés comme inhabituels"
                name="actuelInteretsBizarres"
                value={data.actuelInteretsBizarres}
                onChange={(value) => setData({ ...data, actuelInteretsBizarres: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Intérêts très intenses ou envahissants"
                name="actuelInteretsIntenses"
                value={data.actuelInteretsIntenses}
                onChange={(value) => setData({ ...data, actuelInteretsIntenses: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Besoin d'organiser, aligner, classer"
                name="actuelPlaisirAligner"
                value={data.actuelPlaisirAligner}
                onChange={(value) => setData({ ...data, actuelPlaisirAligner: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté face aux changements et imprévus"
                name="actuelGeneChangements"
                value={data.actuelGeneChangements}
                onChange={(value) => setData({ ...data, actuelGeneChangements: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Stimming (mouvements de stimulation)
            </h3>
            <div className="space-y-6">
              <Checkbox
                id="stimmingActuel"
                label="Faites-vous du stimming (mouvements répétitifs, auto-stimulation) ?"
                checked={data.stimmingActuel}
                onChange={(e) => setData({ ...data, stimmingActuel: e.target.checked })}
              />

              {data.stimmingActuel && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Types de stimming
                    </label>
                    <div className="space-y-2">
                      {stimmingTypes.map((type) => (
                        <Checkbox
                          key={type}
                          id={`stimming-${type}`}
                          label={type}
                          checked={data.typesStimming.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setData({ ...data, typesStimming: [...data.typesStimming, type] });
                            } else {
                              setData({
                                ...data,
                                typesStimming: data.typesStimming.filter((t) => t !== type),
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <Textarea
                    id="stimmingVisible"
                    label="Votre stimming est-il visible en public ?"
                    placeholder="Décrivez si vous pouvez contrôler votre stimming en public"
                    value={data.stimmingVisible}
                    onChange={(e) => setData({ ...data, stimmingVisible: e.target.value })}
                  />

                  <Textarea
                    id="situationsAugmentation"
                    label="Dans quelles situations le stimming augmente-t-il ?"
                    placeholder="Stress, anxiété, fatigue, joie, etc."
                    value={data.situationsAugmentation}
                    onChange={(e) => setData({ ...data, situationsAugmentation: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Routines et rituels
            </h3>
            <div className="space-y-6">
              <Checkbox
                id="besoinRoutines"
                label="Avez-vous besoin de routines strictes dans votre quotidien ?"
                checked={data.besoinRoutines}
                onChange={(e) => setData({ ...data, besoinRoutines: e.target.checked })}
              />

              {data.besoinRoutines && (
                <>
                  <Textarea
                    id="detailsRoutines"
                    label="Décrivez vos routines importantes"
                    placeholder="Routine du matin, des repas, du coucher, etc."
                    value={data.detailsRoutines}
                    onChange={(e) => setData({ ...data, detailsRoutines: e.target.value })}
                  />

                  <Textarea
                    id="routinePerturbee"
                    label="Que se passe-t-il si votre routine est perturbée ?"
                    placeholder="Anxiété, colère, panique, shutdown, etc."
                    value={data.routinePerturbee}
                    onChange={(e) => setData({ ...data, routinePerturbee: e.target.value })}
                  />
                </>
              )}

              <Textarea
                id="rituels"
                label="Avez-vous des rituels particuliers ?"
                placeholder="Gestes répétés, vérifications, etc."
                value={data.rituels}
                onChange={(e) => setData({ ...data, rituels: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Intolérance à l'imprévu
            </h3>
            <div className="space-y-6">
              <Select
                id="intoleranceImprevuAnxiete"
                label="Anxiété face aux imprévus"
                value={data.intoleranceImprevuAnxiete}
                onChange={(e) => setData({ ...data, intoleranceImprevuAnxiete: e.target.value as FrequencyScale })}
                options={frequencyOptions}
              />

              <Select
                id="intoleranceImprevuPlanifier"
                label="Besoin de tout planifier à l'avance"
                value={data.intoleranceImprevuPlanifier}
                onChange={(e) => setData({ ...data, intoleranceImprevuPlanifier: e.target.value as FrequencyScale })}
                options={frequencyOptions}
              />

              <Select
                id="intoleranceImprevuChangements"
                label="Difficulté avec les changements de plans"
                value={data.intoleranceImprevuChangements}
                onChange={(e) => setData({ ...data, intoleranceImprevuChangements: e.target.value as FrequencyScale })}
                options={frequencyOptions}
              />

              <Select
                id="intoleranceImprevuNouvelles"
                label="Réticence face aux nouvelles expériences"
                value={data.intoleranceImprevuNouvelles}
                onChange={(e) => setData({ ...data, intoleranceImprevuNouvelles: e.target.value as FrequencyScale })}
                options={frequencyOptions}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Intérêts restreints ou spécifiques
            </h3>
            <div className="space-y-6">
              <Checkbox
                id="interetsRestreints"
                label="Avez-vous des intérêts très spécifiques et intenses ?"
                checked={data.interetsRestreints}
                onChange={(e) => setData({ ...data, interetsRestreints: e.target.checked })}
              />

              {data.interetsRestreints && (
                <>
                  <Textarea
                    id="listeInterets"
                    label="Listez vos intérêts spécifiques"
                    placeholder="Ex: trains, astronomie, généalogie, collections, etc."
                    value={data.listeInterets}
                    onChange={(e) => setData({ ...data, listeInterets: e.target.value })}
                  />

                  <Textarea
                    id="tempsConsacre"
                    label="Combien de temps y consacrez-vous ?"
                    placeholder="Heures par jour, par semaine"
                    value={data.tempsConsacre}
                    onChange={(e) => setData({ ...data, tempsConsacre: e.target.value })}
                  />

                  <Textarea
                    id="bienEtreOuDifficulte"
                    label="Ces intérêts vous apportent-ils du bien-être ou des difficultés ?"
                    value={data.bienEtreOuDifficulte}
                    onChange={(e) => setData({ ...data, bienEtreOuDifficulte: e.target.value })}
                  />

                  <Textarea
                    id="interferenceVie"
                    label="Ces intérêts interfèrent-ils avec votre vie quotidienne ?"
                    value={data.interferenceVie}
                    onChange={(e) => setData({ ...data, interferenceVie: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Burnout autistique
            </h3>
            <div className="space-y-6">
              <Select
                id="burnoutAutistique"
                label="Avez-vous déjà vécu un burnout autistique ?"
                value={data.burnoutAutistique}
                onChange={(e) => setData({ ...data, burnoutAutistique: e.target.value })}
                options={burnoutOptions}
              />

              {data.burnoutAutistique !== 'non' && (
                <>
                  <Input
                    id="nombreBurnout"
                    type="number"
                    label="Nombre de burnouts vécus"
                    value={data.nombreBurnout?.toString() || '0'}
                    onChange={(e) => setData({ ...data, nombreBurnout: parseInt(e.target.value) || 0 })}
                  />

                  <Textarea
                    id="dureeRecuperationBurnout"
                    label="Durée de récupération"
                    placeholder="Semaines, mois, années"
                    value={data.dureeRecuperationBurnout}
                    onChange={(e) => setData({ ...data, dureeRecuperationBurnout: e.target.value })}
                  />

                  <Textarea
                    id="descriptionBurnout"
                    label="Décrivez votre expérience du burnout"
                    placeholder="Symptômes, déclencheurs, impact sur votre vie"
                    value={data.descriptionBurnout}
                    onChange={(e) => setData({ ...data, descriptionBurnout: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Shutdown
            </h3>
            <div className="space-y-6">
              <Select
                id="shutdown"
                label="Vivez-vous des shutdowns (fermeture, repli) ?"
                value={data.shutdown}
                onChange={(e) => setData({ ...data, shutdown: e.target.value })}
                options={shutdownMeltdownOptions}
              />

              {data.shutdown !== 'non' && (
                <>
                  <Textarea
                    id="situationsShutdown"
                    label="Dans quelles situations surviennent les shutdowns ?"
                    placeholder="Surcharge sensorielle, épuisement, stress intense"
                    value={data.situationsShutdown}
                    onChange={(e) => setData({ ...data, situationsShutdown: e.target.value })}
                  />

                  <Textarea
                    id="dureeShutdown"
                    label="Quelle est la durée typique d'un shutdown ?"
                    placeholder="Minutes, heures, jours"
                    value={data.dureeShutdown}
                    onChange={(e) => setData({ ...data, dureeShutdown: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Meltdown
            </h3>
            <div className="space-y-6">
              <Select
                id="meltdown"
                label="Vivez-vous des meltdowns (crises, effondrements) ?"
                value={data.meltdown}
                onChange={(e) => setData({ ...data, meltdown: e.target.value })}
                options={shutdownMeltdownOptions}
              />

              {data.meltdown !== 'non' && (
                <>
                  <Textarea
                    id="descriptionMeltdown"
                    label="Décrivez vos meltdowns"
                    placeholder="Déclencheurs, manifestations, intensité"
                    value={data.descriptionMeltdown}
                    onChange={(e) => setData({ ...data, descriptionMeltdown: e.target.value })}
                  />

                  <Textarea
                    id="dureeMeltdown"
                    label="Quelle est la durée typique d'un meltdown ?"
                    placeholder="Minutes, heures"
                    value={data.dureeMeltdown}
                    onChange={(e) => setData({ ...data, dureeMeltdown: e.target.value })}
                  />

                  <Textarea
                    id="recuperationMeltdown"
                    label="Comment récupérez-vous après un meltdown ?"
                    placeholder="Repos, isolement, activités apaisantes"
                    value={data.recuperationMeltdown}
                    onChange={(e) => setData({ ...data, recuperationMeltdown: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Prévention et stratégies
            </h3>
            <div className="space-y-6">
              <Checkbox
                id="reperezSignes"
                label="Repérez-vous les signes avant-coureurs de surcharge ?"
                checked={data.reperezSignes}
                onChange={(e) => setData({ ...data, reperezSignes: e.target.checked })}
              />

              {data.reperezSignes && (
                <>
                  <Textarea
                    id="signesAvantCoureurs"
                    label="Quels sont ces signes avant-coureurs ?"
                    placeholder="Irritabilité, fatigue, hypersensibilité, etc."
                    value={data.signesAvantCoureurs}
                    onChange={(e) => setData({ ...data, signesAvantCoureurs: e.target.value })}
                  />

                  <Textarea
                    id="strategiesEvitement"
                    label="Quelles stratégies utilisez-vous pour éviter la surcharge ?"
                    placeholder="Isolement, stimming, routines, etc."
                    value={data.strategiesEvitement}
                    onChange={(e) => setData({ ...data, strategiesEvitement: e.target.value })}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
