'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LogIn, ShieldCheck, Mail, ArrowRight, X, KeySquare, Fingerprint } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Advanced Recovery State
    const [showRecovery, setShowRecovery] = useState(false);
    const [recoveryStep, setRecoveryStep] = useState(1); // 1: Email, 2: OTP
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoveryLoading, setRecoveryLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            let data;
            const text = await res.text();
            try {
                data = text ? JSON.parse(text) : {};
            } catch (e) {
                throw new Error(`Server returned invalid response: ${text.substring(0, 100)}`);
            }

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/');
            router.refresh();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStartRecovery = () => {
        setShowRecovery(true);
        setRecoveryStep(1);
    };

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setRecoveryLoading(true);
        // Simulate advanced MFA/Identity check
        setTimeout(() => {
            setRecoveryLoading(false);
            setRecoveryStep(2);
        }, 1500);
    };

    return (
        <AuthLayout
            title="Systems Login"
            subtitle="Secure access for KICCPA Personnel"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-4 text-sm text-red-600 bg-red-50/50 backdrop-blur-sm rounded-xl border border-red-100 animate-shake">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <Input
                        label="Corporate Email"
                        type="email"
                        placeholder="e.g. name@kiccpa.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        leftIcon={<Mail size={18} />}
                    />

                    <div className="space-y-1">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            leftIcon={<KeySquare size={18} />}
                        />
                        <div className="flex justify-end pt-1">
                            <button
                                type="button"
                                onClick={handleStartRecovery}
                                className="group flex items-center gap-1.5 text-[10px] font-black text-blue-600 hover:text-blue-800 transition-all uppercase tracking-widest"
                            >
                                <Fingerprint size={12} className="group-hover:animate-pulse" />
                                Secure Identity Recovery?
                            </button>
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full py-4 text-sm font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20"
                    size="lg"
                    isLoading={loading}
                    icon={<LogIn size={18} />}
                >
                    Authorize Access
                </Button>
            </form>

            {/* Advanced Recovery Modal */}
            {showRecovery && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-scaleIn">
                        <div className="absolute top-6 right-6">
                            <button onClick={() => setShowRecovery(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        <div className="p-10">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                                <ShieldCheck size={32} />
                            </div>

                            {recoveryStep === 1 ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900">Identity Recovery</h3>
                                        <p className="text-slate-500 text-sm mt-2 font-medium">Enter your corporate email to receive a secure authorization key.</p>
                                    </div>

                                    <form onSubmit={handleSendOTP} className="space-y-4">
                                        <Input
                                            label="Verify Email"
                                            placeholder="you@kiccpa.com"
                                            value={recoveryEmail}
                                            onChange={(e) => setRecoveryEmail(e.target.value)}
                                            required
                                            leftIcon={<Mail size={18} />}
                                        />
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            isLoading={recoveryLoading}
                                            icon={<Mail size={18} />}
                                        >
                                            Send Identity Key
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                                        <p className="text-green-700 text-xs font-bold uppercase tracking-wide">Key Sent Successfully</p>
                                        <p className="text-green-600 text-sm mt-1">Please check your email for the 6-digit verification code.</p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-2">
                                        {[1, 2, 3, 4, 5, 6].map(i => (
                                            <input
                                                key={i}
                                                type="text"
                                                maxLength={1}
                                                className="w-full aspect-square text-center font-bold text-xl rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all"
                                            />
                                        ))}
                                    </div>

                                    <Button className="w-full" icon={<ArrowRight size={18} />}>
                                        Verify & Authorize
                                    </Button>

                                    <button
                                        className="w-full text-center text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest"
                                        onClick={() => setRecoveryStep(1)}
                                    >
                                        Resend Key
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </AuthLayout>
    );
}
