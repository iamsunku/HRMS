'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import {
    ArrowLeft, Briefcase, MapPin, Users, Calendar,
    IndianRupee, Building2, UserCircle, Edit3,
    Trash2, CheckCircle2, Clock, MapPinned,
    Share2, ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Job {
    _id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    status: string;
    candidates: number;
    budget: string;
    manager: string;
    experience: string;
    description: string;
    requirements: string;
    postedDate: string;
    iconColor: string;
}

const MOCK_JOBS = [
    { _id: '1', title: 'Senior Full Stack Developer', department: 'Engineering', location: 'Bangalore', type: 'Full-time', status: 'ACTIVE', candidates: 12, budget: '25-35 LPA', manager: 'Rahul Vikram', experience: '5-8 Years', description: 'We are looking for a Senior Full Stack Developer to lead our core engineering team. You will be responsible for defining architecture, mentoring junior devs, and building scalable HR features.', requirements: '• 5+ years of experience with React/Next.js\n• Strong Node.js and MongoDB skills\n• Experience with AWS/Cloud deployments', postedDate: new Date().toISOString(), iconColor: 'bg-blue-600' },
    { _id: '2', title: 'Product UI/UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', status: 'ACTIVE', candidates: 8, budget: '18-24 LPA', manager: 'Sneha L.', experience: '3-5 Years', description: 'Join our design team to craft premium enterprise experiences. You will work closely with product managers to define user flows and aesthetic UI components.', requirements: '• Portfolio showcasing enterprise SaaS design\n• Proficiency in Figma\n• Understanding of front-end constraints', postedDate: new Date().toISOString(), iconColor: 'bg-pink-600' },
];

export default function JobDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const [job, setJob] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usingMock, setUsingMock] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`/api/jobs/${params.id}`);
                const data = await res.json();
                if (data.success) {
                    setJob(data.data);
                    setUsingMock(false);
                } else {
                    throw new Error(data.error);
                }
            } catch (err: any) {
                console.error('API Error, check mock fallback');
                const mock = MOCK_JOBS.find(j => j._id === params.id);
                if (mock) {
                    setJob(mock);
                    setUsingMock(true);
                } else {
                    setError('Job not found in database or preview mode.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchJob();
    }, [params.id]);

    if (loading) return (
        <Shell title="Job Details">
            <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            </div>
        </Shell>
    );

    if (error || !job) return (
        <Shell title="Job Details">
            <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-100">
                <p className="text-red-600 font-bold">Error: {error || 'Job not found'}</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        </Shell>
    );

    return (
        <Shell title="Job Details">
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">

                {/* Preview Mode Banner */}
                {usingMock && (
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-sm font-bold text-blue-800">Job Detail Preview</p>
                                <p className="text-xs text-blue-600 mt-0.5">Database connection is offline. Showing sample job descriptions.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <button
                            onClick={() => router.back()}
                            className="h-10 w-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 shadow-sm transition-all"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl font-black text-gray-900">{job.title}</h1>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${job.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                    job.status === 'URGENT' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {job.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                                <span className="flex items-center gap-1.5"><Building2 size={16} />{job.department}</span>
                                <span className="flex items-center gap-1.5"><MapPin size={16} />{job.location}</span>
                                <span className="flex items-center gap-1.5"><Clock size={16} />Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" icon={<Share2 size={18} />}>Share</Button>
                        <Button className="bg-[#1e3a8a] text-white shadow-xl shadow-blue-900/20" icon={<Edit3 size={18} />}>Edit Opening</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <CheckCircle2 className="text-blue-600" size={24} />
                                Job Overview
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {job.description || "No description provided."}
                            </div>
                        </div>

                        {/* Requirements Card */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <Users className="text-purple-600" size={24} />
                                Key Requirements
                            </h2>
                            <div className="prose prose-purple max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                {job.requirements || "No specific requirements listed."}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Summary */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-[#1e3a8a] text-white rounded-3xl p-8 shadow-2xl shadow-blue-900/40 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-6">Candidate Pipeline</h3>
                                <div className="text-5xl font-black mb-2">{job.candidates}</div>
                                <p className="text-blue-100 text-sm font-medium">Applied candidates for this role</p>
                                <Button className="w-full mt-8 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md" icon={<ExternalLink size={18} />}>
                                    View Applications
                                </Button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 text-white/5 opacity-50">
                                <Users size={180} />
                            </div>
                        </div>

                        {/* Details Sidebar */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-4">Job Particulars</h3>

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                        <Clock size={16} className="text-blue-500" />
                                        Employment
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{job.type.replace('_', ' ')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                        <Briefcase size={16} className="text-purple-500" />
                                        Experience
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{job.experience || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                        <IndianRupee size={16} className="text-green-500" />
                                        Budget
                                    </div>
                                    <span className="text-sm font-black text-gray-900 text-green-600">{job.budget || 'Competitive'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                        <UserCircle size={16} className="text-orange-500" />
                                        Hiring Manager
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{job.manager || 'Recruitment Team'}</span>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-gray-400 font-bold text-xs uppercase tracking-wider">
                                        <MapPinned size={16} className="text-red-500" />
                                        Location Type
                                    </div>
                                    <span className="text-sm font-black text-gray-900">{job.location === 'Remote' ? 'Remote' : 'On-Site'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-red-50 rounded-3xl p-6 border border-red-100">
                            <h3 className="text-sm font-bold text-red-700 mb-4">Management Actions</h3>
                            <button className="flex items-center gap-3 w-full text-left text-sm font-bold text-red-500 hover:text-red-700 transition-colors">
                                <Trash2 size={18} />
                                Archive this opening
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
