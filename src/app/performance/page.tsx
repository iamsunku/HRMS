'use client';

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Target,
    TrendingUp,
    Zap,
    Users,
    ChevronRight,
    Star,
    Award,
    Activity,
    Download,
    Filter,
    Search,
    Flame
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function PerformancePage() {
    const { user } = useUser();
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    const performanceMetrics = [
        { label: 'Avg Efficiency', value: '88.4%', trend: '+4.2%', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Logic Mastery', value: 'Level 8', trend: 'Elite', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Team Synergy', value: 'High', trend: '+12%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Growth Velocity', value: '1.2x', trend: 'Accelerating', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const employees = [
        { name: 'Arjun Sharma', role: 'Full Stack Architect', score: 94, status: 'EXCEEDING', lastReview: '2025-12-10' },
        { name: 'Priya Patel', role: 'Product Lead', score: 89, status: 'EXPECTED', lastReview: '2025-11-20' },
        { name: 'Rahul Vikram', role: 'Staff Engineer', score: 91, status: 'EXCEEDING', lastReview: '2025-12-01' },
    ];

    return (
        <Shell title="Performance Intelligence">
            <div className="space-y-8 max-w-[1600px] mx-auto pb-20">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">KICCPA Performance Matrix</h2>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1 opacity-70">Strategic Analytics & Talent Optimization</p>
                    </div>
                    {isSuperAdmin && (
                        <button
                            onClick={() => alert('Downloading Detailed Performance Audit...')}
                            className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
                        >
                            <Download size={18} />
                            Full Performance Audit
                        </button>
                    )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {performanceMetrics.map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-soft hover:shadow-2xl transition-all group relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Leaderboard Section */}
                    <div className="lg:col-span-8 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-soft">
                        <div className="flex justify-between items-center mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-orange-50 text-orange-500 rounded-3xl">
                                    <Flame size={24} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900">Talent Leaderboard</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Top contributors based on monthly throughput</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search talent..."
                                        className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all w-64"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {employees.map((emp, i) => (
                                <div key={i} className="group p-8 bg-slate-50/50 rounded-[3rem] border border-slate-50 hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 text-white flex items-center justify-center text-sm font-black border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
                                            {emp.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-black text-slate-900">{emp.name}</h4>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">{emp.role}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-col items-center">
                                        <span className="text-2xl font-black text-slate-900">{emp.score}</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">K-Score</span>
                                    </div>

                                    <div className="flex items-center gap-10">
                                        <div className="text-right hidden sm:block">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${emp.status === 'EXCEEDING' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {emp.status}
                                            </span>
                                            <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-widest">Ref: {emp.lastReview}</p>
                                        </div>
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recognition Wall */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden h-[450px] flex flex-col justify-between group">
                            <Award className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={300} />
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mb-10">Next Evolution Cycle</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-6 items-center">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                                            <Activity size={32} />
                                        </div>
                                        <div>
                                            <p className="text-4xl font-black tracking-tighter">12 Days</p>
                                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Until Q1 Evolution Batch</p>
                                        </div>
                                    </div>
                                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                                        <p className="text-sm font-medium leading-relaxed italic opacity-80">
                                            "Strategic alignment is not about doing more; it is about ensuring every node is firing towards the same North Star."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className="relative z-10 w-full py-5 bg-white text-slate-900 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-slate-50 transition-all transform active:scale-95">
                                Propose Evaluation Logic
                            </button>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-soft">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                Elite Badges Issued
                            </h4>
                            <div className="flex -space-x-3 mb-8">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black shadow-sm overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                    +12
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">
                                <span className="text-primary font-black">18 Members</span> earned the 'Strategic Executor' badge this month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
