"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    UserPlus,
    Briefcase,
    Monitor,
    TicketCheck,
    CalendarClock,
    ReceiptIndianRupee,
    TrendingUp,
    PieChart,
    Settings,
    ShieldCheck,
    ChevronLeft,
    LogOut,
    Wallet,
    Building2,
    MessageSquare,
    X,
    User,
    FileText,
    Target,
    Megaphone,
    Layers,
    History,
    ClipboardList
} from 'lucide-react';
import styles from './Sidebar.module.css';

import Image from 'next/image';
import { useUser } from '@/hooks/useUser';

const menuConfigs: Record<string, any[]> = {
    EMPLOYEE: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: User, label: 'My Profile', href: '/profile' },
        { icon: CalendarClock, label: 'Attendance', href: '/attendance' },
        { icon: ClipboardList, label: 'Leave Management', href: '/leaves' },
        { icon: Wallet, label: 'Payroll', href: '/payroll' },
        { icon: Target, label: 'Tasks & OKRs', href: '/tasks' },
        { icon: Megaphone, label: 'Announcements', href: '/announcements' },
        { icon: FileText, label: 'Policies & Documents', href: '/policies' },
        { icon: MessageSquare, label: 'Help / Support', href: '/helpdesk' },
    ],
    ADMIN: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: Users, label: 'Employees', href: '/employees' },
        { icon: Building2, label: 'Departments', href: '/departments' },
        { icon: CalendarClock, label: 'Attendance Management', href: '/attendance' },
        { icon: ShieldCheck, label: 'Leave Approvals', href: '/leaves' },
        { icon: Briefcase, label: 'Onboarding', href: '/onboarding' },
        { icon: Monitor, label: 'Assets Management', href: '/assets' },
        { icon: PieChart, label: 'Reports', href: '/reports' },
    ],
    DEPARTMENT_HEAD: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: Users, label: 'Employees', href: '/employees' },
        { icon: Building2, label: 'Departments', href: '/departments' },
        { icon: CalendarClock, label: 'Attendance Management', href: '/attendance' },
        { icon: ShieldCheck, label: 'Leave Approvals', href: '/leaves' },
        { icon: Briefcase, label: 'Onboarding', href: '/onboarding' },
        { icon: Monitor, label: 'Assets Management', href: '/assets' },
        { icon: PieChart, label: 'Reports', href: '/reports' },
    ],
    HR_MANAGER: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: UserPlus, label: 'Hiring', href: '/hiring' },
        { icon: Users, label: 'Employees', href: '/employees' },
        { icon: Briefcase, label: 'Onboarding', href: '/onboarding' },
        { icon: CalendarClock, label: 'Attendance', href: '/attendance' },
        { icon: ClipboardList, label: 'Leave Management', href: '/leaves' },
        { icon: Wallet, label: 'Payroll', href: '/payroll' },
        { icon: TrendingUp, label: 'Excellence Matrix', href: '/performance' },
        { icon: FileText, label: 'Policies & Documents', href: '/policies' },
        { icon: Megaphone, label: 'Engagement', href: '/announcements' },
        { icon: PieChart, label: 'Reports & Compliance', href: '/reports' },
    ],
    SUPER_ADMIN: [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
        { icon: Building2, label: 'Institutions', href: '/institutions' },
        { icon: Users, label: 'Users & Roles', href: '/users' },
        { icon: Layers, label: 'All Modules Access', href: '/modules' },
        { icon: Wallet, label: 'Billing & Plans', href: '/billing' },
        { icon: Settings, label: 'System Configuration', href: '/config' },
        { icon: History, label: 'Audit Logs', href: '/audit' },
    ]
};

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useUser();

    // Select menu based on role, fallback to EMPLOYEE
    const roleKey = user?.role?.toUpperCase() || 'EMPLOYEE';
    const currentMenu = menuConfigs[roleKey] || menuConfigs.EMPLOYEE;

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/kam_logo.jpg"
                        alt="Kam Global Logo"
                        width={170}
                        height={80}
                        className={styles.logoImage}
                        priority
                    />
                </Link>
                <button className={styles.closeTrigger} onClick={onClose} aria-label="Close Menu">
                    <X size={24} />
                </button>
            </div>

            <nav className={styles.nav}>
                <div className={styles.sectionLabel}>MAIN MENU</div>
                {currentMenu.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onClose}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                        >
                            <div className={styles.iconWrapper}>
                                <Icon size={20} />
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
                {/* System Menu Items appended directly to nav for unified scrolling */}
                <div className={styles.sectionLabel} style={{ marginTop: '1rem' }}>SYSTEM</div>

                <Link
                    href="/settings"
                    className={`${styles.navItem} ${pathname === '/settings' ? styles.active : ''}`}
                    onClick={onClose}
                >
                    <div className={styles.iconWrapper}>
                        <Settings size={20} />
                    </div>
                    <span>Settings</span>
                </Link>

                <button
                    className={styles.navItem}
                    onClick={() => {
                        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = '/login';
                    }}
                >
                    <div className={styles.iconWrapper}>
                        <LogOut size={20} />
                    </div>
                    <span>Logout</span>
                </button>
            </nav>
        </aside>
    );
}
