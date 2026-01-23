"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    CalendarCheck,
    Plus,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Calendar,
    ArrowRight,
    X,
    MessageSquare,
    Palette,
    History
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const INITIAL_BALANCES = [
    { label: 'Casual Leave', available: 8, total: 12, color: 'bg-indigo-600' },
    { label: 'Sick Leave', available: 5, total: 10, color: 'bg-rose-500' },
    { label: 'Personal Leave', available: 2, total: 4, color: 'bg-emerald-500' },
];

const LEAVE_HISTORY = [
    { id: 'LV-8821', type: 'Casual Leave', start: 'Dec 12', end: 'Dec 14', status: 'Approved', days: 3 },
    { id: 'LV-8790', type: 'Sick Leave', start: 'Nov 20', end: 'Nov 20', status: 'Approved', days: 1 },
    { id: 'LV-8601', type: 'Personal Leave', start: 'Oct 05', end: 'Oct 08', status: 'Rejected', days: 4, remark: 'Academic session overlap' },
];

export default function LeaveManagementPage() {
    const { user, loading } = useUser();
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [leaveType, setLeaveType] = useState('Casual Leave');

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Syncing Balances...</div>;

    return (
        <Shell title="Leave Management & Absence Planning">
            <div className="px-6 py-6 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Leave Balances Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Action Block */}
                    <div className="bg-slate-900 rounded-[2rem] p-6 flex flex-col justify-between group overflow-hidden relative min-h-[160px]">
                        <div className="relative z-10">
                            <h3 className="text-white text-lg font-bold leading-tight">Apply for<br />Absence</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Institutional Protocol</p>
                        </div>
                        <button
                            onClick={() => setIsRequestModalOpen(true)}
                            className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white relative z-10 transition-all hover:scale-110 hover:bg-indigo-500"
                        >
                            <Plus size={24} />
                        </button>
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <CalendarCheck size={120} strokeWidth={1} className="text-white" />
                        </div>
                    </div>

                    {INITIAL_BALANCES.map((balance, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{balance.label}</span>
                                <div className={`w-2 h-2 rounded-full ${balance.color}`} />
                            </div>
                            <div className="space-y-4 mt-2">
                                <div className="flex items-end gap-2">
                                    <h2 className="text-4xl font-black text-slate-900 leading-none">{balance.available}</h2>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">/ {balance.total} Days Left</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${balance.color}`}
                                        style={{ width: `${(balance.available / balance.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Leave History List */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <History size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Request Archives</h3>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Absence Category</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Days</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {LEAVE_HISTORY.map((req, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                        <Calendar size={14} />
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-slate-900 leading-none">{req.type}</p>
                                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{req.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-xs font-bold text-slate-600">{req.start} — {req.end}</p>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-black text-slate-900">{req.days} Days</td>
                                            <td className="px-8 py-5 text-right">
                                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                                                        req.status === 'Rejected' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'
                                                    }`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Actions & Tips */}
                    <div className="space-y-8">
                        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black tracking-tight leading-tight">Institutional<br />Compliance Tip</h4>
                                <p className="text-indigo-100 text-[11px] font-medium leading-relaxed mt-4 opacity-80">
                                    "For leave requests exceeding 3 academic cycles, please attach a departmental approval certificate."
                                </p>
                                <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                                    Read Policy <ArrowRight size={14} />
                                </button>
                            </div>
                            <div className="absolute -right-12 -top-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <AlertCircle size={200} strokeWidth={1} />
                            </div>
                        </div>

                        {/* Leave Policy Card */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                                <CalendarCheck size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">Attendance Baseline</h4>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">94.2% Physical Presence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            {isRequestModalOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)} />
                    <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Apply for Absence</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Protocol Validation Mandatory</p>
                            </div>
                            <button onClick={() => setIsRequestModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Absence Class</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer"
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                    >
                                        <option>Casual Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Personal Leave</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Session</label>
                                    <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-xl px-4 py-3.5 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                        Winter Quarter 2026
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Commencement Date</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resumption Date</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold outline-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Rationale</label>
                                <textarea
                                    placeholder="Provide detailed justification for institutional review..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-4 text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-50 transition-all min-h-[120px]"
                                />
                            </div>

                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100">
                                Transmit Request to Department Head
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
