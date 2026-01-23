"use client";

import React, { useState } from 'react';
import {
    Users,
    UserPlus,
    Activity,
    ClipboardCheck,
    PieChart,
    Calendar,
    Briefcase,
    Zap,
    TrendingUp,
    FileText,
    Heart,
    Award,
    MessageCircle,
    ChevronRight,
    Search,
    Filter,
    ArrowUpRight,
    Clock,
    Target
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

type Section = 'overview' | 'lifecycle' | 'attendance' | 'payroll' | 'recruitment' | 'performance' | 'engagement' | 'policies';

export default function HROverview() {
    const { user } = useUser();
    const [activeSection, setActiveSection] = useState<Section>('overview');

    const stats = [
        { label: 'Total Headcount', value: '284', trend: '+14%', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'New Joiners', value: '12', trend: 'This Month', icon: UserPlus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Attrition Rate', value: '1.2%', trend: '-0.3%', icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'HR Actions', value: '08', trend: 'Pending', icon: ClipboardCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    const menuItems = [
        { id: 'overview', label: 'People Analytics', icon: PieChart },
        { id: 'lifecycle', label: 'Employee Lifecycle', icon: Briefcase },
        { id: 'attendance', label: 'Attendance & Leave', icon: Clock },
        { id: 'payroll', label: 'Payroll & Compliance', icon: FileText },
        { id: 'recruitment', label: 'Recruitment', icon: UserPlus },
        { id: 'performance', label: 'Performance', icon: Target },
        { id: 'engagement', label: 'Engagement', icon: Heart },
        { id: 'policies', label: 'Policies', icon: ShieldIcon },
    ];

    return (
        <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">People & Culture Hub</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Holistic Workforce Development & Policy Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                        <MessageCircle size={14} /> Send Announcement
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                        <Zap size={14} /> Launch Survey
                    </button>
                </div>
            </div>

            {/* HR Sub-Nav */}
            <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar border-b border-slate-100">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id as Section)}
                        className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all whitespace-nowrap ${activeSection === item.id
                                ? 'border-violet-600 text-violet-600 bg-violet-50/50 rounded-t-lg'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        <item.icon size={16} />
                        <span className="text-xs font-bold">{item.label}</span>
                    </button>
                ))}
            </div>

            {activeSection === 'overview' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md uppercase tracking-widest">
                                        {stat.trend}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</h3>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Recruitment Pipeline */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-3">
                                        <UserPlus size={18} className="text-indigo-600" />
                                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Active Recruitment</h3>
                                    </div>
                                    <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Manage All</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { role: 'Sr. Professor', apps: 42, stage: 'Interviews' },
                                        { role: 'Dept. Coordinator', apps: 15, stage: 'Screening' },
                                        { role: 'IT Administrator', apps: 28, stage: 'Offer Sent' }
                                    ].map((job, i) => (
                                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-50 hover:border-indigo-100 hover:bg-white transition-all group">
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600">{job.role}</p>
                                            <div className="flex justify-between items-end mt-4">
                                                <div>
                                                    <p className="text-2xl font-black text-slate-900">{job.apps}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Candidates</p>
                                                </div>
                                                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-[8px] font-black uppercase tracking-widest">
                                                    {job.stage}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Engagement & Feedback */}
                            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                                <Heart className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-700" size={160} />
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">Organization Sentiment</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                        <div>
                                            <p className="text-3xl font-black mb-1 text-emerald-400">8.4/10</p>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Engagement Score</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black mb-1 text-amber-400">92%</p>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Survey Participation</p>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-black mb-1 text-violet-400">32 d</p>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Avg. Tenure (New)</p>
                                        </div>
                                    </div>
                                    <button className="mt-8 px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                                        View Detail Reports
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recent Events / Action Log */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-bold">Employee Lifecycle Events</h3>
                                <div className="relative space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                                    {[
                                        { title: 'Onboarding: Dr. Sarah', type: 'System-wide', icon: UserPlus, color: 'text-emerald-500' },
                                        { title: 'Promotion Board Meeting', type: 'Policy', icon: Award, color: 'text-violet-500' },
                                        { title: 'Exit Interview: Alex Doe', type: 'Operations', icon: Activity, color: 'text-rose-500' },
                                        { title: 'Q4 Feedback Open', type: 'Engagement', icon: MessageCircle, color: 'text-indigo-500' }
                                    ].map((event, i) => (
                                        <div key={i} className="relative pl-8 group cursor-pointer">
                                            <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white bg-white shadow-sm flex items-center justify-center ${event.color}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full current-color bg-current`} />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{event.title}</p>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{event.type}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-violet-600 p-6 rounded-2xl text-white shadow-lg space-y-4">
                                <FileText size={24} />
                                <h4 className="font-bold text-lg">Policies & Docs</h4>
                                <p className="text-xs text-white/70">Access the centralized institutional policy cloud.</p>
                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                                    Open Repository
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeSection !== 'overview' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                        <Activity size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 capitalize">{activeSection.replace('-', ' ')} Hub</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-[400px] text-center">People analytics and strategic operations for the {activeSection} hub are being optimized.</p>
                    <button onClick={() => setActiveSection('overview')} className="mt-8 px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold active:scale-95 transition-all uppercase tracking-widest">Back to Dashboard</button>
                </div>
            )}
        </div>
    );
}

function ShieldIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    );
}
