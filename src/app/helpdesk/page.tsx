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
    { id: 'TKT-2041', title: 'Laptop screen flickering', category: 'Hardware', priority: 'High', status: 'In Progress', requester: 'Arjun Sharma', date: '2 hours ago' },
    { id: 'TKT-2038', title: 'VPN connection issues', category: 'Network', priority: 'Medium', status: 'Open', requester: 'Priya Patel', date: '5 hours ago' },
    { id: 'TKT-2035', title: 'Adobe License Renewal', category: 'Software', priority: 'Low', status: 'Resolved', requester: 'Rahul Vikram', date: '1 day ago' },
    { id: 'TKT-2030', title: 'Security patch update failure', category: 'Security', priority: 'Urgent', status: 'In Progress', requester: 'Sneha L.', date: '2 days ago' },
];

export default function HelpdeskPage() {
    const [tickets, setTickets] = useState(initialTickets);
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeActionId, setActiveActionId] = useState<string | null>(null);

    // Form State
    const [newTicket, setNewTicket] = useState({
        title: '',
        category: 'Software',
        priority: 'Medium',
        requester: 'Admin'
    });

    // Filtering
    const filteredTickets = useMemo(() => {
        return tickets.filter(t => {
            const matchesTab =
                activeTab === 'all' ||
                (activeTab === 'my' && t.requester === 'Admin') ||
                (activeTab === 'unassigned' && t.status === 'Open');

            const matchesSearch =
                t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.requester.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [tickets, activeTab, searchQuery]);

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
        setNewTicket({ title: '', category: 'Software', priority: 'Medium', requester: 'Admin' });
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
        <Shell title="IT Helpdesk & Ticketing">
            <div className={styles.container}>
                {/* Statistics */}
                <div className={styles.topSummary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                            <TicketCheck size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>All Active</span>
                            <h3>{tickets.filter(t => t.status !== 'Resolved').length}</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)' }}>
                            <Clock size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>Avg. Response</span>
                            <h3>4.2 hrs</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div className={styles.summaryInfo}>
                            <span>Resolved</span>
                            <h3>{tickets.filter(t => t.status === 'Resolved').length}</h3>
                        </div>
                    </div>
                </div>

                {/* Filters & Actions */}
                <div className={styles.actionHeader}>
                    <div className={styles.tabs}>
                        {['all', 'my', 'unassigned'].map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? styles.activeTab : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === 'all' ? 'All Tickets' : tab === 'my' ? 'My Requests' : 'Unassigned'}
                            </button>
                        ))}
                    </div>
                    <div className={styles.rightActions}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className={styles.primaryBtn} onClick={() => setIsModalOpen(true)}>
                            <Plus size={18} />
                            <span>Raise Ticket</span>
                        </button>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className={styles.tableCard}>
                    <div className="overflow-x-auto w-full">
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Subject</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Requester</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTickets.map((tkt) => (
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
                                        <td className={styles.actionMenuWrapper}>
                                            <button
                                                className={styles.moreBtn}
                                                onClick={() => setActiveActionId(activeActionId === tkt.id ? null : tkt.id)}
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>

                                            {activeActionId === tkt.id && (
                                                <div className={styles.actionMenu}>
                                                    {tkt.status !== 'Resolved' && (
                                                        <button className={`${styles.menuItem} ${styles.resolveItem}`} onClick={() => handleResolve(tkt.id)}>
                                                            <CheckCircle size={14} /> Resolve
                                                        </button>
                                                    )}
                                                    <button className={`${styles.menuItem} ${styles.deleteItem}`} onClick={() => handleDelete(tkt.id)}>
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredTickets.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                                            No tickets found matching your criteria.
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
                            <h3>Raise New Ticket</h3>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGroup}>
                                <label>Subject / Issue</label>
                                <input
                                    type="text"
                                    placeholder="Briefly describe the issue..."
                                    value={newTicket.title}
                                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <select
                                    value={newTicket.category}
                                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                >
                                    <option value="Software">Software</option>
                                    <option value="Hardware">Hardware</option>
                                    <option value="Network">Network</option>
                                    <option value="Security">Security</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Priority</label>
                                <select
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.secondaryBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className={styles.primaryBtn} onClick={handleRaiseTicket}>Create Ticket</button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
