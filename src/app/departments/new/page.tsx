'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { ArrowLeft, Save, Building2, User, Wallet, Users, Target, Activity } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function CreateDepartmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        head: '',
        budget: '',
        status: 'Optimal',
        description: '',
        type: 'Core Operations'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulating API call
        setTimeout(() => {
            setLoading(false);
            alert('Department initialized successfully in the organizational matrix.');
            router.push('/departments');
        }, 1500);
    };

    return (
        <Shell title="Add New Department">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* 1. Cohesive Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <button
                                onClick={() => router.back()}
                                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-all"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Department</h1>
                        </div>
                        <p className="text-slate-500 font-medium text-sm ml-9">Establish a new organizational team and define its operational scope.</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                    {/* Form Section Header */}
                    <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/50">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Department Matrix</h2>
                                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1">Primary Configuration</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-10">
                        <div className="space-y-12">
                            {/* Core Identity */}
                            <section>
                                <div className="flex items-center space-x-2 text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Department Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <Input
                                        label="Department Name *"
                                        name="name"
                                        required
                                        placeholder="e.g. Cognitive Systems Engineering"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Department Category *"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Core Operations', label: 'Core Operations' },
                                            { value: 'Academic Excellence', label: 'Academic Excellence' },
                                            { value: 'Ai & Digital Media', label: 'Ai & Digital Media' },
                                            { value: 'Strategic Leadership', label: 'Strategic Leadership' },
                                            { value: 'Student Support', label: 'Student Support' },
                                        ]}
                                    />
                                    <Input
                                        label="Department Head *"
                                        name="head"
                                        required
                                        placeholder="Enter head name..."
                                        value={formData.head}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Operational Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'Optimal', label: 'Optimal' },
                                            { value: 'Scaling', label: 'Scaling' },
                                            { value: 'Resource Gap', label: 'Resource Gap' },
                                            { value: 'Archived', label: 'Archived' },
                                        ]}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-slate-50"></div>

                            {/* Resource Allocation */}
                            <section>
                                <div className="flex items-center space-x-2 text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">Budget & Money</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                    <Input
                                        label="Yearly Budget (₹)"
                                        name="budget"
                                        placeholder="e.g. 5.5 Cr"
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                    <div className="flex items-end pb-2">
                                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 w-full flex items-center gap-3">
                                            <Target className="text-emerald-600" size={20} />
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest leading-relaxed">
                                                Funds will be deducted from the primary operational pool upon authorization.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-slate-50"></div>

                            {/* Strategic Vision */}
                            <section>
                                <div className="flex items-center space-x-2 text-slate-900 mb-8 border-l-4 border-indigo-500 pl-4">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em]">About the Department</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-full">
                                        <label className="mb-2 block text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-300 font-medium"
                                            placeholder="Enter a short description about this department..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                            >
                                Abort
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                icon={<Save className="h-4 w-4" />}
                                className="px-10 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-blue-600 transition-all"
                            >
                                Create Department
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Shell>
    );
}
