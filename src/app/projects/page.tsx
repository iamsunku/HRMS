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

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        PLANNING: 'bg-blue-100 text-blue-700 border-blue-200',
        IN_PROGRESS: 'bg-amber-100 text-amber-700 border-amber-200',
        COMPLETED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        ON_HOLD: 'bg-rose-100 text-rose-700 border-rose-200'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

const PriorityBadge = ({ priority }: { priority: string }) => {
    const styles: Record<string, string> = {
        LOW: 'text-slate-500',
        MEDIUM: 'text-blue-500',
        HIGH: 'text-amber-500',
        CRITICAL: 'text-rose-500 font-bold'
    };

    return (
        <span className={`text-xs font-semibold flex items-center gap-1 ${styles[priority]}`}>
            <AlertCircle size={12} /> {priority}
        </span>
    );
};

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
        <Shell title="Project Management">
            <div className="p-6 space-y-8 animate-fade-in max-w-[1600px] mx-auto">

                {/* Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Active Projects', value: '12', icon: Briefcase, color: 'text-primary', bg: 'bg-primary/5' },
                        { label: 'Pending Tasks', value: '48', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-50' },
                        { label: 'Teams Involved', value: '8', icon: UsersIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { label: 'Completion Rate', value: '72%', icon: CheckCircle2, color: 'text-accent', bg: 'bg-accent/5' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/50 shadow-sm flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Header Stats & Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4 bg-white/50 p-1.5 rounded-2xl border border-white/20 backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>

                    <div className="flex flex-1 w-full max-w-md items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, department or lead..."
                                className="w-full pl-12 pr-4 py-3 bg-white/70 rounded-2xl border border-white/20 shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-slate-400"
                            />
                        </div>
                        <button className="p-3 bg-white/70 rounded-2xl border border-white/20 shadow-sm text-slate-600 hover:bg-white transition-all">
                            <Filter size={20} />
                        </button>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-2xl hover:bg-primary-hover shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95 font-bold"
                    >
                        <Plus size={20} />
                        <span>Create New Project</span>
                    </button>
                </div>

                {/* Project Grid */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
                    {projectsData.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <div className="group bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 shadow-premium hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden flex flex-col h-full border-b-8 border-b-transparent hover:border-b-primary/40">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3 shadow-inner">
                                            <Briefcase size={28} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 text-xl leading-tight group-hover:text-primary transition-colors">{project.name}</h3>
                                            <PriorityBadge priority={project.priority} />
                                        </div>
                                    </div>
                                    <StatusBadge status={project.status} />
                                </div>

                                <p className="text-slate-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                                    {project.description}
                                </p>

                                <div className="space-y-5 mt-auto">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                        <span>Current Progress</span>
                                        <span className="text-primary">{project.progress}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-1000 relative"
                                            style={{ width: `${project.progress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                        <div className="flex -space-x-2.5">
                                            {[...Array(Math.min(4, project.teamCount))].map((_, i) => (
                                                <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                                                    {['JS', 'PA', 'RV', 'AK'][i] || '..'}
                                                </div>
                                            ))}
                                            {project.teamCount > 4 && (
                                                <div className="w-9 h-9 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                                                    +{project.teamCount - 4}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Deadline</p>
                                            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm leading-none">
                                                <Calendar size={14} className="text-rose-500" />
                                                <span>{new Date(project.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.departments.map(dept => (
                                            <span key={dept} className="px-3 py-1 bg-slate-100/50 text-slate-600 rounded-lg text-[10px] uppercase font-black tracking-widest border border-slate-200/50">
                                                {dept}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Create Project Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in"
                        onClick={() => setIsCreateModalOpen(false)}
                    />
                    <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in border border-white/20">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Initiate New Project</h2>
                                <p className="text-slate-500 font-medium">Define project scope and departmental involvement</p>
                            </div>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors border border-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Project Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Next-Gen Mobile App"
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Scope & Description</label>
                                    <textarea
                                        rows={3}
                                        placeholder="Describe the project goals and expected outcomes..."
                                        className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Priority</label>
                                        <select className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium appearance-none">
                                            <option>LOW</option>
                                            <option selected>MEDIUM</option>
                                            <option>HIGH</option>
                                            <option>CRITICAL</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Deadline Date</label>
                                        <input
                                            type="date"
                                            className="w-full px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Assign Project Lead</label>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingNewLead(!isAddingNewLead)}
                                            className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-wider hover:underline"
                                        >
                                            {isAddingNewLead ? <X size={14} /> : <UserPlus size={14} />}
                                            {isAddingNewLead ? 'Cancel Adding' : 'Add New Member'}
                                        </button>
                                    </div>

                                    {isAddingNewLead ? (
                                        <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Lead Name</label>
                                                    <input
                                                        type="text"
                                                        value={newLeadName}
                                                        onChange={(e) => setNewLeadName(e.target.value)}
                                                        placeholder="e.g. John Doe"
                                                        className="w-full px-5 py-3 bg-white rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Department</label>
                                                    <select
                                                        value={newLeadDept}
                                                        onChange={(e) => setNewLeadDept(e.target.value)}
                                                        className="w-full px-5 py-3 bg-white rounded-xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-bold appearance-none"
                                                    >
                                                        <option value="">Select Department</option>
                                                        <option>IT</option>
                                                        <option>Engineering</option>
                                                        <option>Finance</option>
                                                        <option>HR</option>
                                                        <option>Marketing</option>
                                                        <option>Operations</option>
                                                        <option>Legal</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleAddNewLead}
                                                className="w-full py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                                            >
                                                <Save size={14} /> Save & Select Lead
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {departmentHeads.map((head) => (
                                                <div
                                                    key={head.id}
                                                    onClick={() => setSelectedHead(head.id)}
                                                    className={`p-4 rounded-[1.5rem] border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedHead === head.id
                                                            ? 'bg-primary/5 border-primary shadow-lg shadow-primary/5 scale-[1.02]'
                                                            : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${selectedHead === head.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                                                        }`}>
                                                        {head.avatar}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-sm font-black truncate ${selectedHead === head.id ? 'text-primary' : 'text-slate-800'}`}>
                                                            {head.name}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight truncate">
                                                            {head.dept}
                                                        </p>
                                                    </div>
                                                    {selectedHead === head.id && (
                                                        <CheckCircle2 size={16} className="text-primary" />
                                                    )}
                                                </div>
                                            ))}

                                            <div
                                                onClick={() => setIsAddingNewLead(true)}
                                                className="p-4 rounded-[1.5rem] border-2 border-dashed border-slate-200 cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all flex items-center justify-center gap-3 group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                    <Plus size={20} />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Add New Member</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Involved Departments</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['IT', 'HR', 'Finance', 'Engineering', 'Marketing', 'Sales', 'Legal'].map(dept => (
                                            <label key={dept} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all group">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20" />
                                                <span className="text-sm font-bold text-slate-600 group-hover:text-primary">{dept}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="flex-1 py-4 px-6 bg-white rounded-2xl text-slate-600 font-bold border border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                            >
                                Cancel
                            </button>
                            <button className="flex-2 py-4 px-10 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary-hover hover:-translate-y-1 transition-all active:translate-y-0">
                                Launch Project
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
                    animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
            `}</style>
        </Shell>
    );
}
