"use client";

import React, { useState, useEffect } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Mail,
    Phone,
    CheckCircle2,
    Circle,
    ChevronRight,
    Loader2
} from 'lucide-react';
import styles from './details.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const initialOnboardingData: Record<string, any> = {
    "1": {
        id: "1",
        name: 'Amit Kumar',
        role: 'Frontend Engineer',
        joinDate: 'Oct 30, 2024',
        hiringManager: 'David Miller',
        managerRole: 'Hit Manager',
        managerPhone: '+1 321 654 9970',
        managerEmail: 'david.miller@kicpa.com',
        email: 'amit.kumar@kicpa.com',
        phone: '+1 234 567 8900',
        department: 'Engineering',
        location: 'San Francisco, CA',
        timeline: [
            { id: 't1', task: 'Welcome Email Sent', date: 'Oct 30, 2024 . 09:15 AM', status: 'completed' },
            { id: 't2', task: 'Document Collection', date: 'Oct 30, 2024 . 09:30 AM', status: 'inProgress' },
            { id: 't3', task: 'Asset Assignment', status: 'upcoming' },
            { id: 't4', task: 'IT Access Provisioning', status: 'upcoming' },
        ]
    },
    "2": {
        id: "2",
        name: 'Sara Ali',
        role: 'Business Analyst',
        joinDate: 'Nov 02, 2024',
        hiringManager: 'Sarah Jenkins',
        managerRole: 'Product Lead',
        managerPhone: '+1 321 111 2222',
        managerEmail: 'sarah.j@kicpa.com',
        email: 'sara.ali@kicpa.com',
        phone: '+1 234 999 8888',
        department: 'Operations',
        location: 'New York, NY',
        timeline: [
            { id: 't1', task: 'Welcome Email Sent', date: 'Nov 02, 2024 . 10:00 AM', status: 'completed' },
            { id: 't2', task: 'Document Collection', date: 'Nov 02, 2024 . 11:30 AM', status: 'completed' },
            { id: 't3', task: 'Asset Assignment', date: 'Nov 03, 2024 . 09:00 AM', status: 'inProgress' },
            { id: 't4', task: 'IT Access Provisioning', status: 'upcoming' },
        ]
    },
    "3": {
        id: "3",
        name: 'Kevin Durant',
        role: 'Cloud Architect',
        joinDate: 'Oct 28, 2024',
        hiringManager: 'Mike Robinson',
        managerRole: 'CTO',
        managerPhone: '+1 321 444 5555',
        managerEmail: 'mike.r@kicpa.com',
        email: 'kevin.d@kicpa.com',
        phone: '+1 234 333 2222',
        department: 'IT Infrastructure',
        location: 'Austin, TX',
        timeline: [
            { id: 't1', task: 'Welcome Email Sent', date: 'Oct 28, 2024 . 08:00 AM', status: 'completed' },
            { id: 't2', task: 'Document Collection', status: 'inProgress' },
            { id: 't3', task: 'Asset Assignment', status: 'upcoming' },
            { id: 't4', task: 'IT Access Provisioning', status: 'upcoming' },
        ]
    }
};

