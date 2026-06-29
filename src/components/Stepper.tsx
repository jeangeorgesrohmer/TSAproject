import React from 'react';
import { Check } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

const steps = [
  { id: 0, label: 'Accueil', shortLabel: 'Accueil' },
  { id: 1, label: 'Démographique', shortLabel: 'Démo' },
  { id: 2, label: 'Histoire Médicale', shortLabel: 'Médical' },
  { id: 3, label: 'Santé Physique', shortLabel: 'Physique' },
  { id: 4, label: 'Santé Mentale', shortLabel: 'Mental' },
  { id: 5, label: 'Addictions', shortLabel: 'Addic.' },
  { id: 6, label: 'Antécédents Familiaux', shortLabel: 'Famille' },
  { id: 7, label: 'Développement', shortLabel: 'Dév.' },
  { id: 8, label: 'Motricité', shortLabel: 'Motric.' },
  { id: 9, label: 'Sensoriel', shortLabel: 'Sens' },
  { id: 10, label: 'Langage', shortLabel: 'Lang.' },
  { id: 11, label: 'Social', shortLabel: 'Social' },
  { id: 12, label: 'Comportement', shortLabel: 'Comport.' },
  { id: 13, label: 'Attention', shortLabel: 'Attn.' },
  { id: 14, label: 'Éducation', shortLabel: 'École' },
  { id: 15, label: 'Professionnel', shortLabel: 'Pro' },
  { id: 16, label: 'Relationnel', shortLabel: 'Relat.' },
  { id: 17, label: 'Administratif', shortLabel: 'Admin' },
  { id: 18, label: 'Situation Actuelle', shortLabel: 'Actuel' },
  { id: 19, label: 'Récapitulatif', shortLabel: 'Scores' },
  { id: 20, label: 'Confirmation', shortLabel: 'Fin' },
];

export const Stepper: React.FC = () => {
  const { currentStep, setCurrentStep } = useFormContext();

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep || stepId < 20) {
      setCurrentStep(stepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isAccessible = step.id <= currentStep || step.id < 20;

            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => handleStepClick(step.id)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center group transition-all ${
                    isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  }`}
                  aria-label={`Étape ${step.id + 1}: ${step.label}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : step.id + 1}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium text-center hidden sm:block ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : isCompleted
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    style={{ minWidth: '20px', maxWidth: '60px' }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            role="progressbar"
            aria-valuenow={currentStep}
            aria-valuemin={0}
            aria-valuemax={steps.length - 1}
            aria-label="Progression du questionnaire"
          />
        </div>
      </div>
    </div>
  );
};
