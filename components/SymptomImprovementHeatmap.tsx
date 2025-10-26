import React from 'react';
import { ChartCard } from './ChartCard';
import type { SymptomHeatmapData } from '../types';

interface SymptomImprovementHeatmapProps {
    data: SymptomHeatmapData[];
    className?: string;
}

export const SymptomImprovementHeatmap: React.FC<SymptomImprovementHeatmapProps> = ({ data, className }) => {
    return (
        <ChartCard title="Symptom Improvement from Day 0 to 21 (%)" className={className} chartHeight="auto">
             <div className="flow-root">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Symptom</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">Group A</th>
                                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">Group B</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {data.map(({ symptom, 'Group A': groupA, 'Group B': groupB }) => {
                                const winner = groupA > groupB ? 'A' : groupB > groupA ? 'B' : 'Tie';
                                return (
                                    <tr key={symptom}>
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-800 sm:pl-0">{symptom}</td>
                                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center rounded-md transition-colors duration-200 ${
                                            winner === 'A' 
                                            ? 'bg-teal-500 text-white font-bold' 
                                            : 'bg-slate-50 text-slate-600'
                                        }`}>{groupA}%</td>
                                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-center rounded-md transition-colors duration-200 ${
                                            winner === 'B'
                                            ? 'bg-orange-500 text-white font-bold'
                                            : 'bg-slate-50 text-slate-600'
                                        }`}>{groupB}%</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </ChartCard>
    );
};