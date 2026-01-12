"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './Shell.module.css';

interface ShellProps {
    children: React.ReactNode;
    title: string;
}

export default function Shell({ children, title }: ShellProps) {
    return (
        <div className={styles.shell}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header title={title} />
                <main className={styles.content}>
                    <div className="animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
