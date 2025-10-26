import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { SymptomChartData, Theme } from '../types';

interface SymptomLineChartProps {
    data: SymptomChartData[];
    title: string;
    group: 'A' | 'B' | 'Comparison';
    theme: Theme;
}

export const SymptomLineChart: React.FC<SymptomLineChartProps> = ({ data, title, group, theme }) => {
    
    const colors = {
        A: '#14b8a6',
        B: '#f97316',
    }
    const isDark = theme === 'dark';
    const tickColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e0e0e0';

    return (
        <ChartCard title={title}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="day" tick={{ fill: tickColor }} fontSize={12}/>
                    <YAxis label={{ value: 'Avg Score', angle: -90, position: 'insideLeft', fill: tickColor, fontSize: 12 }} tick={{ fill: tickColor }} fontSize={12}/>
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                         contentStyle={{
                            background: isDark ? '#1e293b' : 'white',
                            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        }}
                    />
                    {group !== 'Comparison' && (
                         <Line type="monotone" dataKey="Score" stroke={colors[group]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                    )}
                    {group === 'Comparison' && (
                        <>
                         <Legend iconSize={10} wrapperStyle={{ fontSize: '14px', color: tickColor }}/>
                         <Line type="monotone" dataKey="Group A" stroke={colors.A} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                         <Line type="monotone" dataKey="Group B" stroke={colors.B} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};