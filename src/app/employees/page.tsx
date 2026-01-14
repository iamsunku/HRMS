"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Shell from "@/components/layout/Shell";
import { User, Mail, Shield, MoreHorizontal, Download, UserPlus, Grid, List, Lock } from 'lucide-react';
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
    { _id: '1', firstName: 'Rahul', lastName: 'Vikram', email: 'rahul.v@kiccpa.com', employeeCode: 'EMP001', designation: 'Senior Developer', department: 'Engineering', status: 'ACTIVE', joiningDate: '2023-01-15' },
    { _id: '2', firstName: 'Priya', lastName: 'Patel', email: 'priya.p@kiccpa.com', employeeCode: 'EMP002', designation: 'HR Manager', department: 'Human Resources', status: 'ACTIVE', joiningDate: '2023-02-10' },
    { _id: '3', firstName: 'Sneha', lastName: 'L.', email: 'sneha.l@kiccpa.com', employeeCode: 'EMP003', designation: 'Product Designer', department: 'Design', status: 'ACTIVE', joiningDate: '2023-03-05' },
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

    const isAuthorized = user?.role === 'SUPER_ADMIN' || user?.role === 'ADMIN';

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
                    setUsingMockData(false);
                } else {
                    throw new Error(data.error);
                }
            } catch (err: any) {
                console.error('Failed to fetch employees, using mock data:', err);
                setEmployees(MOCK_EMPLOYEES);
                setUsingMockData(true);
                setTotal(MOCK_EMPLOYEES.length);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [page, limit]);

    if (loading) {
        return (
            <Shell title="Employee Directory">
                <div className="flex h-64 items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
                        <div className="text-gray-500 font-medium">Loading directory...</div>
                    </div>
                </div>
            </Shell>
        );
    }

    return (
        <Shell title="Employee Directory">
            <div className="space-y-6">
                {/* Warning Banner if DB fails */}
                {usingMockData && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-sm font-bold text-amber-800">Database Offline (Preview Mode)</p>
                                <p className="text-xs text-amber-600 mt-0.5">We're showing sample data because the MongoDB Atlas connection timed out (IP whitelist issue). Check your .env or Atlas settings.</p>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none shadow-none text-[10px]"
                            onClick={() => window.location.reload()}
                        >
                            Reconnect
                        </Button>
                    </div>
                )}

                {/* Header Stats & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex items-center gap-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                                <User size={18} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Headcount</div>
                                <div className="text-xl font-bold text-gray-900">{total}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {isAuthorized && (
                            <Button
                                variant="secondary"
                                icon={<Download size={18} />}
                                className="hidden sm:flex"
                                onClick={() => alert('Exporting employee directory to CSV...')}
                            >
                                Export CSV
                            </Button>
                        )}
                        {isAuthorized && (
                            <Button
                                onClick={() => router.push('/employees/new')}
                                icon={<UserPlus size={18} />}
                                className="bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200"
                            >
                                Add Employee
                            </Button>
                        )}
                        {!isAuthorized && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-400">
                                <Lock size={14} />
                                <span>Directory Access Only</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Employee Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {employees.map((emp) => (
                        <div key={emp._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-14 w-14 rounded-xl bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                        {emp.firstName?.[0]}{emp.lastName?.[0]}
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{emp.firstName} {emp.lastName}</h3>
                                    <div className="text-sm text-gray-500 mb-1">{emp.designation}</div>
                                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                        {emp.department || 'General'}
                                    </span>
                                </div>

                                <div className="space-y-2.5 mb-5">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Mail size={14} className="text-gray-400" />
                                        <span className="truncate">{emp.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Shield size={14} className="text-gray-400" />
                                        <span>{emp.employeeCode}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${emp.status === 'ACTIVE'
                                        ? 'bg-green-50 text-green-700'
                                        : 'bg-gray-50 text-gray-600'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${emp.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'
                                            }`}></span>
                                        {emp.status}
                                    </span>
                                    <button
                                        onClick={() => router.push(`/employees/${emp._id}`)}
                                        className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {employees.length === 0 && (
                        <div className="col-span-full py-16 text-center">
                            <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                                <User size={48} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No employees found</h3>
                            <p className="text-gray-500 mt-1 mb-6">Get started by adding your first employee to the directory.</p>
                            <Button
                                onClick={() => router.push('/employees/new')}
                                icon={<UserPlus size={18} />}
                                className="bg-purple-600 text-white"
                            >
                                Add Employee
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-600">Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}</div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Prev
                        </Button>
                        <div className="px-3 text-sm">Page {page} of {totalPages}</div>
                        <Button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page >= totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
