'use client';

import React from 'react';
import Image from 'next/image';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <div className={styles.branding}>
                    <div className={styles.logoWrapper}>
                        {/* Placeholder for Logo if image fails */}
                        <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
                            K
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mt-6 mb-2">KICCPA HRM</h1>
                    <p className="text-blue-100 text-lg">Manage your workforce with elegance and efficiency.</p>
                </div>

                <div className={styles.testimonial}>
                    <p>“Streamlined our entire HR process. The best platform for modern enterprises.”</p>
                    <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-400"></div>
                        <div className="text-sm">
                            <div className="font-semibold text-white">Sarah Jenkins</div>
                            <div className="text-blue-200">Head of Operations</div>
                        </div>
                    </div>
                </div>

                {/* Abstract Shapes */}
                <div className={styles.shape1}></div>
                <div className={styles.shape2}></div>
            </div>

            <div className={styles.rightSide}>
                <div className={styles.formCard}>
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
