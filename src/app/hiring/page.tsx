"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import {
    Plus, Search, Filter, MoreHorizontal,
    Briefcase, Users, IndianRupee,
    TrendingUp, Calendar, ArrowRight,
    Building2, MapPin, Zap, Activity,
    Target, Clock, FileText, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const stats = [
    { label: 'Active Opportunities', value: '12', trend: '+2 this month', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Talent Pipeline', value: '148', trend: '12 new today', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Resource Allocation', value: '₹4.5 Cr', trend: '85% utilized', icon: IndianRupee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const MOCK_JOBS = [
    { _id: '1', title: 'Senior Full Stack Developer', department: 'Engineering', location: 'Bangalore', type: 'Full-time', status: 'ACTIVE', candidates: 12, budget: '25-35 LPA', manager: 'Rahul Vikram', iconColor: 'bg-blue-600', posted: '2 days ago' },
    { _id: '2', title: 'Product UI/UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', status: 'ACTIVE', candidates: 8, budget: '18-24 LPA', manager: 'Sneha L.', iconColor: 'bg-indigo-600', posted: '5 days ago' },
    { _id: '3', title: 'HR Manager', department: 'Operations', location: 'Mumbai', type: 'Full-time', status: 'DRAFT', candidates: 0, budget: '12-18 LPA', manager: 'Priya Patel', iconColor: 'bg-slate-600', posted: '1 week ago' },
    { _id: '4', title: 'Growth Marketer', department: 'Marketing', location: 'Delhi', type: 'Contract', status: 'URGENT', candidates: 45, budget: '15-20 LPA', manager: 'Vikram Seth', iconColor: 'bg-amber-600', posted: '3 days ago' },
];

export default function HiringPage() {
    const router = useRouter();
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [usingMockData, setUsingMockData] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/jobs');
                const data = await res.json();
                if (data.success) {
                    setJobs(data.data);
                    setUsingMockData(false);
                } else {
                    throw new Error(data.error);
                }
            } catch (err) {
                setJobs(MOCK_JOBS);
                setUsingMockData(true);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || job.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <Shell title="Recruitment Strategy">
            <div className="p-4 md:p-8 space-y-6 animate-fade-in max-w-[1400px] mx-auto pb-20">

                {/* Executive Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Talent Acquisition</span>
                            <div className="w-1 h-1 rounded-full bg-blue-600" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Operations</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hiring Console</h2>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2">
                            <FileText size={16} /> Analytics Report
                        </button>
                        <button
                            onClick={() => router.push('/hiring/new')}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <Plus size={16} /> Create Opportunity
                        </button>
                    </div>
                </div>

                {/* Analytical Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-slate-900">{stat.label === 'Active Opportunities' ? jobs.length : stat.value}</h3>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} shadow-inner`}>
                                    <stat.icon size={18} />
                                </div>
                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{stat.trend}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Operational Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/50 p-2 rounded-2xl backdrop-blur-sm border border-white/20 shadow-sm">
                    <div className="relative flex-1 w-full md:max-w-md group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search roles or units..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-slate-700 placeholder:font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-48">
                            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/5 appearance-none cursor-pointer"
                            >
                                <option value="ALL">All Status</option>
                                <option value="ACTIVE">Active Only</option>
                                <option value="URGENT">Critical Need</option>
                                <option value="DRAFT">Archived/Draft</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Opportunity Grid */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div key={job._id || job.id} className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col h-full gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-12 h-12 rounded-xl ${job.iconColor} text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-slate-100 group-hover:scale-105 transition-transform`}>
                                            {job.title.charAt(0)}
                                        </div>
                                        <StatusBadge status={job.status} />
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {job.title}
                                        </h3>
                                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-1.5">{job.department}</p>
                                    </div>

                                    <div className="space-y-3 py-4 border-y border-slate-50">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Target size={10} /> Lead</span>
                                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[100px]">{job.manager}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={10} /> Base</span>
                                            <span className="text-[10px] font-bold text-slate-700">{job.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><IndianRupee size={10} /> CTC</span>
                                            <span className="text-[10px] font-bold text-emerald-600">{job.budget}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between pt-1">
                                        <div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-bold text-slate-900">{job.candidates}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Apps</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/hiring/${job._id || job.id}`)}
                                            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                                        >
                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                                <Search size={40} className="mx-auto text-slate-200 mb-4" />
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Operational Deficit</h3>
                                <p className="text-xs text-slate-500 font-medium">No talent opportunities match the current filtered parameters.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); }}
                                    className="mt-6 px-6 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    Reset Strategy
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Shell>
    );
}

const StatusBadge = ({ status }: { status: string }) => {
    const dots: Record<string, string> = {
        ACTIVE: 'bg-emerald-500',
        URGENT: 'bg-amber-500',
        DRAFT: 'bg-slate-400',
        CLOSED: 'bg-rose-500'
    };

    return (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-100 rounded-md">
            <div className={`w-1.5 h-1.5 rounded-full ${dots[status] || 'bg-slate-400'} shadow-sm`} />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{status}</span>
        </div>
    );
};
