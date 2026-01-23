"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Clock,
    Calendar as CalendarIcon,
    Fingerprint,
    MapPin,
    AlertCircle,
    ChevronRight,
    Square,
    TrendingUp,
    CheckCircle2,
    CalendarCheck,
    X,
    Send,
    Check,
    UserCheck,
    MessageSquare,
    Eye,
    ArrowLeft,
    Activity,
    History,
    FileText,
    MoreHorizontal
} from 'lucide-react';
import styles from './attendance.module.css';
import { useUser } from '@/hooks/useUser';

// Mock historical data with detailed logs
const INITIAL_LOGS = [
    { id: 'LOG-001', date: 'Jan 12, 2026', checkIn: '09:05 AM', checkOut: '06:15 PM', status: 'present', hours: '9h 10m', platform: 'Web Terminal', location: 'Office - Unit A', lateReason: '' },
    { id: 'LOG-002', date: 'Jan 11, 2026', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'late', hours: '8h 30m', platform: 'Corporate App', location: 'Remote', lateReason: 'Logistics/Traffic Delay' },
    { id: 'LOG-003', date: 'Jan 10, 2026', checkIn: '08:55 AM', checkOut: '06:30 PM', status: 'present', hours: '9h 35m', platform: 'Biometric Access', location: 'Office - Unit B', lateReason: '' },
    { id: 'LOG-004', date: 'Jan 09, 2026', checkIn: '-', checkOut: '-', status: 'absent', hours: '0h', platform: '-', location: '-', lateReason: 'Medical Leave' },
];

const MOCK_PENDING_LEAVES = [
    { id: '1', name: 'Arjun Sharma', role: 'Physics HOD', type: 'Sick Leave', start: 'Jan 15', end: 'Jan 17', reason: 'Common cold and fatigue' },
    { id: '2', name: 'Priya Patel', role: 'Academic Dean', type: 'Annual Leave', start: 'Jan 20', end: 'Jan 25', reason: 'Scheduled family vacation' },
    { id: '3', name: 'Rahul Vikram', role: 'LMS Administrator', type: 'Personal Leave', start: 'Jan 14', end: 'Jan 14', reason: 'Urgent personal administrative work' },
];

const EMPLOYEES_DB = [
    { id: 'EMP-101', name: 'Arjun Sharma', role: 'Physics HOD' },
    { id: 'EMP-102', name: 'Priya Patel', role: 'Academic Dean' },
    { id: 'EMP-103', name: 'Rahul Vikram', role: 'LMS Administrator' },
    { id: 'EMP-104', name: 'Sneha L.', role: 'Digital Content Head' },
];

