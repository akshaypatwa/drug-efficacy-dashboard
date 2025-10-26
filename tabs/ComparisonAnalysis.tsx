import React from 'react';
import { motion } from 'framer-motion';
import type { ComparisonAnalysis, DemographicsData, UricAcidStats } from '../types';
import { UricAcidChart } from '../components/UricAcidChart';
import { SymptomImprovementHeatmap } from '../components/SymptomImprovementHeatmap';
import { UricAcidReductionDistributionChart } from '../components/UricAcidReductionDistributionChart';
import { DemographicsChart } from '../components/DemographicsChart';
import { ConclusionCard } from '../components/ConclusionCard';
import { ComparisonKPICard } from '../components/ComparisonKPICard';
import { PerformanceBreakdown } from '../components/PerformanceBreakdown';
import { TopRespondersCard } from '../components/TopRespondersCard';
import { TestTubeIcon } from '../components/icons/TestTubeIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { TrophyIcon } from '../components/icons/TrophyIcon';


interface ComparisonAnalysisTabProps {
    data: ComparisonAnalysis;
    demographics: {
        prakruti: DemographicsData[];
        diet: DemographicsData[];
        addiction: DemographicsData[];
    };
    groupAStats: UricAcidStats;
    groupBStats: UricAcidStats;
}

const SectionHeader: React.FC<{title: string, icon: React.ReactNode}> = ({title, icon}) => (
    <div className="flex items-center space-x-3 mb-4">
        <div className="bg-white p-2 rounded-lg shadow-sm">{icon}</div>
        <h2 className="text-2xl font-bold text-slate-800 relative">
            {title}
            <span className="absolute -bottom-1.5 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
        </h2>
    </div>
);


export const ComparisonAnalysisTab: React.FC<ComparisonAnalysisTabProps> = ({ data, demographics, groupAStats, groupBStats }) => {
    
    const groupAAvgSymptomReduction = data.symptomHeatmapData.length > 0 ? data.symptomHeatmapData.reduce((acc, s) => acc + s['Group A'], 0) / data.symptomHeatmapData.length : 0;
    const groupBAvgSymptomReduction = data.symptomHeatmapData.length > 0 ? data.symptomHeatmapData.reduce((acc, s) => acc + s['Group B'], 0) / data.symptomHeatmapData.length : 0;

    return (
        <div className="space-y-12">
            <ConclusionCard 
                groupAStats={groupAStats}
                groupBStats={groupBStats}
                groupAAvgSymptomReduction={groupAAvgSymptomReduction}
                groupBAvgSymptomReduction={groupBAvgSymptomReduction}
            />
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ComparisonKPICard 
                        title="Avg. Uric Acid Reduction"
                        valueA={`${groupAStats.mean} mg%`}
                        valueB={`${groupBStats.mean} mg%`}
                        winner={groupAStats.mean > groupBStats.mean ? 'A' : groupBStats.mean > groupAStats.mean ? 'B' : 'Tie'}
                    />
                    <ComparisonKPICard 
                        title="Overall Sandhi Improvement"
                        valueA={`${groupAAvgSymptomReduction.toFixed(1)}%`}
                        valueB={`${groupBAvgSymptomReduction.toFixed(1)}%`}
                        winner={groupAAvgSymptomReduction > groupBAvgSymptomReduction ? 'A' : groupBAvgSymptomReduction > groupAAvgSymptomReduction ? 'B' : 'Tie'}
                    />
                </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                 <SectionHeader title="Comparative Uric Acid Analysis" icon={<TestTubeIcon className="w-6 h-6 text-indigo-600"/>} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    <UricAcidChart data={data.uricAcidChartData} title="Average Uric Acid Levels: Before & After" isComparison={true} />
                    <UricAcidReductionDistributionChart data={data.uricAcidReductionDistribution} />
                </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                <SectionHeader title="Comparative Sandhi Improvement" icon={<TrendingUpIcon className="w-6 h-6 text-indigo-600"/>} />
                <SymptomImprovementHeatmap data={data.symptomHeatmapData} />
            </motion.section>
            
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                 <SectionHeader title="Deeper Analysis" icon={<TrophyIcon className="w-6 h-6 text-indigo-600"/>} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                    <PerformanceBreakdown 
                        groupAStats={groupAStats} 
                        groupBStats={groupBStats} 
                        symptomData={data.symptomHeatmapData} 
                    />
                    <TopRespondersCard data={data.topResponders} />
                </div>
            </motion.section>

             <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                 <SectionHeader title="Patient Demographics" icon={<UsersIcon className="w-6 h-6 text-indigo-600"/>} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <DemographicsChart className="min-h-[420px]" title="Distribution by PRAKRUTI" data={demographics.prakruti} />
                    <DemographicsChart className="min-h-[420px]" title="Distribution by Diet" data={demographics.diet} />
                    <DemographicsChart className="min-h-[420px]" title="Distribution by Addiction" data={demographics.addiction} />
                </div>
            </motion.section>

        </div>
    );
};
