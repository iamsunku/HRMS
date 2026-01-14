"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { User, Mail, Shield, MoreHorizontal, Download, UserPlus, Lock, Search, Filter, ShieldCheck, Briefcase, Users } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { useUser } from '@/hooks/useUser';

interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    employeeCode: string;
    designation: string;
    department: string;
    status: string;
    joiningDate: string;
}

const MOCK_EMPLOYEES: Employee[] = [
    { _id: '1', firstName: 'Rahul', lastName: 'Vikram', email: 'rahul.v@kiccpa.com', employeeCode: 'ID-482-91', designation: 'Systems Lead', department: 'Engineering', status: 'ACTIVE', joiningDate: '2023-01-15' },
    { _id: '2', firstName: 'Priya', lastName: 'Patel', email: 'priya.p@kiccpa.com', employeeCode: 'ID-482-02', designation: 'HR Director', department: 'Operations', status: 'ACTIVE', joiningDate: '2023-02-10' },
    { _id: '3', firstName: 'Sneha', lastName: 'L.', email: 'sneha.l@kiccpa.com', employeeCode: 'ID-482-15', designation: 'Senior UX Architect', department: 'Design', status: 'ACTIVE', joiningDate: '2023-03-05' },
];

export default function EmployeesPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [usingMockData, setUsingMockData] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(25);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { user } = useUser();

    const isAuthorized = true; // For demonstration

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/employees?page=${page}&limit=${limit}`);
                const data = await res.json();
                if (data.success) {
                    setEmployees(data.data);
                    setTotal(data.meta?.total ?? data.data.length);
                    setTotalPages(data.meta?.totalPages ?? 1);
                } else throw new Error();
            } catch (err) {
                setEmployees(MOCK_EMPLOYEES);
                setUsingMockData(true);
                setTotal(MOCK_EMPLOYEES.length);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [page]);

    return (
        <Shell title="Personnel Repository">
            <div className="p-4 md:p-8 space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">

                {/* Tactical Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Personnel</h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">Authorized workforce directory & resource allocation.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search personnel..."
                                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-50 transition-all outline-none"
                            />
                        </div>
                        <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Analytical Banner */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                        <div className="relative z-10 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Total Personnel</p>
                                <h3 className="text-4xl font-black">{total}</h3>
                                <p className="text-[10px] font-bold text-emerald-400 mt-2 uppercase tracking-widest">+4 This Quarter</p>
                            </div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Users size={32} className="text-white/80" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Resource Utilization</p>
                            <h3 className="text-3xl font-bold text-slate-900">84.2%</h3>
                            <div className="h-1.5 w-32 bg-slate-100 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-blue-600 w-[84%]" />
                            </div>
                        </div>
                        <ShieldCheck size={40} className="text-blue-600/20" />
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Regional Hubs</p>
                            <h3 className="text-3xl font-bold text-slate-900">03</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wide italic">Verified Locations</p>
                        </div>
                        <Briefcase size={40} className="text-slate-200" />
                    </div>
                </div>

                {/* Personnel Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {employees.map((emp) => (
                        <div key={emp._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center font-black text-lg group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                                    {emp.firstName[0]}{emp.lastName[0]}
                                </div>
                                <div className="flex bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{emp.firstName} {emp.lastName}</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{emp.designation}</p>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <Mail size={14} />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-600 truncate">{emp.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <Shield size={14} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{emp.employeeCode}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={() => router.push(`/employees/${emp._id}`)}
                                    className="w-full py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300"
                                >
                                    Access Profile Dossier
                                </button>
                            </div>
                        </div>
                    ))}

                    {isAuthorized && (
                        <button
                            onClick={() => router.push('/employees/new')}
                            className="bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 p-8 hover:bg-slate-50 hover:border-slate-300 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <UserPlus size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-900">Commission Personnel</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Expand Resource Capacity</p>
                            </div>
                        </button>
                    )}
                </div>

                {/* Pagination Protocol */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying Buffer: {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}</p>
                    <div className="flex items-center gap-4">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all"
                        >
                            Previous Node
                        </button>
                        <span className="text-xs font-black text-slate-900">Tier {page} of {totalPages}</span>
                        <button
                            disabled={page >= totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 disabled:opacity-50 transition-all"
                        >
                            Next Node
                        </button>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
