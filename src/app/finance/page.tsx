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
    { category: 'IT Assets & Infrastructure', allocated: 5000000, actual: 4200000, savings: 800000, status: 'stable' },
    { category: 'Talent Development', allocated: 2000000, actual: 1850000, savings: 150000, status: 'optimized' },
    { category: 'Core Operations', allocated: 8000000, actual: 8200000, savings: -200000, status: 'deviation' },
    { category: 'Strategic Events', allocated: 1500000, actual: 900000, savings: 600000, status: 'optimized' },
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
        <Shell title="Financial Command">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Executive Summary Tier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Portfolio Allocation</p>
                            <h3 className="text-3xl font-black">₹{(totalAllocated / 10000000).toFixed(2)} Cr</h3>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-white/60 bg-white/5 w-fit px-3 py-1.5 rounded-full">
                                <Target size={12} /> Strategic Fiscal Limit
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Wallet size={80} />
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Net Capital Optimization</p>
                            <h3 className="text-3xl font-bold text-slate-900">₹{(totalSavings / 100000).toFixed(2)} L</h3>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mt-4">
                            <TrendingUp size={14} /> 12.4% Optimization Grade
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Operational Absorption</p>
                            <h3 className="text-3xl font-bold text-slate-900">{utilizationRate}%</h3>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${utilizationRate}%` }} />
                        </div>
                    </div>
                </div>

                {/* Primary Intelligence Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Category Analysis Table */}
                    <div className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Activity size={20} className="text-blue-600" />
                                <h3 className="text-lg font-bold text-slate-900">Portfolio Analysis</h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50">
                                    <Filter size={18} />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                                    <Download size={14} /> Export Ledger
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Category</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Allocation</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Absorption</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Delta</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {budgetData.map((item, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-bold text-slate-900">{item.category}</p>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-bold text-slate-600">₹{(item.allocated / 100000).toFixed(1)}L</td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-black text-slate-900">{((item.actual / item.allocated) * 100).toFixed(0)}%</span>
                                                    <div className="h-1 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.actual > item.allocated ? 'bg-rose-500' : 'bg-blue-600'}`}
                                                            style={{ width: `${Math.min((item.actual / item.allocated) * 100, 100)}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`px-8 py-5 text-xs font-black ${item.savings >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                ₹{Math.abs(item.savings).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${item.status === 'optimized' ? 'bg-emerald-50 text-emerald-600' :
                                                        item.status === 'stable' ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'
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
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full">
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Liquidity Flux</h3>
                                <Calendar size={18} className="text-slate-300" />
                            </div>
                            <div className="flex-1 flex items-end justify-between gap-2 px-1">
                                {monthlyLiquidity.map((data, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                        <div
                                            className="w-full bg-slate-900 rounded-t-xl group-hover:bg-blue-600 transition-all duration-500 relative"
                                            style={{ height: `${(data.value / 800) * 100}%` }}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] font-black py-1.5 px-3 rounded-lg shadow-xl shadow-slate-200 pointer-events-none">
                                                ₹{data.value}k
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-900 uppercase tracking-widest">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Tactical Ledger */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-slate-400" />
                            <h3 className="text-lg font-bold text-slate-900">Strategic Expenditure Ledger</h3>
                        </div>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Advanced Ledger</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Data Infrastructure (Q4 Refresh)', amount: '₹12,40,000', dept: 'Systems Engineering', date: 'Jan 10' },
                            { title: 'Global Leadership Summit', amount: '₹8,50,000', dept: 'Executive Operations', date: 'Jan 08' },
                            { title: 'Workstation Lifecycle Management', amount: '₹18,00,000', dept: 'System Logistics', date: 'Jan 05' },
                        ].map((exp, i) => (
                            <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-800">{exp.title}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{exp.dept} node • {exp.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-slate-900">{exp.amount}</p>
                                    <ChevronRight size={14} className="ml-auto mt-1 text-slate-300 group-hover:text-blue-600" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Shell>
    );
}
