"use client";

import React, { useState } from 'react';
import { Search, Bell, User, MessageSquare, X, Check, Download, Shield } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
    title: string;
}

const mockNotifications = [
    { id: 1, text: 'Budget exceeded for Operations dept.', time: '10m ago', type: 'alert' },
    { id: 2, text: 'New leave request from Priya Patel.', time: '1h ago', type: 'request' },
    { id: 3, text: 'Performance review cycle Q4 started.', time: '3h ago', type: 'info' },
];

import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import ProfileDrawer from './ProfileDrawer';

export default function Header({ title }: HeaderProps) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { user, loading } = useUser();

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

                    <div className={styles.notifWrapper}>
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

                    <div
                        className={`${styles.userProfile} cursor-pointer`}
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <div className={styles.userInfo}>
                            {loading ? (
                                <div className="h-8 w-24 animate-pulse rounded bg-gray-200"></div>
                            ) : (
                                <>
                                    <span className={styles.userName}>
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                    <span className={styles.userRole}>
                                        {user?.role?.replace('_', ' ')}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className={styles.avatar}>
                            {user?.firstName ? user.firstName[0] : <User size={24} />}
                        </div>
                    </div>
                </div>
            </div>

            <ProfileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                user={user}
            />
        </header>
    );
}
