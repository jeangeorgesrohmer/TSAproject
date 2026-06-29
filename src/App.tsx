import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormProvider, useFormContext } from './context/FormContext';
import { Stepper } from './components/Stepper';
import { WelcomeSection } from './sections/WelcomeSection';
import { DemographicSection } from './sections/DemographicSection';
import { MedicalHistorySection } from './sections/MedicalHistorySection';
import { PhysicalHealthSection } from './sections/PhysicalHealthSection';
import { MentalHealthSection } from './sections/MentalHealthSection';
import { AddictionsSection } from './sections/AddictionsSection';
import { FamilyHistorySection } from './sections/FamilyHistorySection';
import { DevelopmentSection } from './sections/DevelopmentSection';
import { MotorSkillsSection } from './sections/MotorSkillsSection';
import { PerceptionSection } from './sections/PerceptionSection';
import { LanguageSection } from './sections/LanguageSection';
import { SocialSection } from './sections/SocialSection';
import { BehaviorSection } from './sections/BehaviorSection';
import { AttentionSection } from './sections/AttentionSection';
import { EducationSection } from './sections/EducationSection';
import { ProfessionalSection } from './sections/ProfessionalSection';
import { RelationshipSection } from './sections/RelationshipSection';
import { AdministrativeSection } from './sections/AdministrativeSection';
import { CurrentSituationSection } from './sections/CurrentSituationSection';
import { SummarySection } from './sections/SummarySection';
import { ConfirmationSection } from './sections/ConfirmationSection';

const AppContent = () => {
  const { currentStep, darkMode, toggleDarkMode, isInitialized } = useFormContext();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center gap-5">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-500 dark:border-t-blue-400 animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          Chargement de vos données…
        </p>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeSection key="welcome" />;
      case 1:
        return <DemographicSection key="demographic" />;
      case 2:
        return <MedicalHistorySection key="medical" />;
      case 3:
        return <PhysicalHealthSection key="physical" />;
      case 4:
        return <MentalHealthSection key="mental" />;
      case 5:
        return <AddictionsSection key="addictions" />;
      case 6:
        return <FamilyHistorySection key="family" />;
      case 7:
        return <DevelopmentSection key="development" />;
      case 8:
        return <MotorSkillsSection key="motor" />;
      case 9:
        return <PerceptionSection key="perception" />;
      case 10:
        return <LanguageSection key="language" />;
      case 11:
        return <SocialSection key="social" />;
      case 12:
        return <BehaviorSection key="behavior" />;
      case 13:
        return <AttentionSection key="attention" />;
      case 14:
        return <EducationSection key="education" />;
      case 15:
        return <ProfessionalSection key="professional" />;
      case 16:
        return <RelationshipSection key="relationship" />;
      case 17:
        return <AdministrativeSection key="administrative" />;
      case 18:
        return <CurrentSituationSection key="current" />;
      case 19:
        return <SummarySection key="summary" />;
      case 20:
        return <ConfirmationSection key="confirmation" />;
      default:
        return <WelcomeSection key="welcome" />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {currentStep !== 20 && <Stepper />}

      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {currentStep !== 0 && currentStep !== 20 && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden sm:inline">Auto-sauvegarde active</span>
          <span className="sm:hidden">💾</span>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

export default App;
