"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    User,
    Lock,
    Bell,
    Building2,
    Globe,
    Shield,
    Save,
    Camera,
    Mail,
    Smartphone,
    Eye,
    EyeOff
} from 'lucide-react';
import styles from './settings.module.css';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <Shell title="Institution Settings">
            <div className={styles.container}>
                <div className={styles.settingsGrid}>
                    <aside className={styles.sidebar}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <User size={18} />
                            <span>Profile Settings 👤</span>
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'security' ? styles.active : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock size={18} />
                            <span>Security & Password 🔐</span>
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'notifications' ? styles.active : ''}`}
                            onClick={() => setActiveTab('notifications')}
                        >
                            <Bell size={18} />
                            <span>Notifications 🔔</span>
                        </button>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'company' ? styles.active : ''}`}
                            onClick={() => setActiveTab('company')}
                        >
                            <Building2 size={18} />
                            <span>Institutional Setup 🏢</span>
                        </button>
                    </aside>

                    <main className={styles.content}>
                        {activeTab === 'profile' && (
                            <div className={styles.section}>
                                <h2>Academic Profile 🤠</h2>
                                <p>Manage your institutional profile and professional details here. ✨</p>

                                <div className={styles.avatarSection}>
                                    <div className={styles.avatarLarge}>
                                        <User size={40} />
                                        <button className={styles.cameraBtn}><Camera size={16} /></button>
                                    </div>
                                    <div className={styles.avatarInfo}>
                                        <h3>Dean Administrator</h3>
                                        <span>Chief Institutional Officer</span>
                                    </div>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name 📛</label>
                                        <input type="text" defaultValue="Admin User" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Email Address 📧</label>
                                        <input type="email" defaultValue="dean@edutech.com" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone Number 📱</label>
                                        <input type="text" defaultValue="+91 98765 43210" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Timezone 🌏</label>
                                        <select>
                                            <option>(GMT+05:30) Chennai, Kolkata, Mumbai</option>
                                            <option>(GMT+00:00) UTC</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.actionRow}>
                                    <button className={styles.saveBtn}>
                                        <Save size={18} />
                                        <span>Save Changes 💾</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className={styles.section}>
                                <h2>Security Preferences 🛡️</h2>
                                <p>Secure your account with multi-factor authentication and strong passwords. 🔒</p>

                                <div className={styles.securityItem}>
                                    <div className={styles.itemInfo}>
                                        <h3>Two-Factor Authentication (2FA) 🔐</h3>
                                        <p>Add an extra layer of security to your account.</p>
                                    </div>
                                    <div className={styles.toggle}>
                                        <input type="checkbox" id="2fa" />
                                        <label htmlFor="2fa"></label>
                                    </div>
                                </div>

                                <div className={styles.passwordSection}>
                                    <h3>Change Password 🔑</h3>
                                    <div className={styles.inputGroup}>
                                        <label>Current Password 🔓</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                className={styles.eyeBtn}
                                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            >
                                                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>New Password 🆕</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                className={styles.eyeBtn}
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Confirm New Password ✅</label>
                                        <div className={styles.passwordWrapper}>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                            />
                                            <button
                                                className={styles.eyeBtn}
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.actionRow}>
                                    <button className={styles.saveBtn}>Update Password 🚀</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className={styles.section}>
                                <h2>Notification Settings 📢</h2>
                                <p>Choose how you want to be notified about important events. 🔔</p>

                                <div className={styles.notifGrid}>
                                    <div className={styles.notifRow}>
                                        <div className={styles.notifLabel}>
                                            <Mail size={18} />
                                            <div>
                                                <strong>Email Notifications 📨</strong>
                                                <span>Receive daily digests and alerts via email.</span>
                                            </div>
                                        </div>
                                        <div className={styles.toggle}>
                                            <input type="checkbox" id="emailNotif" defaultChecked />
                                            <label htmlFor="emailNotif"></label>
                                        </div>
                                    </div>

                                    <div className={styles.notifRow}>
                                        <div className={styles.notifLabel}>
                                            <Smartphone size={18} />
                                            <div>
                                                <strong>Push Notifications 📲</strong>
                                                <span>Get real-time alerts on your browser and mobile.</span>
                                            </div>
                                        </div>
                                        <div className={styles.toggle}>
                                            <input type="checkbox" id="pushNotif" defaultChecked />
                                            <label htmlFor="pushNotif"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'company' && (
                            <div className={styles.section}>
                                <h2>Institutional Setup ⚙️</h2>
                                <p>Global system settings for EduTech Academy. 🔧</p>

                                <div className={styles.formGrid}>
                                    <div className={styles.inputGroup}>
                                        <label>Institution Display Name 🏷️</label>
                                        <input type="text" defaultValue="EduTech Academy India" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Tax ID / GSTIN 🧾</label>
                                        <input type="text" defaultValue="27AADCK3456F1Z1" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Currency Symbol 💲</label>
                                        <input type="text" defaultValue="₹ (INR)" />
                                    </div>
                                </div>

                                <div className={styles.actionRow}>
                                    <button className={styles.saveBtn}>Save Config 💾</button>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </Shell>
    );
}