const EMPLOYEE_LOGS: Record<string, typeof INITIAL_LOGS> = {
    'EMP-101': [
        { id: 'LOG-101-1', date: 'Jan 10, 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'present', hours: '9h 0m', platform: 'Web', location: 'Office', lateReason: '' },
    ],
};

export default function AttendancePage() {
    const { user, loading } = useUser();
    const isManagement = ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'DEPARTMENT_HEAD'].includes(user?.role || '');

    const [activeTab, setActiveTab] = useState<'attendance' | 'leaves'>('attendance');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [shiftStart, setShiftStart] = useState<Date | null>(null);
    const [shiftDuration, setShiftDuration] = useState("00:00:00");
    const [logs, setLogs] = useState(INITIAL_LOGS);
    const [isScanning, setIsScanning] = useState(false);
    const [pendingLeaves, setPendingLeaves] = useState(MOCK_PENDING_LEAVES);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
            if (isCheckedIn && shiftStart) {
                const diff = now.getTime() - shiftStart.getTime();
                const h = Math.floor(diff / 3600000);
                const m = Math.floor((diff % 3600000) / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                setShiftDuration(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [isCheckedIn, shiftStart]);

    const handleShiftAction = () => {
        setIsScanning(true);
        setTimeout(() => {
            if (!isCheckedIn) {
                setIsCheckedIn(true);
                setShiftStart(new Date());
            } else {
                const now = new Date();
                let durationStr = "0h 0m";

                if (shiftStart) {
                    const diff = now.getTime() - shiftStart.getTime();
                    const h = Math.floor(diff / 3600000);
                    const m = Math.floor((diff % 3600000) / 60000);
                    durationStr = `${h}h ${m}m`;
                }

                const newLog = {
                    id: `LOG-${Date.now()}`,
                    date: now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
                    checkIn: shiftStart?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) || '--:--',
                    checkOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                    status: 'present',
                    hours: durationStr,
                    platform: 'Web Terminal',
                    location: 'HQ - Terminal A',
                    lateReason: ''
                };

                setLogs(prev => [newLog, ...prev]);
                setIsCheckedIn(false);
                setShiftStart(null);
                setShiftDuration("00:00:00");
            }
            setIsScanning(false);
        }, 1200);
    };

    if (loading) return <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">Loading Session...</div>;

    return (
        <Shell title={isManagement ? "Attendance Intelligence" : "My Attendance Hub"}>
            <div className="px-6 py-4 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Dashboard Tabs - Only for Management */}
                {isManagement && (
                    <div className="flex bg-white/50 p-1 rounded-xl border border-slate-200 w-fit">
                        <button
                            onClick={() => setActiveTab('attendance')}
                            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'attendance' ? 'bg-7c3aed text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                                }`}
                            style={{ backgroundColor: activeTab === 'attendance' ? '#7c3aed' : '' }}
                        >
                            Daily Logs Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('leaves')}
                            className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'leaves' ? 'bg-7c3aed text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
                                }`}
                            style={{ backgroundColor: activeTab === 'leaves' ? '#7c3aed' : '' }}
                        >
                            Approvals Queue {pendingLeaves.length > 0 && <span className="ml-2 bg-rose-500 text-white px-1.5 py-0.5 rounded text-[8px]">{pendingLeaves.length}</span>}
                        </button>
                    </div>
                )}

                {activeTab === 'attendance' ? (
                    <div className="space-y-6">
                        {/* Executive Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: isManagement ? 'Avg. Instructional Hours' : 'My Weekly Hours', value: '38.5', icon: Clock, color: 'text-violet-600', bg: 'bg-violet-50' },
                                { label: isManagement ? 'Faculty Punctuality' : 'On-Time Rate', value: '98.2%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'Active Sessions', value: isManagement ? '124' : '01', icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'Discrepancies', value: '00', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={18} />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Main Interaction Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* Terminal Entry Card - Personal Punch for everyone */}
                            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-6 relative overflow-hidden group">
                                <div className="text-center">
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums" suppressHydrationWarning>
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1" suppressHydrationWarning>
                                        {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className={`absolute inset-0 bg-violet-500/10 rounded-full animate-ping duration-[3s] pointer-events-none ${!isCheckedIn ? 'hidden' : ''}`} />
                                    <button
                                        onClick={handleShiftAction}
                                        className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-500 shadow-2xl ${isCheckedIn
                                            ? 'bg-rose-600 text-white shadow-rose-200'
                                            : 'bg-7c3aed text-white shadow-violet-200'
                                            }`}
                                        style={{ backgroundColor: isCheckedIn ? '#e11d48' : '#7c3aed' }}
                                    >
                                        {isScanning ? (
                                            <Fingerprint size={40} className="animate-pulse" />
                                        ) : isCheckedIn ? (
                                            <>
                                                <Square size={28} className="fill-current" />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Punch Out</span>
                                            </>
                                        ) : (
                                            <>
                                                <Fingerprint size={40} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Punch In</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="text-center">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{isCheckedIn ? 'Session Time' : 'Last Punch Out: 06:12 PM'}</p>
                                    {isCheckedIn && <p className="text-xl font-black text-violet-600 tracking-tight">{shiftDuration}</p>}
                                </div>
                            </div>

                            {/* Attendance Registry Table */}
                            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <History size={18} className="text-violet-600" />
                                        <h3 className="text-base font-bold text-slate-900">{isManagement ? "Organizational Logs" : "Personal Attendance Log"}</h3>
                                    </div>
                                    <button className="text-[9px] font-black text-violet-600 uppercase tracking-widest hover:underline">Download Report</button>
                                </div>
                                <div className="flex-1 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{isManagement ? "Staff Member" : "Entry Date"}</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {logs.map((log, i) => (
                                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs font-black text-slate-900">{isManagement ? "Arjun Sharma" : log.date}</span>
                                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{isManagement ? 'EMP-101' : 'Verified'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-3 text-[11px] font-bold text-slate-600">{log.checkIn}</td>
                                                    <td className="px-6 py-3 text-[11px] font-bold text-slate-600">{log.checkOut}</td>
                                                    <td className="px-6 py-3 text-[11px] font-black text-slate-900">{log.hours}</td>
                                                    <td className="px-6 py-3 text-right">
                                                        <StatusBadge status={log.status} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Personal Heatmap */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-4 px-1">
                                <div className="flex items-center gap-3">
                                    <Activity size={18} className="text-emerald-500" />
                                    <h3 className="text-base font-bold text-slate-900">Personal Consistency Map</h3>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 md:grid-cols-14 lg:grid-cols-31 gap-2">
                                {[...Array(31)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-slate-50 rounded-lg flex flex-col items-center justify-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 cursor-help">
                                        <span className="text-[9px] font-black text-slate-300 group-hover:text-slate-900">{i + 1}</span>
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${i % 7 === 0 || i % 7 === 6 ? 'bg-slate-200' : 'bg-emerald-500'}`} title={i % 7 === 0 || i % 7 === 6 ? 'Weekend' : 'Present'} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Leave Approvals View - Only for Management Roles */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                        {pendingLeaves.map((leave) => (
                            <div key={leave.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col group">
                                <div className="flex justify-between items-start mb-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
                                            {leave.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{leave.name}</h4>
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{leave.role}</p>
                                        </div>
                                    </div>
                                    <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded text-[8px] font-black uppercase tracking-widest">{leave.type}</span>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl mb-6 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Timeline</span>
                                        <span className="text-[11px] font-bold text-slate-900">{leave.start} — {leave.end}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reason</span>
                                        <p className="text-[11px] font-semibold text-slate-700 leading-relaxed italic">"{leave.reason}"</p>
                                    </div>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-2">
                                    <button className="py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Reject</button>
                                    <button className="py-2.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 hover:bg-indigo-700">
                                        <Check size={12} /> Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Shell>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    const configs: Record<string, string> = {
        present: 'bg-emerald-50 text-emerald-600',
        late: 'bg-amber-50 text-amber-600',
        absent: 'bg-rose-50 text-rose-600'
    };
    return (
        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${configs[status]}`}>
            {status}
        </span>
    );
};
