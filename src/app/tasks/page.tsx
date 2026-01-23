"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Target,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    MoreHorizontal,
    Zap,
    Star,
    Layers,
    Activity,
    Trophy,
    TrendingUp,
    Plus
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const MOCK_OKRS = [
    { title: 'Academic Content Digitization', progress: 75, status: 'On Track', key: 'OKR-2026-A' },
    { title: 'Student Engagement Ratio', progress: 92, status: 'Excellent', key: 'OKR-2026-B' },
    { title: 'LMS Optimization Feedback', progress: 40, status: 'Behind', key: 'OKR-2026-C' },
];

const DAILY_TASKS = [
    { id: 'TSK-12', title: 'Review Physics Batch B Assignments', priority: 'High', due: 'Today', category: 'Academic' },
    { id: 'TSK-15', title: 'Prepare Faculty Meeting Slides', priority: 'Medium', due: 'Jan 24', category: 'Admin' },
    { id: 'TSK-20', title: 'Complete Compliance Training', priority: 'Urgent', due: 'Jan 25', category: 'Policy' },
    { id: 'TSK-21', title: 'Digital Resource Audit', priority: 'Low', due: 'Jan 28', category: 'Technical' },
];

export default function TasksPage() {
    const { user, loading } = useUser();

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Loading Objectives...</div>;

    return (
        <Shell title="Objectives, Key Results & Tactical Tasks">
            <div className="px-6 py-6 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Performance Header */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Excellence Score', value: '4.8/5.0', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Tasks Completed', value: '142', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { label: 'Pending KRs', value: '04', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Engagement', value: '98%', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={18} />
                                </div>
                                <ArrowUpRight size={14} className="text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 leading-none">{stat.value}</h3>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* OKRs Tracking */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Trophy size={20} className="text-amber-500" />
                                    <h3 className="text-lg font-bold text-slate-900">Institutional OKRs (Q1 2026)</h3>
                                </div>
                                <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Roadmap</button>
                            </div>

                            <div className="space-y-10">
                                {MOCK_OKRS.map((okr, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{okr.key}</p>
                                                <h4 className="text-sm font-bold text-slate-900">{okr.title}</h4>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${okr.status === 'Excellent' ? 'bg-emerald-50 text-emerald-600' :
                                                    okr.status === 'Behind' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'
                                                    }`}>
                                                    {okr.status}
                                                </span>
                                                <p className="text-xs font-black text-slate-900 mt-1">{okr.progress}%</p>
                                            </div>
                                        </div>
                                        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${okr.progress > 80 ? 'bg-emerald-500' :
                                                    okr.progress < 50 ? 'bg-rose-500' : 'bg-indigo-500'
                                                    }`}
                                                style={{ width: `${okr.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Tactical Excellence */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Recent Milestone Highlights</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600">
                                        <Layers size={18} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-900">Content Engine Overhaul</h4>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Verified by HR Manager • Jan 12</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                        +50 pts
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sequential Task Feed */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-indigo-400" />
                                    <h3 className="text-base font-bold">Tactical Tasks</h3>
                                </div>
                                <Plus size={20} className="text-slate-500 hover:text-white cursor-pointer" />
                            </div>

                            <div className="space-y-6">
                                {DAILY_TASKS.map((task, i) => (
                                    <div key={i} className="group relative pl-6 border-l border-slate-700">
                                        <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 transition-colors" />
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded mb-2 block w-fit ${task.priority === 'Urgent' ? 'bg-rose-500/20 text-rose-400' :
                                                    task.priority === 'High' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-400'
                                                    }`}>
                                                    {task.priority} Priority
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-500">{task.due}</span>
                                            </div>
                                            <h4 className="text-xs font-bold text-slate-200 leading-tight">{task.title}</h4>
                                            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1.5">{task.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-10 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-300">
                                Full Tactical Archive
                            </button>
                        </div>

                        {/* Efficiency Card */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <TrendingUp size={20} className="text-emerald-500" />
                                <h4 className="text-sm font-bold text-slate-900">Efficiency Index</h4>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">92.4%</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">+2.4% From Last Cycle</p>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
