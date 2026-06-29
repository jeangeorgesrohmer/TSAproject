import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { AdministrativeData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const AdministrativeSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<AdministrativeData>>(
    formData.administrative || {
      reconnaissances: [],
      professionnelsActuels: [],
      structureSuivi: []
    }
  );

  useEffect(() => {
    updateFormData('administrative', data);
  }, [data]);

  const handleNext = () => setCurrentStep(18);
  const handleBack = () => setCurrentStep(16);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 17 : Situation Administrative et Accompagnement
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Reconnaissances administratives
              </label>
              <div className="space-y-2">
                {['RQTH', 'AAH', 'PCH', 'Carte invalidité', 'Carte priorité', 'Aucune'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.reconnaissances?.includes(option) || false}
                      onChange={(e) => {
                        const current = data.reconnaissances || [];
                        setData({
                          ...data,
                          reconnaissances: e.target.checked
                            ? [...current, option]
                            : current.filter((item) => item !== option),
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Aide financière familiale
              </label>
              <select
                value={data.aideFinanciere || ''}
                onChange={(e) => setData({ ...data, aideFinanciere: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </select>
            </div>
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
