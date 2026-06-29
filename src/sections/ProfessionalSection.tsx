import { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { ProfessionalData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const ProfessionalSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<ProfessionalData>>(
    formData.professional || { typeEnvironnement: [] }
  );

  useEffect(() => {
    updateFormData('professional', data);
  }, [data]);

  const handleNext = () => setCurrentStep(16);
  const handleBack = () => setCurrentStep(14);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 15 : Vie Professionnelle
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Statut professionnel
              </label>
              <select
                value={data.statutProfessionnel || ''}
                onChange={(e) => setData({ ...data, statutProfessionnel: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Intérim">Intérim</option>
                <option value="Auto-entrepreneur">Auto-entrepreneur</option>
                <option value="Chômage">Chômage</option>
                <option value="Invalidité/AAH">Invalidité/AAH</option>
                <option value="Étudiant">Étudiant</option>
                <option value="Retraité">Retraité</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Emplois passés et actuels
              </label>
              <textarea
                value={data.emploisPassesActuels || ''}
                onChange={(e) => setData({ ...data, emploisPassesActuels: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                RQTH (Reconnaissance de la Qualité de Travailleur Handicapé)
              </label>
              <select
                value={data.rqth || ''}
                onChange={(e) => setData({ ...data, rqth: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
                <option value="En cours">En cours</option>
              </select>
            </div>
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
