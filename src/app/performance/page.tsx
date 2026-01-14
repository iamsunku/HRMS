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
    Flame,
    X,
    CheckCircle2,
    Calendar,
    BarChart3,
    PieChart,
    Shield
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function PerformancePage() {
    const { user } = useUser();
    const isSuperAdmin = user?.role === 'SUPER_ADMIN' || true;

    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");

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

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Shell title="Performance Intelligence">
            <div className="space-y-6 md:space-y-6 max-w-[1400px] mx-auto pb-10 md:pb-12 px-4 md:px-0">

                {/* Header Actions */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Performance Matrix</h2>
                        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.2em] mt-0.5">Strategic Talent Analytics Node</p>
                    </div>
                    {isSuperAdmin && (
                        <button
                            onClick={() => alert('Downloading Detailed Performance Audit...')}
                            className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Download size={14} />
                            Global Export
                        </button>
                    )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {performanceMetrics.map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={18} />
                                </div>
                                <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-widest border border-emerald-100">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-0.5">{stat.value}</h3>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Leaderboard Section */}
                    <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-50 text-orange-500 rounded-xl">
                                    <Flame size={18} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-none">Talent Leaderboard</h3>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">High-throughput contributors</p>
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Search talent..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full md:w-56 pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all placeholder:opacity-50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {filteredEmployees.map((emp, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedEmployee(emp)}
                                    className="group p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer gap-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-lg group-hover:rotate-6 transition-transform">
                                            {emp.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900">{emp.name}</h4>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{emp.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center gap-6 sm:gap-0 self-center sm:self-auto">
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-black text-slate-900">{emp.score}</span>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">K-Score</span>
                                        </div>

                                        <div className="flex items-center gap-4 sm:hidden">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${emp.status === 'EXCEEDING' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {emp.status}
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary transition-all shadow-sm">
                                                <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-8">
                                        <div className="text-right">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${emp.status === 'EXCEEDING' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                                }`}>
                                                {emp.status}
                                            </span>
                                            <p className="text-[8px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest">Audit: {emp.lastReview}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all shadow-sm">
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recognition Wall */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-between group">
                            <Award className="absolute -top-5 -right-5 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={150} />
                            <div className="relative z-10">
                                <h3 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Evolution Cycle</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md">
                                            <Activity size={20} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black tracking-tight leading-none">12 Days</p>
                                            <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest mt-1">Until Q1 Evolution Batch</p>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                                        <p className="text-[11px] font-medium leading-relaxed italic opacity-80">
                                            "Strategic alignment ensures every node is firing towards the same North Star."
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button className="relative z-10 w-full py-3.5 mt-8 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-50 transition-all transform active:scale-95">
                                Propose Eval Logic
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2">
                                <Star size={14} className="text-amber-500 fill-amber-400" />
                                Elite Badges
                            </h4>
                            <div className="flex -space-x-2 mb-6">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[9px] font-black shadow-sm overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[8px] font-black shadow-sm">
                                    +12
                                </div>
                            </div>
                            <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                                <span className="text-primary font-black">18 Members</span> earned badges this cycle.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Performance Detail Overlay - High Density Pro View */}
                {selectedEmployee && (
                    <div className="fixed inset-0 lg:left-[270px] z-[5000] bg-[#f8fafc] overflow-y-auto animate-in fade-in duration-300">
                        {/* Compact Content Container */}
                        <div className="min-h-full flex flex-col items-stretch">
                            {/* Pro Header - Ultra Compact */}
                            <div className="relative bg-slate-900 px-6 py-6 md:px-8 md:py-8 text-white overflow-hidden shrink-0 border-b border-white/5">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
                                <Award className="absolute -top-5 -right-5 text-white/5 rotate-12" size={150} />

                                {/* Navigation / Back Button */}
                                <div className="flex justify-between items-center relative z-20 mb-6">
                                    <button
                                        onClick={() => setSelectedEmployee(null)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg border border-white/10 backdrop-blur-xl transition-all group active:scale-95"
                                    >
                                        <ChevronRight className="rotate-180 group-hover:-translate-x-0.5 transition-transform" size={14} />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Performance Matrix</span>
                                    </button>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">High Performance Node</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center gap-6 md:gap-8">
                                    <div className="relative shrink-0">
                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-2xl font-black text-white shadow-xl">
                                            {selectedEmployee.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center border-2 border-slate-900 shadow-md">
                                            <Zap size={10} className="text-white fill-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">{selectedEmployee.name}</h3>
                                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[8px] font-black rounded-md uppercase tracking-widest">
                                                {selectedEmployee.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-white/40">
                                            <p className="text-[11px] font-bold tracking-tight uppercase tracking-widest">{selectedEmployee.role}</p>
                                            <div className="w-1 h-1 rounded-full bg-white/10" />
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={12} className="opacity-30" />
                                                <span className="text-[8px] font-black uppercase tracking-widest leading-none">ID: {Math.floor(Math.random() * 90000) + 10000}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main High-Density Workspace */}
                            <div className="flex-1 p-5 md:p-8 space-y-6 bg-[#f8fafc]">
                                <div className="max-w-[1100px] mx-auto space-y-6">

                                    {/* Ultra Compact Stats Row */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                        {[
                                            { label: 'Efficiency Index', value: '94.2%', icon: Target, color: 'text-blue-500', trend: '+2.4%' },
                                            { label: 'Throughput Node', value: '1.4x', icon: Zap, color: 'text-amber-500', trend: 'STABLE' },
                                            { label: 'Synergy Level', value: '98/100', icon: Users, color: 'text-emerald-500', trend: '+12%' },
                                            { label: 'Reliability Node', value: 'ELITE', icon: Shield, color: 'text-purple-500', trend: 'v9.4' },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 group">
                                                <div className={`shrink-0 w-10 h-10 rounded-lg bg-slate-50 ${stat.color} flex items-center justify-center group-hover:bg-white group-hover:shadow-soft transition-all`}>
                                                    <stat.icon size={16} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="text-lg font-black text-slate-900 leading-none mb-1">{stat.value}</h4>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest truncate">{stat.label}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                        {/* Capability Node Audit */}
                                        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Technical Capability Node</h4>
                                                    <p className="text-slate-400 font-bold text-[8px] uppercase tracking-widest mt-0.5">Quarterly Verification Grid</p>
                                                </div>
                                                <BarChart3 size={16} className="text-slate-300" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                                                {[
                                                    { label: 'Architecture Scalability', score: 92, color: 'bg-blue-600' },
                                                    { label: 'Global Security Integrity', score: 98, color: 'bg-emerald-500' },
                                                    { label: 'Logic Complexity Mastery', score: 85, color: 'bg-amber-500' },
                                                    { label: 'Strategic Collaboration', score: 95, color: 'bg-slate-900' }
                                                ].map((vector, i) => (
                                                    <div key={i} className="space-y-2">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{vector.label}</span>
                                                            <span className="text-xs font-black text-slate-900">{vector.score}%</span>
                                                        </div>
                                                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                                            <div
                                                                className={`h-full ${vector.color} rounded-full transition-all duration-1000 ease-out`}
                                                                style={{ width: `${vector.score}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Strategic Side Panel */}
                                        <div className="lg:col-span-4 space-y-4">
                                            <div className="bg-slate-900 p-6 rounded-2xl text-white space-y-6 relative overflow-hidden shadow-lg border border-white/5">
                                                <Award className="absolute -bottom-5 -right-5 text-white/5" size={80} />
                                                <div className="relative z-10">
                                                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Operations Hub</h4>
                                                    <div className="space-y-2">
                                                        <button className="w-full py-2.5 bg-white text-slate-900 rounded-lg font-black text-[9px] uppercase tracking-widest shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                                                            <Download size={12} /> Personnel Audit
                                                        </button>
                                                        <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                                            <PieChart size={12} /> Synergy Node
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Star className="text-amber-400 fill-amber-400" size={12} />
                                                    <h5 className="text-[8px] font-black uppercase tracking-widest text-slate-400">Contributor Status</h5>
                                                </div>
                                                <p className="text-[10px] font-bold leading-relaxed text-slate-500">
                                                    "Consistently maintains elite review standards and strategic alignment across core repositories."
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Evolution Path Trace */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Historical Evolution Trace</h4>
                                            <div className="h-px flex-1 bg-slate-100 mx-4" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {[
                                                { title: 'Project K-9 Lead', date: 'DEC 2025', type: 'STRATEGY' },
                                                { title: 'Protocol V4 Auth', date: 'OCT 2025', type: 'TECHNICAL' },
                                                { title: 'Synergy Catalyst', date: 'AUG 2025', type: 'LEADERSHIP' }
                                            ].map((ms, i) => (
                                                <div key={i} className="bg-white px-4 py-3 rounded-xl border border-slate-100 hover:border-primary/20 transition-all flex items-center justify-between group">
                                                    <div className="min-w-0">
                                                        <h5 className="text-[11px] font-black text-slate-900 truncate">{ms.title}</h5>
                                                        <p className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">{ms.date}</p>
                                                    </div>
                                                    <span className="shrink-0 text-[7px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-tight group-hover:bg-primary group-hover:text-white transition-colors">
                                                        {ms.type}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Shell>
    );
}
