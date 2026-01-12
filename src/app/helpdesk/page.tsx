"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    TicketCheck,
    Plus,
    Search,
    Filter,
    Clock,
    AlertCircle,
    CheckCircle2,
    MoreHorizontal,
    Monitor,
    Wifi,
    ShieldAlert,
    MessageSquare
} from 'lucide-react';
import styles from './helpdesk.module.css';

const tickets = [
    { id: 'TKT-2041', title: 'Laptop screen flickering', category: 'Hardware', priority: 'High', status: 'In Progress', requester: 'Arjun Sharma', date: '2 hours ago' },
    { id: 'TKT-2038', title: 'VPN connection issues', category: 'Network', priority: 'Medium', status: 'Open', requester: 'Priya Patel', date: '5 hours ago' },
    { id: 'TKT-2035', title: 'Adobe License Renewal', category: 'Software', priority: 'Low', status: 'Resolved', requester: 'Rahul V.', date: '1 day ago' },
    { id: 'TKT-2030', title: 'Security patch update failure', category: 'Security', priority: 'Urgent', status: 'In Progress', requester: 'Sneha L.', date: '2 days ago' },
];

export default function HelpdeskPage() {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <Shell title="IT Helpdesk & Ticketing">
            <div className={styles.container}>
                <div className={styles.topSummary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                            <TicketCheck size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>Open Tickets</span>
                            <h3>12</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                            <Clock size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>Avg. Resolution Time</span>
                            <h3>4.2 hrs</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>SLA Compliance</span>
                            <h3>98.5%</h3>
                        </div>
                    </div>
                </div>

                <div className={styles.actionHeader}>
                    <div className={styles.tabs}>
                        <button className={activeTab === 'all' ? styles.activeTab : ''} onClick={() => setActiveTab('all')}>All Tickets</button>
                        <button className={activeTab === 'my' ? styles.activeTab : ''} onClick={() => setActiveTab('my')}>My Requests</button>
                        <button className={activeTab === 'unassigned' ? styles.activeTab : ''} onClick={() => setActiveTab('unassigned')}>Unassigned</button>
                    </div>
                    <div className={styles.rightActions}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input type="text" placeholder="Search tickets..." />
                        </div>
                        <button className={styles.primaryBtn}>
                            <Plus size={18} />
                            <span>Raise Ticket</span>
                        </button>
                    </div>
                </div>

                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Subject</th>
                                <th>Category</th>
                                <th>Priority</th>
                                <th>Requester</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((tkt) => (
                                <tr key={tkt.id}>
                                    <td className={styles.tktId}>{tkt.id}</td>
                                    <td>
                                        <div className={styles.tktInfo}>
                                            <strong>{tkt.title}</strong>
                                            <span>Raised {tkt.date}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.categoryBadge}>
                                            {tkt.category === 'Hardware' && <Monitor size={14} />}
                                            {tkt.category === 'Network' && <Wifi size={14} />}
                                            {tkt.category === 'Security' && <ShieldAlert size={14} />}
                                            {tkt.category === 'Software' && <MessageSquare size={14} />}
                                            <span>{tkt.category}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.priorityBadge} ${styles[tkt.priority.toLowerCase()]}`}>
                                            {tkt.priority}
                                        </span>
                                    </td>
                                    <td>{tkt.requester}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[tkt.status.toLowerCase().replace(' ', '')]}`}>
                                            {tkt.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={styles.moreBtn}><MoreHorizontal size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Shell>
    );
}
