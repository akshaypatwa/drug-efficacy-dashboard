import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rawData } from './data/patientData';
import type { RawPatientData, DashboardFilters } from './types';
import { processPatientData, analyzeData, getFilterOptions } from './utils/analysis';

import { DashboardFiltersComponent } from './components/DashboardFilters';
import { Tabs } from './components/Tabs';
import { GroupAAnalysis } from './tabs/GroupAAnalysis';
import { GroupBAnalysis } from './tabs/GroupBAnalysis';
import { ComparisonAnalysisTab } from './tabs/ComparisonAnalysis';
import { UserCircleIcon } from './components/icons/UserCircleIcon';

type Tab = 'groupA' | 'groupB' | 'comparison';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('comparison');
    const [filters, setFilters] = useState<DashboardFilters>({ prakruti: 'All', diet: 'All' });

    const processedData = useMemo(() => processPatientData(rawData as RawPatientData[]), []);
    
    const filterOptions = useMemo(() => getFilterOptions(processedData), [processedData]);

    const analysisResults = useMemo(() => {
        return analyzeData(processedData, filters);
    }, [processedData, filters]);
    
    if (!analysisResults) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100/80 font-sans">
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                 <header className="bg-slate-900 rounded-2xl shadow-2xl p-6 mb-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 to-slate-900">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="text-white">
                            <h1 className="text-3xl font-extrabold text-white tracking-tight">Drug Efficacy Dashboard</h1>
                            <p className="text-slate-400 mt-1">Interactive Analysis of Group A vs. Group B</p>
                            <div className="flex items-center gap-2 mt-3 text-slate-300">
                                <UserCircleIcon className="w-6 h-6" />
                                <p className="text-base font-medium">Research by Dr. Saloni Shah</p>
                            </div>
                        </div>
                        <div className="w-full md:w-auto flex flex-col gap-4">
                             <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                             <DashboardFiltersComponent options={filterOptions} filters={filters} onFilterChange={setFilters} />
                        </div>
                    </div>
                </header>
                
                <div className="mt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'groupA' && <GroupAAnalysis data={analysisResults.groupA} />}
                            {activeTab === 'groupB' && <GroupBAnalysis data={analysisResults.groupB} />}
                            {activeTab === 'comparison' && <ComparisonAnalysisTab data={analysisResults.comparison} demographics={analysisResults.demographics} groupAStats={analysisResults.groupA.uricAcidStats} groupBStats={analysisResults.groupB.uricAcidStats}/>}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </main>
        </div>
    );
};

export default App;