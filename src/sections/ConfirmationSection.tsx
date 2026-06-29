import React, { useState } from 'react';
import { CheckCircle, Download, Mail, Home } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { generatePDF } from '../utils/pdfGenerator';

export const ConfirmationSection: React.FC = () => {
  const { formData, resetForm } = useFormContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      await generatePDF(formData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendEmail = () => {
    if (!email) {
      alert('Veuillez entrer une adresse email valide.');
      return;
    }
    setEmailSent(true);
    setTimeout(() => {
      alert(
        'Fonctionnalité d\'envoi par email : Cette fonctionnalité nécessiterait une configuration serveur. Pour l\'instant, veuillez télécharger le PDF et l\'envoyer manuellement.'
      );
    }, 500);
  };

  const handleNewQuestionnaire = () => {
    if (
      confirm(
        'Êtes-vous sûr de vouloir commencer un nouveau questionnaire ? Toutes les données actuelles seront effacées.'
      )
    ) {
      resetForm();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-6 bg-green-100 dark:bg-green-900 rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Questionnaire complété avec succès !
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            Merci d'avoir pris le temps de remplir ce questionnaire.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Vos réponses ont été enregistrées et resteront strictement confidentielles.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-8">
          <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Prochaines étapes
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
            <li>Téléchargez votre questionnaire au format PDF</li>
            <li>Conservez une copie pour vos dossiers personnels</li>
            <li>Le questionnaire sera utilisé lors de votre prochain rendez-vous</li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Télécharger votre questionnaire
            </h3>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-all font-medium text-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              {isGenerating ? 'Génération en cours...' : 'Télécharger le PDF'}
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Format : PDF • Taille : ~500 KB • Nom du fichier : Questionnaire_TND_[Nom]_[Date].pdf
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Recevoir par email (optionnel)
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="votre.email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={emailSent}
              />
              <button
                onClick={handleSendEmail}
                disabled={emailSent}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-all font-medium"
              >
                <Mail className="w-5 h-5 mr-2" />
                {emailSent ? 'Envoyé' : 'Envoyer'}
              </button>
            </div>
            {emailSent && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Un email avec le PDF sera envoyé à {email}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Récapitulatif de vos informations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {formData.identification && (
              <>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Nom :</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formData.identification.nom}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Prénom :</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formData.identification.prenom}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Date de naissance :</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formData.identification.dateNaissance}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Date du questionnaire :</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formData.identification.dateJour}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Genre :</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formData.identification.genre}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleNewQuestionnaire}
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Commencer un nouveau questionnaire
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Si vous avez des questions, n'hésitez pas à contacter le Centre Médico-Psychologique
          </p>
        </div>
      </div>
    </div>
  );
};
