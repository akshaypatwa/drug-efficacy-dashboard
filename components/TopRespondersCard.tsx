import React from 'react';
import { ChartCard } from './ChartCard';
import type { TopResponder } from '../types';

interface TopRespondersCardProps {
  data: {
    groupA: TopResponder[];
    groupB: TopResponder[];
  };
}

const ResponderList: React.FC<{ title: string; responders: TopResponder[]; color: 'teal' | 'orange' }> = ({ title, responders, color }) => {
    const textColor = color === 'teal' ? 'text-teal-600 dark:text-teal-400' : 'text-orange-600 dark:text-orange-400';
    const borderColor = color === 'teal' ? 'border-teal-200 dark:border-teal-900' : 'border-orange-200 dark:border-orange-900';

    return (
        <div>
            <h4 className={`font-semibold mb-2 text-center ${textColor}`}>{title}</h4>
            <ul className="space-y-2">
                {responders.map((responder) => (
                    <li key={responder.id} className={`flex justify-between items-center p-2 rounded-md border-b ${borderColor}`}>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Patient #{responder.id}</span>
                        <span className={`text-sm font-bold ${textColor}`}>
                            {responder.reduction} mg%
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const TopRespondersCard: React.FC<TopRespondersCardProps> = ({ data }) => {
  return (
    <ChartCard title="Top Responders (Uric Acid Reduction)" chartHeight="auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <ResponderList title="Group A" responders={data.groupA} color="teal" />
            <ResponderList title="Group B" responders={data.groupB} color="orange" />
        </div>
    </ChartCard>
  );
};