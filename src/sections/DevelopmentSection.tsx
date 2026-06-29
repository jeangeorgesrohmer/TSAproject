import React, { useState, useEffect } from 'react';
import { Baby } from 'lucide-react';
import { Input, Textarea, Checkbox } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { DevelopmentData } from '../types/form';

export const DevelopmentSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<DevelopmentData>(
    formData.development || {
      pregnancyAnomalies: false,
      prematureBirth: false,
      birthComplications: false,
      neonatalHospitalization: false,
      earlyChildhoodDifficulties: '',
    }
  );

  useEffect(() => {
    updateFormData('development', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg mr-4">
            <Baby className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Développement - Grossesse et petite enfance
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 7 : Développement - Grossesse et Petite Enfance
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Checkbox
              id="pregnancyAnomalies"
              label="Anomalies pendant la grossesse"
              checked={data.pregnancyAnomalies}
              onChange={(e) =>
                setData({
                  ...data,
                  pregnancyAnomalies: e.target.checked,
                  pregnancyDetails: e.target.checked ? data.pregnancyDetails : '',
                })
              }
            />
            {data.pregnancyAnomalies && (
              <Textarea
                id="pregnancyDetails"
                label="Détails (maladie, médicaments, toxiques)"
                value={data.pregnancyDetails || ''}
                onChange={(e) => setData({ ...data, pregnancyDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="prematureBirth"
              label="Naissance avant terme"
              checked={data.prematureBirth}
              onChange={(e) =>
                setData({
                  ...data,
                  prematureBirth: e.target.checked,
                  prematureMonths: e.target.checked ? data.prematureMonths : '',
                })
              }
            />
            {data.prematureBirth && (
              <Input
                id="prematureMonths"
                label="Nombre de mois"
                type="number"
                min="1"
                max="9"
                value={data.prematureMonths || ''}
                onChange={(e) => setData({ ...data, prematureMonths: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="birthComplications"
              label="Complications lors de l'accouchement"
              checked={data.birthComplications}
              onChange={(e) =>
                setData({
                  ...data,
                  birthComplications: e.target.checked,
                  birthDetails: e.target.checked ? data.birthDetails : '',
                })
              }
            />
            {data.birthComplications && (
              <Textarea
                id="birthDetails"
                label="Détails"
                value={data.birthDetails || ''}
                onChange={(e) => setData({ ...data, birthDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="neonatalHospitalization"
              label="Hospitalisation en néonatologie"
              checked={data.neonatalHospitalization}
              onChange={(e) =>
                setData({
                  ...data,
                  neonatalHospitalization: e.target.checked,
                  hospitalizationDuration: e.target.checked ? data.hospitalizationDuration : '',
                })
              }
            />
            {data.neonatalHospitalization && (
              <Input
                id="hospitalizationDuration"
                label="Durée de l'hospitalisation"
                type="text"
                placeholder="Ex: 2 semaines"
                value={data.hospitalizationDuration || ''}
                onChange={(e) => setData({ ...data, hospitalizationDuration: e.target.value })}
              />
            )}
          </div>

          <Textarea
            id="earlyChildhoodDifficulties"
            label="Maladies ou difficultés durant la petite enfance"
            placeholder="Décrivez les problèmes de santé ou difficultés rencontrées"
            value={data.earlyChildhoodDifficulties}
            onChange={(e) => setData({ ...data, earlyChildhoodDifficulties: e.target.value })}
          />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
