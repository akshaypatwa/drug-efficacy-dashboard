import React from 'react';
import type { SingleGroupAnalysis, Theme } from '../types';
import { SYMPTOM_NAMES, SymptomKey } from '../constants';
import { StatCard } from '../components/StatCard';
import { UricAcidChart } from '../components/UricAcidChart';
import { SymptomLineChart } from '../components/SymptomLineChart';
import { ChartCard } from '../components/ChartCard';
import { SymptomImprovementStat } from '../types';
import { TestTubeIcon } from '../components/icons/TestTubeIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';

interface GroupAAnalysisProps {
    data: SingleGroupAnalysis;
    theme: Theme;
}

const SymptomStat: React.FC<{ stat: SymptomImprovementStat }> = ({ stat }) => (
     <div className="flex justify-between items-baseline py-2 border-b border-teal-200/50 dark:border-teal-900/50 last:border-b-0">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.symptomName}</span>
        <span className="text-base font-semibold text-teal-700 dark:text-teal-400">{stat.improvementPercentage}%</span>
    </div>
);


export const GroupAAnalysis: React.FC<GroupAAnalysisProps> = ({ data, theme }) => {
    return (
        <div className="space-y-6">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard 
                    title="Uric Acid Mean Reduction" 
                    value={`${data.uricAcidStats.mean} mg%`} 
                    description={`Based on ${data.patientCount} patients in this group.`}
                    color="teal"
                    icon={<TestTubeIcon />}
                />
                 <StatCard 
                    title="Patients with Uric Acid Improvement" 
                    value={`${data.uricAcidStats.percentImproved}%`} 
                    description={`${(data.uricAcidStats.percentImproved / 100 * data.patientCount).toFixed(0)} out of ${data.patientCount} patients showed reduction.`}
                    color="teal"
                    icon={<TrendingUpIcon />}
                />
            </section>
            
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <UricAcidChart 
                    data={[data.uricAcidChartData]} 
                    title="Group A: Uric Acid Before vs. After"
                    isComparison={false}
                    theme={theme}
                />
                <ChartCard title="Group A: Symptom Improvement (%)" className="lg:col-span-1" chartHeight="auto">
                    <div className="space-y-1">
                        {data.symptomImprovementStats.map(stat => (
                            <SymptomStat key={stat.symptomName} stat={stat} />
                        ))}
                    </div>
                </ChartCard>
            </section>

             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(Object.keys(SYMPTOM_NAMES) as SymptomKey[]).map(key => (
                    <SymptomLineChart 
                        key={key} 
                        title={`Group A: ${SYMPTOM_NAMES[key]}`} 
                        data={data.symptomChartData[key]}
                        group="A"
                        theme={theme}
                    />
                ))}
            </section>
        </div>
    );
};