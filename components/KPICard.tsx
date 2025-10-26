import React from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50/80 p-5 rounded-xl shadow-sm border border-slate-200/80 flex items-center space-x-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '1A' }}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6', style: { color } })}
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-500 font-medium truncate">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};