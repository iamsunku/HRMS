"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import {
    Plus, Search, Filter, MoreHorizontal,
    Briefcase, Users, IndianRupee,
    TrendingUp, Calendar, ArrowRight,
    Building2, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data for Hiring
const stats = [
    { label: 'Total Openings', value: '12', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { label: 'Active Candidates', value: '148', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Hiring Budget', value: '₹4.5 Cr', icon: IndianRupee, color: 'bg-orange-100 text-orange-600' },
];

const MOCK_JOBS = [
    { _id: '1', title: 'Senior Full Stack Developer', department: 'Engineering', location: 'Bangalore', type: 'Full-time', status: 'ACTIVE', candidates: 12, budget: '25-35 LPA', manager: 'Rahul Vikram', iconColor: 'bg-blue-600', posted: '2 days ago' },
    { _id: '2', title: 'Product UI/UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', status: 'ACTIVE', candidates: 8, budget: '18-24 LPA', manager: 'Sneha L.', iconColor: 'bg-pink-600', posted: '5 days ago' },
    { _id: '3', title: 'HR Manager', department: 'Operations', location: 'Mumbai', type: 'Full-time', status: 'DRAFT', candidates: 0, budget: '12-18 LPA', manager: 'Priya Patel', iconColor: 'bg-indigo-600', posted: '1 week ago' },
    { _id: '4', title: 'Growth Marketer', department: 'Marketing', location: 'Delhi', type: 'Contract', status: 'URGENT', candidates: 45, budget: '15-20 LPA', manager: 'Vikram Seth', iconColor: 'bg-orange-600', posted: '3 days ago' },
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
                console.error('API Error, using mock:', err);
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
        <Shell title="Hiring & Recruitment">
            <div className="space-y-8">
                {/* 1. Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={26} />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</div>
                                <div className="text-2xl font-black text-gray-900">
                                    {stat.label === 'Total Openings' ? jobs.length : stat.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DB Info Banner */}
                {usingMockData && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <p className="text-sm font-bold text-blue-700">Preview Mode Active: Showing sample job roles.</p>
                        </div>
                    </div>
                )}

                {/* 2. Controls & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-lg">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by title or department..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium text-gray-700 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-400 shadow-sm"
                        />
                    </div>
                    <div className="flex gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-5 py-3 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 outline-none focus:ring-4 focus:ring-blue-500/5 shadow-sm appearance-none cursor-pointer"
                        >
                            <option value="ALL">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="URGENT">Urgent</option>
                            <option value="DRAFT">Draft</option>
                        </select>
                        <button
                            onClick={() => router.push('/hiring/new')}
                            className="flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-xl text-sm font-extrabold shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all hover:scale-[1.02] active:scale-95"
                        >
                            <Plus size={18} />
                            <span>Create Job</span>
                        </button>
                    </div>
                </div>

                {/* 3. Job Cards Grid */}
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-100 border-t-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <div key={job._id || job.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`h-16 w-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg ${job.iconColor}`}>
                                            {job.title.charAt(0)}
                                        </div>
                                        <button className="h-10 w-10 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                                            <MoreHorizontal size={24} />
                                        </button>
                                    </div>

                                    <div className="mb-10">
                                        <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors">
                                            {job.title}
                                        </h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                            job.status === 'URGENT' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>

                                    <div className="space-y-4 mb-10">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-tighter text-[10px]">
                                                <Building2 size={16} className="text-blue-500/50" />
                                                <span>Department</span>
                                            </div>
                                            <span className="font-extrabold text-gray-900">{job.department}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-tighter text-[10px]">
                                                <Users size={16} className="text-purple-500/50" />
                                                <span>Hiring Manager</span>
                                            </div>
                                            <span className="font-extrabold text-gray-900">{job.manager}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-tighter text-[10px]">
                                                <IndianRupee size={16} className="text-green-500/50" />
                                                <span>Budget</span>
                                            </div>
                                            <span className="font-extrabold text-green-600">{job.budget}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-gray-900 -mb-1">{job.candidates}</span>
                                            <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Candidates</span>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/hiring/${job._id || job.id}`)}
                                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-blue-700 rounded-xl text-sm font-black hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                        >
                                            View Details <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                                <Search size={48} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">No roles match your search</h3>
                                <p className="text-gray-500">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Shell>
    );
}