export default function OnboardingDetailsPage() {
    const params = useParams();
    const id = params?.id as string;

    const [employee, setEmployee] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading from an API
        const data = initialOnboardingData[id] || initialOnboardingData["1"];
        setEmployee(data);
        setIsLoading(false);
    }, [id]);

    const calculateProgress = (timeline: any[]) => {
        const total = timeline.length;
        const completed = timeline.filter(t => t.status === 'completed').length;
        const inProgress = timeline.filter(t => t.status === 'inProgress').length;
        // completed = 100%, inProgress = 50%
        return Math.round(((completed + (inProgress * 0.5)) / total) * 100);
    };

    const toggleTaskStatus = (taskId: string) => {
        if (!employee) return;

        const updatedTimeline = employee.timeline.map((task: any) => {
            if (task.id === taskId) {
                let nextStatus = 'upcoming';
                if (task.status === 'upcoming') nextStatus = 'inProgress';
                else if (task.status === 'inProgress') nextStatus = 'completed';
                else if (task.status === 'completed') nextStatus = 'upcoming';

                return {
                    ...task,
                    status: nextStatus,
                    date: nextStatus === 'completed' ? new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : task.date
                };
            }
            return task;
        });

        setEmployee({
            ...employee,
            timeline: updatedTimeline
        });
    };

    if (isLoading || !employee) {
        return (
            <Shell title="Loading Onboarding...">
                <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <Loader2 className="animate-spin" size={48} color="var(--primary)" />
                    <p style={{ color: '#64748b', fontWeight: 500 }}>Fetching candidate details...</p>
                </div>
            </Shell>
        );
    }

    const progress = calculateProgress(employee.timeline);

    return (
        <Shell title="Employee Onboarding">
            <div className={styles.container}>
                <div className={styles.breadcrumb}>
                    <span>Employee Onboarding</span>
                    <ChevronRight size={14} />
                    <strong>Onboarding Details</strong>
                </div>

                <div className={styles.headerRow}>
                    <h1>Onboarding Details</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            className={styles.returnBtn}
                            style={{ background: 'white', color: '#1e3a8a', border: '1px solid #1e3a8a' }}
                            onClick={() => alert('Onboarding changes saved successfully!')}
                        >
                            Save Changes
                        </button>
                        <Link href="/onboarding">
                            <button className={styles.returnBtn}>
                                Return
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.contentGrid}>
                    <div className={styles.leftColumn}>
                        {/* Candidate Profile Card */}
                        <div className={styles.card}>
                            <div className={styles.candidateHeader}>
                                <div className={styles.candidateInfoSection}>
                                    <div className={styles.avatarLarge}>
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=e2e8f0&color=1e3a8a&size=128`} alt={employee.name} />
                                    </div>
                                    <div className={styles.nameInfo}>
                                        <h2>{employee.name}</h2>
                                        <p>{employee.role}</p>
                                    </div>
                                </div>
                                <div className={styles.metaInfo}>
                                    <p>Join Date: <strong>{employee.joinDate}</strong></p>
                                    <p>Hiring Manager: <strong>{employee.hiringManager}</strong></p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Document Verification (HR Controls) */}
                        <div className={styles.card}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 className={styles.sectionTitle} style={{ margin: 0 }}>Onboarding Status (HR Control)</h3>
                                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Click icons to toggle status</span>
                            </div>

                            <div className={styles.verificationList}>
                                {employee.timeline.map((task: any, index: number) => (
                                    <div key={task.id} className={styles.verificationItem}>
                                        <button
                                            className={styles.toggleBtn}
                                            onClick={() => toggleTaskStatus(task.id)}
                                            title="Toggle Status"
                                        >
                                            <div className={`${styles.statusIcon} ${styles[task.status]}`}>
                                                {task.status === 'upcoming' ? (
                                                    <Circle size={20} />
                                                ) : (
                                                    <CheckCircle2 size={task.status === 'completed' ? 32 : 20} />
                                                )}
                                            </div>
                                        </button>

                                        <div className={styles.itemDetail}>
                                            <div className={styles.itemInfo}>
                                                <h4>{task.task}</h4>
                                                <p>{task.date || 'TBD'}</p>
                                            </div>

                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span className={`${styles.statusBadge} ${styles[task.status]}`}>
                                                    {task.status === 'inProgress' ? 'In Progress' : task.status}
                                                </span>
                                            </div>

                                            <div className={styles.itemStatusText}>
                                                {index === 0 && <span>{employee.joinDate}</span>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Lower Grid: Candidate Info & Timeline View */}
                        <div className={styles.lowerGrid}>
                            <div className={styles.card}>
                                <h3 className={styles.sectionTitle}>Candidate Information</h3>
                                <div className={styles.infoGrid}>
                                    <span className={styles.infoLabel}>Email</span>
                                    <span className={styles.infoValue}>{employee.email}</span>
                                    <span className={styles.infoLabel}>Phone</span>
                                    <span className={styles.infoValue}>{employee.phone}</span>
                                    <span className={styles.infoLabel}>Department</span>
                                    <span className={styles.infoValue}>{employee.department}</span>
                                    <span className={styles.infoLabel}>Office Location</span>
                                    <span className={styles.infoValue}>{employee.location}</span>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.sectionTitle}>Live Timeline</h3>
                                <div className={styles.timelineList}>
                                    {employee.timeline.map((task: any) => (
                                        <div key={task.id} className={styles.timelineItem}>
                                            <div className={`${styles.statusIcon} ${styles[task.status]}`} style={{ width: 24, height: 24 }}>
                                                {task.status === 'upcoming' ? <Circle size={16} /> : <CheckCircle2 size={task.status === 'completed' ? 24 : 16} />}
                                            </div>
                                            <div className={styles.timelineInfo}>
                                                <h4>{task.task}</h4>
                                                {task.date && <p>{task.date}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        {/* Hiring Manager Card */}
                        <div className={styles.card}>
                            <h3 className={styles.sectionTitle}>Hiring Manager</h3>
                            <div className={styles.managerHeader}>
                                <div className={styles.avatarSmall}>
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(employee.hiringManager)}&background=e2e8f0&color=1e3a8a&size=100`} alt={employee.hiringManager} />
                                </div>
                                <div className={styles.managerTitle}>
                                    <h3>{employee.hiringManager}</h3>
                                    <p>{employee.managerRole}</p>
                                </div>
                            </div>
                            <div className={styles.contactList}>
                                <div className={styles.contactItem}>
                                    <Phone size={16} />
                                    <span>{employee.managerPhone}</span>
                                </div>
                                <div className={styles.contactItem}>
                                    <Mail size={16} />
                                    <span>{employee.managerEmail}</span>
                                </div>
                            </div>
                            <button className={styles.sendMsgBtn}>
                                Send Message
                            </button>
                        </div>

                        {/* Live Completion Rate */}
                        <div className={styles.card}>
                            <h3 className={styles.sectionTitle}>Completion Rate</h3>
                            <div className={styles.statCircle}>
                                <svg className={styles.circleSvg} width="120" height="120">
                                    <circle className={styles.circleBg} cx="60" cy="60" r="50"></circle>
                                    <circle
                                        className={styles.circleValue}
                                        cx="60"
                                        cy="60"
                                        r="50"
                                        style={{
                                            strokeDasharray: 314,
                                            strokeDashoffset: 314 * (1 - progress / 100),
                                            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    ></circle>
                                </svg>
                                <span className={styles.circleText}>{progress}%</span>
                            </div>
                            <div className={styles.completionText}>
                                <h3>{progress}%</h3>
                                <p>Onboarding Progress</p>
                            </div>
                            <div className={styles.statRow}>
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
