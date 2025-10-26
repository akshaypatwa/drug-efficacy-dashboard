import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import { ChartCard } from './ChartCard';
import type { PatientReductionPoint } from '../types';

interface PatientReductionChartProps {
    data: PatientReductionPoint[];
    className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 rounded-md shadow-lg border border-slate-200 text-sm">
                <p className="font-bold mb-1">{`Patient ID: ${data.id}`}</p>
                <p className={`font-semibold ${data.group === 'A' ? 'text-teal-600' : 'text-orange-600'}`}>
                    {`Group: ${data.group}`}
                </p>
                <p className="text-slate-600">{`Reduction: ${data.reduction.toFixed(2)} mg%`}</p>
            </div>
        );
    }
    return null;
};

export const PatientReductionChart: React.FC<PatientReductionChartProps> = ({ data, className }) => {
    const colors = { A: '#14b8a6', B: '#f97316' };
    
    // Prevent rendering very long charts if data is too large
    const chartData = data.length > 60 ? data.slice(0, 60) : data;

    return (
        <ChartCard title="Patient-by-Patient Uric Acid Reduction" className={className} chartHeight="h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 0,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#64748b' }} fontSize={12}>
                        <Label value="Uric Acid Reduction (mg%)" offset={-15} position="insideBottom" fill="#64748b" />
                    </XAxis>
                    <YAxis 
                        type="category" 
                        dataKey="id" 
                        width={50} 
                        tick={{ fill: '#64748b' }} 
                        fontSize={10} 
                        interval={0}
                    />
                    <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} content={<CustomTooltip />} />
                    <Bar dataKey="reduction" radius={[0, 4, 4, 0]}>
                        {chartData.map((entry) => (
                            <Cell key={`cell-${entry.id}`} fill={colors[entry.group]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
