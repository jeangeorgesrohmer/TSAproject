import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { RelationshipData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const RelationshipSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<RelationshipData>>(
    formData.relationship || { reseauSoutien: [], nombrePersonnesConfiance: 0 }
  );

  useEffect(() => {
    updateFormData('relationship', data);
  }, [data]);

  const handleNext = () => setCurrentStep(17);
  const handleBack = () => setCurrentStep(15);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 16 : Vie Relationnelle et Affective
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Situation actuelle
              </label>
              <select
                value={data.situationActuelle || ''}
                onChange={(e) => setData({ ...data, situationActuelle: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="En couple marié/pacsé">En couple marié/pacsé</option>
                <option value="En couple non marié">En couple non marié</option>
                <option value="Célibataire">Célibataire</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(ve)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Harcèlement ou maltraitance
              </label>
              <select
                value={data.harcelementMaltraitance || ''}
                onChange={(e) => setData({ ...data, harcelementMaltraitance: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui actuellement">Oui actuellement</option>
                <option value="Oui dans le passé">Oui dans le passé</option>
                <option value="Non">Non</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Nombre de personnes de confiance
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={data.nombrePersonnesConfiance || 0}
                onChange={(e) => setData({ ...data, nombrePersonnesConfiance: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-center text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {data.nombrePersonnesConfiance || 0}
              </div>
            </div>
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
