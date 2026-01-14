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
    { id: '1', name: 'Arjun Sharma', role: 'Solutions Architect', type: 'Sick Leave', start: 'Jan 15', end: 'Jan 17', reason: 'Common cold and fatigue' },
    { id: '2', name: 'Priya Patel', role: 'HR Director', type: 'Annual Leave', start: 'Jan 20', end: 'Jan 25', reason: 'Scheduled family vacation' },
    { id: '3', name: 'Rahul Vikram', role: 'Systems Lead', type: 'Personal Leave', start: 'Jan 14', end: 'Jan 14', reason: 'Urgent personal administrative work' },
];

const EMPLOYEES_DB = [
    { id: 'EMP-101', name: 'Arjun Sharma', role: 'Solutions Architect' },
    { id: 'EMP-102', name: 'Priya Patel', role: 'HR Director' },
    { id: 'EMP-103', name: 'Rahul Vikram', role: 'Systems Lead' },
    { id: 'EMP-104', name: 'Sneha L.', role: 'Senior UX Designer' },
];

const EMPLOYEE_LOGS: Record<string, typeof INITIAL_LOGS> = {
    'EMP-101': [
        { id: 'LOG-101-1', date: 'Jan 10, 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'present', hours: '9h 0m', platform: 'Web', location: 'Office', lateReason: '' },
    ],
};

export default function AttendancePage() {
    const { user } = useUser();
    const isSuperAdmin = true; // For demonstration

    const [activeTab, setActiveTab] = useState<'attendance' | 'leaves'>('attendance');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
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
                setIsCheckedIn(false);
                setShiftStart(null);
                setShiftDuration("00:00:00");
            }
            setIsScanning(false);
        }, 1200);
    };

    return (
        <Shell title="Attendance Control">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Dashboard Tabs */}
                <div className="flex bg-white/50 p-1 rounded-2xl border border-slate-200 w-fit">
                    <button
                        onClick={() => setActiveTab('attendance')}
                        className={`px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'attendance' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Daily Attendance
                    </button>
                    <button
                        onClick={() => setActiveTab('leaves')}
                        className={`px-8 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'leaves' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800'
                            }`}
                    >
                        Leave Management {pendingLeaves.length > 0 && <span className="ml-2 bg-rose-500 text-white px-2 py-0.5 rounded-lg text-[9px]">{pendingLeaves.length}</span>}
                    </button>
                </div>

                {activeTab === 'attendance' ? (
                    <div className="space-y-8">
                        {/* Executive Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[
                                { label: 'Operational Hours', value: '164.5', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Punctuality Rate', value: '94.2%', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'On-Site Presence', value: '82%', icon: MapPin, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                { label: 'Pending Requests', value: '03', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={20} />
                                        </div>
                                        <MoreHorizontal size={18} className="text-slate-300" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Main Interaction Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Terminal Entry Card */}
                            <div className="lg:col-span-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-8 relative overflow-hidden group">
                                <div className="text-center">
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums" suppressHydrationWarning>
                                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2" suppressHydrationWarning>
                                        {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>

                                <div className="relative">
                                    <div className={`absolute inset-0 bg-blue-500/10 rounded-full animate-ping duration-[3s] ${!isCheckedIn ? 'hidden' : ''}`} />
                                    <button
                                        onClick={handleShiftAction}
                                        className={`w-48 h-48 rounded-full flex flex-col items-center justify-center gap-2 transition-all duration-500 shadow-2xl ${isCheckedIn
                                                ? 'bg-rose-600 text-white shadow-rose-200'
                                                : 'bg-slate-900 text-white shadow-slate-200'
                                            }`}
                                    >
                                        {isScanning ? (
                                            <Fingerprint size={48} className="animate-pulse" />
                                        ) : isCheckedIn ? (
                                            <>
                                                <Square size={32} className="fill-current" />
                                                <span className="text-[10px] font-black uppercase tracking-widest mt-1">Clock Out</span>
                                            </>
                                        ) : (
                                            <>
                                                <Fingerprint size={48} />
                                                <span className="text-[10px] font-black uppercase tracking-widest mt-1">Verify Identity</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {isCheckedIn && (
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Duration</p>
                                        <p className="text-2xl font-black text-blue-600 tracking-tight">{shiftDuration}</p>
                                    </div>
                                )}
                            </div>

                            {/* Attendance Registry Table */}
                            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <History size={20} className="text-blue-600" />
                                        <h3 className="text-lg font-bold text-slate-900">Activity Registry</h3>
                                    </div>
                                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Download Log</button>
                                </div>
                                <div className="flex-1 overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Date</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check In</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Check Out</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hours</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50">
                                            {logs.map((log, i) => (
                                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-8 py-4 text-xs font-bold text-slate-700">{log.date}</td>
                                                    <td className="px-8 py-4 text-xs font-bold text-slate-600">{log.checkIn}</td>
                                                    <td className="px-8 py-4 text-xs font-bold text-slate-600">{log.checkOut}</td>
                                                    <td className="px-8 py-4 text-xs font-black text-slate-900">{log.hours}</td>
                                                    <td className="px-8 py-4">
                                                        <StatusBadge status={log.status} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Heatmap */}
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6 px-1">
                                <div className="flex items-center gap-3">
                                    <Activity size={20} className="text-emerald-500" />
                                    <h3 className="text-lg font-bold text-slate-900">Operational Heatmap</h3>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deviation</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 md:grid-cols-14 lg:grid-cols-31 gap-2">
                                {[...Array(31)].map((_, i) => (
                                    <div key={i} className="aspect-square bg-slate-50 rounded-lg flex flex-col items-center justify-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                                        <span className="text-[9px] font-black text-slate-300 group-hover:text-slate-900">{i + 1}</span>
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${i % 7 === 0 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Leave Management View */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {pendingLeaves.map((leave) => (
                            <div key={leave.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm">
                                            {leave.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{leave.name}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{leave.role}</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase tracking-widest">{leave.type}</span>
                                </div>
                                <div className="p-5 bg-slate-50 rounded-2xl mb-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timeline</span>
                                        <span className="text-xs font-bold text-slate-900">{leave.start} — {leave.end}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason</span>
                                        <p className="text-xs font-semibold text-slate-700 leading-relaxed italic">"{leave.reason}"</p>
                                    </div>
                                </div>
                                <div className="mt-auto grid grid-cols-2 gap-3">
                                    <button className="py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Deny Access</button>
                                    <button className="py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                                        <Check size={14} /> Authorize
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
