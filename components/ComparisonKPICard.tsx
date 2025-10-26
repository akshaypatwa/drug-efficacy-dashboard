import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon } from './icons/TrophyIcon';
import { AnimatedCounter } from './AnimatedCounter';


interface ComparisonKPICardProps {
  title: string;
  valueA: string;
  valueB: string;
  winner: 'A' | 'B' | 'Tie';
}

const GroupStat: React.FC<{ group: 'A' | 'B'; value: string; isWinner: boolean }> = ({ group, value, isWinner }) => {
    const numericValue = parseFloat(value);
    const unit = value.replace(/[0-9.,-]/g, '').trim();

    const colors = group === 'A' ? {
        bg: 'dark:bg-teal-950/50 bg-teal-50',
        text: 'text-teal-700 dark:text-teal-400',
        border: 'border-teal-500 dark:border-teal-500',
        glow: 'shadow-teal-500/30',
    } : {
        bg: 'dark:bg-orange-950/50 bg-orange-50',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-500 dark:border-orange-500',
        glow: 'shadow-orange-500/30',
    };

    return (
        <div className={`relative text-center p-4 rounded-lg w-full transition-all duration-300 ${isWinner ? `${colors.bg} border-2 ${colors.border} shadow-lg ${colors.glow}` : 'bg-slate-100 dark:bg-slate-700/60'}`}>
            {isWinner && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 p-1 rounded-full shadow-md">
                    <TrophyIcon className={`w-5 h-5 ${colors.text}`} />
                </div>
            )}
            <p className={`text-xs font-bold uppercase tracking-wider ${isWinner ? colors.text : 'text-slate-500 dark:text-slate-400'}`}>Group {group}</p>
            <div className={`text-3xl font-bold ${isWinner ? colors.text : 'text-slate-800 dark:text-slate-200'} flex items-baseline justify-center`}>
                {!isNaN(numericValue) ? <AnimatedCounter to={numericValue} /> : value}
                {!isNaN(numericValue) && unit && <span className="text-xl font-semibold ml-1">{unit}</span>}
            </div>
        </div>
    );
};

export const ComparisonKPICard: React.FC<ComparisonKPICardProps> = ({ title, valueA, valueB, winner }) => {
    return (
        <motion.div 
            className="bg-gradient-to-br from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-900/80 p-5 rounded-xl shadow-sm border border-slate-200/80 dark:border-slate-700"
            whileHover={{boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-4 tracking-tight text-center">{title}</h3>
            <div className="flex justify-around items-center mt-2 space-x-4">
                <GroupStat group="A" value={valueA} isWinner={winner === 'A'} />
                <GroupStat group="B" value={valueB} isWinner={winner === 'B'} />
            </div>
        </motion.div>
    );
};