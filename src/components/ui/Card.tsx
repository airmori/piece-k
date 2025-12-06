import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hoverEffect = false, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'bg-white rounded-3xl p-6 border border-gray-100 shadow-sm overflow-hidden',
                    hoverEffect && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-md',
                    className
                )}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';
