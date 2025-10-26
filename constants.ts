

export const SYMPTOM_MAP = {
  sandhiShula: ["Sandhi shula ", "Column11", "Column12", "Column13"],
  sandhiShoth: ["Sandhi shoth ", "Column15", "Column16", "Column17"],
  sandhiDaha: ["Sandhi daha ", "Column19", "Column20", "Column21"],
  sandhiVaivarnya: ["Sandhi Vaivarnya ", "Column23", "Column24", "Column25"],
  sandhiSparshsahatva: ["Sandhi Sparshsahatva ", "Column27", "Column28", "Column29"],
} as const;

export type SymptomKey = keyof typeof SYMPTOM_MAP;

export const SYMPTOM_NAMES: { [key in SymptomKey]: string } = {
  sandhiShula: "Sandhi shula",
  sandhiShoth: "Sandhi shoth",
  sandhiDaha: "Sandhi daha",
  sandhiVaivarnya: "Sandhi Vaivarnya",
  sandhiSparshsahatva: "Sandhi Sparshsahatva",
};

export const DEMOGRAPHICS_COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0'
];