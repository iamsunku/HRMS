"use client";

import React, { useState, useEffect } from 'react';
import Shell from "@/components/layout/Shell";
import {
    ChevronLeft,
    Calendar,
    Target,
    Users as UsersIcon,
    MessageSquare,
    Clock,
    FileText,
    History,
    CheckCircle2,
    Play,
    Pause,
    MoreVertical,
    Plus,
    Building2,
    ArrowRightLeft,
    X,
    TrendingUp,
    ShieldAlert,
    Send,
    Layers,
    UserCheck,
    Dna,
    Zap,
    Search,
    Filter,
    ArrowDownRight,
    Sparkles,
    Cpu,
    MousePointer2,
    Activity,
    Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

// Mock project data
const projects = {
    '1': {
        name: 'ERP System Migration',
        description: 'Migrating legacy ERP to cloud-based SAP S/4HANA with unified data structures.',
        status: 'IN_PROGRESS',
        progress: 65,
        departments: [
            {
                id: 'it', name: 'IT Infrastructure', lead: 'John Doe', status: 'ON_TRACK', progress: 80, tasks: [
                    { id: 't1', title: 'Server Configuration', status: 'COMPLETED', assignee: 'Alex', update: 'Servers are up and test environments are ready.' },
                    { id: 't2', title: 'Database Migration', status: 'IN_PROGRESS', assignee: 'Sarah', update: '50% of schemas mapped and transferred.' }
                ]
            },
            {
                id: 'fin', name: 'Finance & Accounts', lead: 'Jane Smith', status: 'DELAYED', progress: 40, tasks: [
                    { id: 't3', title: 'Chart of Accounts Mapping', status: 'IN_PROGRESS', assignee: 'Michael', update: 'Waiting for approval on new cost centers.' },
                    { id: 't4', title: 'Opening Balance Verification', status: 'TO_DO', assignee: 'Emily', update: 'Manual verification scheduled for next week.' }
                ]
            },
            {
                id: 'ops', name: 'Operations', lead: 'Robert Brown', status: 'ON_TRACK', progress: 55, tasks: [
                    { id: 't5', title: 'Workflow Documentation', status: 'COMPLETED', assignee: 'Chris', update: 'All SOPs updated for the new system.' }
                ]
            }
        ],
        dailyUpdates: [
            { date: '2026-01-12', department: 'IT Infrastructure', user: 'Alex', update: 'Completed firewall rule configuration for the new DB server.', status: 'COMPLETED', time: '10:45 AM' },
            { date: '2026-01-11', department: 'Finance', user: 'Michael', update: 'Identified mismatch in Q4 reports during mapping.', status: 'BLOCKED', time: '02:15 PM' },
            { date: '2026-01-11', department: 'Operations', user: 'Chris', update: 'Training session held for logistics managers.', status: 'IN_PROGRESS', time: '11:00 AM' },
        ]
    }
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = (projects as any)[id] || projects['1'];
    const [activeTab, setActiveTab] = useState('departments');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const departmentalCooperation = [
        { from: 'IT Infrastructure', to: 'Finance', reason: 'System access and permissions handover', importance: 'High', delay: '0ms' },
        { from: 'Finance', to: 'Operations', reason: 'Budget approval for new hardware', importance: 'Critical', delay: '100ms' },
        { from: 'Operations', to: 'IT Infrastructure', reason: 'User acceptance testing feedback', importance: 'High', delay: '200ms' }
    ];

    const phases = [
        { name: 'Discovery', status: 'COMPLETED' },
        { name: 'Architecture', status: 'COMPLETED' },
        { name: 'Deployment', status: 'IN_PROGRESS' },
        { name: 'Optimization', status: 'PENDING' }
    ];

    return (
        <Shell title={project.name}>
            <div className="p-6 space-y-8 animate-fade-in max-w-[1500px] mx-auto pb-24">
                {/* Back Link & Quick Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <Link href="/projects" className="flex items-center gap-3 text-slate-500 hover:text-primary transition-all font-bold group">
                        <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-sm group-hover:shadow-indigo-100 transition-all group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-white">
                            <ChevronLeft size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60">Management Hub</span>
                            <span className="text-sm font-black">Project Console</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-[10px] uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hover:border-primary/20">
                            <FileText size={16} />
                            Project Audit
                        </button>
                        <button
                            onClick={() => setIsUpdateModalOpen(true)}
                            className="flex-1 md:flex-none px-8 py-3.5 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 active:scale-95 group"
                        >
                            <Zap size={16} className="fill-current group-hover:animate-pulse" />
                            Post Daily Entry
                        </button>
                    </div>
                </div>

                {/* Header Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 bg-white/70 backdrop-blur-md p-10 rounded-[3.5rem] border border-white/50 shadow-premium relative overflow-hidden group">
                        {/* Interactive Background Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

                        <div className="absolute top-0 right-0 p-12">
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-2 text-primary">
                                    <TrendingUp size={24} />
                                    <div className="text-6xl font-black group-hover:scale-110 transition-transform duration-700 bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                                        {project.progress}%
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Delivery Velocity</p>
                            </div>
                        </div>

                        <div className="max-w-2xl relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="px-5 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-indigo-200 uppercase tracking-[0.2em]">
                                    {project.status.replace('_', ' ')}
                                </span>
                                <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary animate-[shimmer_2s_infinite]" />
                                </div>
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <History size={16} className="text-primary/40" /> 74 Days Elapsed
                                </span>
                            </div>
                            <h1 className="text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                                {project.name.split(' ').map((word: string, i: number) => (
                                    <span key={i} className={i === 0 ? "text-primary" : ""}>{word} </span>
                                ))}
                            </h1>
                            <p className="text-slate-500 leading-relaxed text-xl font-medium border-l-[6px] border-primary/20 pl-8 py-2 bg-slate-50/50 rounded-r-3xl pr-6">
                                "{project.description}"
                            </p>

                            {/* Project Roadmap visualizer */}
                            <div className="mt-14 p-8 bg-slate-50/80 rounded-[2.5rem] border border-slate-100">
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                                    <Layers size={14} /> Critical Execution Path
                                </p>
                                <div className="grid grid-cols-4 gap-4 relative">
                                    {/* Connection Line */}
                                    <div className="absolute top-[20px] left-5 right-5 h-1 bg-slate-200" />

                                    {phases.map((phase, i) => (
                                        <div key={phase.name} className="flex flex-col items-center gap-4 relative z-10 group/phase">
                                            <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center border-4 transition-all duration-500 ${phase.status === 'COMPLETED' ? 'bg-emerald-500 border-white text-white shadow-xl shadow-emerald-100' :
                                                phase.status === 'IN_PROGRESS' ? 'bg-primary border-white text-white shadow-xl shadow-primary/20 ring-4 ring-primary/5' :
                                                    'bg-white border-slate-100 text-slate-300'
                                                }`}>
                                                {phase.status === 'COMPLETED' ? <CheckCircle2 size={24} /> :
                                                    phase.status === 'IN_PROGRESS' ? <Cpu size={24} className="animate-spin-slow" /> :
                                                        <span className="text-sm font-black italic">{i + 1}</span>}
                                            </div>
                                            <div className="text-center">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${phase.status === 'PENDING' ? 'text-slate-300' : 'text-slate-900 underline decoration-2 decoration-primary/20'}`}>{phase.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-[340px] group">
                            <Dna className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000" size={260} />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Operational Risk Model</h3>
                                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all"><MoreVertical size={18} /></div>
                                </div>
                                <div className="flex items-center gap-5 mb-8 bg-white/5 p-6 rounded-[2rem] border border-white/10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                                        <ShieldAlert size={32} />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black tracking-tighter">Level 4</p>
                                        <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] mt-1">High Impact Logic</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 font-medium leading-[1.7]">
                                    Migration requires multi-node synchronization across legacy databases and modern cloud clusters.
                                </p>
                            </div>

                            <div className="relative z-10 flex items-center justify-between bg-white/5 py-4 px-6 rounded-2xl border border-white/10">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black group-hover:-translate-y-1 transition-all" style={{ transitionDelay: `${i * 100}ms` }}>
                                            {['SK', 'RA', 'PS', 'MK'][i - 1]}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Core Team</span>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                Resource Ecosystem
                            </h4>
                            <div className="space-y-6">
                                {[
                                    { name: 'S4/HANA Nodes', usage: 88 },
                                    { name: 'Compliance Desk', usage: 45 },
                                    { name: 'Asset Grid', usage: 92 }
                                ].map(resource => (
                                    <div key={resource.name} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-black text-slate-800">{resource.name}</span>
                                            <span className="text-[10px] font-black text-primary">{resource.usage}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${resource.usage}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                    {[
                        { id: 'departments', label: 'Operational Roadmap', icon: Building2 },
                        { id: 'daily-tasks', label: 'Intelligence Archive', icon: History },
                        { id: 'corporate-workflow', label: 'Synergy Blueprint', icon: ArrowRightLeft }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all rounded-[2rem] border-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-primary border-primary text-white shadow-[0_20px_40px_-5px_rgba(30,58,138,0.3)] scale-105'
                                : 'bg-white border-slate-100 text-slate-400 hover:border-primary/30 hover:text-primary hover:shadow-md'
                                }`}
                        >
                            <tab.icon size={20} className={activeTab === tab.id ? "animate-bounce" : ""} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="transition-all duration-700">
                    {activeTab === 'departments' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-2">
                            {project.departments.map((dept: any) => (
                                <div key={dept.id} className="bg-white/80 backdrop-blur-md p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-3xl transition-all group relative overflow-hidden flex flex-col h-full hover:-translate-y-3">
                                    <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 -rotate-12 group-hover:scale-150">
                                        <Building2 size={240} />
                                    </div>
                                    <div className="flex justify-between items-start mb-12 relative z-10">
                                        <div className="w-20 h-20 rounded-[2.2rem] bg-primary/5 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                            <Building2 size={36} />
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] border shadow-sm ${dept.status === 'ON_TRACK' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                }`}>
                                                {dept.status.replace('_', ' ')}
                                            </span>
                                            <div className="flex items-center justify-end gap-2 mt-4">
                                                <TrendingUp size={18} className="text-primary" />
                                                <p className="text-4xl font-black text-slate-900 tracking-tighter">{dept.progress}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative z-10 mb-10 flex-grow">
                                        <h3 className="font-black text-3xl text-slate-900 mb-3 leading-tight tracking-tight">{dept.name}</h3>
                                        <div className="flex items-center gap-3 mb-10 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                                            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-black shadow-md">
                                                {dept.lead.charAt(0)}
                                            </div>
                                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Unit Lead: {dept.lead}</p>
                                        </div>

                                        <div className="space-y-5">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6 flex items-center gap-3 border-b border-slate-100 pb-3">
                                                <Target size={14} className="animate-pulse" />
                                                Operational Pillars
                                            </p>
                                            {dept.tasks.map((task: any) => (
                                                <div key={task.id} className="p-6 bg-slate-50/50 rounded-[2.2rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-primary/10 transition-all group/task hover:scale-[1.02]">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="text-sm font-black text-slate-800 group-hover/task:text-primary transition-colors">{task.title}</span>
                                                        <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                                    </div>
                                                    <p className="text-xs text-slate-500 italic leading-relaxed font-semibold pr-4">"{task.update}"</p>
                                                    <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-[1rem] bg-slate-900 text-white flex items-center justify-center text-[10px] font-black border-2 border-white shadow-xl">
                                                                {task.assignee.substring(0, 2).toUpperCase()}
                                                            </div>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{task.assignee}</span>
                                                        </div>
                                                        <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-primary hover:border-primary/20 transition-all flex items-center justify-center shadow-sm">
                                                            <ArrowDownRight size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.3em] mt-auto opacity-0 group-hover:opacity-100 transition-all translate-y-6 group-hover:translate-y-0 shadow-2xl shadow-slate-900/40 hover:bg-primary">
                                        Consult Command Center
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'daily-tasks' && (
                        <div className="bg-white/80 backdrop-blur-md rounded-[4.5rem] border border-white/50 shadow-premium overflow-hidden p-4">
                            <div className="p-12 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-50/20 rounded-t-[4rem]">
                                <div className="space-y-2">
                                    <h2 className="text-4xl font-black text-slate-900 flex items-center gap-5">
                                        <div className="p-4 bg-primary text-white rounded-[1.8rem] shadow-xl shadow-primary/20"><History size={36} /></div>
                                        Intelligence Archive
                                    </h2>
                                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em] ml-24">Historical archive of logical progression</p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                                    <div className="relative w-full sm:w-80 group">
                                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Audit by department or user..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-3xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm shadow-sm"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsUpdateModalOpen(true)}
                                        className="w-full sm:w-auto flex items-center gap-3 px-10 py-5 bg-primary text-white rounded-[2rem] font-black shadow-[0_25px_50px_-12px_rgba(30,58,138,0.5)] hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all text-[11px] uppercase tracking-[0.3em] border border-white/20 whitespace-nowrap"
                                    >
                                        <Zap size={20} className="stroke-[3] fill-current" /> Post Intelligence
                                    </button>
                                </div>
                            </div>

                            <div className="p-4 space-y-6 mt-6">
                                {project.dailyUpdates
                                    .filter((log: any) =>
                                        log.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        log.update.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((log: any, i: number) => (
                                        <div key={i} className="mx-4 p-12 bg-white rounded-[3.5rem] border border-slate-50 hover:border-primary/20 transition-all flex flex-col md:flex-row gap-12 group relative overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(30,58,138,0.12)]">
                                            <div className="absolute top-0 left-0 w-3 h-full bg-primary/5 group-hover:bg-primary transition-all duration-700" />
                                            <div className="flex flex-col items-center min-w-[100px] border-r border-slate-50 pr-8">
                                                <div className="text-[12px] font-black text-slate-300 font-sans tracking-[0.4em] uppercase">{new Date(log.date).toLocaleString('default', { month: 'short' })}</div>
                                                <div className="text-6xl font-black text-slate-900 leading-none group-hover:scale-125 transition-all duration-700 mt-4 group-hover:text-primary">{new Date(log.date).getDate()}</div>
                                                <div className="mt-8 px-4 py-1.5 bg-slate-50 rounded-lg text-[10px] font-black text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">{log.time}</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10">
                                                    <div className="flex-1 max-w-4xl pr-8">
                                                        <div className="flex items-center gap-5 mb-8">
                                                            <div className="flex items-center gap-2 px-5 py-2.5 bg-primary rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20">
                                                                <Building2 size={14} />
                                                                {log.department}
                                                            </div>
                                                            <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] border border-slate-100">
                                                                <Clock size={14} />
                                                                Audit Sync
                                                            </div>
                                                        </div>
                                                        <h4 className="text-3xl text-slate-900 font-bold leading-[1.5] group-hover:translate-x-2 transition-transform duration-500">
                                                            {log.update}
                                                        </h4>
                                                    </div>
                                                    <div className={`px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] shadow-xl border h-fit whitespace-nowrap ${log.status === 'COMPLETED' ? 'text-white bg-emerald-500 border-emerald-400 shadow-emerald-200' :
                                                        log.status === 'BLOCKED' ? 'text-white bg-rose-500 border-rose-400 shadow-rose-200' : 'text-white bg-amber-500 border-amber-400 shadow-amber-200'
                                                        }`}>
                                                        {log.status}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                                                    <div className="flex items-center gap-5 group/user cursor-pointer">
                                                        <div className="relative">
                                                            <div className="w-16 h-16 rounded-[1.8rem] bg-slate-900 text-white flex items-center justify-center text-sm font-black border-4 border-white shadow-2xl group-hover:rotate-12 transition-transform">
                                                                {log.user.substring(0, 2).toUpperCase()}
                                                            </div>
                                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] group-hover:text-primary transition-colors underline underline-offset-4 decoration-primary/20">{log.user}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Architect</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <button className="w-12 h-12 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary hover:bg-primary/5 hover:scale-110 transition-all flex items-center justify-center border border-slate-100"><MessageSquare size={20} /></button>
                                                        <button className="w-12 h-12 bg-slate-50 rounded-2xl text-slate-400 hover:text-primary hover:bg-primary/5 hover:scale-110 transition-all flex items-center justify-center border border-slate-100"><Sparkles size={20} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'corporate-workflow' && (
                        <div className="bg-white/90 backdrop-blur-xl p-16 rounded-[4.5rem] border border-white/50 shadow-premium relative overflow-hidden">
                            {/* Futuristic Background */}
                            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                                <svg width="100%" height="100%">
                                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>
                            </div>

                            <div className="max-w-6xl mx-auto relative z-10">
                                <div className="text-center mb-28">
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-primary/40 group cursor-pointer hover:rotate-12 transition-all duration-500">
                                        <ArrowRightLeft size={44} className="group-hover:animate-pulse" />
                                    </div>
                                    <h2 className="text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-none">Synergy Blueprint</h2>
                                    <p className="text-slate-500 font-bold text-xl max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-80">
                                        Mapping the inter-departmental cooperation DNA
                                    </p>
                                </div>

                                <div className="space-y-32 relative">
                                    {/* Advanced Dynamic Connector */}
                                    <div className="absolute left-[50px] top-24 bottom-24 w-2 bg-slate-100 lg:left-1/2 lg:-translate-x-1/2 rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-b from-primary via-indigo-500 to-primary animate-[shimmer_3s_infinite]" />
                                    </div>

                                    {departmentalCooperation.map((flow, i) => (
                                        <div key={i} className={`flex flex-col lg:flex-row items-center gap-20 relative group ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`} style={{ transitionDelay: flow.delay }}>
                                            {/* Source Unit */}
                                            <div className="w-full lg:w-[42%] bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm group-hover:shadow-3xl group-hover:-translate-y-4 transition-all duration-700 relative z-10 border-b-[8px] border-b-primary">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-inner"><UserCheck size={24} /></div>
                                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Propagator</p>
                                                    </div>
                                                    <span className="text-[10px] font-black text-primary px-4 py-1.5 bg-primary/5 rounded-full">{flow.importance}</span>
                                                </div>
                                                <h4 className="text-3xl font-black text-slate-900 leading-tight pr-4">{flow.from}</h4>
                                            </div>

                                            {/* Central Integration Node */}
                                            <div className="absolute left-[38px] lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-[1.5rem] bg-white border-2 border-primary shadow-2xl ring-[16px] ring-primary/5 z-20 group-hover:rotate-45 transition-all duration-1000 flex items-center justify-center">
                                                <div className="w-3 h-3 bg-primary rounded-full animate-ping" />
                                            </div>

                                            {/* Handover Data Box */}
                                            <div className="absolute left-[100px] lg:left-1/2 lg:-translate-x-1/2 top-1/2 -translate-y-1/2 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-2xl z-20 hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-[-120%] ring-4 ring-primary/5">
                                                <div className="flex items-center gap-3">
                                                    <MousePointer2 size={16} className="text-primary" />
                                                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-[0.2em]">Validated Handshake</span>
                                                </div>
                                            </div>

                                            {/* Recipient Unit */}
                                            <div className="w-full lg:w-[42%] bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl group-hover:shadow-primary/30 group-hover:-translate-y-4 transition-all duration-700 relative z-10 overflow-hidden ring-8 ring-slate-900/5">
                                                <Dna size={180} className="absolute -bottom-16 -right-16 opacity-[0.15] rotate-45 group-hover:scale-150 transition-transform duration-1000" />
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-5 mb-10">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md"><ArrowRightLeft size={24} /></div>
                                                        <p className="text-[11px] font-black text-indigo-300 uppercase tracking-[0.4em]">Recipient Terminal</p>
                                                    </div>
                                                    <h4 className="text-3xl font-black mb-10 leading-tight tracking-tight">{flow.to}</h4>
                                                    <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden group/box">
                                                        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 group-hover/box:h-0 transition-all duration-700" />
                                                        <div className="flex items-start gap-6">
                                                            <div className="p-3 bg-indigo-500/20 rounded-xl"><MessageSquare size={24} className="text-indigo-400" /></div>
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] opacity-60">Handover Protocol</p>
                                                                <p className="text-lg font-bold text-slate-100 italic leading-relaxed">"{flow.reason}"</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Strategic Footer Banner */}
                            <div className="mt-40 p-16 bg-gradient-to-br from-primary via-indigo-900 to-indigo-950 rounded-[5rem] text-white shadow-[0_50px_100px_-20px_rgba(30,58,138,0.5)] relative overflow-hidden group/banner">
                                <Activity className="absolute bottom-0 right-0 opacity-[0.08] -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-1000" size={400} />
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_5%_5%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
                                <div className="relative z-10 max-w-4xl">
                                    <div className="w-24 h-2 bg-white/10 rounded-full mb-12 overflow-hidden">
                                        <div className="h-full bg-white opacity-40 animate-[shimmer_2s_infinite]" />
                                    </div>
                                    <h3 className="text-5xl font-black mb-10 flex items-center gap-8 tracking-tighter leading-none">
                                        <div className="p-4 bg-white/5 rounded-3xl backdrop-blur-md border border-white/10"><CheckCircle2 size={56} className="text-indigo-400 stroke-[2.5]" /></div>
                                        Standard Operations Synergy
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-2xl font-medium max-w-3xl pr-10">
                                        Our <span className="text-white font-black underline decoration-indigo-400 decoration-4 underline-offset-[12px]">Unified Handover Architecture</span> ensures horizontal alignment across <span className="text-white">IT, Finance, and Operations</span>. This project achieves 100% data integrity during departmental transit.
                                    </p>
                                    <div className="mt-16 flex flex-wrap gap-8">
                                        <button className="px-12 py-6 bg-white text-primary rounded-[2.5rem] font-black hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3">
                                            Export Protocol Blueprint <ArrowDownRight size={20} />
                                        </button>
                                        <button className="px-12 py-6 bg-white/10 text-white rounded-[2.5rem] font-black hover:bg-white/20 transition-all text-sm uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">
                                            Operational Compliance SOP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Daily Update Modal - Refined */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl animate-fade-in"
                        onClick={() => setIsUpdateModalOpen(false)}
                    />
                    <div className="relative bg-white w-full max-w-3xl rounded-[5rem] shadow-[0_0_100px_rgba(0,0,0,0.4)] overflow-hidden animate-scale-in border border-white/20">
                        <div className="p-16 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div className="space-y-1">
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Submit Intelligence</h2>
                                <p className="text-slate-500 font-black text-[11px] uppercase tracking-[0.5em] ml-1">KICCPA Node Validation Stream</p>
                            </div>
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="w-16 h-16 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all border border-slate-100 hover:rotate-180 duration-500"
                            >
                                <X size={32} className="stroke-[3]" />
                            </button>
                        </div>

                        <div className="p-16 space-y-12 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            <div className="flex gap-8 p-8 bg-primary/5 rounded-[3rem] border border-primary/10 shadow-inner group/card relative overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-150 transition-all duration-1000">
                                    <Cpu size={140} />
                                </div>
                                <div className="w-20 h-20 rounded-[2.2rem] bg-primary flex items-center justify-center text-white shadow-2xl group-hover:rotate-12 transition-transform relative z-10">
                                    <Briefcase size={32} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-2">Target Project Environment</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">{project.name}</p>
                                </div>
                            </div>

                            <form className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Originating Unit</label>
                                        <div className="relative group">
                                            <select className="w-full px-10 py-6 bg-slate-50 rounded-[2.5rem] border-2 border-slate-50 focus:border-primary/20 focus:bg-white transition-all font-black text-slate-800 appearance-none outline-none shadow-sm cursor-pointer">
                                                {project.departments.map((d: any) => (
                                                    <option key={d.id}>{d.name}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-primary group-hover:scale-110 transition-transform">
                                                <Building2 size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Execution Phase</label>
                                        <div className="relative group">
                                            <select className="w-full px-10 py-6 bg-slate-50 rounded-[2.5rem] border-2 border-slate-50 focus:border-primary/20 focus:bg-white transition-all font-black text-slate-800 appearance-none outline-none shadow-sm cursor-pointer">
                                                <option>Development</option>
                                                <option>Handover Audit</option>
                                                <option>Compliance Sync</option>
                                                <option>Staging</option>
                                            </select>
                                            <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none text-primary group-hover:scale-110 transition-transform">
                                                <Layers size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-6">Intelligence Metadata (The Log)</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Detail the technical progression, architectural hurdles, and inter-unit handovers achieved in this cycle..."
                                        className="w-full px-10 py-8 bg-slate-50 rounded-[3rem] border-2 border-slate-50 focus:border-primary/20 focus:bg-white transition-all font-semibold text-slate-800 resize-none outline-none shadow-sm placeholder:text-slate-300 leading-relaxed"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Node Fulfillment Status</label>
                                        <div className="flex bg-slate-50 p-2 rounded-[2.5rem] border-2 border-slate-50 shadow-inner">
                                            {['IN_PROGRESS', 'COMPLETED'].map(status => (
                                                <button
                                                    key={status}
                                                    type="button"
                                                    className="flex-1 py-5 text-[10px] font-black rounded-3xl transition-all hover:bg-white hover:shadow-2xl uppercase tracking-[0.2em] text-slate-400 hover:text-primary"
                                                >
                                                    {status.replace('_', ' ')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-6">Total Calculation Cycles (Hours)</label>
                                        <div className="flex items-center gap-5 bg-slate-50 px-10 py-5 rounded-[2.5rem] border-2 border-slate-50 shadow-inner group/input focus-within:bg-white focus-within:border-primary/20 transition-all group">
                                            <Clock size={24} className="text-slate-300 group-hover/input:text-primary transition-colors group-hover:rotate-12 transition-all" />
                                            <input type="number" placeholder="Cycle Units" className="bg-transparent focus:outline-none w-full font-black text-slate-800 text-xl" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-16 border-t border-slate-50 bg-slate-50/50 flex gap-8">
                            <button
                                onClick={() => setIsUpdateModalOpen(false)}
                                className="flex-1 py-6 px-10 bg-white rounded-[2.2rem] text-slate-400 font-black border-2 border-slate-100 hover:text-slate-600 hover:bg-slate-50 transition-all shadow-sm text-[11px] uppercase tracking-[0.3em]"
                            >
                                Discard Digest
                            </button>
                            <button className="flex-[1.5] py-6 px-14 bg-primary text-white rounded-[2.2rem] font-black shadow-[0_25px_60px_-15px_rgba(30,58,138,0.5)] hover:scale-[1.03] hover:-translate-y-1 transition-all active:scale-95 text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-5 border border-white/20 group">
                                <Send size={24} className="stroke-[3] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Push Intelligence Log
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 20px;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </Shell>
    );
}
