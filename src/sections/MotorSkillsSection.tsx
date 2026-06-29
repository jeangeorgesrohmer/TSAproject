import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Input, Textarea, RadioGroup } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { MotorSkillsData, YesNoUnknown } from '../types/form';

export const MotorSkillsSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<MotorSkillsData>(
    formData.motorSkills || {
      walkingAge: '',
      lackOfBalance: 'unknown' as YesNoUnknown,
      collisionTendency: 'unknown' as YesNoUnknown,
      dailyTaskDifficulties: 'unknown' as YesNoUnknown,
      ballDifficulties: 'unknown' as YesNoUnknown,
      droppingObjects: 'unknown' as YesNoUnknown,
      writingDifficulties: 'unknown' as YesNoUnknown,
      spatialOrganization: 'unknown' as YesNoUnknown,
      bikingDifficulties: 'unknown' as YesNoUnknown,
      persistingDifficulties: '',
    }
  );

  useEffect(() => {
    updateFormData('motorSkills', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
            <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Habiletés motrices et manuelles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 8 : Habiletés Motrices et Manuelles
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            id="walkingAge"
            label="Âge de la marche (en mois)"
            type="number"
            min="1"
            max="60"
            value={data.walkingAge}
            onChange={(e) => setData({ ...data, walkingAge: e.target.value })}
          />

          <RadioGroup
            label="Manque d'équilibre"
            name="lackOfBalance"
            value={data.lackOfBalance}
            onChange={(value) => setData({ ...data, lackOfBalance: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Tendance à se cogner sur les objets ou personnes"
            name="collisionTendency"
            value={data.collisionTendency}
            onChange={(value) => setData({ ...data, collisionTendency: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Manque d'habiletés pour les gestes du quotidien (manger, s'habiller, lacets)"
            name="dailyTaskDifficulties"
            value={data.dailyTaskDifficulties}
            onChange={(value) => setData({ ...data, dailyTaskDifficulties: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Difficultés à attraper ou lancer des balles"
            name="ballDifficulties"
            value={data.ballDifficulties}
            onChange={(value) => setData({ ...data, ballDifficulties: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Tendance à laisser échapper des objets"
            name="droppingObjects"
            value={data.droppingObjects}
            onChange={(value) => setData({ ...data, droppingObjects: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Difficultés d'acquisition de l'écriture"
            name="writingDifficulties"
            value={data.writingDifficulties}
            onChange={(value) => setData({ ...data, writingDifficulties: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Difficultés d'organisation dans l'espace"
            name="spatialOrganization"
            value={data.spatialOrganization}
            onChange={(value) => setData({ ...data, spatialOrganization: value as YesNoUnknown })}
          />

          <RadioGroup
            label="Difficulté pour faire du vélo"
            name="bikingDifficulties"
            value={data.bikingDifficulties}
            onChange={(value) => setData({ ...data, bikingDifficulties: value as YesNoUnknown })}
          />

          <Textarea
            id="persistingDifficulties"
            label="Difficultés qui persistent actuellement"
            placeholder="Décrivez les difficultés qui persistent à ce jour"
            value={data.persistingDifficulties}
            onChange={(e) => setData({ ...data, persistingDifficulties: e.target.value })}
          />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
