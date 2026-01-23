"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    ShieldCheck,
    FileText,
    Download,
    Camera,
    Linkedin,
    Globe,
    Award,
    BookOpen
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function ProfilePage() {
    const { user, loading } = useUser();

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Securing Identity...</div>;

    const profileData = {
        personal: [
            { label: 'Full Name', value: `${user?.firstName} ${user?.lastName}`, icon: User },
            { label: 'Primary Email', value: user?.email, icon: Mail },
            { label: 'Contact Number', value: '+91 98765 43210', icon: Phone },
            { label: 'Present Address', value: 'Bangalore, Karnataka, India', icon: MapPin },
        ],
        employment: [
            { label: 'Employee ID', value: 'EMP-2024-001', icon: ShieldCheck },
            { label: 'Designation', value: user?.role?.replace('_', ' '), icon: Briefcase },
            { label: 'Department', value: 'Academic Excellence', icon: BookOpen },
            { label: 'Date of Joining', value: 'Jan 15, 2024', icon: Calendar },
        ],
        documents: [
            { name: 'Identity Proof (Aadhar/Passport)', size: '1.2 MB', type: 'PDF' },
            { name: 'Last 3 Months Payslips (Consolidated)', size: '2.4 MB', type: 'PDF' },
            { name: 'Academic Certifications', size: '5.6 MB', type: 'ZIP' },
            { name: 'Appointment Letter', size: '0.8 MB', type: 'PDF' },
        ]
    };

    return (
        <Shell title="Personal Evidence & Digital Identity">
            <div className="px-6 py-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Header Profile Section */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden relative group">
                    <div className="h-32 bg-indigo-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-90" />
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    </div>

                    <div className="px-10 pb-10 flex flex-col md:flex-row items-end gap-8 -mt-16 relative z-10">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-2xl overflow-hidden">
                                <div className="w-full h-full rounded-[1.4rem] bg-slate-100 flex items-center justify-center text-slate-400">
                                    <User size={48} strokeWidth={1.5} />
                                </div>
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all">
                                <Camera size={16} />
                            </button>
                        </div>

                        <div className="flex-1 pb-2">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user?.firstName} {user?.lastName}</h2>
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1.5 flex items-center gap-2">
                                <ShieldCheck size={12} /> Institutional Verified Personnel
                            </p>
                        </div>

                        <div className="flex gap-3 mb-2">
                            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Edit Context</button>
                            <button className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:text-slate-900 transition-all"><Linkedin size={18} /></button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Detailed Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Personal Data Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <User size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Personal Demographics</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {profileData.personal.map((item, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <item.icon size={14} className="text-slate-300" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Employment Data Card */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Briefcase size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Institutional Employment</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {profileData.employment.map((item, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <item.icon size={14} className="text-slate-300" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        </div>
                                        <p className="text-sm font-bold text-slate-900">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Documents & Certs */}
                    <div className="space-y-8">

                        {/* Achievements */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Award size={20} className="text-amber-500" />
                                <h3 className="text-lg font-bold text-slate-900">Achievements</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                                    <h4 className="text-xs font-black text-amber-600 uppercase tracking-widest">Faculty of the Month</h4>
                                    <p className="text-[10px] font-bold text-amber-800/60 mt-0.5">Academic Session - Dec 2024</p>
                                </div>
                                <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                    <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Digital Content Pioneer</h4>
                                    <p className="text-[10px] font-bold text-emerald-800/60 mt-0.5">Awarded by Academic Dean</p>
                                </div>
                            </div>
                        </div>

                        {/* Document Vault */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText size={20} className="text-indigo-600" />
                                <h3 className="text-lg font-bold text-slate-900">Personal Vault</h3>
                            </div>
                            <div className="space-y-3">
                                {profileData.documents.map((doc, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-400"><FileText size={16} /></div>
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-900 leading-tight">{doc.name}</p>
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{doc.type} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <button className="text-indigo-600 hover:scale-110 transition-transform"><Download size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
