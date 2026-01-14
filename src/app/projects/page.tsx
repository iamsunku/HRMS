"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Briefcase,
    Plus,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Users as UsersIcon,
    LayoutGrid,
    List,
    X,
    Calendar,
    Target,
    Activity,
    UserPlus,
    Save
} from 'lucide-react';
import Link from 'next/link';

const projectsData = [
    {
        id: '1',
        name: 'ERP System Migration',
        description: 'Migrating legacy ERP to cloud-based SAP S/4HANA with unified data structures.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        progress: 65,
        teamCount: 12,
        departments: ['IT', 'Finance', 'Operations'],
        deadline: '2026-03-15'
    },
    {
        id: '2',
        name: 'AI Recruitment Portal',
        description: 'Building an automated screening tool for the hiring department using NLP.',
        status: 'PLANNING',
        priority: 'MEDIUM',
        progress: 15,
        teamCount: 8,
        departments: ['HR', 'IT'],
        deadline: '2026-05-20'
    },
    {
        id: '3',
        name: 'Employee Wellness Initiative',
        description: 'Implementing a company-wide health and productivity tracking platform.',
        status: 'COMPLETED',
        priority: 'LOW',
        progress: 100,
        teamCount: 5,
        departments: ['HR'],
        deadline: '2025-12-30'
    },
    {
        id: '4',
        name: 'Financial Audit 2026',
        description: 'Comprehensive annual audit and tax compliance preparation.',
        status: 'ON_HOLD',
        priority: 'CRITICAL',
        progress: 45,
        teamCount: 15,
        departments: ['Finance', 'Legal'],
        deadline: '2026-02-10'
    }
];


