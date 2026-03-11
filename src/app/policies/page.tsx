"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    FileText,
    Search,
    Download,
    Book,
    ShieldCheck,
    Clock,
    ArrowRight,
    Lock,
    ExternalLink,
    FileSearch,
    Bookmark,
    Folder
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const POLICY_CATEGORIES = [
    { title: 'Employee Handbook', count: 12, icon: Book, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Code of Ethics', count: 4, icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Operational Guidelines', count: 8, icon: Bookmark, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Compliance Vault', count: 15, icon: Lock, color: 'text-rose-600', bg: 'bg-rose-50' },
];

const DOCUMENTS = [
    { name: 'Sexual Harassment Prevention (POSH)', version: 'v2.4', date: 'Jan 2024', type: 'PDF', size: '1.2 MB' },
    { name: 'Data Privacy & GDPR Protocols', version: 'v1.1', date: 'Dec 2023', type: 'DOCX', size: '2.4 MB' },
    { name: 'Institutional IT Usage Policy', version: 'v3.0', date: 'Mar 2023', type: 'PDF', size: '0.9 MB' },
    { name: 'Work from Home (Hybrid) Policy', version: 'v1.5', date: 'Oct 2023', type: 'PDF', size: '1.4 MB' },
    { name: 'Academic Resource Ethics Guide', version: 'v4.2', date: 'Jan 2024', type: 'PDF', size: '3.1 MB' },
];

export default function PoliciesPage() {
    const { user, loading } = useUser();

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Verifying Permissions...</div>;

    return (
        <Shell title="Institutional Policy Repository & Document Library">
            <div className="px-6 py-6 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Search & Orientation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Digital Governance Vault</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Version: 2026.1-RELEASE</p>
                    </div>
                    <div className="relative w-full md:w-96 z-10">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search protocol, clause or guide..."
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all"
                        />
                    </div>
                    <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none" />
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {POLICY_CATEGORIES.map((cat, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-indigo-100 transition-all group cursor-pointer">
                            <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                                <cat.icon size={22} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">{cat.title}</h3>
                            <div className="flex justify-between items-end mt-4">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cat.count} Documents</span>
                                <ArrowRight size={14} className="text-slate-200 group-hover:text-indigo-600 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Document List */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Folder size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Active Handbooks & Guidelines</h3>
                            </div>
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Global Access</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {DOCUMENTS.map((doc, i) => (
                                <div key={i} className="px-10 py-6 hover:bg-slate-50 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-all">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{doc.name}</h4>
                                            <div className="flex items-center gap-4 mt-1.5 px-0.5">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Clock size={10} /> {doc.date}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={10} /> {doc.version}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="text-right hidden md:block">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.size}</p>
                                            <p className="text-[10px] font-bold text-slate-900">{doc.type}</p>
                                        </div>
                                        <button className="flex-1 md:flex-none p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all">
                                            <Download size={18} />
                                        </button>
                                        <button className="flex-1 md:flex-none p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-500 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Meta Section */}
                    <div className="space-y-8">
                        {/* Acknowledgement Tracker */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative group">
                            <h4 className="text-lg font-bold mb-6">Policy Acknowledgements</h4>
                            <div className="space-y-6 relative z-10">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Action Completed</h5>
                                    <p className="text-xs font-bold mt-1 text-slate-200">2026 IT Compliance Agreement</p>
                                    <p className="text-[8px] font-black uppercase tracking-widest mt-2 text-slate-500">SIGNED JAN 12, 11:20 AM</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 opacity-50">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pending Affirmation</h5>
                                    <p className="text-xs font-bold mt-1 text-slate-400">New Ethics Clause Addendum</p>
                                    <button className="mt-3 text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-colors">Sign Protocol</button>
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <FileSearch size={180} />
                            </div>
                        </div>

                        {/* Tip Widget */}
                        <div className="p-8 bg-indigo-50 border border-indigo-100/50 rounded-[2.5rem]">
                            <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Legal Disclaimer</h4>
                            <p className="text-[10px] font-semibold text-indigo-900/60 leading-relaxed italic">
                                "All documents stored in this vault are institutional property and subject to strict confidentiality under the signed NDAs."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
