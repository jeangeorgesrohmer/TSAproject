import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Textarea, RadioGroup, RadioGroupSometimes } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { SensoryData, YesNoUnknown, YesNoSometimes } from '../types/form';

export const PerceptionSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<SensoryData>(
    formData.sensory || {
      enfanceTextures: 'Je ne sais pas' as YesNoUnknown,
      enfanceTouche: 'Je ne sais pas' as YesNoUnknown,
      enfanceAliments: 'Je ne sais pas' as YesNoUnknown,
      enfanceOdeurs: 'Je ne sais pas' as YesNoUnknown,
      enfanceBoucherOreilles: 'Je ne sais pas' as YesNoUnknown,
      enfancePlusieursPersonnes: 'Je ne sais pas' as YesNoUnknown,
      enfanceLumiere: 'Je ne sais pas' as YesNoUnknown,
      enfanceManege: 'Je ne sais pas' as YesNoUnknown,
      enfanceDouleur: 'Je ne sais pas' as YesNoUnknown,
      enfanceFaimSoif: 'Je ne sais pas' as YesNoUnknown,
      enfanceIsoler: 'Je ne sais pas' as YesNoUnknown,
      difficultePersistante: '',
      tactileSensibiliteVetements: 'Parfois' as YesNoSometimes,
      tactileGeneEtreTouche: 'Parfois' as YesNoSometimes,
      tactileBesoinToucher: 'Parfois' as YesNoSometimes,
      tactilePressions: 'Parfois' as YesNoSometimes,
      auditifIntolerance: 'Parfois' as YesNoSometimes,
      auditifBouchons: 'Parfois' as YesNoSometimes,
      auditifFiltrer: 'Parfois' as YesNoSometimes,
      auditifBruitsSoudains: 'Parfois' as YesNoSometimes,
      visuelLunettes: 'Parfois' as YesNoSometimes,
      visuelLumiereArtificielle: 'Parfois' as YesNoSometimes,
      visuelEnvironnementsCharges: 'Parfois' as YesNoSometimes,
      olfactifSensibilite: 'Parfois' as YesNoSometimes,
      olfactifInsupportable: 'Parfois' as YesNoSometimes,
      gustatifTextures: 'Parfois' as YesNoSometimes,
      gustatifCouleurs: 'Parfois' as YesNoSometimes,
      gustatifSafeFoods: 'Parfois' as YesNoSometimes,
      proprioceptionPosition: 'Parfois' as YesNoSometimes,
      proprioceptionMaladresse: 'Parfois' as YesNoSometimes,
      proprioceptionForce: 'Parfois' as YesNoSometimes,
      interoceptionFaim: 'Parfois' as YesNoSometimes,
      interoceptionSoif: 'Parfois' as YesNoSometimes,
      interoceptionUrine: 'Parfois' as YesNoSometimes,
      interoceptionTemperature: 'Parfois' as YesNoSometimes,
      interoceptionFatigue: 'Parfois' as YesNoSometimes,
      interoceptionBattements: 'Parfois' as YesNoSometimes,
      strategiesSensorielles: '',
    }
  );

  useEffect(() => {
    updateFormData('sensory', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
            <Eye className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Perception sensorielle
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 9 : Sensibilités sensorielles de l'enfance à aujourd'hui
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilités sensorielles dans l'enfance
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Dégoût tactile / certaines matières désagréables"
                name="enfanceTextures"
                value={data.enfanceTextures}
                onChange={(value) => setData({ ...data, enfanceTextures: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne à être touché par les autres"
                name="enfanceTouche"
                value={data.enfanceTouche}
                onChange={(value) => setData({ ...data, enfanceTouche: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficultés alimentaires (certains aliments provoquent envie de vomir)"
                name="enfanceAliments"
                value={data.enfanceAliments}
                onChange={(value) => setData({ ...data, enfanceAliments: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne olfactive (parfums, produits ménagers)"
                name="enfanceOdeurs"
                value={data.enfanceOdeurs}
                onChange={(value) => setData({ ...data, enfanceOdeurs: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne auditive importante (se boucher les oreilles)"
                name="enfanceBoucherOreilles"
                value={data.enfanceBoucherOreilles}
                onChange={(value) => setData({ ...data, enfanceBoucherOreilles: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne lorsque plusieurs personnes parlent en même temps"
                name="enfancePlusieursPersonnes"
                value={data.enfancePlusieursPersonnes}
                onChange={(value) => setData({ ...data, enfancePlusieursPersonnes: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gêne visuelle / lumière (néons, lumière extérieure)"
                name="enfanceLumiere"
                value={data.enfanceLumiere}
                onChange={(value) => setData({ ...data, enfanceLumiere: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Peur ou attirance forte pour les manèges"
                name="enfanceManege"
                value={data.enfanceManege}
                onChange={(value) => setData({ ...data, enfanceManege: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Sensibilité inhabituelle à la douleur (trop sensible ou pas assez)"
                name="enfanceDouleur"
                value={data.enfanceDouleur}
                onChange={(value) => setData({ ...data, enfanceDouleur: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à percevoir la faim / la soif"
                name="enfanceFaimSoif"
                value={data.enfanceFaimSoif}
                onChange={(value) => setData({ ...data, enfanceFaimSoif: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Besoin de s'isoler pour se calmer (surcharge sensorielle)"
                name="enfanceIsoler"
                value={data.enfanceIsoler}
                onChange={(value) => setData({ ...data, enfanceIsoler: value as YesNoUnknown })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilité tactile actuelle
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Sensibilité aux vêtements (étiquettes, matières, coutures)"
                name="tactileSensibiliteVetements"
                value={data.tactileSensibiliteVetements}
                onChange={(value) => setData({ ...data, tactileSensibiliteVetements: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Gêne à être touché (même par des proches)"
                name="tactileGeneEtreTouche"
                value={data.tactileGeneEtreTouche}
                onChange={(value) => setData({ ...data, tactileGeneEtreTouche: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Besoin de toucher certaines textures pour se rassurer"
                name="tactileBesoinToucher"
                value={data.tactileBesoinToucher}
                onChange={(value) => setData({ ...data, tactileBesoinToucher: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Recherche ou évitement des pressions physiques fortes"
                name="tactilePressions"
                value={data.tactilePressions}
                onChange={(value) => setData({ ...data, tactilePressions: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilité auditive actuelle
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Intolérance à certains sons (aspirateur, voix fortes, pleurs de bébé)"
                name="auditifIntolerance"
                value={data.auditifIntolerance}
                onChange={(value) => setData({ ...data, auditifIntolerance: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Utilisation de bouchons d'oreilles ou casque antibruit"
                name="auditifBouchons"
                value={data.auditifBouchons}
                onChange={(value) => setData({ ...data, auditifBouchons: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à filtrer les bruits de fond (conversations simultanées)"
                name="auditifFiltrer"
                value={data.auditifFiltrer}
                onChange={(value) => setData({ ...data, auditifFiltrer: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Réaction excessive aux bruits soudains"
                name="auditifBruitsSoudains"
                value={data.auditifBruitsSoudains}
                onChange={(value) => setData({ ...data, auditifBruitsSoudains: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilité visuelle actuelle
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Port de lunettes de soleil même en intérieur"
                name="visuelLunettes"
                value={data.visuelLunettes}
                onChange={(value) => setData({ ...data, visuelLunettes: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Gêne à la lumière artificielle (néons, LED)"
                name="visuelLumiereArtificielle"
                value={data.visuelLumiereArtificielle}
                onChange={(value) => setData({ ...data, visuelLumiereArtificielle: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté dans les environnements visuellement chargés"
                name="visuelEnvironnementsCharges"
                value={data.visuelEnvironnementsCharges}
                onChange={(value) => setData({ ...data, visuelEnvironnementsCharges: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilité olfactive actuelle
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Sensibilité exacerbée aux odeurs"
                name="olfactifSensibilite"
                value={data.olfactifSensibilite}
                onChange={(value) => setData({ ...data, olfactifSensibilite: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Certaines odeurs deviennent insupportables (parfums, produits ménagers)"
                name="olfactifInsupportable"
                value={data.olfactifInsupportable}
                onChange={(value) => setData({ ...data, olfactifInsupportable: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Sensibilité gustative actuelle
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Aversion pour certaines textures alimentaires"
                name="gustatifTextures"
                value={data.gustatifTextures}
                onChange={(value) => setData({ ...data, gustatifTextures: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Impossibilité de mélanger les aliments (couleurs, textures)"
                name="gustatifCouleurs"
                value={data.gustatifCouleurs}
                onChange={(value) => setData({ ...data, gustatifCouleurs: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Alimentation restreinte (safe foods)"
                name="gustatifSafeFoods"
                value={data.gustatifSafeFoods}
                onChange={(value) => setData({ ...data, gustatifSafeFoods: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Proprioception (perception de son corps dans l'espace)
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à percevoir la position de votre corps sans regarder"
                name="proprioceptionPosition"
                value={data.proprioceptionPosition}
                onChange={(value) => setData({ ...data, proprioceptionPosition: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Tendance à la maladresse (se cogner, renverser des objets)"
                name="proprioceptionMaladresse"
                value={data.proprioceptionMaladresse}
                onChange={(value) => setData({ ...data, proprioceptionMaladresse: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à doser la force (écrire trop fort, casser des objets)"
                name="proprioceptionForce"
                value={data.proprioceptionForce}
                onChange={(value) => setData({ ...data, proprioceptionForce: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Interoception (perception de ses signaux internes)
            </h3>
            <div className="space-y-6">
              <RadioGroupSometimes
                label="Difficulté à percevoir la faim"
                name="interoceptionFaim"
                value={data.interoceptionFaim}
                onChange={(value) => setData({ ...data, interoceptionFaim: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à percevoir la soif"
                name="interoceptionSoif"
                value={data.interoceptionSoif}
                onChange={(value) => setData({ ...data, interoceptionSoif: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à percevoir le besoin d'uriner"
                name="interoceptionUrine"
                value={data.interoceptionUrine}
                onChange={(value) => setData({ ...data, interoceptionUrine: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à percevoir les variations de température corporelle"
                name="interoceptionTemperature"
                value={data.interoceptionTemperature}
                onChange={(value) => setData({ ...data, interoceptionTemperature: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Difficulté à percevoir la fatigue"
                name="interoceptionFatigue"
                value={data.interoceptionFatigue}
                onChange={(value) => setData({ ...data, interoceptionFatigue: value as YesNoSometimes })}
              />

              <RadioGroupSometimes
                label="Conscience exacerbée des battements de cœur"
                name="interoceptionBattements"
                value={data.interoceptionBattements}
                onChange={(value) => setData({ ...data, interoceptionBattements: value as YesNoSometimes })}
              />
            </div>
          </div>

          <div>
            <Textarea
              id="difficultePersistante"
              label="Difficultés sensorielles qui persistent actuellement"
              placeholder="Décrivez les difficultés sensorielles qui persistent et leur impact sur votre quotidien"
              value={data.difficultePersistante}
              onChange={(e) => setData({ ...data, difficultePersistante: e.target.value })}
            />

            <div className="mt-6">
              <Textarea
                id="strategiesSensorielles"
                label="Stratégies sensorielles que vous utilisez"
                placeholder="Décrivez les stratégies que vous utilisez pour gérer vos sensibilités sensorielles (bouchons d'oreilles, évitement de certains lieux, routines spécifiques, etc.)"
                value={data.strategiesSensorielles}
                onChange={(e) => setData({ ...data, strategiesSensorielles: e.target.value })}
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
