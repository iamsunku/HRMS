"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Users,
    TrendingUp,
    Clock,
    ArrowUp,
    ArrowDown,
    Wallet,
    IndianRupee,
    Activity,
    Zap,
    ChevronRight,
    Search,
    History,
    Sparkles,
    LayoutGrid,
    Target,
    Bell,
    CheckCircle2,
    Briefcase,
    ArrowUpRight
} from 'lucide-react';

export default function Overview() {
    const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

    const stats = [
        {
            label: 'Total Revenue',
            value: '₹ 1.24M',
            change: '+14%',
            icon: IndianRupee,
            color: 'from-blue-600 to-cyan-500',
            shadow: 'shadow-blue-200/50',
            href: '/finance'
        },
        {
            label: 'Workforce',
            value: '482',
            change: '+28',
            icon: Users,
            color: 'from-violet-600 to-purple-500',
            shadow: 'shadow-purple-200/50',
            href: '/employees'
        },
        {
            label: 'Efficiency',
            value: '84.2%',
            change: '+5%',
            icon: Activity,
            color: 'from-emerald-600 to-teal-500',
            shadow: 'shadow-emerald-200/50',
            href: '/attendance'
        },
        {
            label: 'Expenditure',
            value: '₹ 320K',
            change: '-8%',
            icon: Wallet,
            color: 'from-rose-600 to-orange-500',
            shadow: 'shadow-rose-200/50',
            href: '/finance'
        }
    ];

    return (
        <div className="p-10 space-y-12 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-40">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Enterprise Overview</h1>
                    <p className="text-slate-500 font-semibold text-sm">Strategic intelligence for the current fiscal period.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-2 rounded-3xl shadow-soft border border-slate-100">
                    {['Daily', 'Weekly', 'Monthly'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => setTimeframe(opt.toLowerCase() as any)}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${timeframe === opt.toLowerCase() ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Vibrant Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <Link key={i} href={stat.href} className="group relative block">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-soft relative z-10 hover:-translate-y-2 transition-transform duration-500">
                            <div className="flex justify-between items-center mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg ${stat.shadow}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Main Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Performance Visualizer */}
                <Link href="/reports" className="lg:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-soft relative overflow-hidden group transition-all hover:shadow-2xl">
                    <div className="flex justify-between items-center mb-12 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-200">
                                <Activity size={22} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Performance Matrix</h3>
                                <p className="text-xs font-bold text-slate-400">Monthly throughput & scaling nodes</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-slate-50 flex items-center justify-center text-slate-300 group-hover:text-primary group-hover:border-primary/20 transition-all">
                            <ArrowUpRight size={20} />
                        </div>
                    </div>

                    <div className="h-[280px] relative mt-8">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Animated Performance Path */}
                            <path
                                d="M0,150 C100,160 150,40 250,120 C350,200 450,20 550,100 C650,180 750,50 800,80 V200 H0 Z"
                                fill="url(#performanceGrad)"
                                className="animate-pulse duration-[4s]"
                            />
                            <path
                                d="M0,150 C100,160 150,40 250,120 C350,200 450,20 550,100 C650,180 750,50 800,80"
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                className="animate-[dash_3s_ease-out_forwards]"
                                style={{ strokeDasharray: 1500, strokeDashoffset: 1500 }}
                            />

                            {/* Tactical Indicators */}
                            {[0, 150, 250, 450, 550, 750, 800].map((x, i) => (
                                <circle key={i} cx={x} cy={100 + Math.sin(x) * 50} r="4" fill="white" stroke="var(--primary)" strokeWidth="2" />
                            ))}
                        </svg>

                        <div className="absolute inset-0 flex items-end justify-between px-2 pointer-events-none opacity-40">
                            {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map(m => (
                                <span key={m} className="text-[10px] font-black text-slate-300 tracking-[0.3em]">{m}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center">
                        <div className="flex gap-10">
                            {[
                                { label: 'Active Projects', value: '24 Nodes', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Resource Load', value: '72%', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</p>
                                        <p className="text-base font-black text-slate-900 mt-1">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:bg-primary group-hover:text-white transition-all">
                            Tactical Audit <ChevronRight size={14} />
                        </div>
                    </div>
                </Link>

                {/* Intelligence Stream */}
                <div className="lg:col-span-4 space-y-10">

                    {/* Live Notifications */}
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-soft relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Intelligence Stream</h3>
                            <div className="flex gap-2">
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
                                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                            </div>
                        </div>
                        <div className="space-y-6 relative z-10">
                            {[
                                { user: 'SC', action: 'Project Node Approval', time: '12m', color: 'text-emerald-500', bg: 'bg-emerald-50', link: '/projects' },
                                { user: 'JD', action: 'Budget Threshold Warning', time: '24m', color: 'text-rose-500', bg: 'bg-rose-50', link: '/finance' },
                                { user: 'AM', action: 'New Asset Commissioned', time: '1h', color: 'text-indigo-500', bg: 'bg-indigo-50', link: '/assets' }
                            ].map((item, i) => (
                                <Link key={i} href={item.link} className="flex items-center gap-5 group/item transition-all p-4 rounded-3xl hover:bg-slate-50 border border-transparent hover:border-slate-100">
                                    <div className={`w-12 h-12 rounded-[1.2rem] ${item.bg} ${item.color} flex items-center justify-center text-[11px] font-black shadow-sm group-hover/item:scale-110 transition-transform`}>
                                        {item.user}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-800 leading-none group-hover/item:text-primary transition-colors">{item.action}</p>
                                        <span className="text-[9px] font-black uppercase text-slate-400 mt-2 block tracking-tight">{item.time} ago</span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-200 group-hover/item:text-primary translate-x-[-4px] group-hover/item:translate-x-0 transition-all opacity-0 group-hover/item:opacity-100" />
                                </Link>
                            ))}
                        </div>
                        <Link href="/reports" className="w-full mt-10 block py-5 bg-slate-900 rounded-3xl text-[10px] font-black uppercase tracking-widest text-center text-white shadow-xl shadow-slate-200 hover:bg-primary transition-all">
                            Expand Intelligence Hub
                        </Link>
                    </div>

                    {/* Department Nodes */}
                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-soft">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Department Health</h3>
                        <div className="space-y-6">
                            {[
                                { name: 'Engineering', score: 94, color: 'bg-blue-600' },
                                { name: 'Finance', score: 76, color: 'bg-emerald-600' },
                                { name: 'Operation', score: 88, color: 'bg-purple-600' }
                            ].map((dept, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest leading-none px-1">
                                        <span className="text-slate-900">{dept.name}</span>
                                        <span className="text-slate-400">{dept.score}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
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

            <style jsx global>{`
                @keyframes grow {
                    from { height: 0; }
                }
                .shadow-soft {
                    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04);
                }
            `}</style>

        </div>
    );
}
