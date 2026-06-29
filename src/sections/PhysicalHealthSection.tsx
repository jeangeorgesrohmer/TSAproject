import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFormContext } from '../context/FormContext';
import { PhysicalHealthData } from '../types/form';
import { NavigationButtons } from '../components/NavigationButtons';

export const PhysicalHealthSection = () => {
  const { formData, updateFormData, setCurrentStep } = useFormContext();
  const [data, setData] = useState<Partial<PhysicalHealthData>>(
    formData.physicalHealth || {
      handicapsSensoriels: [],
      troublesDigestifs: [],
      regimeAlimentaire: [],
    }
  );

  useEffect(() => {
    updateFormData('physicalHealth', data);
  }, [data]);

  const handleNext = () => setCurrentStep(4);
  const handleBack = () => setCurrentStep(2);

  const showCycleMenstruel = formData.identification?.genre === 'Femme';

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Section 3 : Santé Physique et Maladies Chroniques
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={data.maladiesSomatiques || false}
                  onChange={(e) => setData({ ...data, maladiesSomatiques: e.target.checked })}
                  className="rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Maladies somatiques chroniques
                </span>
              </label>
              {data.maladiesSomatiques && (
                <textarea
                  value={data.detailsSomatiques || ''}
                  onChange={(e) => setData({ ...data, detailsSomatiques: e.target.value })}
                  placeholder="Précisez..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={data.maladiesPsy || false}
                  onChange={(e) => setData({ ...data, maladiesPsy: e.target.checked })}
                  className="rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Maladies psychiatriques
                </span>
              </label>
              {data.maladiesPsy && (
                <textarea
                  value={data.detailsPsy || ''}
                  onChange={(e) => setData({ ...data, detailsPsy: e.target.value })}
                  placeholder="Précisez..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={data.maladiesNeuro || false}
                  onChange={(e) => setData({ ...data, maladiesNeuro: e.target.checked })}
                  className="rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Maladies neurologiques
                </span>
              </label>
              {data.maladiesNeuro && (
                <textarea
                  value={data.detailsNeuro || ''}
                  onChange={(e) => setData({ ...data, detailsNeuro: e.target.value })}
                  placeholder="Précisez..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Épilepsie
              </label>
              <select
                value={data.epilepsie || ''}
                onChange={(e) => setData({ ...data, epilepsie: e.target.value })}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Sélectionnez...</option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
                <option value="En cours">En cours de diagnostic</option>
              </select>
              {data.epilepsie === 'Oui' && (
                <div className="mt-4 space-y-3">
                  <input
                    type="text"
                    placeholder="Type d'épilepsie"
                    value={data.epilepsieType || ''}
                    onChange={(e) => setData({ ...data, epilepsieType: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Fréquence des crises"
                    value={data.epilepsieFrequence || ''}
                    onChange={(e) => setData({ ...data, epilepsieFrequence: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Traitement actuel"
                    value={data.epilepsieTraitement || ''}
                    onChange={(e) => setData({ ...data, epilepsieTraitement: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Troubles digestifs
              </label>
              <div className="space-y-2">
                {['Constipation fréquente', 'Diarrhée fréquente', 'Reflux gastro-œsophagien',
                  "Syndrome de l'intestin irritable", 'Douleurs abdominales récurrentes',
                  'Intolérances alimentaires', 'Autre'].map((trouble) => (
                  <label key={trouble} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.troublesDigestifs?.includes(trouble) || false}
                      onChange={(e) => {
                        const current = data.troublesDigestifs || [];
                        setData({
                          ...data,
                          troublesDigestifs: e.target.checked
                            ? [...current, trouble]
                            : current.filter((t) => t !== trouble),
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{trouble}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Régime alimentaire particulier
              </label>
              <div className="space-y-2">
                {['Sans gluten', 'Sans lactose', 'Végétarien/Végétalien',
                  'Régime spécifique médical', 'Aucun', 'Autre'].map((regime) => (
                  <label key={regime} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.regimeAlimentaire?.includes(regime) || false}
                      onChange={(e) => {
                        const current = data.regimeAlimentaire || [];
                        setData({
                          ...data,
                          regimeAlimentaire: e.target.checked
                            ? [...current, regime]
                            : current.filter((r) => r !== regime),
                        });
                      }}
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{regime}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={data.restrictionsTexture || false}
                  onChange={(e) => setData({ ...data, restrictionsTexture: e.target.checked })}
                  className="rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Aliments évités pour texture/couleur/odeur
                </span>
              </label>
              {data.restrictionsTexture && (
                <textarea
                  value={data.alimentsEvites || ''}
                  onChange={(e) => setData({ ...data, alimentsEvites: e.target.value })}
                  placeholder="Listez les aliments évités..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={data.safeFoods || false}
                  onChange={(e) => setData({ ...data, safeFoods: e.target.checked })}
                  className="rounded"
                />
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Safe foods (aliments rassurants)
                </span>
              </label>
              {data.safeFoods && (
                <textarea
                  value={data.safeFoodsList || ''}
                  onChange={(e) => setData({ ...data, safeFoodsList: e.target.value })}
                  placeholder="Listez vos safe foods..."
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              )}
            </div>

            {showCycleMenstruel && (
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Cycle menstruel
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Régularité du cycle"
                    value={data.cycleMenstruel?.regularite || ''}
                    onChange={(e) =>
                      setData({
                        ...data,
                        cycleMenstruel: { ...data.cycleMenstruel, regularite: e.target.value } as any,
                      })
                    }
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.cycleMenstruel?.douleurs || false}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cycleMenstruel: { ...data.cycleMenstruel, douleurs: e.target.checked } as any,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Douleurs menstruelles</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.cycleMenstruel?.syndromePre || false}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cycleMenstruel: { ...data.cycleMenstruel, syndromePre: e.target.checked } as any,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Syndrome prémenstruel intense</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={data.cycleMenstruel?.aggravationTSA || false}
                      onChange={(e) =>
                        setData({
                          ...data,
                          cycleMenstruel: { ...data.cycleMenstruel, aggravationTSA: e.target.checked } as any,
                        })
                      }
                      className="rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Aggravation des symptômes TSA pendant les règles
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <NavigationButtons onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};
