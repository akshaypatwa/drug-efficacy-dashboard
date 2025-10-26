import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  color: 'teal' | 'orange';
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, description, color, icon }) => {
  
  const colorClasses = {
    teal: {
      text: 'text-teal-600',
      bg: 'bg-teal-100'
    },
    orange: {
      text: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  }

  const numericValue = parseFloat(value);
  const unit = value.replace(/[0-9.,-]/g, '').trim();

  return (
    <div className={`p-5 rounded-xl shadow-sm border flex items-center space-x-4 ${color === 'teal' ? 'bg-gradient-to-br from-teal-50 to-white' : 'bg-gradient-to-br from-orange-50 to-white'}`}>
       <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color].bg}`}>
         {React.cloneElement(icon as React.ReactElement, { className: `w-7 h-7 ${colorClasses[color].text}` })}
       </div>
       <div className="flex-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className={`text-3xl font-bold mt-1 ${colorClasses[color].text} flex items-baseline`}>
                {!isNaN(numericValue) ? <AnimatedCounter to={numericValue} /> : value}
                {!isNaN(numericValue) && unit && <span className="text-xl font-semibold ml-1">{unit}</span>}
            </div>
            <p className="text-xs text-slate-500 mt-2">{description}</p>
       </div>
    </div>
  );
};