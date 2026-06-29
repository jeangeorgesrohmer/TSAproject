import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Input, Select, Checkbox, Textarea } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { DemographicData } from '../types/form';

export const DemographicSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<DemographicData>(
    formData.demographic || {
      familyStatus: '',
      housingStatus: '',
      hasChildren: false,
      childrenCount: '',
      childrenAges: '',
      currentJob: '',
      diplomas: '',
    }
  );

  useEffect(() => {
    updateFormData('demographic', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Informations démographiques
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 1 : Informations Démographiques
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Select
            id="familyStatus"
            label="Situation familiale"
            value={data.familyStatus}
            onChange={(e) => setData({ ...data, familyStatus: e.target.value })}
            options={[
              { value: 'married', label: 'Marié(e)' },
              { value: 'pacs', label: 'Pacsé(e)' },
              { value: 'couple', label: 'En couple' },
              { value: 'single', label: 'Célibataire' },
            ]}
          />

          <Select
            id="housingStatus"
            label="Situation de logement"
            value={data.housingStatus}
            onChange={(e) => setData({ ...data, housingStatus: e.target.value })}
            options={[
              { value: 'couple', label: 'En couple' },
              { value: 'alone', label: 'Seul(e)' },
              { value: 'parents', label: 'Chez les parents' },
              { value: 'other', label: 'Autre' },
            ]}
          />

          <div>
            <Checkbox
              id="hasChildren"
              label="Avez-vous des enfants ?"
              checked={data.hasChildren}
              onChange={(e) =>
                setData({ ...data, hasChildren: e.target.checked, childrenCount: '', childrenAges: '' })
              }
            />

            {data.hasChildren && (
              <div className="ml-8 mt-4 space-y-4">
                <Input
                  id="childrenCount"
                  label="Nombre d'enfants"
                  type="number"
                  min="1"
                  value={data.childrenCount}
                  onChange={(e) => setData({ ...data, childrenCount: e.target.value })}
                />
                <Input
                  id="childrenAges"
                  label="Âges des enfants"
                  type="text"
                  placeholder="Ex: 5 ans, 8 ans, 12 ans"
                  value={data.childrenAges}
                  onChange={(e) => setData({ ...data, childrenAges: e.target.value })}
                />
              </div>
            )}
          </div>

          <Input
            id="currentJob"
            label="Emploi actuel"
            type="text"
            placeholder="Décrivez votre emploi actuel"
            value={data.currentJob}
            onChange={(e) => setData({ ...data, currentJob: e.target.value })}
          />

          <Textarea
            id="diplomas"
            label="Diplômes obtenus"
            placeholder="Listez vos diplômes et formations"
            value={data.diplomas}
            onChange={(e) => setData({ ...data, diplomas: e.target.value })}
          />
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
