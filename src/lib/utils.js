import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Format date
 */
export function formatDate(date) {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yyyy', { locale: vi })
}

/**
 * Format datetime
 */
export function formatDateTime(date) {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })
}

/**
 * Get initials from name
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Truncate text
 */
export function truncate(text, length = 100) {
  if (!text || text.length <= length) return text
  return text.slice(0, length) + '...'
}
