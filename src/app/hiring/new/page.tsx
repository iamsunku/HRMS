'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { ArrowLeft, Save, Briefcase, MapPin, DollarSign, Users, Calendar, AlignLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function CreateJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: 'On-site',
        type: 'FULL_TIME',
        experience: '',
        budgetMin: '',
        budgetMax: '',
        description: '',
        requirements: '',
        openingDate: '',
        status: 'ACTIVE'
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
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    budget: `${formData.budgetMin} - ${formData.budgetMax} LPA`,
                    postedDate: new Date().toISOString()
                })
            });

            const data = await res.json();
            if (data.success) {
                router.push('/hiring');
            } else {
                alert('Error creating job: ' + data.error);
            }
        } catch (err: any) {
            alert('Failed to connect to server: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Shell title="Create New Job Opening">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <div className="mr-2 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        Back to Jobs
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                <Briefcase className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Job Details</h2>
                                <p className="text-sm text-gray-500">Post a new opening to start collecting candidates.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        <div className="space-y-10">
                            {/* Role Information */}
                            <section>
                                <div className="flex items-center space-x-2 text-purple-900 mb-6">
                                    <Users className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Role Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Input
                                        label="Job Title *"
                                        name="title"
                                        required
                                        placeholder="e.g. Senior Product Designer"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Department *"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Department...' },
                                            { value: 'Engineering', label: 'Engineering' },
                                            { value: 'Design', label: 'Design' },
                                            { value: 'Marketing', label: 'Marketing' },
                                            { value: 'Sales', label: 'Sales' },
                                            { value: 'HR', label: 'Human Resources' },
                                        ]}
                                    />
                                    <Select
                                        label="Employment Type"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'FULL_TIME', label: 'Full Time' },
                                            { value: 'PART_TIME', label: 'Part Time' },
                                            { value: 'CONTRACT', label: 'Contract' },
                                            { value: 'INTERNSHIP', label: 'Internship' },
                                        ]}
                                    />
                                    <Select
                                        label="Location Type"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'On-site', label: 'On-site' },
                                            { value: 'Remote', label: 'Remote' },
                                            { value: 'Hybrid', label: 'Hybrid' },
                                        ]}
                                    />
                                    <Input
                                        label="Experience Required"
                                        name="experience"
                                        placeholder="e.g. 3-5 Years"
                                        value={formData.experience}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Target Hiring Date"
                                        name="openingDate"
                                        type="date"
                                        value={formData.openingDate}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100"></div>

                            {/* Budget & Compensation */}
                            <section>
                                <div className="flex items-center space-x-2 text-purple-900 mb-6">
                                    <DollarSign className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Budget & Compensation</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Input
                                        label="Min Salary (Annual)"
                                        name="budgetMin"
                                        placeholder="e.g. 12,00,000"
                                        value={formData.budgetMin}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Max Salary (Annual)"
                                        name="budgetMax"
                                        placeholder="e.g. 18,00,000"
                                        value={formData.budgetMax}
                                        onChange={handleChange}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100"></div>

                            {/* Description */}
                            <section>
                                <div className="flex items-center space-x-2 text-purple-900 mb-6">
                                    <AlignLeft className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Role Description</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="w-full">
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Job Description</label>
                                        <textarea
                                            name="description"
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                                            placeholder="Enter detailed job description..."
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Requirements</label>
                                        <textarea
                                            name="requirements"
                                            rows={4}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                                            placeholder="List key requirements..."
                                            value={formData.requirements}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading}
                                icon={<Save className="h-4 w-4" />}
                                className="px-6 bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200"
                            >
                                Publish Job
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Shell>
    );
}
