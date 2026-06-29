import React, { useState, useEffect } from 'react';
import { Heart, Plus, Trash2 } from 'lucide-react';
import { Input, Textarea, Checkbox, RadioGroup } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { MedicalHistoryData, ExamEntry, DiagnosticEntry, MedicationEntry, YesNoUnknown } from '../types/form';

export const MedicalHistorySection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<MedicalHistoryData>(
    formData.medicalHistory || {
      exams: [],
      diagnostics: [],
      hasSomaticDiseases: false,
      hasPsychiatricDiseases: false,
      hasNeurologicalDiseases: false,
      hasBrainInjury: false,
      hasDisabilities: false,
      sleepDifficulties: {
        fallAsleep: false,
        wakeEarly: false,
        multipleWakeups: false,
        sleepApnea: false,
      },
      addiction: 'unknown' as YesNoUnknown,
      pastMedications: '',
      currentMedications: [],
      familyHistory: {
        somatic: '',
        psychiatric: '',
        neurodevelopmental: '',
      },
    }
  );

  useEffect(() => {
    updateFormData('medicalHistory', data);
  }, [data]);

  const addExam = () => {
    setData({
      ...data,
      exams: [...data.exams, { type: '', year: '', location: '', result: '' }],
    });
  };

  const removeExam = (index: number) => {
    setData({
      ...data,
      exams: data.exams.filter((_, i) => i !== index),
    });
  };

  const updateExam = (index: number, field: keyof ExamEntry, value: string) => {
    const newExams = [...data.exams];
    newExams[index] = { ...newExams[index], [field]: value };
    setData({ ...data, exams: newExams });
  };

  const addDiagnostic = () => {
    setData({
      ...data,
      diagnostics: [...data.diagnostics, { name: '', role: '', diagnostics: '' }],
    });
  };

  const removeDiagnostic = (index: number) => {
    setData({
      ...data,
      diagnostics: data.diagnostics.filter((_, i) => i !== index),
    });
  };

  const updateDiagnostic = (index: number, field: keyof DiagnosticEntry, value: string) => {
    const newDiagnostics = [...data.diagnostics];
    newDiagnostics[index] = { ...newDiagnostics[index], [field]: value };
    setData({ ...data, diagnostics: newDiagnostics });
  };

  const addMedication = () => {
    setData({
      ...data,
      currentMedications: [...data.currentMedications, { name: '', reason: '' }],
    });
  };

  const removeMedication = (index: number) => {
    setData({
      ...data,
      currentMedications: data.currentMedications.filter((_, i) => i !== index),
    });
  };

  const updateMedication = (index: number, field: keyof MedicationEntry, value: string) => {
    const newMedications = [...data.currentMedications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setData({ ...data, currentMedications: newMedications });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
            <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Histoire médicale
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 2 : Histoire Médicale - Examens et Diagnostics
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Examens passés
              </h3>
              <button
                type="button"
                onClick={addExam}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            </div>
            {data.exams.map((exam, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Examen {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeExam(index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id={`exam-type-${index}`}
                    label="Type d'examen"
                    placeholder="Ex: génétique, neurologique..."
                    value={exam.type}
                    onChange={(e) => updateExam(index, 'type', e.target.value)}
                  />
                  <Input
                    id={`exam-year-${index}`}
                    label="Année"
                    type="text"
                    placeholder="Ex: 2020"
                    value={exam.year}
                    onChange={(e) => updateExam(index, 'year', e.target.value)}
                  />
                  <Input
                    id={`exam-location-${index}`}
                    label="Lieu"
                    value={exam.location}
                    onChange={(e) => updateExam(index, 'location', e.target.value)}
                  />
                  <Input
                    id={`exam-result-${index}`}
                    label="Résultat"
                    value={exam.result}
                    onChange={(e) => updateExam(index, 'result', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Diagnostics évoqués par un professionnel
              </h3>
              <button
                type="button"
                onClick={addDiagnostic}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            </div>
            {data.diagnostics.map((diagnostic, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Professionnel {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeDiagnostic(index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <Input
                    id={`diag-name-${index}`}
                    label="Nom du professionnel"
                    value={diagnostic.name}
                    onChange={(e) => updateDiagnostic(index, 'name', e.target.value)}
                  />
                  <Input
                    id={`diag-role-${index}`}
                    label="Fonction"
                    placeholder="Ex: Psychiatre, psychologue..."
                    value={diagnostic.role}
                    onChange={(e) => updateDiagnostic(index, 'role', e.target.value)}
                  />
                  <Textarea
                    id={`diag-diagnostics-${index}`}
                    label="Diagnostics évoqués"
                    value={diagnostic.diagnostics}
                    onChange={(e) => updateDiagnostic(index, 'diagnostics', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <Checkbox
              id="hasSomaticDiseases"
              label="Maladies somatiques chroniques"
              checked={data.hasSomaticDiseases}
              onChange={(e) =>
                setData({
                  ...data,
                  hasSomaticDiseases: e.target.checked,
                  somaticDetails: e.target.checked ? data.somaticDetails : '',
                })
              }
            />
            {data.hasSomaticDiseases && (
              <Textarea
                id="somaticDetails"
                label="Détails"
                value={data.somaticDetails || ''}
                onChange={(e) => setData({ ...data, somaticDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasPsychiatricDiseases"
              label="Maladies psychiatriques"
              checked={data.hasPsychiatricDiseases}
              onChange={(e) =>
                setData({
                  ...data,
                  hasPsychiatricDiseases: e.target.checked,
                  psychiatricDetails: e.target.checked ? data.psychiatricDetails : '',
                })
              }
            />
            {data.hasPsychiatricDiseases && (
              <Textarea
                id="psychiatricDetails"
                label="Détails"
                value={data.psychiatricDetails || ''}
                onChange={(e) => setData({ ...data, psychiatricDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasNeurologicalDiseases"
              label="Maladies neurologiques"
              checked={data.hasNeurologicalDiseases}
              onChange={(e) =>
                setData({
                  ...data,
                  hasNeurologicalDiseases: e.target.checked,
                  neurologicalDetails: e.target.checked ? data.neurologicalDetails : '',
                })
              }
            />
            {data.hasNeurologicalDiseases && (
              <Textarea
                id="neurologicalDetails"
                label="Détails"
                value={data.neurologicalDetails || ''}
                onChange={(e) => setData({ ...data, neurologicalDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasBrainInjury"
              label="Accident/lésion cérébrale ou perte de conscience"
              checked={data.hasBrainInjury}
              onChange={(e) =>
                setData({
                  ...data,
                  hasBrainInjury: e.target.checked,
                  brainInjuryDetails: e.target.checked ? data.brainInjuryDetails : '',
                })
              }
            />
            {data.hasBrainInjury && (
              <Textarea
                id="brainInjuryDetails"
                label="Détails"
                value={data.brainInjuryDetails || ''}
                onChange={(e) => setData({ ...data, brainInjuryDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <Checkbox
              id="hasDisabilities"
              label="Perte d'audition, vision, handicap moteur"
              checked={data.hasDisabilities}
              onChange={(e) =>
                setData({
                  ...data,
                  hasDisabilities: e.target.checked,
                  disabilitiesDetails: e.target.checked ? data.disabilitiesDetails : '',
                })
              }
            />
            {data.hasDisabilities && (
              <Textarea
                id="disabilitiesDetails"
                label="Détails"
                value={data.disabilitiesDetails || ''}
                onChange={(e) => setData({ ...data, disabilitiesDetails: e.target.value })}
              />
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Difficultés de sommeil
            </h3>
            <div className="space-y-2">
              <Checkbox
                id="fallAsleep"
                label="Difficulté à s'endormir"
                checked={data.sleepDifficulties.fallAsleep}
                onChange={(e) =>
                  setData({
                    ...data,
                    sleepDifficulties: { ...data.sleepDifficulties, fallAsleep: e.target.checked },
                  })
                }
              />
              <Checkbox
                id="wakeEarly"
                label="Réveil trop tôt"
                checked={data.sleepDifficulties.wakeEarly}
                onChange={(e) =>
                  setData({
                    ...data,
                    sleepDifficulties: { ...data.sleepDifficulties, wakeEarly: e.target.checked },
                  })
                }
              />
              <Checkbox
                id="multipleWakeups"
                label="Plusieurs réveils nocturnes"
                checked={data.sleepDifficulties.multipleWakeups}
                onChange={(e) =>
                  setData({
                    ...data,
                    sleepDifficulties: { ...data.sleepDifficulties, multipleWakeups: e.target.checked },
                  })
                }
              />
              <Checkbox
                id="sleepApnea"
                label="Apnées du sommeil"
                checked={data.sleepDifficulties.sleepApnea}
                onChange={(e) =>
                  setData({
                    ...data,
                    sleepDifficulties: { ...data.sleepDifficulties, sleepApnea: e.target.checked },
                  })
                }
              />
            </div>
          </div>

          <RadioGroup
            label="Addiction (alcool, tabac, drogues, jeux...)"
            name="addiction"
            value={data.addiction}
            onChange={(value) => setData({ ...data, addiction: value as YesNoUnknown })}
          />

          <Textarea
            id="pastMedications"
            label="Médicaments passés pour anxiété, dépression, agitation, troubles de l'attention..."
            placeholder="Listez les médicaments et leurs périodes de prise"
            value={data.pastMedications}
            onChange={(e) => setData({ ...data, pastMedications: e.target.value })}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Médicaments actuels
              </h3>
              <button
                type="button"
                onClick={addMedication}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            </div>
            {data.currentMedications.map((medication, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">Médicament {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id={`med-name-${index}`}
                    label="Nom du médicament"
                    value={medication.name}
                    onChange={(e) => updateMedication(index, 'name', e.target.value)}
                  />
                  <Input
                    id={`med-reason-${index}`}
                    label="Raison"
                    value={medication.reason}
                    onChange={(e) => updateMedication(index, 'reason', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Antécédents familiaux
            </h3>
            <div className="space-y-4">
              <Textarea
                id="familySomatic"
                label="Maladies somatiques dans la famille"
                value={data.familyHistory.somatic}
                onChange={(e) =>
                  setData({
                    ...data,
                    familyHistory: { ...data.familyHistory, somatic: e.target.value },
                  })
                }
              />
              <Textarea
                id="familyPsychiatric"
                label="Maladies psychiatriques dans la famille"
                value={data.familyHistory.psychiatric}
                onChange={(e) =>
                  setData({
                    ...data,
                    familyHistory: { ...data.familyHistory, psychiatric: e.target.value },
                  })
                }
              />
              <Textarea
                id="familyNeurodevelopmental"
                label="Troubles neurodéveloppementaux dans la famille"
                value={data.familyHistory.neurodevelopmental}
                onChange={(e) =>
                  setData({
                    ...data,
                    familyHistory: { ...data.familyHistory, neurodevelopmental: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
