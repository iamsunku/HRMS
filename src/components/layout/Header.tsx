"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Bell,
    User,
    MessageSquare,
    X,
    Check,
    Download,
    Shield,
    Settings,
    LogOut,
    ChevronRight,
    Users,
    CreditCard
} from 'lucide-react';
import styles from './Header.module.css';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import ProfileDrawer from './ProfileDrawer';

interface HeaderProps {
    title: string;
}

const mockNotifications = [
    { id: 1, text: 'Budget exceeded for Operations dept.', time: '10m ago', type: 'alert' },
    { id: 2, text: 'New leave request from Priya Patel.', time: '1h ago', type: 'request' },
    { id: 3, text: 'Performance review cycle Q4 started.', time: '3h ago', type: 'info' },
];

export default function Header({ title }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [status, setStatus] = useState<'online' | 'away' | 'dnd'>('online');
    const { user, loading } = useUser();

    const profileRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileDropdown(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <h1>{title}</h1>
            </div>

            <div className={styles.right}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search operations, assets..." />
                    <Search size={18} />
                </div>

                <div className={styles.actions}>
                    <Link href="/messages" className={styles.iconBtn}>
                        <MessageSquare size={20} />
                        <span className={styles.badge}>3</span>
                    </Link>

                    {user?.role === 'SUPER_ADMIN' && (
                        <button
                            className={`${styles.iconBtn} ${styles.reportBtn}`}
                            onClick={() => alert('Generating comprehensive system report... Your download will start shortly.')}
                            title="Export System Report"
                        >
                            <Download size={20} />
                            <span className={styles.premiumLabel}>Reports</span>
                        </button>
                    )}

                    <div className={styles.notifWrapper} ref={notifRef}>
                        <button
                            className={styles.iconBtn}
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell size={20} />
                            <span className={styles.badge}>3</span>
                        </button>

                        {showNotifications && (
                            <div className={styles.notifDropdown}>
                                <div className={styles.notifHeader}>
                                    <h3>Notifications</h3>
                                    <button onClick={() => setShowNotifications(false)}><X size={16} /></button>
                                </div>
                                <div className={styles.notifList}>
                                    {mockNotifications.map((n) => (
                                        <div key={n.id} className={styles.notifItem}>
                                            <div className={`${styles.dot} ${styles[n.type]}`}></div>
                                            <div className={styles.notifContent}>
                                                <p>{n.text}</p>
                                                <span>{n.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.notifFooter}>
                                    <button>Mark all as read</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.profileWrapper} ref={profileRef}>
                        <div
                            className={`${styles.userProfile}`}
                            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <div className={styles.userInfo}>
                                <span className={styles.userName}>
                                    {user ? `${user.firstName} ${user.lastName}` : 'Sunku Kushwaha'}
                                </span>
                                <span className={`${styles.userRole} ${status === 'away' ? 'text-orange-500' : status === 'dnd' ? 'text-red-500' : ''}`}>
                                    {status === 'online' ? 'Active Now' : status === 'away' ? 'Away' : 'Do Not Disturb'}
                                </span>
                            </div>
                            <div className={styles.avatar}>
                                {user?.firstName ? user.firstName[0] : 'S'}
                            </div>
                        </div>

                        {showProfileDropdown && (
                            <div className={styles.profileDropdown}>
                                <div className={styles.dropdownHeader}>
                                    <div className={styles.dropdownAvatar}>
                                        {user?.firstName ? user.firstName[0] : 'S'}
                                    </div>
                                    <div className={styles.dropdownName}>
                                        {user ? `${user.firstName} ${user.lastName}` : 'Sunku Kushwaha'}
                                    </div>
                                    <div className={styles.dropdownRole}>
                                        {user ? user.role?.replace('_', ' ') : 'SUPER ADMIN'}
                                    </div>
                                </div>

                                <div className={styles.statusSelector}>
                                    <button
                                        className={`${styles.statusBtn} ${status === 'online' ? styles.active : ''}`}
                                        onClick={() => setStatus('online')}
                                    >
                                        Online
                                    </button>
                                    <button
                                        className={`${styles.statusBtn} ${status === 'away' ? `${styles.active} ${styles.away}` : ''}`}
                                        onClick={() => setStatus('away')}
                                    >
                                        Away
                                    </button>
                                    <button
                                        className={`${styles.statusBtn} ${status === 'dnd' ? `${styles.active} ${styles.dnd}` : ''}`}
                                        onClick={() => setStatus('dnd')}
                                    >
                                        DND
                                    </button>
                                </div>

                                <div className={styles.quickActions}>
                                    <button className={styles.actionItem} onClick={() => { setShowProfileDropdown(false); setIsDrawerOpen(true); }}>
                                        <User size={18} />
                                        <span>View Profile</span>
                                        <ChevronRight size={14} className="ml-auto opacity-50" />
                                    </button>
                                    <Link href="/settings" className={styles.actionItem}>
                                        <Settings size={18} />
                                        <span>Account Settings</span>
                                        <ChevronRight size={14} className="ml-auto opacity-50" />
                                    </Link>
                                    <Link href="/employees" className={styles.actionItem}>
                                        <Users size={18} />
                                        <span>My Team</span>
                                        <ChevronRight size={14} className="ml-auto opacity-50" />
                                    </Link>
                                    <button className={`${styles.actionItem} ${styles.logout}`} onClick={handleLogout}>
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProfileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                user={user || { firstName: 'Sunku', lastName: 'Kushwaha', role: 'SUPER_ADMIN', email: 'sunku@kiccpa.com', id: '123456' }}
            />
        </header>
    );
}
