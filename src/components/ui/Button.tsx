import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
                    {
                        'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg': variant === 'primary',
                        'bg-white text-primary hover:bg-gray-50 shadow-sm border border-gray-200': variant === 'secondary',
                        'border-2 border-primary text-primary hover:bg-primary/5': variant === 'outline',
                        'text-text-sub hover:text-text-main hover:bg-gray-100': variant === 'ghost',
                        'px-4 py-2 text-sm': size === 'sm',
                        'px-8 py-3 text-base': size === 'md',
                        'px-10 py-4 text-lg': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
