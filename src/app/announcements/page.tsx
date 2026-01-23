"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    Megaphone,
    Calendar,
    ChevronRight,
    Zap,
    Info,
    AlertTriangle,
    Flag,
    Users,
    ArrowRight,
    Pin,
    Clock,
    User
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';

const ANNOUNCEMENTS = [
    {
        id: 1,
        type: 'Urgent',
        title: 'New Institutional Leave Policy Update',
        desc: 'Please be advised that the sick leave authorization protocol has been revised effective from next academic cycle. All staff are required to review the new policy in the Documents section.',
        author: 'HR Dept',
        date: '2 hours ago',
        category: 'Policy',
        pinned: true
    },
    {
        id: 2,
        type: 'Info',
        title: 'Mid-Q1 Academic Excellence Seminar',
        desc: 'A seminar on the latest digital pedagogy tools will be held in the Main Hall this Friday. Attendance is mandatory for all department heads.',
        author: 'Academic Dean',
        date: '1 day ago',
        category: 'Event',
        pinned: false
    },
    {
        id: 3,
        type: 'Success',
        title: 'LMS Platform Security Benchmarking Complete',
        desc: 'Our institutional LMS has successfully passed the global security audit. We are now officially ISO/IEC 27001 compliant.',
        author: 'Tech Ops',
        date: '2 days ago',
        category: 'System',
        pinned: false
    }
];

export default function AnnouncementsPage() {
    const { user, loading } = useUser();

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Broadcasting Feed...</div>;

    return (
        <Shell title="Institutional Announcements & Engagement Hub">
            <div className="px-6 py-6 space-y-8 animate-fade-in max-w-[1200px] mx-auto pb-20">

                {/* Highlight Section */}
                <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-2.5 py-1 bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest backdrop-blur-md">Feature Highlight</span>
                        </div>
                        <h2 className="text-4xl font-black tracking-tight leading-tight">Q1 Organizational Alignment Meeting</h2>
                        <p className="mt-4 text-indigo-100 text-sm font-medium leading-relaxed opacity-80">
                            Join our CEO and HR Leaders for a comprehensive overview of the 2026 Roadmap, new employee benefits, and institutional growth targets.
                        </p>
                        <div className="mt-10 flex items-center gap-6">
                            <button className="px-8 py-3 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Secure My Slot</button>
                            <div className="flex -space-x-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-400">
                                        <User size={12} />
                                    </div>
                                ))}
                                <div className="pl-4 text-[10px] font-black text-indigo-200 uppercase tracking-widest">+142 Attending</div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-1/3 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity">
                        <Megaphone size={400} className="rotate-12 translate-x-1/4 -translate-y-1/4" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional Feed</h3>
                            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Mark all as read</button>
                        </div>

                        {ANNOUNCEMENTS.map((item) => (
                            <div key={item.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group hover:border-indigo-100 transition-all">
                                {item.pinned && (
                                    <div className="absolute top-8 right-8 text-indigo-600">
                                        <Pin size={16} fill="currentColor" className="rotate-45" />
                                    </div>
                                )}

                                <div className="flex items-start gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.type === 'Urgent' ? 'bg-rose-50 text-rose-500' :
                                            item.type === 'Success' ? 'bg-emerald-50 text-emerald-500' : 'bg-indigo-50 text-indigo-500'
                                        }`}>
                                        {item.type === 'Urgent' ? <AlertTriangle size={24} /> :
                                            item.type === 'Success' ? <Flag size={24} /> : <Info size={24} />}
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.type === 'Urgent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' :
                                                    item.type === 'Success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-indigo-500 text-white'
                                                }`}>
                                                {item.type}
                                            </span>
                                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.category} • {item.date}</span>
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 leading-tight">{item.title}</h4>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-2xl">{item.desc}</p>
                                        <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <User size={12} className="text-slate-400" />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{item.author}</span>
                                            </div>
                                            <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                Detailed Ledger <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar widgets */}
                    <div className="space-y-6">
                        {/* Upcoming Events */}
                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Calendar size={18} className="text-indigo-600" />
                                <h4 className="text-sm font-bold text-slate-900">Academic Events</h4>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { date: 'Jan 28', time: '10:00 AM', event: 'Resource Audit' },
                                    { date: 'Feb 03', time: '02:30 PM', event: 'Townhall Q1' },
                                ].map((ev, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="text-center shrink-0 w-10">
                                            <p className="text-sm font-black text-indigo-600 leading-none">{ev.date.split(' ')[1]}</p>
                                            <p className="text-[8px] font-black text-slate-400 uppercase mt-1">{ev.date.split(' ')[0]}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-[11px] font-bold text-slate-900 leading-none">{ev.event}</h5>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{ev.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 bg-slate-50 hover:bg-slate-100 transition-all rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400">
                                Full Institutional Calendar
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 opacity-40 text-indigo-200">System Reach</h4>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Read Ratio</span>
                                        <span className="text-xs font-black">82%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[82%]" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Users size={18} className="text-indigo-400" /></div>
                                    <div>
                                        <p className="text-sm font-black">1.4k</p>
                                        <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">Active Audience</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
