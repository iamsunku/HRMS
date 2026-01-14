import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        className={`
                            w-full rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-3.5 text-sm text-slate-900 outline-none 
                            transition-all duration-300 transform
                            ${leftIcon ? 'pl-12' : ''}
                            placeholder:text-slate-400
                            focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 focus:shadow-xl focus:translate-y-[-1px] focus:bg-white
                            disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500
                            ${error ? 'border-red-500 focus:ring-red-500/10' : ''}
                            ${className}
                        `}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1.5 ml-1 text-[10px] font-bold uppercase tracking-widest text-red-500">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';
