"use client";

import React, { useState, useMemo } from 'react';
import Shell from "@/components/layout/Shell";
import {
    TicketCheck,
    Plus,
    Search,
    Clock,
    CheckCircle2,
    MoreHorizontal,
    Monitor,
    Wifi,
    ShieldAlert,
    MessageSquare,
    X,
    Trash2,
    CheckCircle,
    ChevronDown
} from 'lucide-react';
import styles from './helpdesk.module.css';

const initialTickets = [
    { id: 'TKT-2041', title: 'LMS Quiz auto-submission issue', category: 'LMS Support', priority: 'High', status: 'In Progress', requester: 'Arjun Sharma', date: '2 hours ago' },
    { id: 'TKT-2038', title: 'Student portal access error', category: 'Technical', priority: 'Medium', status: 'Open', requester: 'Priya Patel', date: '5 hours ago' },
    { id: 'TKT-2035', title: 'Chemistry Virtual Lab extension', category: 'Software', priority: 'Low', status: 'Resolved', requester: 'Rahul Vikram', date: '1 day ago' },
    { id: 'TKT-2030', title: 'Academic data privacy query', category: 'Security', priority: 'Urgent', status: 'In Progress', requester: 'Sneha L.', date: '2 days ago' },
];

import { useUser } from '@/hooks/useUser';

export default function HelpdeskPage() {
    const { user, loading } = useUser();
    const isManagement = ['SUPER_ADMIN', 'ADMIN', 'HR_MANAGER', 'DEPARTMENT_HEAD'].includes(user?.role || '');

    const [tickets, setTickets] = useState(initialTickets);
    // Default to 'my' for employees, 'all' for management
    const [activeTab, setActiveTab] = useState(isManagement ? 'all' : 'my');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeActionId, setActiveActionId] = useState<string | null>(null);

    // Form State
    const [newTicket, setNewTicket] = useState({
        title: '',
        category: 'LMS Support',
        priority: 'Medium',
        requester: `${user?.firstName} ${user?.lastName}`
    });



    // Filtering
    const filteredTickets = useMemo(() => {
        return tickets.filter(t => {
            const matchesTab =
                activeTab === 'all' ||
                (activeTab === 'my' && t.requester === `${user?.firstName} ${user?.lastName}`) ||
                (activeTab === 'unassigned' && t.status === 'Open');

            const matchesSearch =
                t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.requester.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [tickets, activeTab, searchQuery, user]);

    // Handlers
    const handleRaiseTicket = () => {
        if (!newTicket.title) return;
        const ticket = {
            id: `TKT-${Math.floor(Math.random() * 9000) + 1000}`,
            ...newTicket,
            status: 'Open',
            date: 'Just now'
        };
        setTickets([ticket, ...tickets]);
        setIsModalOpen(false);
        setNewTicket({
            title: '', category: 'LMS Support', priority: 'Medium', requester: `${user?.firstName} ${user?.lastName}`
        });
        setActiveTab('my');
    };

    const handleDelete = (id: string) => {
        setTickets(tickets.filter(t => t.id !== id));
        setActiveActionId(null);
    };

    const handleResolve = (id: string) => {
        setTickets(tickets.map(t =>
            t.id === id ? { ...t, status: 'Resolved' } : t
        ));
        setActiveActionId(null);
    };

    return (
        <Shell title={isManagement ? "Organizational Support Queue" : "Personal Support & Guidance"}>
            <div className={styles.container}>
                {/* Statistics */}
                <div className={styles.topSummary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' }}>
                            <TicketCheck size={20} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>{isManagement ? "All Active Tickets" : "My Active Tasks"}</span>
                            <h3>{filteredTickets.filter(t => t.status !== 'Resolved').length}</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                            <Clock size={20} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>{isManagement ? "Avg. Response" : "Estimated Wait"}</span>
                            <h3>4.2 hrs</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            <CheckCircle2 size={20} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>Resolved Cases</span>
                            <h3>{filteredTickets.filter(t => t.status === 'Resolved').length}</h3>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className={styles.actionHeader}>
                    <div className={styles.tabs}>
                        {isManagement ? (
                            ['all', 'unassigned'].map(tab => (
                                <button
                                    key={tab}
                                    className={activeTab === tab ? styles.activeTab : ''}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === 'all' ? 'Institutional Queue' : 'Unassigned'}
                                </button>
                            ))
                        ) : (
                            <button className={styles.activeTab}>My Requests History</button>
                        )}
                    </div>
                    <div className={styles.rightActions}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search identification..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
                            <Plus size={18} />
                            <span>Identify New Issue</span>
                        </button>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className={styles.tableCard}>
                    <div className="overflow-x-auto w-full">
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    <th>Subject Matter</th>
                                    <th>Categorization</th>
                                    <th>Priority Index</th>
                                    {isManagement && <th>Stakeholder</th>}
                                    <th>Fulfillment</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((tkt) => (
                                    <tr key={tkt.id}>
                                        <td className={styles.tktId}>{tkt.id}</td>
                                        <td>
                                            <div className={styles.tktInfo}>
                                                <strong>{tkt.title}</strong>
                                                <span>Initialized {tkt.date}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.categoryBadge}>
                                                <span>{tkt.category}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`${styles.priorityBadge} ${styles[tkt.priority.toLowerCase()]}`}>
                                                {tkt.priority}
                                            </span>
                                        </td>
                                        {isManagement && <td>{tkt.requester}</td>}
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[tkt.status.toLowerCase().replace(' ', '')]}`}>
                                                {tkt.status}
                                            </span>
                                        </td>
                                        <td className={styles.actionMenuWrapper}>
                                            <button
                                                className={styles.moreBtn}
                                                onClick={() => setActiveActionId(activeActionId === tkt.id ? null : tkt.id)}
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>

                                            {activeActionId === tkt.id && (
                                                <div className={styles.actionMenu}>
                                                    {isManagement && tkt.status !== 'Resolved' && (
                                                        <button className={`${styles.menuItem} ${styles.resolveItem}`} onClick={() => handleResolve(tkt.id)}>
                                                            <CheckCircle size={14} /> Resolve Case
                                                        </button>
                                                    )}
                                                    <button className={`${styles.menuItem} ${styles.deleteItem}`} onClick={() => handleDelete(tkt.id)}>
                                                        <Trash2 size={14} /> Remove Ref
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredTickets.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Zero Pending Support Records Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Raise Ticket Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Protocol Assistance Request</h3>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Issue Description</label>
                                <input
                                    type="text"
                                    placeholder="Enter subject for verification..."
                                    value={newTicket.title}
                                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Categorization</label>
                                <select
                                    value={newTicket.category}
                                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                >
                                    <option value="LMS Support">Academic Platform (LMS)</option>
                                    <option value="Pedagogy">Instructional Guidance</option>
                                    <option value="Technical">Hardware/Identity</option>
                                    <option value="Security">Access/Privacy</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Operational Priority</label>
                                <select
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                >
                                    <option value="Low">Standard (Low)</option>
                                    <option value="Medium">Routine (Medium)</option>
                                    <option value="High">Critical (High)</option>
                                    <option value="Urgent">Emergency (Urgent)</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.secondaryBtn} onClick={() => setIsModalOpen(false)}>Cancel Protocol</button>
                            <button className={styles.primaryBtn} onClick={handleRaiseTicket}>Authorize Request</button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
