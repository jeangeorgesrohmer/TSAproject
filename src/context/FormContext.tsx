import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import localforage from 'localforage';
import { FormData } from '../types/form';

interface FormContextType {
  formData: Partial<FormData>;
  updateFormData: (section: keyof FormData, data: any) => void;
  importFormData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalSteps: number;
  isCompleted: boolean;
  setIsCompleted: (completed: boolean) => void;
  resetForm: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isInitialized: boolean;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const STORAGE_KEY = 'tnd_questionnaire_data';
const DARK_MODE_KEY = 'tnd_dark_mode';

const store = localforage.createInstance({
  name: 'tnd_app',
  storeName: 'form_data',
  description: 'Questionnaire TSA — données persistantes',
});

const initialFormData: Partial<FormData> = {
  identification: {
    nom: '',
    prenom: '',
    dateNaissance: '',
    dateJour: new Date().toISOString().split('T')[0],
    genre: '',
  },
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<FormData>>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(DARK_MODE_KEY) === 'true';
  });
  const totalSteps = 21;

  // Apply dark mode immediately on first render (synchronous localStorage read above)
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, darkMode.toString());
  }, [darkMode]);

  // Load persisted form data from IndexedDB on mount
  useEffect(() => {
    let cancelled = false;

    store.getItem<Partial<FormData>>(STORAGE_KEY)
      .then((saved) => {
        if (cancelled) return;
        if (saved) {
          setFormData(saved);
        }
      })
      .catch((err) => {
        console.error('IndexedDB load error — falling back to empty form:', err);
      })
      .finally(() => {
        if (!cancelled) setIsInitialized(true);
      });

    return () => { cancelled = true; };
  }, []);

  const updateFormData = useCallback((section: keyof FormData, data: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [section]: data };
      store.setItem(STORAGE_KEY, updated).catch((err) => {
        console.error('IndexedDB save error:', err);
      });
      return updated;
    });
  }, []);

  const importFormData = useCallback((data: Partial<FormData>) => {
    setFormData(data);
    store.setItem(STORAGE_KEY, data).catch((err) => {
      console.error('IndexedDB import error:', err);
    });
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsCompleted(false);
    store.removeItem(STORAGE_KEY).catch((err) => {
      console.error('IndexedDB remove error:', err);
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        importFormData,
        currentStep,
        setCurrentStep,
        totalSteps,
        isCompleted,
        setIsCompleted,
        resetForm,
        darkMode,
        toggleDarkMode,
        isInitialized,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
};
