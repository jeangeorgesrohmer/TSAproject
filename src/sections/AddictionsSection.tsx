import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { AddictionsData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const AddictionsSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<AddictionsData>>(
    formData.addictions || { listeMedicamentsActuels: [] }
  );

  useEffect(() => {
    updateFormData('addictions', data);
  }, [data]);

  const handleNext = () => setCurrentStep(6);
  const handleBack = () => setCurrentStep(4);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 5 : Addictions et Traitements
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Addictions
              </label>
              <select
                value={data.hasAddictions || ''}
                onChange={(e) => setData({ ...data, hasAddictions: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
                <option value="Je ne sais pas">Je ne sais pas</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <input
                  type="checkbox"
                  checked={data.medicamentsPasses || false}
                  onChange={(e) => setData({ ...data, medicamentsPasses: e.target.checked })}
                  className="rounded"
                />
                Médicaments passés
              </label>
              {data.medicamentsPasses && (
                <textarea
                  value={data.listeMedicamentsPasses || ''}
                  onChange={(e) => setData({ ...data, listeMedicamentsPasses: e.target.value })}
                  className="w-full mt-2 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                  placeholder="Liste des médicaments..."
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
                <input
                  type="checkbox"
                  checked={data.medicamentsActuels || false}
                  onChange={(e) => setData({ ...data, medicamentsActuels: e.target.checked })}
                  className="rounded"
                />
                Médicaments actuels
              </label>
            </div>
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
