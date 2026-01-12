'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { ArrowLeft, Save, User, Briefcase, Calendar, CreditCard, Mail, Phone, Users } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function AddEmployeePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        employeeCode: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        departmentId: '',
        designation: '',
        joiningDate: '',
        gender: 'MALE',
        employmentType: 'FULL_TIME',
        currentSalary: '',
        status: 'ACTIVE',
    });

    const [departments, setDepartments] = useState<{ _id: string, name: string }[]>([]);

    useEffect(() => {
        const fetchDepts = async () => {
            try {
                const res = await fetch('/api/departments');
                const data = await res.json();
                if (data.success) {
                    setDepartments(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch departments:', err);
            }
        };
        fetchDepts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to create employee');
            }

            router.push('/employees');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Shell title="Add New Employee">
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <div className="mr-2 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        Back to Directory
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Users className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Employee Details</h2>
                                <p className="text-sm text-gray-500">Enter the personal and professional details of the new employee.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8">
                        {error && (
                            <div className="mb-8 bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-100 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <div className="space-y-10">
                            {/* Personal Information */}
                            <section>
                                <div className="flex items-center space-x-2 text-blue-900 mb-6">
                                    <User className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Personal Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Input
                                        label="First Name *"
                                        name="firstName"
                                        required
                                        placeholder="e.g. John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Last Name *"
                                        name="lastName"
                                        required
                                        placeholder="e.g. Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Email Address *"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="john.doe@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Employee ID *"
                                        name="employeeCode"
                                        required
                                        placeholder="e.g. EMP001"
                                        value={formData.employeeCode}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'MALE', label: 'Male' },
                                            { value: 'FEMALE', label: 'Female' },
                                            { value: 'OTHER', label: 'Other' }
                                        ]}
                                    />
                                </div>
                            </section>

                            <div className="border-t border-gray-100"></div>

                            {/* Employment Details */}
                            <section>
                                <div className="flex items-center space-x-2 text-blue-900 mb-6">
                                    <Briefcase className="h-5 w-5 opacity-70" />
                                    <h3 className="text-sm font-bold uppercase tracking-wider">Employment Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <Select
                                        label="Department *"
                                        name="departmentId"
                                        required
                                        value={formData.departmentId}
                                        onChange={handleChange}
                                        options={[
                                            { value: '', label: 'Select Department' },
                                            ...departments.map(d => ({ value: d._id, label: d.name }))
                                        ]}
                                    />
                                    <Input
                                        label="Designation *"
                                        name="designation"
                                        required
                                        placeholder="e.g. Senior Developer"
                                        value={formData.designation}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
                                    <Input
                                        label="Joining Date *"
                                        name="joiningDate"
                                        type="date"
                                        required
                                        value={formData.joiningDate}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        label="Employment Type"
                                        name="employmentType"
                                        value={formData.employmentType}
                                        onChange={handleChange}
                                        options={[
                                            { value: 'FULL_TIME', label: 'Full Time' },
                                            { value: 'PART_TIME', label: 'Part Time' },
                                            { value: 'CONTRACT', label: 'Contract' },
                                            { value: 'INTERN', label: 'Intern' },
                                        ]}
                                    />
                                    <Input
                                        label="Current Salary (Annual) *"
                                        name="currentSalary"
                                        type="number"
                                        required
                                        placeholder="0.00"
                                        value={formData.currentSalary}
                                        onChange={handleChange}
                                    />
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
                                className="px-6 bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-200"
                            >
                                Save Employee
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Shell>
    );
}
