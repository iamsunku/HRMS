"use client";

import React from 'react';
import Shell from "@/components/layout/Shell";
import { UserPlus, ClipboardList, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import styles from './onboarding.module.css';

const onboardingEmployees = [
    { id: 1, name: 'Amit Kumar', role: 'Frontend Engineer', stage: 'Document Verification', progress: 45, date: 'Oct 30, 2024' },
    { id: 2, name: 'Sara Ali', role: 'Business Analyst', stage: 'Asset Allocation', progress: 75, date: 'Nov 02, 2024' },
    { id: 3, name: 'Kevin Durant', role: 'Cloud Architect', stage: 'IT Setup', progress: 20, date: 'Oct 28, 2024' },
];

export default function OnboardingPage() {
    return (
        <Shell title="Employee Onboarding">
            <div className={styles.container}>
                <div className={styles.onboardingGrid}>
                    <div className={styles.mainContent}>
                        <div className={styles.sectionHeader}>
                            <h2>Active Onboarding</h2>
                            <span>{onboardingEmployees.length} candidates in pipeline</span>
                        </div>

                        <div className={styles.employeeList}>
                            {onboardingEmployees.map((emp) => (
                                <div key={emp.id} className={styles.onboardingCard}>
                                    <div className={styles.empInfo}>
                                        <div className={styles.avatar}>
                                            <UserPlus size={24} />
                                        </div>
                                        <div>
                                            <h3>{emp.name}</h3>
                                            <p>{emp.role}</p>
                                        </div>
                                    </div>

                                    <div className={styles.progressSection}>
                                        <div className={styles.progressLabel}>
                                            <span>{emp.stage}</span>
                                            <span>{emp.progress}%</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div className={styles.fill} style={{ width: `${emp.progress}%` }}></div>
                                        </div>
                                    </div>

                                    <div className={styles.dateInfo}>
                                        <span>Join Date</span>
                                        <strong>{emp.date}</strong>
                                    </div>

                                    <button className={styles.actionBtn}>
                                        <span>Continue</span>
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <div className={styles.checklistCard}>
                            <h3>Orientation Checklist</h3>
                            <div className={styles.checklist}>
                                <div className={styles.checkItem}>
                                    <CheckCircle2 size={18} color="var(--success)" />
                                    <span>Welcome Email Sent</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <CheckCircle2 size={18} color="var(--success)" />
                                    <span>Document Collection</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <Circle size={18} opacity="0.3" />
                                    <span>Asset Assignment</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <Circle size={18} opacity="0.3" />
                                    <span>IT Access Provisioning</span>
                                </div>
                                <div className={styles.checkItem}>
                                    <Circle size={18} opacity="0.3" />
                                    <span>Manager Introduction</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.statsCard}>
                            <div className={styles.statLine}>
                                <span>Completion Rate</span>
                                <strong>88%</strong>
                            </div>
                            <div className={styles.statLine}>
                                <span>Avg. Onboarding Time</span>
                                <strong>4.5 Days</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
