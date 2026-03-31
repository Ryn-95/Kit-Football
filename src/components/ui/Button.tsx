import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-heading font-semibold uppercase tracking-wider transition-all duration-300";
  
  const variants = {
    primary: "bg-[var(--color-brand-neon)] text-black hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-white/20 bg-transparent text-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-white hover:text-[var(--color-brand-neon)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
