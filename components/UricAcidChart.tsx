import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { UricAcidChartData } from '../types';

interface UricAcidChartProps {
    data: UricAcidChartData[] | [UricAcidChartData];
    title: string;
    isComparison: boolean;
}

export const UricAcidChart: React.FC<UricAcidChartProps> = ({ data, title, isComparison }) => {
    
    const groupAColor = "#14b8a6";
    const groupBColor = "#f97316";

    return (
        <ChartCard title={title} className="col-span-1 md:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" tick={{ fill: '#64748b' }} fontSize={12} />
                    <YAxis unit=" mg%" tick={{ fill: '#64748b' }} fontSize={12}/>
                    <Tooltip
                        cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                        contentStyle={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        }}
                    />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }}/>
                    <Bar dataKey="Avg Before" fill={isComparison ? "#60a5fa" : (data[0]?.name === 'Group A' ? groupAColor : groupBColor) + '80' } radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Avg After" fill={isComparison ? "#4ade80" : (data[0]?.name === 'Group A' ? groupAColor : groupBColor) } radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
