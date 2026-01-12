"use client";

import React, { useState, useEffect } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Clock,
    Calendar as CalendarIcon,
    Coffee,
    LogIn,
    LogOut,
    CheckCircle2,
    XCircle,
    Fingerprint,
    Timer,
    Zap,
    MapPin,
    AlertCircle,
    ChevronRight,
    Search,
    History,
    Activity,
    Download,
    Plus
} from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/Button';

const attendanceData = [
    { date: '2024-10-24', checkIn: '09:05 AM', checkOut: '06:15 PM', status: 'ON_TIME', hours: '9h 10m', platform: 'Web Console' },
    { date: '2024-10-23', checkIn: '09:15 AM', checkOut: '06:00 PM', status: 'LATE', hours: '8h 45m', platform: 'Mobile App' },
    { date: '2024-10-22', checkIn: '08:55 AM', checkOut: '06:30 PM', status: 'ON_TIME', hours: '9h 35m', platform: 'Biometric' },
    { date: '2024-10-21', checkIn: '-', checkOut: '-', status: 'SICK_LEAVE', hours: '0h', platform: '-' },
    { date: '2024-10-20', checkIn: '09:00 AM', checkOut: '06:10 PM', status: 'ON_TIME', hours: '9h 10m', platform: 'Web Console' },
];

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        ON_TIME: 'bg-emerald-500/10 text-emerald-600 border-emerald-100',
        LATE: 'bg-rose-500/10 text-rose-600 border-rose-100',
        SICK_LEAVE: 'bg-amber-500/10 text-amber-600 border-amber-100',
        ABSENT: 'bg-slate-100 text-slate-500 border-slate-200'
    };

    return (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default function AttendancePage() {
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isScanning, setIsScanning] = useState(false);
    const { user } = useUser();
    const isSuperAdmin = user?.role === 'SUPER_ADMIN';

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckAction = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsCheckedIn(!isCheckedIn);
            setIsScanning(false);
        }, 1500);
    };

    return (
        <Shell title="Attendance Tactical Console">
            <div className="p-8 space-y-10 animate-fade-in max-w-[1600px] mx-auto pb-32">

                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button
                            variant="primary"
                            icon={<Plus size={18} />}
                            className="flex-1 md:flex-none py-3.5 bg-slate-900 shadow-xl"
                            onClick={() => alert('Opening Leave Application Portal...')}
                        >
                            Request Leave
                        </Button>
                        {isSuperAdmin && (
                            <Button
                                variant="secondary"
                                icon={<Download size={18} />}
                                className="flex-1 md:flex-none py-3.5"
                                onClick={() => alert('Downloading Global Attendance Audit Log...')}
                            >
                                Export Registry
                            </Button>
                        )}
                    </div>
                </div>

                {/* Top Command Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Biometric Check-in Hero */}
                    <div className="lg:col-span-4 bg-white/70 backdrop-blur-xl p-12 rounded-[4rem] border border-white/50 shadow-premium flex flex-col items-center justify-between min-h-[500px] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />

                        <div className="text-center space-y-2 relative z-10 w-full">
                            <h2 className="text-5xl font-black text-slate-800 tracking-tighter tabular-nums">
                                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                            </h2>
                            <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
                            </p>
                        </div>

                        <div className="relative py-12">
                            <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 relative z-20 ${isScanning ? 'scale-90' : 'scale-100'
                                }`}>
                                {/* Outer Pulse Rings */}
                                {!isCheckedIn && !isScanning && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
                                        <div className="absolute inset-[-20px] rounded-full border border-primary/10 animate-pulse" />
                                    </>
                                )}

                                <button
                                    onClick={handleCheckAction}
                                    disabled={isScanning}
                                    className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 border-8 shadow-2xl transition-all duration-500 relative overflow-hidden group/btn ${isScanning ? 'bg-slate-100 border-slate-200 text-slate-400' :
                                        isCheckedIn
                                            ? 'bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100 shadow-rose-200'
                                            : 'bg-primary border-white text-white hover:scale-110 shadow-primary/40'
                                        }`}
                                >
                                    {isScanning ? (
                                        <div className="flex flex-col items-center">
                                            <Fingerprint size={48} className="animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest mt-2">Authenticating...</span>
                                        </div>
                                    ) : isCheckedIn ? (
                                        <>
                                            <LogOut size={40} className="stroke-[2.5]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">End Shift</span>
                                        </>
                                    ) : (
                                        <>
                                            <Fingerprint size={48} className="stroke-[2.5] group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Start Shift</span>
                                        </>
                                    )}

                                    {/* Scanner Effect */}
                                    {isScanning && (
                                        <div className="absolute inset-0 bg-primary/20 -translate-y-full animate-[scan_1.5s_infinite] pointer-events-none" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex gap-3 relative z-10">
                            <button className="flex-1 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-slate-500 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:shadow-md transition-all flex items-center justify-center gap-2">
                                <Coffee size={18} /> Take Break
                            </button>
                            <button className="p-5 bg-slate-50 border border-slate-100 rounded-3xl text-slate-500 hover:text-primary transition-all">
                                <MapPin size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Operational Metrics */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
                            {[
                                { label: 'Total Sync Hours', value: '164h 20m', icon: Clock, color: 'text-primary', bg: 'bg-primary/5', trend: '+12%', sub: 'vs last month' },
                                { label: 'On-Time Accuracy', value: '94%', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50', trend: '+2.4%', sub: 'High Fidelity' },
                                { label: 'Available Leaves', value: '12 Days', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', trend: 'Fixed', sub: 'Yearly Quota' },
                                { label: 'Absent Nodes', value: '01 Day', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50', trend: '-50%', sub: 'Improvement' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/70 backdrop-blur-md p-10 rounded-[3.5rem] border border-white/50 shadow-sm group hover:shadow-xl transition-all relative overflow-hidden">
                                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000">
                                        <stat.icon size={160} />
                                    </div>
                                    <div className="flex justify-between items-start relative z-10">
                                        <div className={`w-16 h-16 rounded-[1.8rem] ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
                                            <stat.icon size={28} />
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.sub}</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 relative z-10">
                                        <h3 className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Presence Mesh (Calendar Grid) */}
                <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[4rem] border border-white/50 shadow-premium overflow-hidden relative">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-slate-900 flex items-center gap-4">
                                <CalendarIcon size={32} className="text-primary" />
                                Presence Mesh
                            </h2>
                            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] ml-12">Visual distribution of work consistency</p>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                            {['Week', 'Month', 'Quarter'].map(opt => (
                                <button key={opt} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${opt === 'Month' ? 'bg-white text-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'
                                    }`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {[...Array(31)].map((_, i) => (
                            <div key={i} className="aspect-square bg-slate-50/50 rounded-3xl border border-slate-100 flex flex-col items-center justify-center gap-2 group hover:scale-105 transition-all cursor-pointer hover:bg-white hover:shadow-lg relative overflow-hidden">
                                <span className="text-[10px] font-black text-slate-300 group-hover:text-primary">{i + 1}</span>
                                <div className={`w-3 h-3 rounded-full ${i % 7 === 0 ? 'bg-rose-400 group-hover:shadow-[0_0_15px_rgba(251,113,133,0.5)]' :
                                    i > 24 ? 'bg-slate-200' :
                                        'bg-emerald-400 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.5)]'
                                    }`} />
                                {i === 23 && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full animate-ping" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logistics Feed (Daily Log) */}
                <div className="bg-slate-900 rounded-[4.5rem] p-12 shadow-3xl relative overflow-hidden">
                    <History className="absolute -top-10 -right-10 text-white/5 rotate-12" size={300} />

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 relative z-10 px-4">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-white">Daily Logistics</h2>
                            <p className="text-indigo-300/50 font-bold text-[10px] uppercase tracking-[0.4em]">Chronological synchronization audit</p>
                        </div>
                        <div className="flex gap-4 w-full lg:w-auto">
                            <div className="relative flex-1 lg:w-80 overflow-hidden rounded-[2rem]">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    type="text"
                                    placeholder="Audit by date or unit..."
                                    className="w-full pl-16 pr-6 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white outline-none focus:bg-white/10 transition-all font-bold text-sm"
                                />
                            </div>
                            <button className="p-5 bg-white/5 border border-white/10 rounded-[2rem] text-white hover:bg-white/10 transition-all">
                                <History size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 relative z-10">
                        {attendanceData.map((log, i) => (
                            <div key={i} className="group flex flex-col md:flex-row items-center gap-8 bg-white/5 border border-white/5 rounded-[3.5rem] p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.01] hover:border-white/20">
                                <div className="flex flex-col items-center min-w-[120px] bg-white/5 p-6 rounded-[2.5rem] border border-white/5">
                                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">{new Date(log.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-4xl font-black text-white mt-1">{new Date(log.date).getDate()}</span>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-indigo-300 opacity-40 uppercase tracking-widest flex items-center gap-2">
                                            <LogIn size={12} /> Sync Arrival
                                        </p>
                                        <p className="text-2xl font-black text-white">{log.checkIn === '-' ? '--:--' : log.checkIn}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-indigo-300 opacity-40 uppercase tracking-widest flex items-center gap-2">
                                            <LogOut size={12} /> Sync Departure
                                        </p>
                                        <p className="text-2xl font-black text-white">{log.checkOut === '-' ? '--:--' : log.checkOut}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-indigo-300 opacity-40 uppercase tracking-widest flex items-center gap-2">
                                            <Timer size={12} /> Calculation
                                        </p>
                                        <p className="text-2xl font-black text-white">{log.hours}</p>
                                    </div>
                                    <div className="flex items-center justify-end md:pr-4">
                                        <StatusBadge status={log.status} />
                                    </div>
                                </div>

                                <div className="hidden lg:block w-px h-16 bg-white/10 mx-4" />

                                <div className="flex items-center gap-5">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-indigo-300 opacity-40 uppercase tracking-widest">Entry Node</p>
                                        <p className="text-xs font-bold text-white mt-1">{log.platform}</p>
                                    </div>
                                    <button className="w-12 h-12 bg-white/5 rounded-2xl text-white/40 hover:text-white hover:bg-primary transition-all flex items-center justify-center">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </Shell>
    );
}
