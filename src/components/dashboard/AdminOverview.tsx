"use client";

import React, { useState } from 'react';
import {
    Users,
    UserCheck,
    AlertCircle,
    CheckSquare,
    Search,
    Filter,
    MoreVertical,
    Download,
    Plus,
    Building2,
    CalendarClock,
    Wallet,
    FileBarChart,
    Settings,
    Shield,
    ChevronRight,
    ArrowUpRight,
    Layers,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

type Section = 'overview' | 'employees' | 'attendance' | 'leave' | 'payroll' | 'master' | 'reports';

export default function AdminOverview() {
    const { user } = useUser();
    const [activeSection, setActiveSection] = useState<Section>('overview');

    const stats = [
        { label: 'Total Employees', value: '1,248', growth: '+12%', icon: Users, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Active Status', value: '1,192', growth: '95.5%', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Pending Approvals', value: '42', growth: '12 urgent', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'System Alerts', value: '03', growth: 'Security', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    const menuItems = [
        { id: 'overview', label: 'Operations hub', icon: Layers },
        { id: 'employees', label: 'Employee Management', icon: Users },
        { id: 'attendance', label: 'Attendance Oversight', icon: CalendarClock },
        { id: 'leave', label: 'Leave Admin', icon: CheckSquare },
        { id: 'payroll', label: 'Payroll Setup', icon: Wallet },
        { id: 'master', label: 'Master Data', icon: Shield },
        { id: 'reports', label: 'Deep Reports', icon: FileBarChart },
    ];

    return (
        <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Operational Control & System Intelligence Suite</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                        <Plus size={14} /> New Employee
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                        <Download size={14} /> Bulk Export
                    </button>
                </div>
            </div>

            {/* Admin Sub-Nav */}
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

            {/* Conditional Rendering */}
            {activeSection === 'overview' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner`}>
                                        <stat.icon size={18} />
                                    </div>
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${stat.color.includes('rose') ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'
                                        }`}>
                                        {stat.growth}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</h3>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Approval Queue */}
                        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-violet-600" />
                                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Pending Approvals</h3>
                                </div>
                                <button className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:underline">Process All</button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="text-left py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
                                            <th className="text-left py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                                            <th className="text-left py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Request Date</th>
                                            <th className="text-right py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {[
                                            { name: 'Dr. Sarah James', role: 'Faculty', type: 'Special Leave', date: 'Jan 22', status: 'Pending' },
                                            { name: 'Mark Wilson', role: 'IT Support', type: 'Attendance Reg.', date: 'Jan 21', status: 'Urgent' },
                                            { name: 'Elena Gilbert', role: 'Admin', type: 'New Asset', date: 'Jan 20', status: 'Pending' },
                                            { name: 'David Miller', role: 'Faculty', type: 'Sick Leave', date: 'Jan 20', status: 'Pending' },
                                        ].map((item, i) => (
                                            <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                                                            {item.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-900">{item.name}</p>
                                                            <p className="text-[9px] font-medium text-slate-400">{item.role}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-xs font-medium text-slate-600">{item.type}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-xs font-medium text-slate-600">{item.date}</span>
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                        <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                                            <XCircle size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Operational Alerts */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6">System Health</h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Payroll Server', status: 'Active', color: 'bg-emerald-500' },
                                        { label: 'Cloud Sync', status: 'Active', color: 'bg-emerald-500' },
                                        { label: 'MFA Engine', status: 'Warning', color: 'bg-amber-500' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                                            <span className="text-xs font-bold text-white/80">{s.label}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{s.status}</span>
                                                <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-bold">Upcoming Milestones</h3>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Shift Rotation Sync', date: 'Jan 28', icon: Clock },
                                        { title: 'Tax Declarations Open', date: 'Feb 01', icon: Wallet }
                                    ].map((m, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                                                <m.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{m.title}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{m.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content for other sections (abstracted for density) */}
            {activeSection !== 'overview' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                        <Settings size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 capitalize">{activeSection.replace('-', ' ')} Module</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-[400px] text-center">Comprehensive data management table and filter systems for {activeSection} are being synchronized with the master database.</p>
                    <div className="mt-8 flex gap-4">
                        <button className="px-6 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-violet-500/20 active:scale-95 transition-all">Launch Module</button>
                        <button onClick={() => setActiveSection('overview')} className="px-6 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold active:scale-95 transition-all">Back to Console</button>
                    </div>
                </div>
            )}

        </div>
    );
}
