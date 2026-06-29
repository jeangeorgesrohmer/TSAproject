import React, { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import { Input, Textarea, RadioGroup, Checkbox, Select } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { EducationData, YesNoUnknown } from '../types/form';

export const EducationSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<EducationData>(
    formData.education || {
      lastClass: '',
      hasRepeated: false,
      hasSkipped: false,
      hasAdaptedSchooling: false,
      hasSEGPA: 'unknown' as YesNoUnknown,
      hasRASED: 'unknown' as YesNoUnknown,
      hasAVS: false,
      readingDifficulties: 'unknown' as YesNoUnknown,
      comprehensionDifficulties: 'unknown' as YesNoUnknown,
      mathDifficulties: 'unknown' as YesNoUnknown,
      memorizationDifficulties: 'unknown' as YesNoUnknown,
      planReadingDifficulties: 'unknown' as YesNoUnknown,
      organizationDifficulties: 'unknown' as YesNoUnknown,
      interactionDifficulties: 'unknown' as YesNoUnknown,
      attentionDifficulties: 'unknown' as YesNoUnknown,
      behaviorDifficulties: 'unknown' as YesNoUnknown,
      interestDifficulties: 'unknown' as YesNoUnknown,
      harassmentDifficulties: 'unknown' as YesNoUnknown,
      difficultSubjects: '',
      appreciatedSubjects: '',
    }
  );

  useEffect(() => {
    updateFormData('education', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-sky-100 dark:bg-sky-900 rounded-lg mr-4">
            <GraduationCap className="w-8 h-8 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Parcours scolaire
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 14 : Parcours Scolaire
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            id="lastClass"
            label="Dernière classe fréquentée"
            type="text"
            placeholder="Ex: Terminale, 3ème, CE2..."
            value={data.lastClass}
            onChange={(e) => setData({ ...data, lastClass: e.target.value })}
          />

          <div>
            <Checkbox
              id="hasRepeated"
              label="Redoublement"
              checked={data.hasRepeated}
              onChange={(e) =>
                setData({
                  ...data,
                  hasRepeated: e.target.checked,
                  repeatedClasses: e.target.checked ? data.repeatedClasses : '',
                })
              }
            />
            {data.hasRepeated && (
              <Textarea
                id="repeatedClasses"
                label="Classes redoublées"
                value={data.repeatedClasses || ''}
                onChange={(e) => setData({ ...data, repeatedClasses: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasSkipped"
              label="Saut de classe"
              checked={data.hasSkipped}
              onChange={(e) =>
                setData({
                  ...data,
                  hasSkipped: e.target.checked,
                  skippedClasses: e.target.checked ? data.skippedClasses : '',
                })
              }
            />
            {data.hasSkipped && (
              <Textarea
                id="skippedClasses"
                label="Classes sautées"
                value={data.skippedClasses || ''}
                onChange={(e) => setData({ ...data, skippedClasses: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasAdaptedSchooling"
              label="Scolarité adaptée"
              checked={data.hasAdaptedSchooling}
              onChange={(e) =>
                setData({
                  ...data,
                  hasAdaptedSchooling: e.target.checked,
                  adaptedType: e.target.checked ? data.adaptedType : '',
                })
              }
            />
            {data.hasAdaptedSchooling && (
              <Select
                id="adaptedType"
                label="Type de scolarité adaptée"
                value={data.adaptedType || ''}
                onChange={(e) => setData({ ...data, adaptedType: e.target.value })}
                options={[
                  { value: 'CLIS', label: 'CLIS' },
                  { value: 'ULIS', label: 'ULIS' },
                  { value: 'other', label: 'Autre' },
                ]}
              />
            )}
          </div>

          <RadioGroup
            label="SEGPA"
            name="hasSEGPA"
            value={data.hasSEGPA}
            onChange={(value) => setData({ ...data, hasSEGPA: value as YesNoUnknown })}
            options={[
              { value: 'yes', label: 'Oui' },
              { value: 'no', label: 'Non' },
            ]}
          />

          <RadioGroup
            label="RASED (Réseau d'Aides Spécialisées aux Élèves en Difficulté)"
            name="hasRASED"
            value={data.hasRASED}
            onChange={(value) => setData({ ...data, hasRASED: value as YesNoUnknown })}
            options={[
              { value: 'yes', label: 'Oui' },
              { value: 'no', label: 'Non' },
            ]}
          />

          <div>
            <Checkbox
              id="hasAVS"
              label="AVS (Auxiliaire de Vie Scolaire)"
              checked={data.hasAVS}
              onChange={(e) =>
                setData({
                  ...data,
                  hasAVS: e.target.checked,
                  avsYears: e.target.checked ? data.avsYears : '',
                })
              }
            />
            {data.hasAVS && (
              <Textarea
                id="avsYears"
                label="Années concernées"
                placeholder="Ex: CP, CE1, CE2"
                value={data.avsYears || ''}
                onChange={(e) => setData({ ...data, avsYears: e.target.value })}
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Difficultés scolaires rencontrées
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Lecture, orthographe, écriture"
                name="readingDifficulties"
                value={data.readingDifficulties}
                onChange={(value) => setData({ ...data, readingDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Compréhension écrite, faire des synthèses"
                name="comprehensionDifficulties"
                value={data.comprehensionDifficulties}
                onChange={(value) => setData({ ...data, comprehensionDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Calcul mental, mathématiques"
                name="mathDifficulties"
                value={data.mathDifficulties}
                onChange={(value) => setData({ ...data, mathDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Mémorisation"
                name="memorizationDifficulties"
                value={data.memorizationDifficulties}
                onChange={(value) => setData({ ...data, memorizationDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Lecture de plans/dessins"
                name="planReadingDifficulties"
                value={data.planReadingDifficulties}
                onChange={(value) => setData({ ...data, planReadingDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Organisation sur la feuille"
                name="organizationDifficulties"
                value={data.organizationDifficulties}
                onChange={(value) => setData({ ...data, organizationDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Interaction avec les autres enfants"
                name="interactionDifficulties"
                value={data.interactionDifficulties}
                onChange={(value) => setData({ ...data, interactionDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Attention en classe"
                name="attentionDifficulties"
                value={data.attentionDifficulties}
                onChange={(value) => setData({ ...data, attentionDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Bavardage, opposition"
                name="behaviorDifficulties"
                value={data.behaviorDifficulties}
                onChange={(value) => setData({ ...data, behaviorDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Intérêt pour les apprentissages"
                name="interestDifficulties"
                value={data.interestDifficulties}
                onChange={(value) => setData({ ...data, interestDifficulties: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Harcèlement/agression"
                name="harassmentDifficulties"
                value={data.harassmentDifficulties}
                onChange={(value) => setData({ ...data, harassmentDifficulties: value as YesNoUnknown })}
              />
            </div>
          </div>

          <Textarea
            id="difficultSubjects"
            label="Cours qui étaient difficiles"
            placeholder="Listez les matières qui posaient problème"
            value={data.difficultSubjects}
            onChange={(e) => setData({ ...data, difficultSubjects: e.target.value })}
          />

          <Textarea
            id="appreciatedSubjects"
            label="Cours appréciés"
            placeholder="Listez les matières que vous aimiez"
            value={data.appreciatedSubjects}
            onChange={(e) => setData({ ...data, appreciatedSubjects: e.target.value })}
          />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
