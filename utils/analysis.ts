import { RawPatientData, ProcessedPatientData, DashboardFilters, UricAcidStats, SymptomHeatmapData, AnalysisResults, SingleGroupAnalysis, ComparisonAnalysis, SymptomScores, SymptomChartData, UricAcidChartData, SymptomImprovementStat, PatientReductionPoint, TopResponder } from '../types';
import { SYMPTOM_MAP, SYMPTOM_NAMES, SymptomKey } from '../constants';

const parseUricAcid = (value: string | undefined): number | null => {
    if (typeof value !== 'string') return null;
    const cleaned = value.replace(/mg%/i, '').trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
};

const safelyGetScore = (patient: RawPatientData, key: string): number | null => {
    const value = (patient as any)[key];
    return typeof value === 'number' ? value : null;
};

export const processPatientData = (data: RawPatientData[]): ProcessedPatientData[] => {
    return data
        .filter(p => p['Sr.No.']) // Filter out header row
        .map(p => {
            const symptoms: { [key in SymptomKey]: SymptomScores } = (Object.keys(SYMPTOM_MAP) as SymptomKey[]).reduce((acc, key) => {
                const [day0Key, day7Key, day14Key, day21Key] = SYMPTOM_MAP[key];
                acc[key] = {
                    day0: safelyGetScore(p, day0Key),
                    day7: safelyGetScore(p, day7Key),
                    day14: safelyGetScore(p, day14Key),
                    day21: safelyGetScore(p, day21Key),
                };
                return acc;
            }, {} as { [key in SymptomKey]: SymptomScores });

            const before = parseUricAcid(p['URIC ACID (BEFORE)']);
            const after = parseUricAcid(p['URIC ACID (AFTER)']);
            const reduction = (before !== null && after !== null) ? before - after : null;

            return {
                id: p['Sr.No.'],
                group: p.GROUP,
                uricAcidBefore: before,
                uricAcidAfter: after,
                uricAcidReduction: reduction,
                diet: p.DIET,
                addiction: p.ADDICTION,
                prakruti: p.PRAKRUTI,
                symptoms: symptoms
            };
        });
};

const calculateAverage = (arr: (number | null)[]): number => {
    const validNumbers = arr.filter(n => typeof n === 'number') as number[];
    if (validNumbers.length === 0) return 0;
    const sum = validNumbers.reduce((acc, val) => acc + val, 0);
    return sum / validNumbers.length;
};

const calculateStats = (arr: (number | null)[]): UricAcidStats => {
    const nums = (arr.filter(n => typeof n === 'number') as number[]).sort((a, b) => a - b);
    if (nums.length === 0) return { mean: 0, median: 0, stdDev: 0, min: 0, max: 0, percentImproved: 0 };

    const mean = calculateAverage(nums);
    const mid = Math.floor(nums.length / 2);
    const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    const stdDev = Math.sqrt(nums.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / nums.length);
    const improvedCount = nums.filter(n => n > 0).length;
    const percentImproved = (improvedCount / nums.length) * 100;
    
    return {
        mean: parseFloat(mean.toFixed(2)),
        median: parseFloat(median.toFixed(2)),
        stdDev: parseFloat(stdDev.toFixed(2)),
        min: parseFloat(nums[0].toFixed(2)),
        max: parseFloat(nums[nums.length - 1].toFixed(2)),
        percentImproved: parseFloat(percentImproved.toFixed(1)),
    };
};

const analyzeSingleGroup = (groupData: ProcessedPatientData[], groupName: 'A' | 'B'): SingleGroupAnalysis => {
    const patientCount = groupData.length;
    
    // Uric Acid
    const uricAcidStats = calculateStats(groupData.map(p => p.uricAcidReduction));
    const uricAcidChartData: UricAcidChartData = {
        name: `Group ${groupName}`,
        'Avg Before': parseFloat(calculateAverage(groupData.map(p => p.uricAcidBefore)).toFixed(2)),
        'Avg After': parseFloat(calculateAverage(groupData.map(p => p.uricAcidAfter)).toFixed(2)),
    };

    // Symptoms
    const symptomChartData = (Object.keys(SYMPTOM_MAP) as SymptomKey[]).reduce((acc, symptomKey) => {
        acc[symptomKey] = [
            { day: '0th Day', 'Score': parseFloat(calculateAverage(groupData.map(p => p.symptoms[symptomKey].day0)).toFixed(2)) },
            { day: '7th Day', 'Score': parseFloat(calculateAverage(groupData.map(p => p.symptoms[symptomKey].day7)).toFixed(2)) },
            { day: '14th Day', 'Score': parseFloat(calculateAverage(groupData.map(p => p.symptoms[symptomKey].day14)).toFixed(2)) },
            { day: '21st Day', 'Score': parseFloat(calculateAverage(groupData.map(p => p.symptoms[symptomKey].day21)).toFixed(2)) },
        ];
        return acc;
    }, {} as { [key in SymptomKey]: SymptomChartData[] });

    const symptomImprovementStats: SymptomImprovementStat[] = (Object.keys(SYMPTOM_MAP) as SymptomKey[]).map(symptomKey => {
        const improvements = groupData.map(p => {
            const day0 = p.symptoms[symptomKey].day0;
            const day21 = p.symptoms[symptomKey].day21;
            if (day0 !== null && day21 !== null && day0 > 0) {
                return ((day0 - day21) / day0) * 100;
            }
            return null;
        });
        return {
            symptomName: SYMPTOM_NAMES[symptomKey],
            improvementPercentage: parseFloat(calculateAverage(improvements).toFixed(1)),
        };
    });

    return {
        patientCount,
        uricAcidStats,
        uricAcidChartData,
        symptomChartData,
        symptomImprovementStats,
    };
};

