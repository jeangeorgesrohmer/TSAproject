import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Input } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { DossierTransfert } from '../components/DossierTransfert';
import { useFormContext } from '../context/FormContext';
import { IdentificationData } from '../types/form';

export const WelcomeSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<IdentificationData>(
    formData.identification || {
      nom: '',
      prenom: '',
      dateNaissance: '',
      dateJour: new Date().toISOString().split('T')[0],
      genre: '',
    }
  );

  useEffect(() => {
    updateFormData('identification', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full">
            <FileText className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
          TSA DATA
        </h1>

        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-8">
          Logiciel de recueil d'informations
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Toutes ces informations resteront strictement confidentielles et seront utilisées uniquement dans le cadre de votre suivi médical.
          </p>
        </div>

        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ce questionnaire a pour objectif de recueillir des informations sur votre situation personnelle,
            votre historique médical et votre développement. Vos réponses nous aideront à mieux comprendre
            votre situation et à adapter au mieux votre accompagnement.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Vous pouvez répondre à votre rythme. Vos réponses sont automatiquement sauvegardées,
            vous pouvez donc revenir compléter le questionnaire à tout moment.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Durée estimée : 30-45 minutes
          </p>
        </div>

        <div className="space-y-4">
          <Input
            id="nom"
            label="Nom"
            type="text"
            value={data.nom}
            onChange={(e) => setData({ ...data, nom: e.target.value })}
            required
          />

          <Input
            id="prenom"
            label="Prénom"
            type="text"
            value={data.prenom}
            onChange={(e) => setData({ ...data, prenom: e.target.value })}
            required
          />

          <Input
            id="dateNaissance"
            label="Date de naissance"
            type="date"
            value={data.dateNaissance}
            onChange={(e) => setData({ ...data, dateNaissance: e.target.value })}
            required
          />

          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Genre
            </label>
            <select
              id="genre"
              value={data.genre}
              onChange={(e) => setData({ ...data, genre: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionnez...</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Non-binaire">Non-binaire</option>
              <option value="Autre">Autre</option>
              <option value="Ne souhaite pas préciser">Je ne souhaite pas le préciser</option>
            </select>
          </div>

          <Input
            id="dateJour"
            label="Date du jour"
            type="date"
            value={data.dateJour}
            onChange={(e) => setData({ ...data, dateJour: e.target.value })}
            required
            disabled
          />
        </div>

        <NavigationButtons showPrevious={false} nextLabel="Commencer" />

        <DossierTransfert goToSummaryOnImport />
      </div>
    </div>
  );
};
