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
    Zap,
    MoreVertical,
    Plus,
    Building2,
    X,
    TrendingUp,
    ShieldAlert,
    Send,
    Layers,
    Search,
    Filter,
    ArrowDownRight,
    Activity,
    Briefcase,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

// Mock project data
const projects = {
    '1': {
        name: 'ERP System Migration',
        description: 'Migrating legacy ERP to cloud-based SAP S/4HANA with unified data structures and real-time synchronization across global units.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        progress: 65,
        elapsedDays: 74,
        totalDays: 120,
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
                    { id: 't4', title: 'Opening Balance Verification', status: 'TO_DO', assignee: 'Emily', update: 'Manual verification scheduled next week.' }
                ]
            },
            {
                id: 'ops', name: 'Operations', lead: 'Robert Brown', status: 'ON_TRACK', progress: 55, tasks: [
                    { id: 't5', title: 'Workflow Documentation', status: 'COMPLETED', assignee: 'Chris', update: 'SOPs updated for the new system.' }
                ]
            }
        ],
        dailyUpdates: [
            { date: '2026-01-12', department: 'IT Infrastructure', user: 'Alex', update: 'Completed firewall rule configuration for the new DB server cluster.', status: 'COMPLETED', time: '10:45 AM' },
            { date: '2026-01-11', department: 'Finance', user: 'Michael', update: 'Identified mismatch in Q4 reports during balance mapping.', status: 'BLOCKED', time: '02:15 PM' },
            { date: '2026-01-11', department: 'Operations', user: 'Chris', update: 'System training session held for regional logistics managers.', status: 'IN_PROGRESS', time: '11:00 AM' },
        ],
        cooperation: [
            { from: 'IT Infrastructure', to: 'Finance', reason: 'System access and permissions handover', importance: 'High' },
            { from: 'Finance', to: 'Operations', reason: 'Budget approval for new hardware deployment', importance: 'Critical' },
            { from: 'Operations', to: 'IT Infrastructure', reason: 'User acceptance testing (UAT) feedback', importance: 'High' }
        ]
    }
};

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = (projects as any)[id] || projects['1'];
    const [activeTab, setActiveTab] = useState('roadmap');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const phases = [
        { name: 'Discovery', status: 'COMPLETED' },
        { name: 'Architecture', status: 'COMPLETED' },
        { name: 'Deployment', status: 'IN_PROGRESS' },
        { name: 'Optimization', status: 'PENDING' }
    ];

    return (
        <Shell title={project.name}>
            <div className="p-6 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Header Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <Link href="/projects" className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Portfolio</span>
                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">ID: PRJ-{id}001</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{project.name}</h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
                            <FileText size={16} /> Export Report
                        </button>
                        <button
                            onClick={() => setIsUpdateModalOpen(true)}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Zap size={14} className="fill-current" /> Post Update
                        </button>
                    </div>
                </div>

                {/* Executive Summary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-8">
                                <div className="space-y-4 max-w-xl">
                                    <div className="flex items-center gap-3">
                                        <StatusBadge status={project.status} />
                                        <PriorityBadge priority={project.priority} />
                                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest ml-2">
                                            <History size={14} /> {project.elapsedDays} Days Elapsed
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-base font-medium leading-relaxed font-sans">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-2 text-blue-600 mb-1">
                                        <TrendingUp size={18} />
                                        <span className="text-4xl font-bold tracking-tight">{project.progress}%</span>
                                    </div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</p>
                                </div>
                            </div>

                            {/* Phase Tracker */}
                            <div className="pt-8 border-t border-slate-50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-1">Implementation Phases</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {phases.map((phase, i) => (
                                        <div key={phase.name} className={`p-4 border transition-all ${phase.status === 'COMPLETED' ? 'bg-emerald-50/40 border-emerald-100 text-emerald-700' :
                                                phase.status === 'IN_PROGRESS' ? 'bg-blue-50/40 border-blue-100 text-blue-700 shadow-sm' :
                                                    'bg-slate-50/50 border-slate-100 text-slate-400'
                                            }`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[9px] font-black uppercase tracking-widest">Phase 0{i + 1}</span>
                                                {phase.status === 'COMPLETED' ? <CheckCircle2 size={14} /> :
                                                    phase.status === 'IN_PROGRESS' ? <Activity size={14} className="animate-pulse" /> :
                                                        <Clock size={14} />}
                                            </div>
                                            <p className="text-sm font-bold truncate">{phase.name}</p>
                                            <p className="text-[9px] font-bold uppercase opacity-60">{phase.status.replace('_', ' ')}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                            <div className="relative z-10 space-y-6">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Governance Review</span>
                                    <button className="text-white/40 hover:text-white"><MoreVertical size={18} /></button>
                                </div>
                                <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/10">
                                        <AlertCircle size={24} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Standard Risk Model</p>
                                        <p className="text-xs font-medium text-slate-400">High Impact Alignment</p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                                    Deployment requires multi-unit synchronization across legacy infrastructure and modern cloud clusters.
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                    <div className="flex -space-x-2.5">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden shadow-lg bg-slate-800">
                                                <img src={`https://i.pravatar.cc/100?u=detail${i}`} className="w-full h-full object-cover" alt="head" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Project Steering Team</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 p-1 bg-slate-100/50 border border-slate-200/50 w-full md:w-fit">
                        {[
                            { id: 'roadmap', label: 'Unit Roadmap', icon: Layers },
                            { id: 'logs', label: 'Activity Logs', icon: History },
                            { id: 'collaboration', label: 'Collaboration', icon: UsersIcon }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-6 py-2.5 text-xs font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-white shadow-sm text-blue-600'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="animate-in fade-in duration-500">
                        {activeTab === 'roadmap' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {project.departments.map((dept: any) => (
                                    <div key={dept.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-inner">
                                                <Building2 size={24} />
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-1.5 mb-1.5">
                                                    <TrendingUp size={14} className="text-blue-600" />
                                                    <span className="text-2xl font-bold text-slate-900">{dept.progress}%</span>
                                                </div>
                                                <span className={`text-[9px] font-black px-2.5 py-1 rounded-md border uppercase tracking-widest ${dept.status === 'ON_TRACK' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                                    }`}>
                                                    {dept.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-6 flex-grow">
                                            <div className="pb-4 border-b border-slate-50">
                                                <h3 className="font-bold text-lg text-slate-900 mb-1">{dept.name}</h3>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-5 h-5 rounded-full bg-slate-100 overflow-hidden shadow-sm">
                                                        <img src={`https://i.pravatar.cc/100?u=unit${dept.lead}`} alt="lead" />
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Lead: {dept.lead}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Target size={12} /> Active Objectives
                                                </p>
                                                {dept.tasks.map((task: any) => (
                                                    <div key={task.id} className="p-4 bg-slate-50 border border-slate-100/50 hover:bg-white transition-all group/task">
                                                        <div className="flex justify-between items-center mb-1.5">
                                                            <span className="text-xs font-bold text-slate-800 group-hover/task:text-blue-600 transition-colors">{task.title}</span>
                                                            <div className={`w-2 h-2 rounded-full ${task.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                                                        </div>
                                                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">"{task.update}"</p>
                                                        <div className="mt-4 flex items-center justify-between">
                                                            <div className="flex items-center gap-2.5">
                                                                <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[9px] font-bold border-2 border-white shadow-sm">
                                                                    {task.assignee.substring(0, 2).toUpperCase()}
                                                                </div>
                                                                <span className="text-[10px] font-bold text-slate-400 uppercase">{task.assignee}</span>
                                                            </div>
                                                            <ArrowDownRight size={16} className="text-slate-300" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="w-full py-3.5 bg-slate-50 text-slate-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest mt-8 hover:bg-slate-900 hover:text-white transition-all border border-slate-100/50">
                                            Detailed Unit Review
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'logs' && (
                            <div className="bg-white border border-slate-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
                                <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
                                            <History size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Project Activity Log</h3>
                                            <p className="text-xs font-medium text-slate-400">Sequential operational updates across all functional units</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="relative flex-1 md:w-64 group">
                                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search logs..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
                                            />
                                        </div>
                                        <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 shadow-sm"><Filter size={18} /></button>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    {project.dailyUpdates
                                        .filter((log: any) =>
                                            log.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            log.update.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((log: any, i: number) => (
                                            <div key={i} className="p-6 bg-white border border-slate-50 hover:border-blue-100 transition-all rounded-[1.5rem] flex flex-col md:flex-row gap-8 group relative overflow-hidden">
                                                <div className="flex flex-row md:flex-col items-center gap-2 md:min-w-[90px] md:border-r border-slate-50 md:pr-8">
                                                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{new Date(log.date).toLocaleString('default', { month: 'short' })}</span>
                                                    <span className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-none my-1">{new Date(log.date).getDate()}</span>
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{log.time}</span>
                                                </div>
                                                <div className="flex-1 space-y-5">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest flex items-center gap-2">
                                                            <Building2 size={12} /> {log.department}
                                                        </span>
                                                        <span className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest border ${log.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                            log.status === 'BLOCKED' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                            }`}>
                                                            {log.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-[15px] font-medium text-slate-700 leading-relaxed pr-6">{log.update}</p>
                                                    <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <div className="w-10 h-10 rounded-2xl bg-slate-100 border-2 border-white overflow-hidden shadow-sm">
                                                                    <img src={`https://i.pravatar.cc/100?u=log${log.user}`} alt="user" />
                                                                </div>
                                                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-900 leading-none mb-1">{log.user}</p>
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Lead</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <button className="w-9 h-9 bg-slate-50 text-slate-300 hover:text-blue-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-blue-100 rounded-xl transition-all flex items-center justify-center"><MessageSquare size={16} /></button>
                                                            <button className="w-9 h-9 bg-slate-50 text-slate-300 hover:text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl transition-all flex items-center justify-center"><ArrowDownRight size={16} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'collaboration' && (
                            <div className="bg-white p-10 md:p-14 border border-slate-100 shadow-sm space-y-12 animate-in slide-in-from-bottom-4 duration-700">
                                <div className="text-center space-y-3 max-w-2xl mx-auto">
                                    <h3 className="text-2xl font-bold text-slate-900">Inter-Unit Synergy</h3>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed">Defining horizontal alignment and resource transfer protocols between core operational units.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {project.cooperation.map((flow: any, i: number) => (
                                        <div key={i} className="p-8 bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-500 group relative">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 group-hover:bg-blue-600/5 transition-all duration-700" />
                                            <div className="flex justify-between items-start mb-10 relative z-10">
                                                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                                    <ArrowRightLeft className="w-6 h-6" />
                                                </div>
                                                <span className={`px-2.5 py-1 text-[9px] font-black border uppercase tracking-[0.1em] ${flow.importance === 'Critical' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                                                    }`}>
                                                    {flow.importance}
                                                </span>
                                            </div>
                                            <div className="space-y-6 relative z-10">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Source Entity</p>
                                                    <p className="text-lg font-bold text-slate-900 leading-tight">{flow.from}</p>
                                                </div>
                                                <div className="flex items-center gap-4 py-2 opacity-30">
                                                    <div className="h-px flex-1 bg-slate-300" />
                                                    <div className="w-2 h-2 rounded-full border-2 border-slate-300" />
                                                    <div className="h-px flex-1 bg-slate-300" />
                                                </div>
                                                <div className="space-y-2 text-right">
                                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Recipient Unit</p>
                                                    <p className="text-lg font-bold text-slate-900 leading-tight">{flow.to}</p>
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-slate-200/50">
                                                    <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed pr-2">"{flow.reason}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Professional Update Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsUpdateModalOpen(false)} />
                    <div className="relative bg-white w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-slate-900">Operational Update</h2>
                                <p className="text-xs text-slate-500 font-medium">Record high-fidelity progression for strategic auditing</p>
                            </div>
                            <button onClick={() => setIsUpdateModalOpen(false)} className="w-10 h-10 rounded-xl hover:bg-white hover:shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Functional Unit</label>
                                <div className="relative group">
                                    <select className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold appearance-none">
                                        {project.departments.map((d: any) => (
                                            <option key={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                    <Building2 className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Daily Log Content</label>
                                <textarea
                                    rows={4}
                                    placeholder="Enter detailed progression, inter-unit handovers, or key milestone completions..."
                                    className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Milestone Status</label>
                                    <select className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold">
                                        <option>IN PROGRESS</option>
                                        <option>COMPLETED</option>
                                        <option>ON HOLD</option>
                                        <option>BLOCKED</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">Operational Hours Spent</label>
                                    <div className="relative">
                                        <input type="number" placeholder="Duration (Hrs)" className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-sm font-bold" />
                                        <Clock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
                            <button onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-3.5 bg-white text-slate-600 text-xs font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all font-sans">Discard Log</button>
                            <button className="flex-[2] py-3.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                <Send size={16} /> Broadcast Update
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </Shell>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    const dots: Record<string, string> = {
        PLANNING: 'bg-blue-400',
        IN_PROGRESS: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.2)]',
        COMPLETED: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]',
        ON_HOLD: 'bg-rose-400'
    };

    return (
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className={`w-2 h-2 rounded-full ${dots[status] || 'bg-slate-400'}`} />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{status.replace('_', ' ')}</span>
        </div>
    );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
    const levels: Record<string, { color: string, bg: string }> = {
        LOW: { color: 'text-slate-400', bg: 'bg-slate-50' },
        MEDIUM: { color: 'text-blue-600', bg: 'bg-blue-50' },
        HIGH: { color: 'text-amber-600', bg: 'bg-amber-50' },
        CRITICAL: { color: 'text-rose-600', bg: 'bg-rose-50' }
    };
    const level = levels[priority] || levels.MEDIUM;

    return (
        <span className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-current opacity-80 ${level.color} ${level.bg}`}>
            {priority} Priority
        </span>
    );
};

import { ArrowRightLeft } from 'lucide-react';
