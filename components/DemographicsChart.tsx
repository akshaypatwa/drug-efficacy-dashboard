import React, { useCallback, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { ChartCard } from './ChartCard';
import { DEMOGRAPHICS_COLORS } from '../constants';
import type { DemographicsData } from '../types';

interface DemographicsChartProps {
    data: DemographicsData[];
    title: string;
    className?: string;
}

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;

    return (
        <g>
            <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="font-bold text-sm sm:text-base truncate" width={innerRadius*2-10}>{payload.name}</text>
             <text x={cx} y={cy} dy={14} textAnchor="middle" fill="#64748b" className="text-xs sm:text-sm">{`${(percent * 100).toFixed(0)}% (${payload.value})`}</text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
            <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 4} outerRadius={outerRadius + 8} fill={fill} />
        </g>
    );
};

export const DemographicsChart: React.FC<DemographicsChartProps> = ({ data, title, className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback((_: any, index: number) => {
        setActiveIndex(index);
    }, []);

    const total = data.reduce((sum, entry) => sum + entry.value, 0);

    const conclusion = useMemo(() => {
        if (!data || data.length === 0) {
            return null;
        }
        const maxEntry = data.reduce((max, entry) => entry.value > max.value ? entry : max, data[0]);
        const percentage = total > 0 ? ((maxEntry.value / total) * 100).toFixed(0) : 0;
        return (
            <p className="text-sm text-slate-600 leading-relaxed break-words">
                The most prevalent category is <strong className="text-slate-800">{maxEntry.name}</strong>, which constitutes <strong className="text-slate-800">{percentage}%</strong> of the patient population in this study.
            </p>
        );
    }, [data, total]);

    return (
        <ChartCard title={title} chartHeight="flex-grow" className={`flex flex-col ${className}`}>
            <div className="flex-grow flex flex-col sm:flex-row h-full items-center -mt-4 sm:mt-0">
                <div className="w-full sm:w-1/2 h-56 sm:h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="80%"
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={DEMOGRAPHICS_COLORS[index % DEMOGRAPHICS_COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                 <div className="w-full sm:w-1/2 p-4 space-y-2 self-center">
                    {data.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center text-xs sm:text-sm">
                            <div 
                                style={{ backgroundColor: DEMOGRAPHICS_COLORS[index % DEMOGRAPHICS_COLORS.length] }} 
                                className="w-3 h-3 rounded-full mr-3 shrink-0"
                            ></div>
                            <div className="flex justify-between w-full">
                                <span className="font-medium text-slate-700 truncate pr-2">{entry.name}</span>
                                <span className="font-semibold text-slate-500">{entry.value} ({total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0}%)</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             {conclusion && (
                <div className="pt-4 mt-4 border-t border-slate-200/80">
                    {conclusion}
                </div>
            )}
        </ChartCard>
    );
};