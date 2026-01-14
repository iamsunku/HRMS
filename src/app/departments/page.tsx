"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    Building2, Users, Wallet,
    MoreHorizontal, Plus, Search, Filter,
    User, ArrowRight, LayoutGrid, List,
    Activity, ShieldCheck, Target
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const departments = [
    {
        id: 1,
        name: 'Systems Engineering',
        head: 'Rahul Vikram',
        headcount: 145,
        budget: '₹4.5 Cr',
        status: 'Optimal',
        statusColor: 'bg-emerald-50 text-emerald-600',
        projects: 12,
        iconInitial: 'S'
    },
    {
        id: 2,
        name: 'Human Capital',
        head: 'Priya Patel',
        headcount: 12,
        budget: '₹1.2 Cr',
        status: 'Resource Gap',
        statusColor: 'bg-rose-50 text-rose-600',
        projects: 5,
        iconInitial: 'H'
    },
    {
        id: 3,
        name: 'PX Architecture',
        head: 'Sneha L.',
        headcount: 24,
        budget: '₹2.8 Cr',
        status: 'Optimal',
        statusColor: 'bg-emerald-50 text-emerald-600',
        projects: 8,
        iconInitial: 'P'
    },
    {
        id: 4,
        name: 'Market Intelligence',
        head: 'Vikram Seth',
        headcount: 38,
        budget: '₹3.5 Cr',
        status: 'Scaling',
        statusColor: 'bg-blue-50 text-blue-600',
        projects: 15,
        iconInitial: 'M'
    },
    {
        id: 5,
        name: 'Fiscal Operations',
        head: 'Anil Gupta',
        headcount: 15,
        budget: '₹1.8 Cr',
        status: 'Optimal',
        statusColor: 'bg-emerald-50 text-emerald-600',
        projects: 4,
        iconInitial: 'F'
    },
];

const stats = [
    { label: 'Total Business Units', value: '08', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Global Workforce', value: '1,248', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Aggregate Budget', value: '₹18.4 Cr', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function DepartmentsPage() {
    return (
        <Shell title="Unit Governance">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* 1. Tactical Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Business Units</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Strategic oversight and organizational node management.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search units..."
                                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                            <Plus size={16} /> New Unit
                        </button>
                    </div>
                </div>

                {/* 2. Analytical Intelligence */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 group hover:shadow-md transition-shadow">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon size={26} />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Organizational Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                        <div key={dept.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg group-hover:bg-blue-600 transition-all duration-500 shadow-sm">
                                    {dept.iconInitial}
                                </div>
                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${dept.statusColor}`}>
                                    {dept.status}
                                </span>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {dept.name}
                                </h3>
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                    <Activity size={12} /> Resource Stream: {dept.status}
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-50 mb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <User size={14} className="text-slate-300" /> Unit Lead
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{dept.head}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Users size={14} className="text-slate-300" /> Personnel
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{dept.headcount} Nodes</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Wallet size={14} className="text-slate-300" /> Absorption
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{dept.budget}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{dept.projects} Active Nodes</span>
                                <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 p-8 hover:bg-slate-50 hover:border-slate-300 transition-all group min-h-[360px]">
                        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Building2 size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-900">Initialize New Unit</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Scale Organizational Architecture</p>
                        </div>
                    </button>
                </div>

            </div>
        </Shell>
    );
}