const analyzeComparison = (groupA: ProcessedPatientData[], groupB: ProcessedPatientData[]): ComparisonAnalysis => {
     const uricAcidChartData: UricAcidChartData[] = [
        { name: 'Group A', 'Avg Before': calculateAverage(groupA.map(p => p.uricAcidBefore)), 'Avg After': calculateAverage(groupA.map(p => p.uricAcidAfter)) },
        { name: 'Group B', 'Avg Before': calculateAverage(groupB.map(p => p.uricAcidBefore)), 'Avg After': calculateAverage(groupB.map(p => p.uricAcidAfter)) }
    ].map(d => ({ ...d, 'Avg Before': parseFloat(d['Avg Before']!.toFixed(2)), 'Avg After': parseFloat(d['Avg After']!.toFixed(2))}));

    // Symptom Heatmap Data
    const symptomHeatmapData: SymptomHeatmapData[] = (Object.keys(SYMPTOM_MAP) as SymptomKey[]).map(symptomKey => {
        const calcAvgImprovement = (group: ProcessedPatientData[]) => {
            const improvements = group.map(p => {
                const day0 = p.symptoms[symptomKey].day0;
                const day21 = p.symptoms[symptomKey].day21;
                if (day0 !== null && day21 !== null && day0 > 0) {
                    return ((day0 - day21) / day0) * 100;
                }
                return null;
            });
            return calculateAverage(improvements);
        };

        return {
            symptom: SYMPTOM_NAMES[symptomKey],
            'Group A': parseFloat(calcAvgImprovement(groupA).toFixed(1)),
            'Group B': parseFloat(calcAvgImprovement(groupB).toFixed(1)),
        };
    });
    
    // Uric Acid Reduction Distribution
    const allReductions = [...groupA, ...groupB].map(p => p.uricAcidReduction).filter(r => r !== null) as number[];
    const baseResult = {
        uricAcidChartData,
        symptomHeatmapData,
        uricAcidReductionDistribution: [],
        scatterData: { groupA: [], groupB: [] }, // Kept for type consistency
        patientReductionData: [],
        topResponders: { groupA: [], groupB: [] },
    };
    if (allReductions.length === 0) {
      return baseResult;
    }
    const minRange = Math.min(...allReductions);
    const maxRange = Math.max(...allReductions);
    const binSize = 2;
    const bins: {range: string, 'Group A': number, 'Group B': number}[] = [];

    for (let i = Math.floor(minRange / binSize) * binSize; i <= maxRange; i += binSize) {
        const range = `${i}-${i + binSize}`;
        bins.push({ range, 'Group A': 0, 'Group B': 0 });
    }
    
    groupA.forEach(p => {
        if(p.uricAcidReduction === null) return;
        const binIndex = bins.findIndex(b => {
            const [start] = b.range.split('-').map(Number);
            return p.uricAcidReduction! >= start && p.uricAcidReduction! < start + binSize;
        });
        if (binIndex !== -1) bins[binIndex]['Group A']++;
    });

    groupB.forEach(p => {
        if(p.uricAcidReduction === null) return;
        const binIndex = bins.findIndex(b => {
            const [start] = b.range.split('-').map(Number);
            return p.uricAcidReduction! >= start && p.uricAcidReduction! < start + binSize;
        });
        if (binIndex !== -1) bins[binIndex]['Group B']++;
    });

    // Data for Patient-by-Patient Reduction Chart
    const patientReductionData: PatientReductionPoint[] = [...groupA, ...groupB]
        .filter(p => p.uricAcidReduction !== null)
        .map(p => ({
            id: `P${p.id}`,
            group: p.group,
            reduction: p.uricAcidReduction!,
        }))
        .sort((a, b) => b.reduction - a.reduction);

    // Data for Top Responders
    const getTopResponders = (group: ProcessedPatientData[]): TopResponder[] => {
        return group
            .filter(p => p.uricAcidReduction !== null)
            .sort((a, b) => b.uricAcidReduction! - a.uricAcidReduction!)
            .slice(0, 3)
            .map(p => ({
                id: p.id,
                reduction: parseFloat(p.uricAcidReduction!.toFixed(2)),
            }));
    };

    const topResponders = {
        groupA: getTopResponders(groupA),
        groupB: getTopResponders(groupB),
    };

    return { 
        ...baseResult, 
        uricAcidReductionDistribution: bins, 
        patientReductionData,
        topResponders
    };
};

export const getFilterOptions = (processedData: ProcessedPatientData[]) => {
    const prakruti = [...new Set(processedData.map(p => p.prakruti))];
    const diet = [...new Set(processedData.map(p => p.diet))];
    return { prakruti, diet };
};

export const analyzeData = (processedData: ProcessedPatientData[], filters: DashboardFilters): AnalysisResults => {
    const filteredData = processedData.filter(p => 
        (filters.prakruti === 'All' || p.prakruti === filters.prakruti) &&
        (filters.diet === 'All' || p.diet === filters.diet)
    );

    const groupAData = filteredData.filter(p => p.group === 'A');
    const groupBData = filteredData.filter(p => p.group === 'B');

    // Demographics
    const getDistribution = (category: keyof Pick<ProcessedPatientData, 'prakruti' | 'diet' | 'addiction'>) => {
        const counts = filteredData.reduce((acc, p) => {
            const key = p[category];
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    };

    const demographics = {
        prakruti: getDistribution('prakruti'),
        diet: getDistribution('diet'),
        addiction: getDistribution('addiction')
    };

    return {
        groupA: analyzeSingleGroup(groupAData, 'A'),
        groupB: analyzeSingleGroup(groupBData, 'B'),
        comparison: analyzeComparison(groupAData, groupBData),
        demographics
    };
};