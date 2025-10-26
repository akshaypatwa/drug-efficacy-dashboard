import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { UricAcidReductionDistributionPoint } from '../types';

interface UricAcidReductionDistributionChartProps {
    data: UricAcidReductionDistributionPoint[];
    className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-md shadow-lg border border-slate-200 text-sm">
                <p className="font-bold mb-2">{`Reduction Range: ${label} mg%`}</p>
                {payload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.fill, fontWeight: 500 }}>
                        {`${pld.name}: ${pld.value} patients`}
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


export const UricAcidReductionDistributionChart: React.FC<UricAcidReductionDistributionChartProps> = ({ data, className }) => {
    return (
        <ChartCard 
            title="Uric Acid Reduction Distribution" 
            subtitle="How many patients from each group fall into different ranges of uric acid reduction."
            className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="range" tick={{ fill: '#64748b' }} fontSize={12} name="Reduction Range (mg%)" />
                    <YAxis allowDecimals={false} label={{ value: '# of Patients', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} tick={{ fill: '#64748b' }} fontSize={12}/>
                    <Tooltip
                        cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
                        content={<CustomTooltip />}
                    />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '14px' }}/>
                    <Bar dataKey="Group A" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Group A" />
                    <Bar dataKey="Group B" fill="#f97316" radius={[4, 4, 0, 0]} name="Group B"/>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};