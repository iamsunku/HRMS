"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import {
    Building2, Users, Wallet,
    MoreHorizontal, Plus, Search, Filter,
    User, ArrowRight, LayoutGrid, List
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data matching the image style
const departments = [
    {
        id: 1,
        name: 'Engineering',
        head: 'Rahul Vikram',
        headcount: 145,
        budget: '₹4.5 Cr',
        status: 'Stable',
        statusColor: 'bg-green-100 text-green-700',
        projects: 12,
        iconColor: 'bg-indigo-600'
    },
    {
        id: 2,
        name: 'Human Resources',
        head: 'Priya Patel',
        headcount: 12,
        budget: '₹1.2 Cr',
        status: 'Over Capacity',
        statusColor: 'bg-red-100 text-red-700',
        projects: 5,
        iconColor: 'bg-purple-600'
    },
    {
        id: 3,
        name: 'Product Design',
        head: 'Sneha L.',
        headcount: 24,
        budget: '₹2.8 Cr',
        status: 'Stable',
        statusColor: 'bg-green-100 text-green-700',
        projects: 8,
        iconColor: 'bg-blue-600'
    },
    {
        id: 4,
        name: 'Marketing',
        head: 'Vikram Seth',
        headcount: 38,
        budget: '₹3.5 Cr',
        status: 'Growing',
        statusColor: 'bg-blue-100 text-blue-700',
        projects: 15,
        iconColor: 'bg-pink-600'
    },
    {
        id: 5,
        name: 'Finance & Accounts',
        head: 'Anil Gupta',
        headcount: 15,
        budget: '₹1.8 Cr',
        status: 'Stable',
        statusColor: 'bg-green-100 text-green-700',
        projects: 4,
        iconColor: 'bg-orange-600'
    },
];

const stats = [
    { label: 'Total Departments', value: '08', icon: Building2, color: 'bg-purple-100 text-purple-600' },
    { label: 'Org Headcount', value: '1,248', icon: Users, color: 'bg-green-100 text-green-600' },
    { label: 'Annual Budget', value: '₹18.4 Cr', icon: Wallet, color: 'bg-orange-100 text-orange-600' },
];

export default function DepartmentsPage() {
    return (
        <Shell title="Department Management">
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
                                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. Controls & Search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-lg">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search departments..."
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-100 transition-all placeholder:text-gray-400"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition-transform active:scale-95">
                            <Plus size={18} />
                            <span>Add Department</span>
                        </button>
                    </div>
                </div>

                {/* 3. Departments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                        <div key={dept.id} className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 group">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md ${dept.iconColor}`}>
                                    {dept.name.charAt(0)}
                                </div>
                                <button className="text-gray-300 hover:text-gray-600 transition-colors">
                                    <MoreHorizontal size={24} />
                                </button>
                            </div>

                            {/* Title & Badge */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors">
                                    {dept.name}
                                </h3>
                                <span className={`inline-block px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${dept.statusColor}`}>
                                    {dept.status}
                                </span>
                            </div>

                            {/* Info Rows */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <User size={16} className="text-gray-300" />
                                        <span>Head</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{dept.head}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <Users size={16} className="text-gray-300" />
                                        <span>Headcount</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{dept.headcount}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <Wallet size={16} className="text-gray-300" />
                                        <span>Total Budget</span>
                                    </div>
                                    <span className="font-bold text-gray-900">{dept.budget}</span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                <div className="text-xs font-bold text-gray-400">
                                    <span className="text-gray-900 text-sm mr-1">{dept.projects}</span>
                                    Active Projects
                                </div>
                                <button className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:gap-2 transition-all">
                                    Manage <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Shell>
    );
}
