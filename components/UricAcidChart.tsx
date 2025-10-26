import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { UricAcidChartData, Theme } from '../types';

interface UricAcidChartProps {
    data: UricAcidChartData[] | [UricAcidChartData];
    title: string;
    isComparison: boolean;
    theme: Theme;
}

export const UricAcidChart: React.FC<UricAcidChartProps> = ({ data, title, isComparison, theme }) => {
    
    const groupAColor = "#14b8a6";
    const groupBColor = "#f97316";
    const isDark = theme === 'dark';
    const tickColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e0e0e0';

    return (
        <ChartCard title={title} className="col-span-1 md:col-span-2">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="name" tick={{ fill: tickColor }} fontSize={12} />
                    <YAxis unit=" mg%" tick={{ fill: tickColor }} fontSize={12}/>
                    <Tooltip
                        cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        contentStyle={{
                            background: isDark ? '#1e293b' : 'white',
                            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        }}
                    />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '14px', color: tickColor }}/>
                    <Bar dataKey="Avg Before" fill={isComparison ? "#60a5fa" : (data[0]?.name === 'Group A' ? groupAColor : groupBColor) + '80' } radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Avg After" fill={isComparison ? "#4ade80" : (data[0]?.name === 'Group A' ? groupAColor : groupBColor) } radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};