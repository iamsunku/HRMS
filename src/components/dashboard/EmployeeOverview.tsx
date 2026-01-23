"use client";

import React, { useState } from 'react';
import {
    Clock,
    Calendar,
    Target,
    Award,
    TrendingUp,
    CheckCircle2,
    FileText,
    ArrowUpRight,
    Star,
    Coffee,
    Briefcase,
    ChevronRight,
    User,
    Wallet,
    Bell,
    CalendarDays,
    ArrowDownToLine,
    Info,
    MoreHorizontal,
    LayoutDashboard,
    ChevronLeft,
    Monitor
} from 'lucide-react';

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';

type Section = 'overview' | 'attendance' | 'leave' | 'payroll' | 'tasks' | 'profile';

export default function EmployeeOverview() {
    const { user } = useUser();
    const [activeSection, setActiveSection] = useState<Section>('overview');

    const stats = [
        { label: 'Today Attendance', value: '09:12 AM', subValue: 'Punch In', icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Leave Balance', value: '14 Days', subValue: '8 Casual / 6 Sick', icon: CalendarDays, color: 'text-violet-600', bg: 'bg-violet-50' },
        { label: 'Upcoming Holiday', value: 'Jan 26', subValue: 'Republic Day', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Pending Requests', value: '02', subValue: '1 Leave / 1 Regularize', icon: Info, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'attendance', label: 'Attendance', icon: Clock },
        { id: 'leave', label: 'Leave Management', icon: CalendarDays },
        { id: 'payroll', label: 'Payroll', icon: Wallet },
        { id: 'tasks', label: 'Tasks & OKRs', icon: Target },
    ];

    return (
        <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

            {/* Greeting & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Welcome, {user?.firstName || 'Arjun'}!</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">Institutional Self-Service Portal Dashboard</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-500/20 hover:-translate-y-0.5 transition-all active:scale-95">
                        Punch In Now
                    </button>
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">On Duty</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Sub-Nav */}
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

            {/* Conditional Rendering of Sections */}
            {activeSection === 'overview' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 tracking-tight">{stat.value}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
                                        <p className="text-[9px] font-medium text-slate-400 mt-1">{stat.subValue}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Feed */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Announcements */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <Bell size={18} className="text-amber-500" />
                                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Institutional Announcements</h3>
                                    </div>
                                    <MoreHorizontal size={18} className="text-slate-400" />
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { title: 'Annual Cultural Fest 2026', date: 'Jan 25', type: 'Event' },
                                        { title: 'Revised Appraisal Policy Guidelines', date: 'Jan 22', type: 'HR Notice' },
                                        { title: 'New ERP Training Session', date: 'Jan 20', type: 'Update' }
                                    ].map((note, i) => (
                                        <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group">
                                            <div className="bg-slate-100 px-3 py-2 rounded-lg text-center min-w-[50px]">
                                                <p className="text-[10px] font-black text-slate-900 leading-none">{note.date.split(' ')[1]}</p>
                                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{note.date.split(' ')[0]}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-slate-800 group-hover:text-violet-600">{note.title}</p>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{note.type}</span>
                                            </div>
                                            <ChevronRight size={14} className="text-slate-300 group-hover:text-violet-600 self-center" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-violet-600 p-6 rounded-2xl text-white shadow-lg space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                                    <CalendarDays size={24} />
                                    <h4 className="font-bold text-lg">Apply Leave</h4>
                                    <p className="text-xs text-white/70">Request time off or view your leave history.</p>
                                </div>
                                <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                                    <Clock size={24} />
                                    <h4 className="font-bold text-lg">Regularize</h4>
                                    <p className="text-xs text-white/70">Correct missed punches or early exits.</p>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg space-y-4 hover:scale-[1.02] transition-transform cursor-pointer">
                                    <FileText size={24} />
                                    <h4 className="font-bold text-lg">My Payslip</h4>
                                    <p className="text-xs text-white/70">Download your latest salary certificate.</p>
                                </div>
                            </div>
                        </div>

                        {/* Side Panels */}
                        <div className="lg:col-span-4 space-y-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-bold">Upcoming Birthdays</h3>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Dr. Neha Kapoor', date: 'Today', dept: 'Academics' },
                                        { name: 'Sameer Malhotra', date: 'Tomorrow', dept: 'IT' }
                                    ].map((person, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-xs font-bold">
                                                {person.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{person.name}</p>
                                                <p className="text-[10px] font-medium text-slate-400">{person.dept} • {person.date}</p>
                                            </div>
                                            <Coffee size={14} className="ml-auto text-amber-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 font-bold">Quick Policy Link</h3>
                                <div className="space-y-3">
                                    <Link href="#" className="flex items-center justify-between text-xs font-bold text-slate-600 hover:text-violet-600">
                                        Attendance Policy <ArrowUpRight size={14} />
                                    </Link>
                                    <Link href="#" className="flex items-center justify-between text-xs font-bold text-slate-600 hover:text-violet-600">
                                        IT Asset Usage <ArrowUpRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Profile Section */}
            {activeSection === 'profile' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600" />
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-8">
                            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg ring-4 ring-white">
                                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-white text-3xl font-black">
                                    {user?.firstName?.[0] || 'A'}
                                </div>
                            </div>
                            <button className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all">
                                Edit Identity
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 mb-4">Personal Details</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Full Name', value: `${user?.firstName} ${user?.lastName}` },
                                            { label: 'Employee ID', value: 'EMP-2024-0812' },
                                            { label: 'Work Email', value: user?.email },
                                            { label: 'Contact', value: '+91 98765 43210' }
                                        ].map((info, i) => (
                                            <div key={i} className="flex justify-between py-2 border-b border-slate-50">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</span>
                                                <span className="text-xs font-bold text-slate-700">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 mb-4">Job & Reporting</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: 'Department', value: 'Academic Operations' },
                                            { label: 'Designation', value: 'Sr. Faculty Lead' },
                                            { label: 'Reporting To', value: 'Rahul Verma (Dept. Head)' },
                                            { label: 'Joined On', value: 'Aug 12, 2023' }
                                        ].map((info, i) => (
                                            <div key={i} className="flex justify-between py-2 border-b border-slate-50">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{info.label}</span>
                                                <span className="text-xs font-bold text-slate-700">{info.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-lg font-black text-slate-900 mb-4">Document Vault</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { name: 'Offer Letter', type: 'PDF', size: '2.4 MB' },
                                        { name: 'Org ID Card', type: 'JPG', size: '1.1 MB' },
                                        { label: 'Recent Payslips', list: true }
                                    ].map((doc, i) => (
                                        doc.list ? (
                                            <div key={i} className="col-span-full bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent Payslips</p>
                                                <div className="space-y-2">
                                                    {['Dec 2025', 'Nov 2025'].map((month, j) => (
                                                        <div key={j} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                                                            <span className="text-xs font-bold text-slate-700">{month} Payslip</span>
                                                            <ArrowDownToLine size={16} className="text-violet-600 cursor-pointer" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between aspect-video">
                                                <FileText size={24} className="text-slate-400" />
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">{doc.name}</p>
                                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{doc.type} • {doc.size}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendance Section */}
            {activeSection === 'attendance' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Monthly Log</h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 rounded-lg">January 2026</span>
                                <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {[
                                { date: 'Jan 22', day: 'Thu', in: '09:05 AM', out: '06:12 PM', status: 'Present' },
                                { date: 'Jan 21', day: 'Wed', in: '09:12 AM', out: '06:05 PM', status: 'Present' },
                                { date: 'Jan 20', day: 'Tue', in: '---', out: '---', status: 'On Leave' },
                                { date: 'Jan 19', day: 'Mon', in: '09:35 AM', out: '06:45 PM', status: 'Late' }
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-5 py-3 px-4 hover:bg-slate-50 rounded-xl transition-all border-b border-slate-50 last:border-0 group">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-900">{row.date}</span>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{row.day}</span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-600 flex items-center">{row.in}</div>
                                    <div className="text-xs font-bold text-slate-600 flex items-center">{row.out}</div>
                                    <div className="flex items-center">
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${row.status === 'Present' ? 'bg-emerald-50 text-emerald-600' :
                                            row.status === 'Late' ? 'bg-rose-50 text-rose-600' : 'bg-violet-50 text-violet-600'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <button className="text-[9px] font-black text-violet-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Request Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                            <Clock className="absolute -bottom-8 -right-8 text-white/5" size={120} />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">Current Session</h4>
                            <p className="text-5xl font-black mb-1">07:22:45</p>
                            <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-8">Logged in at 09:12 AM</p>
                            <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all">
                                Punch Out
                            </button>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 font-bold">Session Analytics</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Late Marks', value: '2', color: 'bg-rose-500' },
                                    { label: 'Early Exits', value: '0', color: 'bg-emerald-500' },
                                    { label: 'Overtime', value: '12h 45m', color: 'bg-violet-500' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${stat.color}`} />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <span className="text-xs font-black text-slate-900">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Placeholder for other sections to keep it clean */}
            {(activeSection === 'leave' || activeSection === 'payroll' || activeSection === 'tasks') && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                        <Monitor size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Module Optimization in Progress</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-[300px] text-center">We are currently refining the high-density data visualizations for {activeSection} management.</p>
                    <button
                        onClick={() => setActiveSection('overview')}
                        className="mt-6 text-xs font-black text-violet-600 uppercase tracking-widest hover:underline"
                    >
                        Back to Overview Hub
                    </button>
                </div>
            )}
        </div>
    );
}

function LayoutDashboardIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    );
}
