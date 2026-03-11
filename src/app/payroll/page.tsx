"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Download,
    ShieldCheck,
    Calendar,
    X,
    FileText,
    Clock,
    TrendingUp
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const employeePayroll = [
    { id: 'FAC-482-91', name: 'Arjun Sharma', ctc: '₹45,00,000', net: '₹2,85,000', status: 'Authorized', date: 'Dec 31, 2025', base: '₹1,50,000', hra: '₹60,000', bonus: '₹50,000', role: 'Physics HOD' },
    { id: 'ADM-482-02', name: 'Priya Patel', ctc: '₹25,00,000', net: '₹1,65,000', status: 'Authorized', date: 'Dec 31, 2025', base: '₹90,000', hra: '₹36,000', bonus: '₹24,000', role: 'Academic Dean' },
    { id: 'DIG-482-15', name: 'Rahul Vikram', ctc: '₹18,00,000', net: '₹1,20,000', status: 'Processing', date: 'Jan 31, 2026', base: '₹65,000', hra: '₹26,000', bonus: '₹19,000', role: 'Digital Content Head' },
    { id: 'SME-482-44', name: 'Sneha L.', ctc: '₹15,00,000', net: '₹95,000', status: 'Pending', date: 'Jan 31, 2026', base: '₹55,000', hra: '₹22,000', bonus: '₹10,000', role: 'Subject Matter Expert' },
];

const MOCK_PERSONAL_SLIPS = [
    { id: 'PS-DEC-25', date: 'Dec 31, 2025', net: '₹2,85,000', status: 'Authorized', base: '₹1,50,000', hra: '₹60,000', bonus: '₹50,000', role: 'Faculty Lead' },
    { id: 'PS-NOV-25', date: 'Nov 30, 2025', net: '₹2,85,000', status: 'Authorized', base: '₹1,50,000', hra: '₹60,000', bonus: '₹50,000', role: 'Faculty Lead' },
];

export default function PayrollPage() {
    const { user, loading } = useUser();
    const isManagement = ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'DEPARTMENT_HEAD'].includes(user?.role || '');

    const [selectedMonth, setSelectedMonth] = useState('January 2026');
    const [showSlip, setShowSlip] = useState<any>(null);
    const [payrollData, setPayrollData] = useState(employeePayroll);
    const [isExporting, setIsExporting] = useState(false);
    const [isAuthorizing, setIsAuthorizing] = useState(false);

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Syncing Payroll Data...</div>;

    const handleBulkExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
        }, 1500);
    };

    const handleAuthorizePayroll = () => {
        if (confirm(`Authorize all pending disbursements for ${selectedMonth}?`)) {
            setIsAuthorizing(true);
            setTimeout(() => {
                setPayrollData(prev => prev.map(emp => ({ ...emp, status: 'Authorized' })));
                setIsAuthorizing(false);
            }, 2000);
        }
    };

    return (
        <Shell title={isManagement ? "Faculty Compensation Console" : "My Compensation Vault"}>
            <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Executive Control Bar - Only for Management */}
                {isManagement ? (
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
                            </select>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button onClick={handleBulkExport} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                                <Download size={16} /> Bulk Export
                            </button>
                            <button onClick={handleAuthorizePayroll} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-600 transition-all shadow-xl">
                                <ShieldCheck size={16} /> Authorize Payroll
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { label: 'YTD Earnings', value: '₹34,20,000', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'Next Payday', value: 'Jan 31, 2026', icon: Calendar, color: 'text-violet-600', bg: 'bg-violet-50' },
                            { label: 'Tax Savings (S80C)', value: '₹1,50,000', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
                                    <stat.icon size={20} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Main Registry View */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <FileText size={20} className="text-violet-600" />
                            <h3 className="text-lg font-bold text-slate-900">{isManagement ? "Institutional Disbursement Registry" : "My Payslip History"}</h3>
                        </div>
                    </div>

                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{isManagement ? "Staff Personnel" : "Cycle Date"}</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Credit</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Verification</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {(isManagement ? payrollData : MOCK_PERSONAL_SLIPS).map((emp: any, i: number) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-xs group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                    {isManagement ? emp.name[0] : <Clock size={14} />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-900 leading-none">{isManagement ? emp.name : emp.date}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{isManagement ? emp.id : emp.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-xs font-bold text-slate-600">{emp.base}</td>
                                        <td className="px-8 py-5 text-xs font-black text-slate-900">{emp.net}</td>
                                        <td className="px-8 py-5 text-right">
                                            <button onClick={() => setShowSlip(emp)} className="px-3 py-1.5 bg-violet-50 text-violet-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-violet-600 hover:text-white transition-all">
                                                View Dossier
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Payslip View Drawer - Already refined */}
            {showSlip && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowSlip(null)} />
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
                        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Compensation Summary</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Authorized Ledger Doc: {showSlip.id}</p>
                            </div>
                            <button onClick={() => setShowSlip(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-10 space-y-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em]">Institutional Identity</h4>
                                    <div className="space-y-4">
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Name</p> <p className="text-sm font-bold text-slate-900">{isManagement ? showSlip.name : `${user?.firstName} ${user?.lastName}`}</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p> <p className="text-sm font-bold text-slate-900">Active Duty</p></div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black text-violet-600 uppercase tracking-[0.2em]">Academic Cycle</h4>
                                    <div className="space-y-4">
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Designation</p> <p className="text-sm font-bold text-slate-900">{showSlip.role || 'Staff'}</p></div>
                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fiscal Date</p> <p className="text-sm font-bold text-slate-900">{showSlip.date}</p></div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-10 p-8 bg-slate-50 rounded-3xl">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Earnings Breakdown</p>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Base Academic Salary</span> <span>{showSlip.base}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Standard HRA</span> <span>{showSlip.hra || '₹0'}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-slate-600"><span>Special Incentives</span> <span>{showSlip.bonus || '₹0'}</span></div>
                                </div>
                                <div className="space-y-3 border-l border-slate-200 pl-10">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Disbursement Net</p>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Net</span>
                                        <span className="text-3xl font-black text-slate-900">{showSlip.net}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest text-right mt-2 flex items-center justify-end gap-1"><ShieldCheck size={10} /> Authorized Bank Transfer</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-900 flex justify-between items-center text-white">
                            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Digital Authentication: CRYPTO-KICCPA-2024</p>
                            <button className="flex items-center gap-2 px-6 py-2 bg-violet-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-violet-700 transition-all">
                                <Download size={14} /> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
