import type { SymptomKey } from './constants';

export interface RawPatientData {
  "Sr.No.": number;
  "PATIENT NAME": string;
  "AGE/SEX": string;
  "OPD/IPD NO.": string | number;
  "DIET": string;
  "ADDICTION": string;
  "Maritial Status": string;
  "Mode of Onset Sudden/Gradual": string;
  "Family History": string;
  "Sandhi shula ": number;
  "Column11": number;
  "Column12": number;
  "Column13": number;
  "Sandhi shoth ": number;
  "Column15": number;
  "Column16": number;
  "Column17": number;
  "Sandhi daha ": number;
  "Column19"?: number; // Patient 21 is missing this
  "Column20": number;
  "Column21": number;
  "Sandhi Vaivarnya ": number;
  "Column23": number;
  "Column24": number;
  "Column25": number;
  "Sandhi Sparshsahatva ": number;
  "Column27": number;
  "Column28": number;
  "Column29": number;
  "PRAKRUTI": string;
  "URIC ACID (BEFORE)": string;
  "GROUP": "A" | "B";
  "URIC ACID (AFTER)": string;
}

export interface SymptomScores {
  day0: number | null;
  day7: number | null;
  day14: number | null;
  day21: number | null;
}

export interface ProcessedPatientData {
  id: number;
  group: "A" | "B";
  uricAcidBefore: number | null;
  uricAcidAfter: number | null;
  uricAcidReduction: number | null;
  diet: string;
  addiction: string;
  prakruti: string;
  symptoms: {
    sandhiShula: SymptomScores;
    sandhiShoth: SymptomScores;
    sandhiDaha: SymptomScores;
    sandhiVaivarnya: SymptomScores;
    sandhiSparshsahatva: SymptomScores;
  };
}

export interface UricAcidChartData {
    name: string;
    'Avg Before'?: number;
    'Avg After'?: number;
}

export interface SymptomChartData {
    day: string;
    'Score'?: number;
    'Group A'?: number;
    'Group B'?: number;
}

export interface DemographicsData {
    name: string;
    value: number;
}

export interface UricAcidStats {
    mean: number;
    median: number;
    stdDev: number;
    min: number;
    max: number;
    percentImproved: number;
}

export interface SymptomImprovementStat {
    symptomName: string;
    improvementPercentage: number;
}

export interface SingleGroupAnalysis {
    patientCount: number;
    uricAcidStats: UricAcidStats;
    uricAcidChartData: UricAcidChartData;
    symptomChartData: { [key in SymptomKey]: SymptomChartData[] };
    symptomImprovementStats: SymptomImprovementStat[];
}

export interface PatientReductionPoint {
    id: string;
    group: 'A' | 'B';
    reduction: number;
}

export interface TopResponder {
    id: number;
    reduction: number;
}

export interface ComparisonAnalysis {
    uricAcidChartData: UricAcidChartData[];
    symptomHeatmapData: SymptomHeatmapData[];
    uricAcidReductionDistribution: UricAcidReductionDistributionPoint[];
    scatterData: { // Kept for potential future use, but replaced in UI
        groupA: ScatterPoint[];
        groupB: ScatterPoint[];
    };
    patientReductionData: PatientReductionPoint[];
    topResponders: {
        groupA: TopResponder[];
        groupB: TopResponder[];
    }
}

export interface AnalysisResults {
    groupA: SingleGroupAnalysis;
    groupB: SingleGroupAnalysis;
    comparison: ComparisonAnalysis;
    demographics: {
        prakruti: DemographicsData[];
        diet: DemographicsData[];
        addiction: DemographicsData[];
    }
}

export interface UricAcidReductionDistributionPoint {
    range: string;
    'Group A': number;
    'Group B': number;
}

export interface ScatterPoint {
    id: number;
    before: number;
    after: number;
}

export interface SymptomHeatmapData {
    symptom: string;
    'Group A': number;
    'Group B': number;
}

export interface DashboardFilters {
    prakruti: 'All' | string;
    diet: 'All' | string;
}

export type Theme = 'light' | 'dark';