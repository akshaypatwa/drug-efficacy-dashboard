import React from 'react';
import { motion } from 'framer-motion';
import { TestTubeIcon } from './icons/TestTubeIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import type { UricAcidStats } from '../types';
import { AnimatedCounter } from './AnimatedCounter';

interface ConclusionCardProps {
    groupAStats: UricAcidStats;
    groupBStats: UricAcidStats;
    groupAAvgSymptomReduction: number;
    groupBAvgSymptomReduction: number;
}

const StatProgressBar: React.FC<{
    label: string;
    value: number;
    max: number;
    colorClasses: string;
    unit: string;
}> = ({ label, value, max, colorClasses, unit }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1 text-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>
                <span className={`font-bold ${colorClasses}`}>{value.toFixed(2)}{unit}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                <motion.div
                    className={`h-2.5 rounded-full ${colorClasses.replace('text-', 'bg-').replace('dark:text-','dark:bg-')}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
};

const MetricVerdictCard: React.FC<{
    title: string;
    IconComponent: React.ElementType;
    unit: string;
    winner: 'A' | 'B' | 'Tie';
    valueA: number;
    valueB: number;
    max: number;
}> = ({ title, IconComponent, unit, winner, valueA, valueB, max }) => {
    
    const groupAStyles = winner === 'A'
        ? 'shadow-[0_0_25px_rgba(20,184,166,0.4)] border-teal-500 bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/50 dark:to-slate-800'
        : 'border-teal-400 dark:border-teal-800 bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900/50 shadow-md';

    const groupBStyles = winner === 'B'
        ? 'shadow-[0_0_25px_rgba(249,115,22,0.4)] border-orange-500 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/50 dark:to-slate-800'
        : 'border-orange-400 dark:border-orange-800 bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900/50 shadow-md';
    
    const iconColor = title === 'Uric Acid Reduction' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400';

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border-2 border-slate-200/90 dark:border-slate-700 w-full flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="flex items-center space-x-4 mb-6">
                <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-700`}>
                    <IconComponent className={`w-8 h-8 ${iconColor}`}/>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">{title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-grow mb-6">
                 {/* Group A Card */}
                <div className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 flex flex-col justify-center ${groupAStyles}`}>
                    {winner === 'A' && <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-white bg-teal-500 rounded-full shadow-md">WINNER</div>}
                    <p className="text-base font-bold text-slate-500 dark:text-slate-400 tracking-wider">GROUP A</p>
                    <div className="text-5xl font-extrabold text-teal-600 dark:text-teal-400 my-2 flex items-baseline justify-center">
                        <AnimatedCounter to={valueA} />
                        <span className="text-2xl font-semibold ml-1">{unit}</span>
                    </div>
                </div>
                 {/* Group B Card */}
                <div className={`relative p-5 rounded-xl border-2 text-center transition-all duration-300 flex flex-col justify-center ${groupBStyles}`}>
                    {winner === 'B' && <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-bold text-white bg-orange-500 rounded-full shadow-md">WINNER</div>}
                    <p className="text-base font-bold text-slate-500 dark:text-slate-400 tracking-wider">GROUP B</p>
                     <div className="text-5xl font-extrabold text-orange-600 dark:text-orange-400 my-2 flex items-baseline justify-center">
                        <AnimatedCounter to={valueB} />
                        <span className="text-2xl font-semibold ml-1">{unit}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-700">
                <StatProgressBar label="Group A Performance" value={valueA} max={max} colorClasses="text-teal-600 dark:text-teal-400" unit={unit}/>
                <StatProgressBar label="Group B Performance" value={valueB} max={max} colorClasses="text-orange-600 dark:text-orange-400" unit={unit}/>
            </div>
        </div>
    );
};

export const ConclusionCard: React.FC<ConclusionCardProps> = ({ 
    groupAStats,
    groupBStats,
    groupAAvgSymptomReduction,
    groupBAvgSymptomReduction
}) => {
    const uricAcidWinner = groupAStats.mean > groupBStats.mean ? 'A' : groupBStats.mean > groupAStats.mean ? 'B' : 'Tie';
    const symptomWinner = groupAAvgSymptomReduction > groupBAvgSymptomReduction ? 'A' : groupBAvgSymptomReduction > groupAAvgSymptomReduction ? 'B' : 'Tie';
    
    const maxUricAcidReduction = Math.max(groupAStats.mean, groupBStats.mean, 0) * 1.1;

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tighter sm:text-4xl">The Verdict</h2>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ staggerChildren: 0.2 }}
            >
                <motion.div className="flex" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition:{ duration: 0.6, ease: 'easeOut' } } }}>
                    <MetricVerdictCard
                        title="Uric Acid Reduction"
                        IconComponent={TestTubeIcon}
                        unit=" mg%"
                        winner={uricAcidWinner}
                        valueA={groupAStats.mean}
                        valueB={groupBStats.mean}
                        max={maxUricAcidReduction}
                    />
                </motion.div>
                <motion.div className="flex" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition:{ duration: 0.6, ease: 'easeOut' } } }}>
                    <MetricVerdictCard
                        title="Sandhi Symptom Improvement"
                        IconComponent={TrendingUpIcon}
                        unit="%"
                        winner={symptomWinner}
                        valueA={groupAAvgSymptomReduction}
                        valueB={groupBAvgSymptomReduction}
                        max={100}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};