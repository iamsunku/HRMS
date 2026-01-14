'use client';

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    FileText,
    Download,
    BarChart3,
    PieChart,
    ShieldCheck,
    Users,
    IndianRupee,
    Activity,
    Clock,
    Zap,
    ArrowRight,
    TrendingUp,
    Search,
    Filter,
    Target
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function ReportsPage() {
    const { user } = useUser();
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const reportCategories = [
        {
            title: 'Workforce Intelligence',
            description: 'Attrition & Demographics',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            reports: ['Monthly Attrition Logic', 'Departmental Load Balance', 'Diversity Index']
        },
        {
            title: 'Financial Oversight',
            description: 'Disbursement & Compliance',
            icon: IndianRupee,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            reports: ['Salary Variance Audit', 'TDS & Compliance Digest', 'Project Budget Burn Hub']
        },
        {
            title: 'Performance Registry',
            description: 'KPI & Talent Mapping',
            icon: TrendingUp,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            reports: ['Elite Performer Registry', 'Unit Velocity Audit', 'KPI Fulfillment Matrix']
        },
        {
            title: 'Logistics Protocol',
            description: 'Attendance & Presence',
            icon: Clock,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            reports: ['Overtime Cycle Analysis', 'Leave Liability Protocol', 'Presence Accuracy Log']
        }
    ];

    if (!isSuperAdmin && user) {
        return (
            <Shell title="Access Restricted">
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center animate-fade-in">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 shadow-xl shadow-rose-100">
                        <ShieldCheck size={40} />
                    </div>
                    <div className="max-w-md space-y-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Access Protocol Denied</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Clearance level insufficient for Central Intelligence Repository.
                        </p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-slate-800 transition-all"
                    >
                        Return to Safe Sector
                    </button>
                </div>
            </Shell>
        );
    }

    return (
        <Shell title="Intelligence Hub">
            <div className="p-4 md:p-8 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Audit & Reports</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Centralized repository for organizational logic and analytics.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search reports..."
                                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none focus:ring-4 focus:ring-blue-50 transition-all"
                            />
                        </div>
                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* Hub Header Card */}
                <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl group flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="relative z-10 max-w-2xl space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Restricted Access</span>
                                <div className="h-px w-12 bg-blue-400/30" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none">Intelligence Command</h2>
                            <p className="text-indigo-200/80 text-sm font-medium leading-relaxed max-w-lg">
                                Real-time algorithmic analysis of workforce dynamics, fiscal velocity, and operational efficiency.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-all">
                                <Zap size={14} className="text-blue-600 fill-blue-600" />
                                Run Audit
                            </button>
                            <button className="px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
                                Export Log
                            </button>
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="relative w-full md:w-auto flex justify-center md:justify-end">
                        <div className="relative w-64 h-32 md:w-80 md:h-40 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm p-6 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Activity size={80} />
                            </div>
                            <div className="flex justify-between items-start relative z-10">
                                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">System Load</span>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Optimal</span>
                                </div>
                            </div>
                            <div className="flex items-end gap-2 relative z-10">
                                <span className="text-4xl font-black tracking-tight">98.2%</span>
                                <span className="text-[10px] font-bold text-white/60 mb-1.5 uppercase tracking-wide">Uptime</span>
                            </div>
                            {/* Decorative line chart path simulation */}
                            <svg className="absolute bottom-0 left-0 w-full h-16 opacity-30" viewBox="0 0 100 40" preserveAspectRatio="none">
                                <path d="M0 30 Q 20 20, 40 35 T 80 10 L 100 25 V 40 H 0 Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Report Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {reportCategories.map((cat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col h-full relative overflow-hidden">
                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center ${cat.color} transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                                    <cat.icon size={24} />
                                </div>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Card Content */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-900 transition-colors">{cat.title}</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{cat.description}</p>
                            </div>

                            {/* Report List */}
                            <div className="space-y-2 mt-auto">
                                {cat.reports.map((report, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => alert(`Initiating secure download of ${report}...`)}
                                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between group/item text-left"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <FileText size={14} className="text-slate-400 flex-shrink-0 group-hover/item:text-blue-500 transition-colors" />
                                            <span className="text-xs font-bold text-slate-600 truncate group-hover/item:text-slate-900 transition-colors">{report}</span>
                                        </div>
                                        <Download size={14} className="text-slate-300 group-hover/item:text-blue-500 opacity-0 group-hover/item:opacity-100 transition-all transform scale-90 group-hover/item:scale-100" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Shell>
    );
}
