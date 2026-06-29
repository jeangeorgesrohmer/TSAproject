import React from 'react';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useFormContext } from '../context/FormContext';

interface NavigationButtonsProps {
  onNext?: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
  nextLabel?: string;
  isLastStep?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrevious,
  showPrevious = true,
  showNext = true,
  nextLabel = 'Suivant',
  isLastStep = false,
}) => {
  const { currentStep, setCurrentStep } = useFormContext();

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
      {showPrevious ? (
        <button
          type="button"
          onClick={handlePrevious}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all font-medium"
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Précédent
        </button>
      ) : (
        <div />
      )}

      <button
        type="button"
        onClick={() => {
          localStorage.setItem('tnd_questionnaire_data', JSON.stringify({}));
        }}
        className="hidden sm:inline-flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        aria-label="Sauvegarder et continuer plus tard"
      >
        <Save className="w-4 h-4 mr-2" />
        Auto-sauvegarde active
      </button>

      {showNext && (
        <button
          type="button"
          onClick={handleNext}
          className={`w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all font-medium ${
            isLastStep
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          aria-label={isLastStep ? 'Terminer' : 'Page suivante'}
        >
          {nextLabel}
          {!isLastStep && <ChevronRight className="w-5 h-5 ml-2" />}
        </button>
      )}
    </div>
  );
};
