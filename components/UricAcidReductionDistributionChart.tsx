import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import type { UricAcidReductionDistributionPoint, Theme } from '../types';

interface UricAcidReductionDistributionChartProps {
    data: UricAcidReductionDistributionPoint[];
    className?: string;
    theme: Theme;
}

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} p-3 rounded-md shadow-lg border text-sm`}>
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


export const UricAcidReductionDistributionChart: React.FC<UricAcidReductionDistributionChartProps> = ({ data, className, theme }) => {
    const isDark = theme === 'dark';
    const tickColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e0e0e0';

    return (
        <ChartCard 
            title="Uric Acid Reduction Distribution" 
            subtitle="How many patients from each group fall into different ranges of uric acid reduction."
            className={className}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="range" tick={{ fill: tickColor }} fontSize={12} name="Reduction Range (mg%)" />
                    <YAxis allowDecimals={false} label={{ value: '# of Patients', angle: -90, position: 'insideLeft', fill: tickColor, fontSize: 12 }} tick={{ fill: tickColor }} fontSize={12}/>
                    <Tooltip
                        cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                        content={<CustomTooltip isDark={isDark} />}
                    />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '14px', color: tickColor }}/>
                    <Bar dataKey="Group A" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Group A" />
                    <Bar dataKey="Group B" fill="#f97316" radius={[4, 4, 0, 0]} name="Group B"/>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
};