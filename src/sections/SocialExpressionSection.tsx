import React, { useState, useEffect } from 'react';
import { UsersRound } from 'lucide-react';
import { Textarea, RadioGroup } from '../components/FormFields';
import { NavigationButtons } from '../components/NavigationButtons';
import { useFormContext } from '../context/FormContext';
import { SocialExpressionData, YesNoUnknown } from '../types/form';

export const SocialExpressionSection: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [data, setData] = useState<SocialExpressionData>(
    formData.socialExpression || {
      literalInterpretation: 'unknown' as YesNoUnknown,
      eyeContactAvoidance: 'unknown' as YesNoUnknown,
      intentionComprehension: 'unknown' as YesNoUnknown,
      selfCenteredTopics: 'unknown' as YesNoUnknown,
      expressionComprehension: 'unknown' as YesNoUnknown,
      makingFriends: 'unknown' as YesNoUnknown,
      lackOfFriends: 'unknown' as YesNoUnknown,
      expectationComprehension: 'unknown' as YesNoUnknown,
      isolationTendency: 'unknown' as YesNoUnknown,
      lackOfInterest: 'unknown' as YesNoUnknown,
      emotionalSensitivity: 'unknown' as YesNoUnknown,
      emotionCause: 'unknown' as YesNoUnknown,
      emotionReaction: 'unknown' as YesNoUnknown,
      selfEmotionIdentification: 'unknown' as YesNoUnknown,
      socialPersistingDifficulties: '',
      isolationFeeling: 'unknown' as YesNoUnknown,
      rejectionFear: 'unknown' as YesNoUnknown,
      friendshipFear: 'unknown' as YesNoUnknown,
      groupAnxiety: 'unknown' as YesNoUnknown,
      reassuranceNeed: 'unknown' as YesNoUnknown,
      speakingFear: 'unknown' as YesNoUnknown,
      invisibilityWish: 'unknown' as YesNoUnknown,
      solitudePreference: 'unknown' as YesNoUnknown,
      incompetenceFeeling: 'unknown' as YesNoUnknown,
      rejectionWatch: 'unknown' as YesNoUnknown,
      clingingTendency: 'unknown' as YesNoUnknown,
      anxietyPersistingDifficulties: '',
    }
  );

  useEffect(() => {
    updateFormData('socialExpression', data);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg mr-4">
            <UsersRound className="w-8 h-8 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Expression, compréhension et anxiété sociale
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Section 11 : Interactions Sociales et Émotionnelles
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Compréhension sociale
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Prendre les choses au 1er degré, manque d'humour"
                name="literalInterpretation"
                value={data.literalInterpretation}
                onChange={(value) => setData({ ...data, literalInterpretation: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Évitement du regard"
                name="eyeContactAvoidance"
                value={data.eyeContactAvoidance}
                onChange={(value) => setData({ ...data, eyeContactAvoidance: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les intentions/émotions des autres"
                name="intentionComprehension"
                value={data.intentionComprehension}
                onChange={(value) => setData({ ...data, intentionComprehension: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Ne parler que de ses propres intérêts"
                name="selfCenteredTopics"
                value={data.selfCenteredTopics}
                onChange={(value) => setData({ ...data, selfCenteredTopics: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les expressions du visage, gestes"
                name="expressionComprehension"
                value={data.expressionComprehension}
                onChange={(value) => setData({ ...data, expressionComprehension: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à se faire des amis"
                name="makingFriends"
                value={data.makingFriends}
                onChange={(value) => setData({ ...data, makingFriends: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque ou absence d'amis"
                name="lackOfFriends"
                value={data.lackOfFriends}
                onChange={(value) => setData({ ...data, lackOfFriends: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre les attentes des autres"
                name="expectationComprehension"
                value={data.expectationComprehension}
                onChange={(value) => setData({ ...data, expectationComprehension: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Tendance à l'isolement"
                name="isolationTendency"
                value={data.isolationTendency}
                onChange={(value) => setData({ ...data, isolationTendency: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque d'intérêt pour les autres"
                name="lackOfInterest"
                value={data.lackOfInterest}
                onChange={(value) => setData({ ...data, lackOfInterest: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Manque ou extrême sensibilité aux émotions des autres"
                name="emotionalSensitivity"
                value={data.emotionalSensitivity}
                onChange={(value) => setData({ ...data, emotionalSensitivity: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à comprendre la cause des émotions"
                name="emotionCause"
                value={data.emotionCause}
                onChange={(value) => setData({ ...data, emotionCause: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à réagir aux émotions des autres"
                name="emotionReaction"
                value={data.emotionReaction}
                onChange={(value) => setData({ ...data, emotionReaction: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Difficulté à identifier ses propres émotions"
                name="selfEmotionIdentification"
                value={data.selfEmotionIdentification}
                onChange={(value) => setData({ ...data, selfEmotionIdentification: value as YesNoUnknown })}
              />

              <Textarea
                id="socialPersistingDifficulties"
                label="Difficultés qui persistent actuellement"
                placeholder="Décrivez les difficultés sociales qui persistent"
                value={data.socialPersistingDifficulties}
                onChange={(e) => setData({ ...data, socialPersistingDifficulties: e.target.value })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Anxiété sociale
            </h3>
            <div className="space-y-6">
              <RadioGroup
                label="Sentiment d'isolement, de solitude"
                name="isolationFeeling"
                value={data.isolationFeeling}
                onChange={(value) => setData({ ...data, isolationFeeling: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Peur d'être rejeté, moqué, humilié"
                name="rejectionFear"
                value={data.rejectionFear}
                onChange={(value) => setData({ ...data, rejectionFear: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Crainte de se faire des amis"
                name="friendshipFear"
                value={data.friendshipFear}
                onChange={(value) => setData({ ...data, friendshipFear: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Inquiétude en groupe"
                name="groupAnxiety"
                value={data.groupAnxiety}
                onChange={(value) => setData({ ...data, groupAnxiety: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Besoin de forte rassurance pour participer"
                name="reassuranceNeed"
                value={data.reassuranceNeed}
                onChange={(value) => setData({ ...data, reassuranceNeed: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Peur de prendre la parole"
                name="speakingFear"
                value={data.speakingFear}
                onChange={(value) => setData({ ...data, speakingFear: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Idée de se rendre invisible"
                name="invisibilityWish"
                value={data.invisibilityWish}
                onChange={(value) => setData({ ...data, invisibilityWish: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Idée qu'il vaut mieux rester seul"
                name="solitudePreference"
                value={data.solitudePreference}
                onChange={(value) => setData({ ...data, solitudePreference: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Sentiment de manque de compétence/valeur"
                name="incompetenceFeeling"
                value={data.incompetenceFeeling}
                onChange={(value) => setData({ ...data, incompetenceFeeling: value as YesNoUnknown })}
              />

              <RadioGroup
                label="À l'affût des signes de rejet"
                name="rejectionWatch"
                value={data.rejectionWatch}
                onChange={(value) => setData({ ...data, rejectionWatch: value as YesNoUnknown })}
              />

              <RadioGroup
                label="Tendance à s'accrocher aux rares amis"
                name="clingingTendency"
                value={data.clingingTendency}
                onChange={(value) => setData({ ...data, clingingTendency: value as YesNoUnknown })}
              />

              <Textarea
                id="anxietyPersistingDifficulties"
                label="Difficultés qui persistent actuellement"
                placeholder="Décrivez les difficultés liées à l'anxiété sociale qui persistent"
                value={data.anxietyPersistingDifficulties}
                onChange={(e) => setData({ ...data, anxietyPersistingDifficulties: e.target.value })}
              />
            </div>
          </div>
        </div>

        <NavigationButtons />
      </div>
    </div>
  );
};
