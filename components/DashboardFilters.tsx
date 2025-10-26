import React from 'react';
import type { DashboardFilters } from '../types';

interface DashboardFiltersProps {
    options: {
        prakruti: string[];
        diet: string[];
    };
    filters: DashboardFilters;
    onFilterChange: React.Dispatch<React.SetStateAction<DashboardFilters>>;
}

const FilterSelect: React.FC<{ label: string; value: string; options: string[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; }> = ({ label, value, options, onChange }) => (
    <div className="flex-1">
        <label htmlFor={label} className="sr-only">{label}</label>
        <select
            id={label}
            value={value}
            onChange={onChange}
            className="w-full rounded-md border-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-slate-800 text-slate-200"
        >
            <option>All {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);


export const DashboardFiltersComponent: React.FC<DashboardFiltersProps> = ({ options, filters, onFilterChange }) => {
    const handlePrakrutiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(prev => ({ ...prev, prakruti: e.target.value }));
    };

    const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(prev => ({ ...prev, diet: e.target.value }));
    };

    return (
        <div className="flex items-center gap-2">
            <FilterSelect label="Prakruti" value={filters.prakruti} options={options.prakruti} onChange={handlePrakrutiChange} />
            <FilterSelect label="Diet" value={filters.diet} options={options.diet} onChange={handleDietChange} />
        </div>
    );
};