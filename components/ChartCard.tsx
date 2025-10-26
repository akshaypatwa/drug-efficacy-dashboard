import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  chartHeight?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, className = '', chartHeight = 'h-64 sm:h-72' }) => {
  return (
    <div className={`bg-gradient-to-br from-white to-slate-50/80 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900/80 p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80 dark:border-slate-700 transition-shadow hover:shadow-md ${className}`}>
      <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-1 tracking-tight">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 -mt-1">{subtitle}</p>}
      <div className={`${chartHeight} w-full`}>
        {children}
      </div>
    </div>
  );
};