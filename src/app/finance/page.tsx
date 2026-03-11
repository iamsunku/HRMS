"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PieChart,
    BarChart3,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Calendar,
    IndianRupee,
    AlertTriangle,
    FileText,
    ChevronRight,
    Activity,
    Target
} from 'lucide-react';

const budgetData = [
    { category: 'LMS & Digital Infrastructure', allocated: 5000000, actual: 4200000, savings: 800000, status: 'stable' },
    { category: 'Faculty Research & Grants', allocated: 2000000, actual: 1850000, savings: 150000, status: 'optimized' },
    { category: 'Digital Content Creation', allocated: 8000000, actual: 8200000, savings: -200000, status: 'deviation' },
    { category: 'Academic Events & Seminars', allocated: 1500000, actual: 900000, savings: 600000, status: 'optimized' },
];

const monthlyLiquidity = [
    { month: 'Jan', value: 450 },
    { month: 'Feb', value: 320 },
    { month: 'Mar', value: 610 },
    { month: 'Apr', value: 280 },
    { month: 'May', value: 490 },
    { month: 'Jun', value: 750 },
];

export default function FinancePage() {
    const totalAllocated = budgetData.reduce((acc, curr) => acc + curr.allocated, 0);
    const totalActual = budgetData.reduce((acc, curr) => acc + curr.actual, 0);
    const totalSavings = totalAllocated - totalActual;
    const utilizationRate = ((totalActual / totalAllocated) * 100).toFixed(1);

    return (
        <Shell title="Academic Finance Hub">
            <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Executive Summary Tier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-1.5">Institutional Budget</p>
                            <h3 className="text-2xl font-black">₹{(totalAllocated / 10000000).toFixed(2)} Cr</h3>
                            <div className="mt-3 flex items-center gap-2 text-[9px] font-bold text-white/60 bg-white/5 w-fit px-2.5 py-1 rounded-full">
                                <Target size={11} /> Academic Year Projection
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                            <Wallet size={64} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Net Capital Optimization</p>
                            <h3 className="text-2xl font-bold text-slate-900">₹{(totalSavings / 100000).toFixed(2)} L</h3>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 text-[9px] font-black uppercase tracking-widest mt-3">
                            <TrendingUp size={12} /> 12.4% Optimization Grade
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Operational Absorption</p>
                            <h3 className="text-2xl font-bold text-slate-900">{utilizationRate}%</h3>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-3 overflow-hidden">
                            <div className="h-full bg-violet-600 transition-all duration-1000" style={{ width: `${utilizationRate}%` }} />
                        </div>
                    </div>
                </div>

                {/* Primary Intelligence Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Category Analysis Table */}
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Activity size={18} className="text-violet-600" />
                                <h3 className="text-base font-bold text-slate-900">Portfolio Analysis</h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                                    <Filter size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all">
                                    <Download size={12} /> Export Ledger
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Resource Category</th>
                                        <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Allocation</th>
                                        <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Absorption</th>
                                        <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Delta</th>
                                        <th className="px-6 py-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {budgetData.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-3.5">
                                                <p className="text-[13px] font-bold text-slate-900">{item.category}</p>
                                            </td>
                                            <td className="px-6 py-3.5 text-[11px] font-bold text-slate-600">₹{(item.allocated / 100000).toFixed(1)}L</td>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[11px] font-black text-slate-900">{((item.actual / item.allocated) * 100).toFixed(0)}%</span>
                                                    <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.actual > item.allocated ? 'bg-rose-500' : 'bg-violet-600'}`}
                                                            style={{ width: `${Math.min((item.actual / item.allocated) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`px-6 py-3.5 text-[11px] font-black ${item.savings >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                ₹{Math.abs(item.savings).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <span className={`px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${item.status === 'optimized' ? 'bg-emerald-50 text-emerald-600' :
                                                    item.status === 'stable' ? 'bg-violet-50 text-violet-600' : 'bg-rose-50 text-rose-600'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Operational Insights Section */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Liquidity Graph Card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Liquidity Flux</h3>
                                <Calendar size={16} className="text-slate-300" />
                            </div>
                            <div className="flex-1 flex items-end justify-between gap-1.5 px-0.5">
                                {monthlyLiquidity.map((data, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                        <div
                                            className="w-full bg-slate-900 rounded-t-lg group-hover:bg-violet-600 transition-all duration-500 relative"
                                            style={{ height: `${(data.value / 800) * 100}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[8px] font-black py-1 px-2 rounded-md shadow-lg shadow-slate-200 pointer-events-none">
                                                ₹{data.value}k
                                            </div>
                                        </div>
                                        <span className="text-[9px] font-black text-slate-300 group-hover:text-slate-900 uppercase tracking-widest">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Tactical Ledger */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <FileText size={18} className="text-slate-400" />
                            <h3 className="text-base font-bold text-slate-900">Institutional Expenditure Ledger</h3>
                        </div>
                        <button className="text-[9px] font-black text-7c3aed uppercase tracking-widest hover:underline" style={{ color: '#7c3aed' }}>View Advanced Ledger</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Transactions */}
                        {[
                            { title: 'LMS Scaling (Global Hubs)', amount: '₹12,40,000', dept: 'Digital Academics', date: 'Jan 10' },
                            { title: 'Regional Educators Workshop', amount: '₹8,50,000', dept: 'Faculty Leadership', date: 'Jan 08' },
                            { title: 'Smart Classroom Hardware', amount: '₹18,00,000', dept: 'Academic Operations', day: 'Jan 05' },
                        ].map((exp, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                                <div className="space-y-0.5">
                                    <p className="text-[11px] font-black text-slate-800">{exp.title}</p>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{exp.dept} node • {exp.date || (exp as any).day}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[13px] font-black text-slate-900">{exp.amount}</p>
                                    <ChevronRight size={12} className="ml-auto mt-0.5 text-slate-300 group-hover:text-7c3aed" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Shell>
    );
}
