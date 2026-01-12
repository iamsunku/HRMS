'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { ArrowLeft, Edit2, Mail, Phone, MapPin, Calendar, Briefcase, Award, GraduationCap, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock data for the profile
const mockEmployee = {
    _id: 'emp_001',
    firstName: 'Arjun',
    lastName: 'Sharma',
    email: 'arjun.sharma@kiccpa.com',
    phone: '+91 98765 43210',
    designation: 'Senior Full Stack Developer',
    department: 'Engineering',
    joiningDate: '2023-03-15',
    status: 'Active',
    employeeCode: 'KIC-0042',
    location: 'Bangalore, India',
    manager: 'Rahul Vikram',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
};

export default function EmployeeProfilePage() {
    const router = useRouter();
    const params = useParams();
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Shell title="Employee Profile">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <div className="mr-2 rounded-full p-1 group-hover:bg-blue-50 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                    </div>
                    Back to Directory
                </button>

                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
                    <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="flex items-end">
                                <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
                                    <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-400">
                                        {mockEmployee.firstName[0]}{mockEmployee.lastName[0]}
                                    </div>
                                </div>
                                <div className="ml-6 mb-1">
                                    <h1 className="text-2xl font-bold text-gray-900">{mockEmployee.firstName} {mockEmployee.lastName}</h1>
                                    <p className="text-gray-500 font-medium">{mockEmployee.designation} • {mockEmployee.department}</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mb-1">
                                <Button variant="outline" icon={<Mail size={16} />}>
                                    Message
                                </Button>
                                <Button
                                    icon={<Edit2 size={16} />}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            {['overview', 'documents', 'assets', 'history'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Contact & Info</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-gray-500">Email Address</div>
                                        <div className="font-medium text-gray-900">{mockEmployee.email}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-gray-500">Phone</div>
                                        <div className="font-medium text-gray-900">{mockEmployee.phone}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-gray-500">Location</div>
                                        <div className="font-medium text-gray-900">{mockEmployee.location}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                                    <div>
                                        <div className="text-gray-500">Joining Date</div>
                                        <div className="font-medium text-gray-900">{new Date(mockEmployee.joiningDate).toLocaleDateString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {mockEmployee.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Employment Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                            <Briefcase size={18} />
                                        </div>
                                        <span className="font-medium text-gray-900">Information</span>
                                    </div>
                                    <div className="space-y-2 text-sm ml-11">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Employee ID</span>
                                            <span className="font-medium text-gray-900">{mockEmployee.employeeCode}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Department</span>
                                            <span className="font-medium text-gray-900">{mockEmployee.department}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Reporting To</span>
                                            <span className="font-medium text-gray-900">{mockEmployee.manager}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                            <Award size={18} />
                                        </div>
                                        <span className="font-medium text-gray-900">Performance</span>
                                    </div>
                                    <div className="space-y-2 text-sm ml-11">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Last Review</span>
                                            <span className="font-medium text-gray-900">Oct 2024</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Rating</span>
                                            <span className="font-medium text-green-600">4.8/5.0</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Status</span>
                                            <span className="font-medium text-green-600">Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-medium text-gray-900 mb-4">Current Projects</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs font-bold">K</div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">KICCPA HRM Revamp</div>
                                                <div className="text-xs text-gray-500">Frontend Development</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">In Progress</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h3>
                            <div className="relative pl-6 border-l-2 border-gray-100 space-y-8">
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm"></div>
                                    <div className="text-sm font-medium text-gray-900">Promotion to Senior Developer</div>
                                    <div className="text-xs text-gray-500 mt-1">October 1, 2024</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-gray-300"></div>
                                    <div className="text-sm font-medium text-gray-900">Completed Annual Compliance Training</div>
                                    <div className="text-xs text-gray-500 mt-1">September 15, 2024</div>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[31px] top-0 h-4 w-4 rounded-full border-2 border-white bg-gray-300"></div>
                                    <div className="text-sm font-medium text-gray-900">Joined KICCPA</div>
                                    <div className="text-xs text-gray-500 mt-1">March 15, 2023</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
