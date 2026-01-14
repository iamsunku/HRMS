'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './AuthLayout.module.css';
import {
    Shield, Users, Zap,
    UserPlus, Coins, CalendarCheck, Brain,
    Fingerprint, Activity, Sparkles
} from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    const [mounted, setMounted] = useState(false);
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (!parallaxRef.current) return;
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 30; // max 30px move
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
            parallaxRef.current.style.setProperty('--move-x', `${mouseX}px`);
            parallaxRef.current.style.setProperty('--move-y', `${mouseY}px`);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className={styles.container}>
            {/* Master Background (Unified) */}
            <div className={styles.masterBgWrapper}>
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                    alt="Master Background"
                    fill
                    className={styles.masterBgImage}
                    priority
                    unoptimized
                />
                <div className={styles.masterBgOverlay}></div>
            </div>

            {/* Left Info Overlay */}
            <div className={styles.leftSide} ref={parallaxRef}>
                <div className={styles.brandWallGrid}></div>
                <div className={styles.dataBeam}></div>
                <div className={styles.holographicOverlay}></div>

                <div
                    className={`${styles.branding} ${mounted ? styles.fadeInLeft : ''}`}
                    style={{
                        transform: 'translate(var(--move-x, 0), var(--move-y, 0))',
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    <div className={styles.orbitContainer}>
                        <div className={`${styles.orbitNode} ${styles.node1}`} title="Onboarding">
                            <UserPlus size={20} />
                        </div>
                        <div className={`${styles.orbitNode} ${styles.node2}`} title="Payroll">
                            <Coins size={20} />
                        </div>
                        <div className={`${styles.orbitNode} ${styles.node3}`} title="Attendance">
                            <CalendarCheck size={20} />
                        </div>
                        <div className={`${styles.orbitNode} ${styles.node4}`} title="A.I. Talent">
                            <Brain size={20} />
                        </div>
                    </div>

                    <div className={styles.techRing}></div>
                    <div className={styles.brandStripe}></div>
                    <div className={styles.premiumLogo}>
                        <div className={styles.logoImageContainer}>
                            <Image
                                src="/images/iccpa_logo.png"
                                alt="ICCPA Logo"
                                fill
                                className={styles.logoImage}
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles.hrmBadge}>
                        <div className={styles.neuralDot}>
                            <div className={styles.dotCorePulse}></div>
                        </div>
                        <span className={styles.hrmText}>HRM SYSTEM</span>
                    </div>
                </div>

                <div
                    className={styles.bottomContent}
                    style={{
                        transform: 'translate(calc(var(--move-x, 0) * 0.5), calc(var(--move-y, 0) * 0.5))',
                        transition: 'transform 0.1s ease-out'
                    }}
                >
                    <div className={`${styles.testimonial} ${mounted ? styles.fadeInUp : ''}`}>
                        <div className={styles.quoteIcon}>“</div>
                        <p>Revolutionizing Human Resource Management through Neural Intelligence. ICCPA HRM is the definitive architect of the modern workplace.</p>
                        <div className={styles.authorSection}>
                            <div className={styles.authorAvatar}>SK</div>
                            <div>
                                <div className={styles.authorName}>Sunku Kushwaha</div>
                                <div className={styles.authorRole}>Lead Systems Architect</div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.featureRow} ${mounted ? styles.fadeInUp : ''}`} style={{ animationDelay: '0.4s' }}>
                        <div className={styles.featureItem}>
                            <Sparkles size={16} style={{ color: '#F97316' }} />
                            <span>AI Analytics</span>
                        </div>
                        <div className={styles.featureItem}>
                            <Fingerprint size={16} style={{ color: '#1E3A8A' }} />
                            <span>Neural Security</span>
                        </div>
                        <div className={styles.featureItem}>
                            <Activity size={16} style={{ color: '#F97316' }} />
                            <span>Smart Wellbeing</span>
                        </div>
                    </div>
                </div>

                {/* AI-Inspired Animated Elements */}
                <div className={styles.pulseDisk1}></div>
                <div className={styles.pulseDisk2}></div>
            </div>

            {/* Right Form Side */}
            <div className={styles.rightSide}>
                <div className={`${styles.formSection} ${mounted ? styles.fadeInScale : ''}`}>
                    <div className={styles.watermarkLogo}>
                        <Image
                            src="/images/iccpa_logo.png"
                            alt="Watermark"
                            fill
                        />
                    </div>

                    <div className={styles.formHeader}>
                        <div className={styles.cardHeroImageWrapper}>
                            <div className={styles.scanLine}></div>
                            <Image
                                src="/images/auth_bg.png"
                                alt="HRM Imagery"
                                fill
                                className={styles.cardHeroImage}
                            />
                        </div>
                        <div className={styles.formHeaderContent}>
                            <div className={styles.headerIconWrapper}>
                                <Image
                                    src="/images/iccpa_logo.png"
                                    alt="ICCPA"
                                    width={48}
                                    height={48}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <h2 className={styles.formTitle}>{title}</h2>
                            <p className={styles.formSubtitle}>{subtitle}</p>
                        </div>
                    </div>

                    <div className={styles.formBody}>
                        {children}
                    </div>

                    <div className={styles.formFooter}>
                        <p>© 2026 ICCPA HRM. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
