import React from 'react';
import type { UricAcidStats, SymptomHeatmapData } from '../types';
import { ChartCard } from './ChartCard';

interface PerformanceBreakdownProps {
  groupAStats: UricAcidStats;
  groupBStats: UricAcidStats;
  symptomData: SymptomHeatmapData[];
}

export const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({ groupAStats, groupBStats, symptomData }) => {
  
  const metrics = [
    { 
      name: 'Uric Acid Reduction', 
      groupA: `${groupAStats.mean} mg%`, 
      groupB: `${groupBStats.mean} mg%`, 
      winner: groupAStats.mean > groupBStats.mean ? 'A' : groupBStats.mean > groupAStats.mean ? 'B' : 'Tie' as 'A' | 'B' | 'Tie'
    },
    ...symptomData.map(s => ({
      name: s.symptom,
      groupA: `${s['Group A']}%`,
      groupB: `${s['Group B']}%`,
      winner: s['Group A'] > s['Group B'] ? 'A' : s['Group B'] > s['Group A'] ? 'B' : 'Tie' as 'A' | 'B' | 'Tie'
    }))
  ];

  return (
    <ChartCard title="Performance Breakdown" chartHeight="auto">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Metric</th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">Group A</th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-slate-900">Group B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.map((metric) => (
                  <tr key={metric.name}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-800 sm:pl-0">{metric.name}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-base text-center rounded-md transition-colors ${
                        metric.winner === 'A' 
                        ? 'bg-teal-500 text-white font-bold' 
                        : 'text-slate-600'
                    }`}>{metric.groupA}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-base text-center rounded-md transition-colors ${
                        metric.winner === 'B'
                        ? 'bg-orange-500 text-white font-bold'
                        : 'text-slate-600'
                    }`}>{metric.groupB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};