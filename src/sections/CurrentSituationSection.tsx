import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Input, Textarea, RadioGroup } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { CurrentSituationData, JobEntry, YesNoUnknown } from '../types/form';

export const CurrentSituationSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<CurrentSituationData>(
    formData.currentSituation || {
      jobs: [],
      priorityDifficulties: '',
      futureProjects: '',
      houseOrganization: 'unknown' as YesNoUnknown,
      shopping: 'unknown' as YesNoUnknown,
      cleaning: 'unknown' as YesNoUnknown,
      activityOrganization: 'unknown' as YesNoUnknown,
      mealPreparation: 'unknown' as YesNoUnknown,
      budgetManagement: 'unknown' as YesNoUnknown,
      hygiene: 'unknown' as YesNoUnknown,
      dressing: 'unknown' as YesNoUnknown,
      transportation: 'unknown' as YesNoUnknown,
      communication: 'unknown' as YesNoUnknown,
      adminProcedures: 'unknown' as YesNoUnknown,
      jobSearch: 'unknown' as YesNoUnknown,
      healthCare: 'unknown' as YesNoUnknown,
      healthAppointments: 'unknown' as YesNoUnknown,
      leisureAccess: 'unknown' as YesNoUnknown,
      socialAccess: 'unknown' as YesNoUnknown,
    }
  );

  useEffect(() => {
    updateFormData('currentSituation', data);
  }, [data]);

  const addJob = () => {
    setData({
      ...data,
      jobs: [...data.jobs, { position: '', difficulties: '' }],
    });
  };

  const removeJob = (index: number) => {
    setData({
      ...data,
      jobs: data.jobs.filter((_, i) => i !== index),
    });
  };

  const updateJob = (index: number, field: keyof JobEntry, value: string) => {
    const newJobs = [...data.jobs];
    newJobs[index] = { ...newJobs[index], [field]: value };
    setData({ ...data, jobs: newJobs });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg mr-4">
            <Briefcase className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Situation actuelle
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 18 : Situation Actuelle et Besoins
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Emplois passés et actuels
              </h3>
              <button
                type="button"
                onClick={addJob}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            </div>
            {data.jobs.map((job, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Emploi {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeJob(index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <Input
                    id={`job-position-${index}`}
                    label="Poste occupé"
                    value={job.position}
                    onChange={(e) => updateJob(index, 'position', e.target.value)}
                  />
                  <Textarea
                    id={`job-difficulties-${index}`}
                    label="Difficultés rencontrées"
                    value={job.difficulties}
                    onChange={(e) => updateJob(index, 'difficulties', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <Textarea
            id="priorityDifficulties"
            label="Difficultés prioritaires à résoudre"
            placeholder="Décrivez les difficultés principales que vous souhaitez aborder"
            value={data.priorityDifficulties}
            onChange={(e) => setData({ ...data, priorityDifficulties: e.target.value })}
          />

          <Textarea
            id="futureProjects"
            label="Projets futurs"
            placeholder="Décrivez vos projets et objectifs pour l'avenir"
            value={data.futureProjects}
            onChange={(e) => setData({ ...data, futureProjects: e.target.value })}
          />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Besoin d'aide pour les activités quotidiennes
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Indiquez si vous avez besoin d'aide pour les activités suivantes
            </p>
            <div className="space-y-6">
              <RadioGroup
                label="Organisation de la vie à la maison"
                name="houseOrganization"
                value={data.houseOrganization}
                onChange={(value) => setData({ ...data, houseOrganization: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Faire les courses"
                name="shopping"
                value={data.shopping}
                onChange={(value) => setData({ ...data, shopping: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Faire le ménage"
                name="cleaning"
                value={data.cleaning}
                onChange={(value) => setData({ ...data, cleaning: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Organisation des activités"
                name="activityOrganization"
                value={data.activityOrganization}
                onChange={(value) => setData({ ...data, activityOrganization: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Préparer les repas"
                name="mealPreparation"
                value={data.mealPreparation}
                onChange={(value) => setData({ ...data, mealPreparation: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gérer son budget"
                name="budgetManagement"
                value={data.budgetManagement}
                onChange={(value) => setData({ ...data, budgetManagement: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Hygiène personnelle"
                name="hygiene"
                value={data.hygiene}
                onChange={(value) => setData({ ...data, hygiene: value as YesNoUnknown })}
              />

              <RadioGroup
                label="S'habiller"
                name="dressing"
                value={data.dressing}
                onChange={(value) => setData({ ...data, dressing: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Se déplacer"
                name="transportation"
                value={data.transportation}
                onChange={(value) => setData({ ...data, transportation: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Mails / téléphone"
                name="communication"
                value={data.communication}
                onChange={(value) => setData({ ...data, communication: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Démarches administratives"
                name="adminProcedures"
                value={data.adminProcedures}
                onChange={(value) => setData({ ...data, adminProcedures: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Recherche d'emploi"
                name="jobSearch"
                value={data.jobSearch}
                onChange={(value) => setData({ ...data, jobSearch: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Prendre soin de sa santé"
                name="healthCare"
                value={data.healthCare}
                onChange={(value) => setData({ ...data, healthCare: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Gestion des rendez-vous santé"
                name="healthAppointments"
                value={data.healthAppointments}
                onChange={(value) => setData({ ...data, healthAppointments: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Accès aux loisirs"
                name="leisureAccess"
                value={data.leisureAccess}
                onChange={(value) => setData({ ...data, leisureAccess: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Accès aux activités sociales"
                name="socialAccess"
                value={data.socialAccess}
                onChange={(value) => setData({ ...data, socialAccess: value as YesNoUnknown })}
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