export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedHead, setSelectedHead] = useState<string | null>(null);
    const [isAddingNewLead, setIsAddingNewLead] = useState(false);
    const [newLeadName, setNewLeadName] = useState('');
    const [newLeadDept, setNewLeadDept] = useState('');

    const [departmentHeads, setDepartmentHeads] = useState([
        { id: '1', name: 'Rahul Vikram', role: 'Head of Engineering', dept: 'Engineering', avatar: 'RV' },
        { id: '2', name: 'John Doe', role: 'IT Infrastructure Lead', dept: 'IT', avatar: 'JD' },
        { id: '3', name: 'Jane Smith', role: 'Finance Director', dept: 'Finance', avatar: 'JS' },
        { id: '4', name: 'Priya Patel', role: 'HR Manager', dept: 'HR', avatar: 'PP' },
        { id: '5', name: 'Robert Brown', role: 'Operations Chief', dept: 'Operations', avatar: 'RB' },
    ]);

    const handleAddNewLead = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLeadName || !newLeadDept) return;

        const newLead = {
            id: Date.now().toString(),
            name: newLeadName,
            role: `Lead of ${newLeadDept}`,
            dept: newLeadDept,
            avatar: newLeadName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
        };

        setDepartmentHeads([...departmentHeads, newLead]);
        setSelectedHead(newLead.id);
        setIsAddingNewLead(false);
        setNewLeadName('');
        setNewLeadDept('');
    };

    return (
        <Shell title="Project Portfolio">
            <div className="p-6 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Executive Summary Header */}
                <div className="flex flex-col lg:flex-row justify-between items-end lg:items-center gap-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Project Repository</h2>
                        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                            <div className="flex items-center gap-1.5 pt-1">
                                <Activity size={14} className="text-blue-600" />
                                <span>12 Active Operations</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                            <span>Global Resource Allocation Portfolio</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        Create New Project
                    </button>
                </div>

                {/* Analytical Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Active Projects', value: '12', trend: '+2 this month', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                        { label: 'Pending Assessment', value: '48', trend: 'Critical priority', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50/50' },
                        { label: 'Assigned Teams', value: '08', trend: 'Cross-functional', icon: UsersIcon, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                        { label: 'Avg Completion', value: '72%', trend: 'Target: 85%', icon: Target, color: 'text-purple-600', bg: 'bg-purple-50/50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} transition-colors group-hover:scale-110 duration-500`}>
                                    <stat.icon size={22} />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">{stat.trend}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Professional Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center gap-2 ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={16} /> Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-tight transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={16} /> List
                        </button>
                    </div>

                    <div className="flex w-full md:w-auto flex-1 max-w-xl items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by name, lead or department..."
                                className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} className="text-slate-400" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
                    {projectsData.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`} className="block h-full group">
                            <div className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative overflow-hidden group-hover:border-blue-100">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50/50 transition-colors duration-500" />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="space-y-3 flex-1">
                                        <div className="flex items-center gap-2.5">
                                            <StatusDot status={project.status} />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">{project.status.replace('_', ' ')}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors pr-8">
                                            {project.name}
                                        </h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-900 flex items-center justify-center shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                                        <Briefcase size={20} />
                                    </div>
                                </div>

                                <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="space-y-6 mt-auto">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <span>Milestone Progress</span>
                                            <span className="text-slate-900">{project.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                                            <div
                                                className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out relative"
                                                style={{ width: `${project.progress}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/10 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="flex -space-x-2.5">
                                                {[...Array(Math.min(3, project.teamCount))].map((_, i) => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm bg-slate-200">
                                                        <img src={`https://i.pravatar.cc/150?u=${project.id}${i}`} className="w-full h-full object-cover" alt="team" />
                                                    </div>
                                                ))}
                                                {project.teamCount > 3 && (
                                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                                                        +{project.teamCount - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <PriorityBadge priority={project.priority} />
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Launch Phase</span>
                                            <div className="flex items-center gap-1.5 text-slate-900 text-xs font-bold">
                                                <Calendar size={12} className="text-slate-400" />
                                                {new Date(project.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Alpha Project Initiation Console */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[5000] flex justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setIsCreateModalOpen(false)} />

                    <div className="relative bg-[#f8fafc] w-full lg:ml-[270px] h-full shadow-[0_0_100px_rgba(0,0,0,0.2)] animate-in slide-in-from-right duration-700 flex flex-col">

                        {/* Console Header */}
                        <div className="px-10 py-8 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-6">
                                <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200">
                                    <Plus size={24} className="stroke-[3]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Deployment Protocol</span>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: PRJ-NEW-INIT</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Project Initiation Workspace</h2>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="group flex items-center gap-3 px-5 py-2.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-100 rounded-xl transition-all"
                            >
                                <span className="text-[10px] font-black text-slate-500 group-hover:text-rose-600 uppercase tracking-widest transition-colors">Abort Mission</span>
                                <div className="w-px h-4 bg-slate-200" />
                                <X size={20} className="text-slate-400 group-hover:text-rose-600 group-hover:rotate-90 transition-all" />
                            </button>
                        </div>

                        {/* Scrollable Configuration Area */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-10 md:p-14">
                            <div className="max-w-5xl mx-auto space-y-16">

                                {/* Section 1: Core Logistics */}
                                <div className="space-y-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black text-xs border border-slate-200 shadow-inner">01</div>
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Core Information & Logistics</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pl-14">
                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Target size={14} className="text-blue-600" /> Project Identifier Name
                                            </label>
                                            <input type="text" className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all text-base font-bold placeholder:text-slate-300 shadow-sm" placeholder="Ex: Global Infrastructure Overhaul" />
                                            <p className="text-[10px] font-medium text-slate-400 italic font-sans ml-1">* Use a high-level strategic name for reporting.</p>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Activity size={14} className="text-amber-500" /> Launch Timeline
                                            </label>
                                            <input type="date" className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all text-sm font-bold shadow-sm" />
                                        </div>

                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <Briefcase size={14} className="text-indigo-500" /> Operational Context & Summary
                                            </label>
                                            <textarea rows={4} className="w-full px-6 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/20 transition-all text-base font-bold resize-none placeholder:text-slate-300 shadow-sm" placeholder="Define the core objectives, deliverables, and expected outcomes..." />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Command & Governance */}
                                <div className="space-y-10 pt-10 border-t border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-black text-xs border border-slate-200 shadow-inner">02</div>
                                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Governance & Leadership Assignment</h3>
                                    </div>

                                    <div className="pl-14 space-y-8">
                                        <div className="flex justify-between items-end mb-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-bold text-slate-900">Assigned Project Lead</p>
                                                <p className="text-xs font-medium text-slate-500">Personnel responsible for end-to-end execution</p>
                                            </div>
                                            <button onClick={() => setIsAddingNewLead(!isAddingNewLead)} className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center gap-2">
                                                {isAddingNewLead ? <X size={14} /> : <UserPlus size={14} />}
                                                {isAddingNewLead ? 'Cancel Entry' : 'Manual Entry'}
                                            </button>
                                        </div>

                                        {isAddingNewLead ? (
                                            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200 border-dashed space-y-6 animate-in slide-in-from-top-4 duration-500">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Name</label>
                                                        <input type="text" value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} placeholder="Personnel Full Name" className="w-full px-5 py-3.5 bg-white rounded-xl text-sm font-bold border border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department Unit</label>
                                                        <input type="text" value={newLeadDept} onChange={(e) => setNewLeadDept(e.target.value)} placeholder="Ex: IT Operations, HR" className="w-full px-5 py-3.5 bg-white rounded-xl text-sm font-bold border border-slate-200 focus:border-blue-500 outline-none transition-all shadow-sm" />
                                                    </div>
                                                </div>
                                                <button onClick={handleAddNewLead} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">Establish Deployment Lead</button>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {departmentHeads.map((head) => (
                                                    <div
                                                        key={head.id}
                                                        onClick={() => setSelectedHead(head.id)}
                                                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedHead === head.id ? 'bg-white border-blue-600 shadow-xl shadow-blue-500/10' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm'}`}
                                                    >
                                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black tracking-tight ${selectedHead === head.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                            {head.avatar}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className={`text-sm font-black truncate ${selectedHead === head.id ? 'text-blue-900' : 'text-slate-900'}`}>{head.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mt-1">{head.dept} Unit</p>
                                                        </div>
                                                        {selectedHead === head.id && (
                                                            <div className="ml-auto">
                                                                <CheckCircle2 size={18} className="text-blue-600" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control Bar */}
                        <div className="px-10 py-8 bg-white border-t border-slate-200 flex flex-col md:flex-row gap-6 shrink-0">
                            <div className="flex-1 flex flex-col justify-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authorization Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-600 italic">Waiting for form completion...</span>
                                </div>
                            </div>
                            <div className="flex gap-4 min-w-[400px]">
                                <button onClick={() => setIsCreateModalOpen(false)} className="flex-1 py-4 bg-white text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all font-sans">Discard Protocol</button>
                                <button className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                    <Save size={18} /> Deploy Project Portfolio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
            `}</style>
        </Shell>
    );
}

const StatusDot = ({ status }: { status: string }) => {
    const dots: Record<string, string> = {
        PLANNING: 'bg-blue-400',
        IN_PROGRESS: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]',
        COMPLETED: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.3)]',
        ON_HOLD: 'bg-rose-400'
    };

    return <div className={`w-2 h-2 rounded-full ${dots[status]}`} />;
};

const PriorityBadge = ({ priority }: { priority: string }) => {
    const levels: Record<string, { color: string, bg: string }> = {
        LOW: { color: 'text-slate-400', bg: 'bg-slate-50' },
        MEDIUM: { color: 'text-blue-600', bg: 'bg-blue-50' },
        HIGH: { color: 'text-amber-600', bg: 'bg-amber-50' },
        CRITICAL: { color: 'text-rose-600', bg: 'bg-rose-50' }
    };

    return (
        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border border-current opacity-70 ${levels[priority].color} ${levels[priority].bg}`}>
            {priority}
        </span>
    );
};
