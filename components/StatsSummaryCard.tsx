import React from 'react';
import type { UricAcidStats } from '../types';

interface StatsSummaryCardProps {
  title: string;
  data: UricAcidStats;
  color: string;
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline py-2 border-b border-slate-200/80 last:border-b-0">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span className="text-base font-semibold text-slate-800">{value}</span>
    </div>
);

export const StatsSummaryCard: React.FC<StatsSummaryCardProps> = ({ title, data, color }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50/80 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80 flex flex-col">
      <h3 className="text-md font-semibold text-slate-800 mb-3 tracking-tight border-l-4 pl-2" style={{ borderColor: color }}>
        {title}
      </h3>
      <div className="space-y-1">
        <StatItem label="Mean Reduction" value={`${data.mean} mg%`} />
        <StatItem label="Median Reduction" value={`${data.median} mg%`} />
        <StatItem label="Std. Deviation" value={`${data.stdDev} mg%`} />
        <StatItem label="Max Improvement" value={`${data.max} mg%`} />
        <StatItem label="Min Improvement" value={`${data.min} mg%`} />
      </div>
    </div>
  );
};