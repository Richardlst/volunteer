/**
 * Button Component
 */

import React from 'react'
import { cn } from '@/lib/utils'

export function Button({ 
  children, 
  className, 
  variant = 'default',
  size = 'default',
  ...props 
}) {
  const variants = {
    default: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border border-primary text-primary hover:bg-primary/10',
    ghost: 'hover:bg-muted',
  }

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
