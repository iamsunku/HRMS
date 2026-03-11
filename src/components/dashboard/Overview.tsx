"use client";

import React from 'react';
import { useUser } from '@/hooks/useUser';
import SuperAdminOverview from './SuperAdminOverview';
import AdminOverview from './AdminOverview';
import HROverview from './HROverview';
import EmployeeOverview from './EmployeeOverview';

export default function Overview() {
    const { user, loading } = useUser();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing Intelligence...</p>
                </div>
            </div>
        );
    }

    // Role-based routing logic
    const userRole = user?.role?.toUpperCase();

    switch (userRole) {
        case 'SUPER_ADMIN':
            return <SuperAdminOverview />;
        case 'ADMIN':
        case 'DEPARTMENT_HEAD':
            return <AdminOverview />;
        case 'HR_MANAGER':
            return <HROverview />;
        case 'EMPLOYEE':
            return <EmployeeOverview />;
        default:
            // Fallback to Employee view or Super Admin if role is unknown
            return <EmployeeOverview />;
    }
}
