"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    TrendingUp,
    Clock,
    Wallet,
    IndianRupee,
    Activity,
    ChevronRight,
    Target,
    Briefcase,
    ArrowUpRight,
    ArrowUp,
    ArrowDown,
    FileText,
    Calendar,
    Bell
} from 'lucide-react';

export default function Overview() {
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

    const stats = [
        {
            label: 'Total Revenue',
            value: '₹ 1.24M',
            change: '+14% ',
            changeType: 'positive',
            icon: IndianRupee,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            href: '/finance'
        },
        {
            label: 'Active Workforce',
            value: '482',
            change: '+28 ',
            changeType: 'positive',
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            href: '/employees'
        },
        {
            label: 'Operational Efficiency',
            value: '84.2%',
            change: '+5%',
            changeType: 'positive',
            icon: Activity,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            href: '/attendance'
        },
        {
            label: 'Operating Expenditure',
            value: '₹ 320K',
            change: '-8%',
            changeType: 'positive', // Lower expenditure is good
            icon: Wallet,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            href: '/finance'
        }
    ];

    return (
        <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Strategic performance overview for the current fiscal period.</p>
                </div>
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                    {['Daily', 'Weekly', 'Monthly'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => setTimeframe(opt.toLowerCase() as any)}
                            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${timeframe === opt.toLowerCase()
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Link key={i} href={stat.href} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md ${stat.changeType === 'positive' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                {stat.change.includes('+') ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                                {stat.change}
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Performance & Insights Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Organizational Performance Graph */}
                <div className="lg:col-span-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Performance Analytics</h3>
                            <p className="text-xs text-slate-400 font-medium">Monthly operational throughput</p>
                        </div>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-all">
                            <FileText size={20} />
                        </button>
                    </div>

                    <div className="h-[240px] w-full relative">
                        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <path
                                d="M0,150 C100,160 150,40 250,120 C350,200 450,20 550,100 C650,180 750,50 800,80"
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            {[0, 150, 250, 450, 550, 750, 800].map((x, i) => (
                                <circle key={i} cx={x} cy={100 + Math.sin(x) * 50} r="4" fill="white" stroke="#2563eb" strokeWidth="2" />
                            ))}
                        </svg>
                        <div className="flex justify-between mt-4 px-2">
                            {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map(m => (
                                <span key={m} className="text-[9px] font-bold text-slate-400 tracking-widest">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-600" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Progress</p>
                                    <p className="text-sm font-bold text-slate-900 mt-1">72.4%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Resource Load</p>
                                    <p className="text-sm font-bold text-slate-900 mt-1">48.2%</p>
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                            Detailed Report <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Tactical Summary Cards */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Critical Alerts</h3>
                                <Bell size={18} className="text-white/40" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: 'Budget Allocation Alert', time: '12m ago', color: 'bg-rose-500' },
                                    { title: 'Pending Resource Audit', time: '1h ago', color: 'bg-amber-500' }
                                ].map((alert, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <div className={`w-2 h-2 rounded-full ${alert.color}`} />
                                        <div className="flex-1">
                                            <p className="text-xs font-bold text-white">{alert.title}</p>
                                            <p className="text-[9px] font-medium text-white/40">{alert.time}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-white/20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Departmental Health</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Engineering', score: 94, color: 'bg-blue-600' },
                                { name: 'Finance Unit', score: 76, color: 'bg-emerald-600' },
                                { name: 'Operations', score: 88, color: 'bg-indigo-600' }
                            ].map((dept, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-1">
                                        <span className="text-slate-900">{dept.name}</span>
                                        <span className="text-slate-500">{dept.score}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${dept.color} rounded-full transition-all duration-1000`}
                                            style={{ width: `${dept.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
