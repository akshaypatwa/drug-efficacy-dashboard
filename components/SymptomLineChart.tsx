import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { SymptomChartData } from '../types';

interface SymptomLineChartProps {
    data: SymptomChartData[];
    title: string;
    group: 'A' | 'B' | 'Comparison';
}

export const SymptomLineChart: React.FC<SymptomLineChartProps> = ({ data, title, group }) => {
    
    const colors = {
        A: '#14b8a6',
        B: '#f97316',
    }

    return (
        <ChartCard title={title}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="day" tick={{ fill: '#64748b' }} fontSize={12}/>
                    <YAxis label={{ value: 'Avg Score', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} tick={{ fill: '#64748b' }} fontSize={12}/>
                    <Tooltip
                        cursor={{ strokeDasharray: '3 3' }}
                         contentStyle={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
                        }}
                    />
                    {group !== 'Comparison' && (
                         <Line type="monotone" dataKey="Score" stroke={colors[group]} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                    )}
                    {group === 'Comparison' && (
                        <>
                         <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }}/>
                         <Line type="monotone" dataKey="Group A" stroke={colors.A} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                         <Line type="monotone" dataKey="Group B" stroke={colors.B} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                        </>
                    )}
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
