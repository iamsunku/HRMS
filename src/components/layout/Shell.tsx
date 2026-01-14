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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <div className={`${styles.shell} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className={styles.mainContent}>
                <Header
                    title={title}
                    onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
                <main className={styles.content}>
                    <div className="animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
