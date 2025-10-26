import React from 'react';
import { motion } from 'framer-motion';

type Tab = 'groupA' | 'groupB' | 'comparison';

interface TabsProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

const TABS: { id: Tab, label: string }[] = [
    { id: 'groupA', label: 'Group A' },
    { id: 'groupB', label: 'Group B' },
    { id: 'comparison', label: 'A vs. B' },
];


export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="relative flex w-full items-center rounded-xl bg-slate-900/80 p-1.5 border border-slate-700">
            {TABS.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-10 flex-1 rounded-lg px-3 text-center sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white transition focus-visible:outline-2 whitespace-nowrap ${
                        activeTab === tab.id ? 'text-white' : 'text-slate-300 hover:text-white'
                    }`}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.span
                            layoutId="bubble"
                            className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-20">{tab.label}</span>
                </button>
            ))}
        </div>
    );
};