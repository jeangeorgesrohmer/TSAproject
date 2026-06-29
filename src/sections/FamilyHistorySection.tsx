import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { FamilyHistoryData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const FamilyHistorySection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<FamilyHistoryData>>(
    formData.familyHistory || {}
  );

  useEffect(() => {
    updateFormData('familyHistory', data);
  }, [data]);

  const handleNext = () => setCurrentStep(7);
  const handleBack = () => setCurrentStep(5);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-green-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 6 : Antécédents Familiaux
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Antécédents familiaux
              </label>
              <select
                value={data.antecedentsFamiliaux || ''}
                onChange={(e) => setData({ ...data, antecedentsFamiliaux: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
                <option value="Je ne sais pas">Je ne sais pas</option>
              </select>
            </div>

            {data.antecedentsFamiliaux === 'Oui' && (
              <>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Maladies somatiques
                  </label>
                  <textarea
                    value={data.maladiesSomatiques || ''}
                    onChange={(e) => setData({ ...data, maladiesSomatiques: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Maladies psychiatriques
                  </label>
                  <textarea
                    value={data.maladiesPsy || ''}
                    onChange={(e) => setData({ ...data, maladiesPsy: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Troubles du neurodéveloppement
                  </label>
                  <textarea
                    value={data.troublesNeurodev || ''}
                    onChange={(e) => setData({ ...data, troublesNeurodev: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
