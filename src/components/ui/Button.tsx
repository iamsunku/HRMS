import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, icon, children, ...props }, ref) => {

        const variants = {
            primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/25 border border-transparent',
            secondary: 'bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-secondary/25 border border-transparent',
            outline: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
            ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            danger: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25 border border-transparent',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
        };

        return (
            <button
                ref={ref}
                className={`
          inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200
          disabled:opacity-70 disabled:cursor-not-allowed
          active:scale-[0.98]
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && (
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                )}
                {!isLoading && icon && <span className="mr-2">{icon}</span>}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
