"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    ReceiptIndianRupee,
    Download,
    Eye,
    Search,
    Filter,
    TrendingUp,
    ChevronRight,
    ShieldCheck,
    Calendar,
    X,
    Printer,
    Mail,
    FileText,
    MoreHorizontal,
    ArrowUpRight,
    Clock,
    UserCheck,
    Lock
} from 'lucide-react';

const payrollSummary = [
    { label: 'Total Payroll Absorption', value: '₹42,80,000', change: '+5%', status: 'up' },
    { label: 'Statutory Deductions', value: '₹4,20,000', change: '+2%', status: 'up' },
    { label: 'Net Capital Disbursement', value: '₹38,60,000', change: '+8%', status: 'up' },
    { label: 'Scheduled Payment Date', value: 'Jan 31, 2026', change: '5 Days Left', status: 'neutral' },
];

const employeePayroll = [
    { id: 'ID-482-91', name: 'Arjun Sharma', ctc: '₹45,00,000', net: '₹2,85,000', status: 'Authorized', date: 'Dec 31, 2025', base: '₹1,50,000', hra: '₹60,000', bonus: '₹50,000' },
    { id: 'ID-482-02', name: 'Priya Patel', ctc: '₹25,00,000', net: '₹1,65,000', status: 'Authorized', date: 'Dec 31, 2025', base: '₹90,000', hra: '₹36,000', bonus: '₹24,000' },
    { id: 'ID-482-15', name: 'Rahul Vikram', ctc: '₹18,00,000', net: '₹1,20,000', status: 'Processing', date: 'Jan 31, 2026', base: '₹65,000', hra: '₹26,000', bonus: '₹19,000' },
    { id: 'ID-482-44', name: 'Sneha L.', ctc: '₹15,00,000', net: '₹95,000', status: 'Pending', date: 'Jan 31, 2026', base: '₹55,000', hra: '₹22,000', bonus: '₹10,000' },
];

export default function PayrollPage() {
    const [selectedMonth, setSelectedMonth] = useState('January 2026');
    const [showSlip, setShowSlip] = useState<any>(null);

    return (
        <Shell title="Compensation & Payroll">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Executive Control Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-3 bg-white p-2 border border-slate-200 rounded-xl shadow-sm">
                        <Calendar size={18} className="text-slate-400 ml-2" />
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="bg-transparent border-none text-xs font-black uppercase tracking-widest outline-none pr-4"
                        >
                            <option>January 2026</option>
                            <option>December 2025</option>
                            <option>November 2025</option>
                        </select>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                            <Download size={16} /> Bulk Export
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                            <ShieldCheck size={16} /> Authorize Payroll
                        </button>
                    </div>
                </div>

                {/* Analytical Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {payrollSummary.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">{item.label}</span>
                                {item.status !== 'neutral' && (
                                    <div className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded ${item.status === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                        }`}>
                                        <ArrowUpRight size={10} /> {item.change}
                                    </div>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 relative z-10">{item.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Disbursement Registry */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-blue-600" />
                            <h3 className="text-lg font-bold text-slate-900">Disbursement Registry</h3>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input
                                    type="text"
                                    placeholder="Search personnel..."
                                    className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-9 pr-3 text-xs font-semibold outline-none focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                                />
                            </div>
                            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
                                <Filter size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Personnel</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Compensation</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Disbursement</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Cycle</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Protocol</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {employeePayroll.map((emp, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                    {emp.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 leading-none">{emp.name}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{emp.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-bold text-slate-600">{emp.ctc}</td>
                                        <td className="px-8 py-5 text-xs font-black text-slate-900">{emp.net}</td>
                                        <td className="px-8 py-5 text-xs font-semibold text-slate-500">{emp.date}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${emp.status === 'Authorized' ? 'bg-emerald-50 text-emerald-600' :
                                                    emp.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'
                                                }`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setShowSlip(emp)}
                                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                >
                                                    <FileText size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                                                    <Download size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Payslip Dossier View - Clean Executive Drawer */}
            {showSlip && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSlip(null)} />
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Compensation Summary</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Authorized Ledger Doc: #PS-482-91-DEC</p>
                            </div>
                            <button onClick={() => setShowSlip(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 space-y-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Personnel Details</h4>
                                    <div className="space-y-4">
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p> <p className="text-sm font-bold text-slate-900">{showSlip.name}</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Record ID</p> <p className="text-sm font-bold text-slate-900">{showSlip.id}</p></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Operational Unit</h4>
                                    <div className="space-y-4">
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Designation</p> <p className="text-sm font-bold text-slate-900">Systems Architecture Lead</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiscal Cycle</p> <p className="text-sm font-bold text-slate-900">January 2026</p></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 p-8 bg-slate-50 rounded-3xl">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Earnings Breakdown</p>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Base Allocation</span> <span>{showSlip.base}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Utility Allowance</span> <span>{showSlip.hra}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Strategic Bonus</span> <span>{showSlip.bonus}</span></div>
                                </div>
                                <div className="space-y-3 border-l border-slate-200 pl-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Disbursement Net</p>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Net</span>
                                        <span className="text-3xl font-black text-slate-900">{showSlip.net}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest text-right mt-2 flex items-center justify-end gap-1"><ShieldCheck size={10} /> Verification Complete</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900 flex justify-between items-center text-white">
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Digital Authentication: CRYPTO-KICCPA-2026-X7</p>
                            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                <Download size={14} /> Full Dossier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
