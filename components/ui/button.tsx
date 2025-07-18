import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline'
    className?: string
}

export const Button = ({ children, className, variant = 'default', ...props }: Props) => {
    return (
        <button
            {...props}
            className={cn(
                'px-4 py-2 rounded-lg font-medium transition-all',
                variant === 'default'
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'border border-primary text-primary hover:bg-primary/10',
                className
            )}
        >
            {children}
        </button>
    )
}
