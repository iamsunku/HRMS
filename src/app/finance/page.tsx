"use client";

import React, { useState } from 'react';
import Shell from "@/components/layout/Shell";
import {
    Wallet,
    TrendingUp,
    TrendingDown,
    PieChart,
    BarChart3,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Calendar,
    DollarSign,
    AlertTriangle
} from 'lucide-react';
import styles from './finance.module.css';

const budgetData = [
    { category: 'IT Assets', allocated: 5000000, actual: 4200000, savings: 800000, trend: 'stable' },
    { category: 'Training & Dev', allocated: 2000000, actual: 1850000, savings: 150000, trend: 'up' },
    { category: 'Operations', allocated: 8000000, actual: 8200000, savings: -200000, trend: 'down' },
    { category: 'Travel & Events', allocated: 1500000, actual: 900000, savings: 600000, trend: 'up' },
];

const monthlySavings = [
    { month: 'Jan', savings: 450000 },
    { month: 'Feb', savings: 320000 },
    { month: 'Mar', savings: 610000 },
    { month: 'Apr', savings: 280000 },
    { month: 'May', savings: 490000 },
    { month: 'Jun', savings: 750000 },
];

export default function FinancePage() {
    const [reportType, setReportType] = useState('monthly');

    const totalAllocated = budgetData.reduce((acc, curr) => acc + curr.allocated, 0);
    const totalActual = budgetData.reduce((acc, curr) => acc + curr.actual, 0);
    const totalSavings = totalAllocated - totalActual;
    const savingsPercent = ((totalSavings / totalAllocated) * 100).toFixed(1);

    return (
        <Shell title="Department Budget & Expenses">
            <div className={styles.container}>
                <div className={styles.topSummary}>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon} style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                            <Wallet size={24} />
                        </div>
                        <div className={styles.cardInfo}>
                            <span>Total Allocated Budget</span>
                            <h3>₹{(totalAllocated / 10000000).toFixed(2)} Cr</h3>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                            <TrendingUp size={24} />
                        </div>
                        <div className={styles.cardInfo}>
                            <span>Total Savings (YTD)</span>
                            <h3>₹{(totalSavings / 100000).toFixed(2)} L</h3>
                            <p className={styles.positive}>+{savingsPercent}% vs target</p>
                        </div>
                    </div>
                    <div className={styles.summaryCard}>
                        <div className={styles.cardIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                            <TrendingDown size={24} />
                        </div>
                        <div className={styles.cardInfo}>
                            <span>Actual Spend</span>
                            <h3>₹{(totalActual / 10000000).toFixed(2)} Cr</h3>
                        </div>
                    </div>
                </div>

                <div className={styles.mainGrid}>
                    <div className={styles.budgetSection}>
                        <div className={styles.sectionHeader}>
                            <h2>Category-wise Spending</h2>
                            <div className={styles.headerActions}>
                                <button className={styles.filterBtn}><Filter size={16} /> Filters</button>
                                <button className={styles.downloadBtn}><Download size={16} /> Export PDF</button>
                            </div>
                        </div>
                        <div className={styles.budgetList}>
                            {budgetData.map((item, i) => (
                                <div key={i} className={styles.budgetItem}>
                                    <div className={styles.itemHeader}>
                                        <div className={styles.categoryName}>
                                            <strong>{item.category}</strong>
                                            {item.savings < 0 && (
                                                <span className={styles.overBudget}>
                                                    <AlertTriangle size={12} /> Over Budget
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.itemStats}>
                                            <span>₹{(item.actual / 100000).toFixed(1)}L / ₹{(item.allocated / 100000).toFixed(1)}L</span>
                                        </div>
                                    </div>
                                    <div className={styles.progressContainer}>
                                        <div
                                            className={styles.progressBar}
                                            style={{
                                                width: `${Math.min((item.actual / item.allocated) * 100, 100)}%`,
                                                backgroundColor: item.actual > item.allocated ? 'var(--danger)' : 'var(--primary)'
                                            }}
                                        ></div>
                                    </div>
                                    <div className={styles.itemFooter}>
                                        <span>Savings: <strong className={item.savings >= 0 ? styles.positive : styles.negative}>₹{Math.abs(item.savings).toLocaleString()}</strong></span>
                                        <span className={styles.percent}>{((item.actual / item.allocated) * 100).toFixed(0)}% Utilized</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.analyticsSection}>
                        <div className={styles.chartCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.chartSelector}>
                                    <select
                                        className={styles.chartDropdown}
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                    >
                                        <option value="income-expense">Income vs Expense</option>
                                        <option value="employee-growth">Employee Growth</option>
                                        <option value="department-distribution">Department Distribution</option>
                                        <option value="revenue-trends">Revenue Trends</option>
                                        <option value="cost-analysis">Cost Analysis</option>
                                    </select>
                                </div>
                                <div className={styles.tabs}>
                                    <button className={reportType.includes('monthly') || !reportType.includes('yearly') ? styles.active : ''} onClick={() => setReportType(reportType.split('-')[0] + '-monthly')}>Monthly</button>
                                    <button className={reportType.includes('yearly') ? styles.active : ''} onClick={() => setReportType(reportType.split('-')[0] + '-yearly')}>Yearly</button>
                                </div>
                            </div>
                            <div className={styles.savingsChart}>
                                {monthlySavings.map((data, i) => (
                                    <div key={i} className={styles.chartBarContainer}>
                                        <div
                                            className={styles.chartBar}
                                            style={{ height: `${(data.savings / 800000) * 100}%` }}
                                            title={`₹${data.savings.toLocaleString()}`}
                                        >
                                            <div className={styles.barValue}>₹{(data.savings / 1000).toFixed(0)}k</div>
                                        </div>
                                        <span className={styles.barLabel}>{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.recentExpenses}>
                            <div className={styles.cardHeader}>
                                <h2>Recent Significant Spends</h2>
                            </div>
                            <div className={styles.expenseList}>
                                {[
                                    { title: 'Server Infrastructure Q4', amount: '₹12,40,000', dept: 'IT', date: 'Oct 24' },
                                    { title: 'Annual Leadership Offsite', amount: '₹8,50,000', dept: 'Operations', date: 'Oct 20' },
                                    { title: 'New Employee MacBooks (x10)', amount: '₹18,00,000', dept: 'IT', date: 'Oct 15' },
                                ].map((exp, i) => (
                                    <div key={i} className={styles.expenseItem}>
                                        <div className={styles.expenseInfo}>
                                            <strong>{exp.title}</strong>
                                            <span>{exp.dept} • {exp.date}</span>
                                        </div>
                                        <div className={styles.expenseAmount}>{exp.amount}</div>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.viewAllBtn}>View Full Expense Ledger</button>
                        </div>
                    </div>
                </div>
            </div>
        </Shell>
    );
}
