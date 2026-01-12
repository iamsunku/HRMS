'use client';

import React from 'react';
import styles from './ProfileDrawer.module.css';
import { X, Mail, Phone, Shield, User, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

export default function ProfileDrawer({ isOpen, onClose, user }: ProfileDrawerProps) {
    const router = useRouter();

    if (!isOpen || !user) return null;

    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.href = '/login';
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.drawer}>
                <div className={styles.header}>
                    <h2>My Profile</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.body}>
                    {/* Profile Header */}
                    <div className={styles.profileSection}>
                        <div className={styles.largeAvatar}>
                            {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div className={styles.name}>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className={styles.roleBadge}>
                            {user.role?.replace('_', ' ')}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <div className={styles.iconBox}><Mail size={18} /></div>
                            <div className={styles.infoContent}>
                                <span className={styles.label}>Email Address</span>
                                <span className={styles.value}>{user.email}</span>
                            </div>
                        </div>

                        {/* We could add more details here if available from API */}
                        <div className={styles.infoCard}>
                            <div className={styles.iconBox}><Shield size={18} /></div>
                            <div className={styles.infoContent}>
                                <span className={styles.label}>Account ID</span>
                                <span className={styles.value}>#{user.id.slice(-6).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Options */}
                    <div className={styles.menuList}>
                        <button className={styles.menuItem} onClick={() => router.push('/profile')}>
                            <User size={18} />
                            <span>Full Profile</span>
                            <ChevronRight size={16} className="ml-auto opacity-50" />
                        </button>
                        <button className={styles.menuItem} onClick={() => router.push('/settings')}>
                            <Settings size={18} />
                            <span>Account Settings</span>
                            <ChevronRight size={16} className="ml-auto opacity-50" />
                        </button>
                        <button className={styles.menuItem} onClick={() => router.push('/help')}>
                            <HelpCircle size={18} />
                            <span>Help & Support</span>
                            <ChevronRight size={16} className="ml-auto opacity-50" />
                        </button>
                    </div>
                </div>

                <button className={styles.logoutBtn} onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </>
    );
}
