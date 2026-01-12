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
    TrendingUp
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function ReportsPage() {
    const { user } = useUser();
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const reportCategories = [
        {
            title: 'Workforce Intelligence',
            description: 'Demographics, turnover rates, and head-count evolution.',
            icon: Users,
            color: 'bg-blue-600',
            bg: 'bg-blue-50',
            reports: ['Monthly Attrition Logic', 'Departmental Load Balance', 'Diversity Index']
        },
        {
            title: 'Financial Oversight',
            description: 'Payroll disbursement, tax compliance, and budget variance.',
            icon: IndianRupee,
            color: 'bg-emerald-600',
            bg: 'bg-emerald-50',
            reports: ['Salary Variance Audit', 'TDS & Compliance Digest', 'Project Budget Burn Hub']
        },
        {
            title: 'Performance Registry',
            description: 'Evaluation metrics, KPI mastery, and talent mapping.',
            icon: TrendingUp,
            color: 'bg-purple-600',
            bg: 'bg-purple-50',
            reports: ['Elite Performer Registry', 'Unit Velocity Audit', 'KPI Fulfillment Matrix']
        },
        {
            title: 'Attendance & Logistics',
            description: 'Sync hours, leave utilization, and presence mesh.',
            icon: Clock,
            color: 'bg-amber-600',
            bg: 'bg-amber-50',
            reports: ['Overtime Cycle Analysis', 'Leave Liability Protocol', 'Presence Accuracy Log']
        }
    ];

    if (!isSuperAdmin && user) {
        return (
            <Shell title="Access Restricted">
                <div className="flex flex-col items-center justify-center h-[60vh] space-y-6 text-center">
                    <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-rose-500 shadow-xl shadow-rose-100 animate-bounce">
                        <ShieldCheck size={48} />
                    </div>
                    <div className="max-w-md">
                        <h2 className="text-3xl font-black text-slate-900 mb-2">Unauthorized Protocol</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            Only SuperAdmins can access the centralized intelligence repository.
                        </p>
                    </div>
                    <button
                        onClick={() => window.history.back()}
                        className="px-10 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:-translate-y-1 transition-all"
                    >
                        Return to Safe Sector
                    </button>
                </div>
            </Shell>
        );
    }

    return (
        <Shell title="Central Intelligence Hub">
            <div className="space-y-10 max-w-[1600px] mx-auto pb-32">

                {/* Hub Header */}
                <div className="bg-slate-900 p-16 rounded-[4.5rem] text-white relative overflow-hidden shadow-3xl group">
                    <BarChart3 className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={300} />
                    <div className="relative z-10 max-w-3xl">
                        <div className="w-16 h-1 w-24 bg-primary rounded-full mb-10 overflow-hidden">
                            <div className="h-full bg-white opacity-40 animate-[shimmer_2s_infinite]" />
                        </div>
                        <h2 className="text-5xl font-black mb-6 tracking-tighter leading-none">System-Wide Audit Engine</h2>
                        <p className="text-indigo-200 text-xl font-medium leading-relaxed opacity-80 mb-12 uppercase tracking-widest">
                            Centralized repository for all KICCPA organizational logic and analytical data streams.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button className="px-10 py-5 bg-white text-slate-900 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:scale-105 transition-all">
                                <Zap size={18} className="text-primary fill-primary" />
                                Run Comprehensive Audit
                            </button>
                            <button className="px-10 py-5 bg-white/10 text-white border border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
                                Automated Monthly Sync
                            </button>
                        </div>
                    </div>
                </div>

                {/* Report Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {reportCategories.map((cat, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-xl p-12 rounded-[4rem] border border-slate-100 shadow-soft group hover:shadow-2xl transition-all relative overflow-hidden flex flex-col h-full border-b-[10px] border-b-transparent hover:border-b-primary/50">
                            <div className="flex items-center gap-6 mb-10">
                                <div className={`w-20 h-20 rounded-[2.2rem] ${cat.bg} flex items-center justify-center ${cat.color} shadow-inner group-hover:rotate-12 transition-transform duration-500`}>
                                    <cat.icon size={36} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-3xl font-black text-slate-900 leading-none mb-2">{cat.title}</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{cat.description}</p>
                                </div>
                            </div>

                            <div className="space-y-4 flex-grow">
                                {cat.reports.map((report, idx) => (
                                    <div key={idx} className="p-6 bg-slate-50/50 rounded-[2.2rem] border border-slate-50 hover:bg-white hover:border-primary/10 hover:shadow-xl transition-all group/item flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm text-slate-400 group-hover/item:text-primary transition-colors">
                                                <FileText size={18} />
                                            </div>
                                            <span className="text-sm font-black text-slate-700 tracking-tight">{report}</span>
                                        </div>
                                        <button
                                            onClick={() => alert(`Initiating secure download of ${report}...`)}
                                            className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-primary hover:border-primary transition-all shadow-sm"
                                        >
                                            <Download size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 group-hover:bg-primary transition-all shadow-2xl">
                                Access Category Archive <ArrowRight size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </Shell>
    );
}
