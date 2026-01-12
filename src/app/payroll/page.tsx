"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    ReceiptIndianRupee,
    Download,
    Eye,
    Search,
    Filter,
    TrendingUp,
    ChevronRight,
    ShieldCheck,
    Calendar,
    X,
    Printer,
    Mail
} from 'lucide-react';
import styles from './payroll.module.css';

const payrollSummary = [
    { label: 'Total Payroll', value: '₹42,80,000', change: '+5%', status: 'up' },
    { label: 'Total Deductions', value: '₹4,20,000', change: '+2%', status: 'up' },
    { label: 'Net Salary', value: '₹38,60,000', change: '+8%', status: 'up' },
    { label: 'Next Pay Date', value: 'Oct 31, 2024', change: '5 Days Left', status: 'neutral' },
];

const employeePayroll = [
    { id: 'KIC-001', name: 'Arjun Sharma', ctc: '₹45,00,000', net: '₹2,85,000', status: 'Paid', date: 'Sep 30, 2024', base: '₹1,50,000', hra: '₹60,000', lta: '₹25,000', bonus: '₹50,000' },
    { id: 'KIC-002', name: 'Priya Patel', ctc: '₹25,00,000', net: '₹1,65,000', status: 'Paid', date: 'Sep 30, 2024', base: '₹90,000', hra: '₹36,000', lta: '₹15,000', bonus: '₹24,000' },
    { id: 'KIC-003', name: 'Rahul V.', ctc: '₹18,00,000', net: '₹1,20,000', status: 'Processing', date: 'Oct 31, 2024', base: '₹65,000', hra: '₹26,000', lta: '₹10,000', bonus: '₹19,000' },
    { id: 'KIC-004', name: 'Sneha L.', ctc: '₹15,00,000', net: '₹95,000', status: 'Pending', date: 'Oct 31, 2024', base: '₹55,000', hra: '₹22,000', lta: '₹8,000', bonus: '₹10,000' },
];

export default function PayrollPage() {
    const [selectedMonth, setSelectedMonth] = useState('October 2024');
    const [showSlip, setShowSlip] = useState<any>(null);

    const handleViewSlip = (emp: any) => {
        setShowSlip(emp);
    };

    return (
        <Shell title="Payroll & Compensation">
            <div className={styles.container}>
                <div className={styles.topActions}>
                    <div className={styles.monthSelector}>
                        <Calendar size={18} />
                        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                            <option>October 2024</option>
                            <option>September 2024</option>
                            <option>August 2024</option>
                        </select>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.secondaryBtn}>
                            <Download size={18} />
                            <span>Bulk Downloader</span>
                        </button>
                        <button className={styles.primaryBtn}>
                            <ShieldCheck size={18} />
                            <span>Process Payroll</span>
                        </button>
                    </div>
                </div>

                <div className={styles.summaryGrid}>
                    {payrollSummary.map((item, i) => (
                        <div key={i} className={styles.summaryCard}>
                            <div className={styles.summaryHeader}>
                                <span className={styles.label}>{item.label}</span>
                                <span className={`${styles.status} ${styles[item.status]}`}>{item.change}</span>
                            </div>
                            <div className={styles.value}>{item.value}</div>
                        </div>
                    ))}
                </div>

                <div className={styles.tableSection}>
                    <div className={styles.tableHeader}>
                        <div className={styles.search}>
                            <Search size={18} />
                            <input type="text" placeholder="Search employee..." />
                        </div>
                        <button className={styles.filterBtn}>
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                    </div>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Employee</th>
                                    <th>Annual CTC</th>
                                    <th>Monthly Net</th>
                                    <th>Pay Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employeePayroll.map((emp) => (
                                    <tr key={emp.id}>
                                        <td>
                                            <div className={styles.empInfo}>
                                                <div className={styles.avatar}>{emp.name[0]}</div>
                                                <div>
                                                    <strong>{emp.name}</strong>
                                                    <span>{emp.id}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{emp.ctc}</td>
                                        <td className={styles.netAmount}>{emp.net}</td>
                                        <td>{emp.date}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[emp.status.toLowerCase()]}`}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className={styles.rowActions}>
                                                <button title="View Payslip" onClick={() => handleViewSlip(emp)}><Eye size={18} /></button>
                                                <button title="Download PDF"><Download size={18} /></button>
                                                <button className={styles.moreBtn}><ChevronRight size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showSlip && (
                <div className={styles.modalOverlay}>
                    <div className={styles.slipModal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.logoInfo}>
                                <ShieldCheck size={28} color="var(--primary)" />
                                <div>
                                    <h2>Salary Slip</h2>
                                    <span>Month: {selectedMonth}</span>
                                </div>
                            </div>
                            <div className={styles.headerBtnGroup}>
                                <button><Printer size={18} /></button>
                                <button><Mail size={18} /></button>
                                <button onClick={() => setShowSlip(null)} className={styles.closeBtn}><X size={20} /></button>
                            </div>
                        </div>

                        <div className={styles.slipBody}>
                            <div className={styles.empSlipHeader}>
                                <div className={styles.slipSide}>
                                    <label>Employee Name</label>
                                    <strong>{showSlip.name}</strong>
                                    <label>Employee ID</label>
                                    <strong>{showSlip.id}</strong>
                                </div>
                                <div className={styles.slipSide}>
                                    <label>Department</label>
                                    <strong>Engineering</strong>
                                    <label>Designation</label>
                                    <strong>Senior Developer</strong>
                                </div>
                            </div>

                            <div className={styles.slipTable}>
                                <div className={styles.slipColumn}>
                                    <h3>Earnings</h3>
                                    <div className={styles.slipRow}><span>Basic Salary</span> <span>{showSlip.base}</span></div>
                                    <div className={styles.slipRow}><span>HRA</span> <span>{showSlip.hra}</span></div>
                                    <div className={styles.slipRow}><span>LTA</span> <span>{showSlip.lta}</span></div>
                                    <div className={styles.slipRow}><span>Performance Bonus</span> <span>{showSlip.bonus}</span></div>
                                    <div className={`${styles.slipRow} ${styles.total}`}><span>Gross Earnings</span> <span>₹3,30,000</span></div>
                                </div>
                                <div className={styles.slipColumn}>
                                    <h3>Deductions</h3>
                                    <div className={styles.slipRow}><span>Provident Fund (PF)</span> <span>₹18,000</span></div>
                                    <div className={styles.slipRow}><span>ESI</span> <span>₹2,500</span></div>
                                    <div className={styles.slipRow}><span>Professional Tax</span> <span>₹200</span></div>
                                    <div className={styles.slipRow}><span>Income Tax (TDS)</span> <span>₹24,300</span></div>
                                    <div className={`${styles.slipRow} ${styles.total}`}><span>Total Deductions</span> <span>₹45,000</span></div>
                                </div>
                            </div>

                            <div className={styles.netPayCard}>
                                <div className={styles.netPayLabel}>Net Salary Payable</div>
                                <div className={styles.netPayValue}>{showSlip.net}</div>
                                <div className={styles.netPayWords}>Three Lakh Eighty Five Thousand Rupees Only</div>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <p>This is a computer generated document and does not require a signature.</p>
                            <button className={styles.downloadFullBtn}>Download Full PDF</button>
                        </div>
                    </div>
                </div>
            )}
        </Shell>
    );
}
