import React, { useState, useEffect } from 'react';
import { Focus } from 'lucide-react';
import { Input, Textarea, RadioGroup, Checkbox } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { AttentionData, YesNoUnknown } from '../types/form';

export const AttentionSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<AttentionData>(
    formData.attention || {
      inattention: 'unknown' as YesNoUnknown,
      imprudence: 'unknown' as YesNoUnknown,
      disorganization: 'unknown' as YesNoUnknown,
      lostGoal: 'unknown' as YesNoUnknown,
      impulsivity: 'unknown' as YesNoUnknown,
      timeNotion: 'unknown' as YesNoUnknown,
      angerFrustration: 'unknown' as YesNoUnknown,
      moodSwings: 'unknown' as YesNoUnknown,
      losingObjects: 'unknown' as YesNoUnknown,
      waitingDifficulty: 'unknown' as YesNoUnknown,
      chattiness: 'unknown' as YesNoUnknown,
      opposition: 'unknown' as YesNoUnknown,
      idleDifficulty: 'unknown' as YesNoUnknown,
      agitation: 'unknown' as YesNoUnknown,
      currentDifficulties: '',
      tics: {
        hasMotorTics: false,
        hasVocalTics: false,
      },
    }
  );

  useEffect(() => {
    updateFormData('attention', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg mr-4">
            <Focus className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Capacité d'attention et d'organisation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 13 : Capacité d'Attention et d'Organisation
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Durant l'enfance
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Inattention, distraction"
                name="inattention"
                value={data.inattention}
                onChange={(value) => setData({ ...data, inattention: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Imprudence, mise en danger"
                name="imprudence"
                value={data.imprudence}
                onChange={(value) => setData({ ...data, imprudence: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Désorganisation"
                name="disorganization"
                value={data.disorganization}
                onChange={(value) => setData({ ...data, disorganization: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Perte de vue de l'objectif"
                name="lostGoal"
                value={data.lostGoal}
                onChange={(value) => setData({ ...data, lostGoal: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Impulsivité"
                name="impulsivity"
                value={data.impulsivity}
                onChange={(value) => setData({ ...data, impulsivity: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Peu de notion du temps"
                name="timeNotion"
                value={data.timeNotion}
                onChange={(value) => setData({ ...data, timeNotion: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Colère, frustration"
                name="angerFrustration"
                value={data.angerFrustration}
                onChange={(value) => setData({ ...data, angerFrustration: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Sautes d'humeur rapides"
                name="moodSwings"
                value={data.moodSwings}
                onChange={(value) => setData({ ...data, moodSwings: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Perte d'objets importants"
                name="losingObjects"
                value={data.losingObjects}
                onChange={(value) => setData({ ...data, losingObjects: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à attendre son tour"
                name="waitingDifficulty"
                value={data.waitingDifficulty}
                onChange={(value) => setData({ ...data, waitingDifficulty: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Bavardage en classe"
                name="chattiness"
                value={data.chattiness}
                onChange={(value) => setData({ ...data, chattiness: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Opposition aux adultes"
                name="opposition"
                value={data.opposition}
                onChange={(value) => setData({ ...data, opposition: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à rester sans rien faire"
                name="idleDifficulty"
                value={data.idleDifficulty}
                onChange={(value) => setData({ ...data, idleDifficulty: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Agitation, bouge trop"
                name="agitation"
                value={data.agitation}
                onChange={(value) => setData({ ...data, agitation: value as YesNoUnknown })}
              />
            </div>
          </div>

          <Textarea
            id="currentDifficulties"
            label="Difficultés actuelles qui persistent"
            placeholder="Décrivez les difficultés d'attention ou d'organisation qui persistent"
            value={data.currentDifficulties}
            onChange={(e) => setData({ ...data, currentDifficulties: e.target.value })}
          />

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Tics
            </h3>
            <div className="space-y-6">
              <div>
                <Checkbox
                  id="hasMotorTics"
                  label="Tics moteurs"
                  checked={data.tics.hasMotorTics}
                  onChange={(e) =>
                    setData({
                      ...data,
                      tics: {
                        ...data.tics,
                        hasMotorTics: e.target.checked,
                        motorDescription: e.target.checked ? data.tics.motorDescription : undefined,
                        motorStartAge: e.target.checked ? data.tics.motorStartAge : undefined,
                        motorDuration: e.target.checked ? data.tics.motorDuration : undefined,
                      },
                    })
                  }
                />
                {data.tics.hasMotorTics && (
                  <div className="ml-8 mt-4 space-y-4">
                    <Textarea
                      id="motorDescription"
                      label="Description"
                      value={data.tics.motorDescription || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, motorDescription: e.target.value },
                        })
                      }
                    />
                    <Input
                      id="motorStartAge"
                      label="Âge de début (années)"
                      type="text"
                      value={data.tics.motorStartAge || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, motorStartAge: e.target.value },
                        })
                      }
                    />
                    <Input
                      id="motorDuration"
                      label="Durée"
                      type="text"
                      placeholder="Ex: 6 mois, toujours présent..."
                      value={data.tics.motorDuration || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, motorDuration: e.target.value },
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <div>
                <Checkbox
                  id="hasVocalTics"
                  label="Tics vocaux"
                  checked={data.tics.hasVocalTics}
                  onChange={(e) =>
                    setData({
                      ...data,
                      tics: {
                        ...data.tics,
                        hasVocalTics: e.target.checked,
                        vocalDescription: e.target.checked ? data.tics.vocalDescription : undefined,
                        vocalStartAge: e.target.checked ? data.tics.vocalStartAge : undefined,
                        vocalDuration: e.target.checked ? data.tics.vocalDuration : undefined,
                      },
                    })
                  }
                />
                {data.tics.hasVocalTics && (
                  <div className="ml-8 mt-4 space-y-4">
                    <Textarea
                      id="vocalDescription"
                      label="Description"
                      value={data.tics.vocalDescription || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, vocalDescription: e.target.value },
                        })
                      }
                    />
                    <Input
                      id="vocalStartAge"
                      label="Âge de début (années)"
                      type="text"
                      value={data.tics.vocalStartAge || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, vocalStartAge: e.target.value },
                        })
                      }
                    />
                    <Input
                      id="vocalDuration"
                      label="Durée"
                      type="text"
                      placeholder="Ex: 1 an, toujours présent..."
                      value={data.tics.vocalDuration || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tics: { ...data.tics, vocalDuration: e.target.value },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
