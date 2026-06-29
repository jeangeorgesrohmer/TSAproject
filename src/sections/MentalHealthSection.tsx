import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { MentalHealthData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const MentalHealthSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<MentalHealthData>>(
    formData.mentalHealth || {}
  );

  useEffect(() => {
    updateFormData('mentalHealth', data);
  }, [data]);

  const handleNext = () => setCurrentStep(5);
  const handleBack = () => setCurrentStep(3);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-8 h-8 text-purple-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 4 : Santé Mentale et Comorbidités
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Épisodes dépressifs
              </label>
              <select
                value={data.episodesDepressifs || ''}
                onChange={(e) => setData({ ...data, episodesDepressifs: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui actuellement">Oui actuellement</option>
                <option value="Oui dans le passé">Oui dans le passé</option>
                <option value="Non jamais">Non jamais</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Idées suicidaires
              </label>
              <select
                value={data.ideesSuicidaires || ''}
                onChange={(e) => setData({ ...data, ideesSuicidaires: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui actuellement">Oui actuellement</option>
                <option value="Oui dans le passé">Oui dans le passé</option>
                <option value="Non jamais">Non jamais</option>
              </select>
              {data.ideesSuicidaires === 'Oui actuellement' && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    Si vous êtes en détresse, contactez le 3114 (numéro national de prévention du suicide)
                  </p>
                </div>
              )}
            </div>
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
