import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';
import { ChartCard } from './ChartCard';
import type { ScatterPoint } from '../types';

interface UricAcidScatterPlotProps {
    data: {
        groupA: ScatterPoint[];
        groupB: ScatterPoint[];
    };
    className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 rounded-md shadow-lg border border-slate-200 text-sm">
                <p className="font-bold mb-1">{`Patient ID: ${data.id}`}</p>
                <p className="text-slate-600">{`Before: ${data.before} mg%`}</p>
                <p className="text-slate-600">{`After: ${data.after} mg%`}</p>
            </div>
        );
    }
    return null;
};

export const UricAcidScatterPlot: React.FC<UricAcidScatterPlotProps> = ({ data, className }) => {
    const domain = [
        Math.min(...data.groupA.map(p => p.before), ...data.groupB.map(p => p.before), ...data.groupA.map(p => p.after), ...data.groupB.map(p => p.after)) - 1,
        Math.max(...data.groupA.map(p => p.before), ...data.groupB.map(p => p.before), ...data.groupA.map(p => p.after), ...data.groupB.map(p => p.after)) + 1,
    ]

    return (
        <ChartCard title="Individual Patient Outcomes" className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="before" name="Before" unit=" mg%" domain={domain} tick={{ fill: '#64748b' }} fontSize={12} />
                    <YAxis type="number" dataKey="after" name="After" unit=" mg%" domain={domain} tick={{ fill: '#64748b' }} fontSize={12} />
                    <ZAxis dataKey="id" name="Patient ID" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />}/>
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }} />
                    <Scatter name="Group A" data={data.groupA} fill="#14b8a6" shape="circle" />
                    <Scatter name="Group B" data={data.groupB} fill="#f97316" shape="triangle" />
                </ScatterChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};
