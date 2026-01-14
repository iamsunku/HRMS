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
    X
} from 'lucide-react';
import styles from './Sidebar.module.css';

import Image from 'next/image';
import { useUser } from '@/hooks/useUser';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: UserPlus, label: 'Hiring', href: '/hiring' },
    { icon: Users, label: 'Employees', href: '/employees' },
    { icon: Building2, label: 'Departments', href: '/departments' },
    { icon: Briefcase, label: 'Onboarding', href: '/onboarding' },
    { icon: Monitor, label: 'Asset Management', href: '/assets' },
    { icon: TicketCheck, label: 'IT Helpdesk', href: '/helpdesk' },
    { icon: CalendarClock, label: 'Attendance & Leave', href: '/attendance' },
    { icon: ReceiptIndianRupee, label: 'Payroll', href: '/payroll' },
    { icon: TrendingUp, label: 'Performance', href: '/performance' },
    { icon: Wallet, label: 'Finance & Budget', href: '/finance' },
    { icon: PieChart, label: 'Reports & Analytics', href: '/reports' },
    { icon: Briefcase, label: 'Projects', href: '/projects' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user } = useUser();

    const filteredMenu = menuItems.filter(item => {
        if (user?.role === 'SUPER_ADMIN') return true;

        // Hide sensitive items from regular employees
        const restrictedItems = ['/finance', '/payroll', '/reports', '/assets'];
        if (user?.role === 'EMPLOYEE' && restrictedItems.includes(item.href)) {
            return false;
        }

        return true;
    });

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <div className={styles.logoContainer}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/HRM logo.png"
                        alt="KICCPA Logo"
                        width={65}
                        height={65}
                        className={styles.logoImage}
                    />
                    <span>KICCPA</span>
                </Link>
                <button className={styles.closeTrigger} onClick={onClose} aria-label="Close Menu">
                    <X size={24} />
                </button>
            </div>

            <nav className={styles.nav}>
                <div className={styles.sectionLabel}>MAIN MENU</div>
                {filteredMenu.map((item) => {
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
            </nav>

            <div className={styles.footer}>
                <Link href="/settings" className={styles.navItem}>
                    <div className={styles.iconWrapper}>
                        <Settings size={20} />
                    </div>
                    <span>Settings</span>
                </Link>
                <button
                    className={styles.logoutBtn}
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
            </div>
        </aside>
    );
}
