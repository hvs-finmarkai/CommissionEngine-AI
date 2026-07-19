import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount) {
  if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(2)} L`
  return `₹ ${amount.toLocaleString('en-IN')}`
}

export function formatNumber(num) {
  return num.toLocaleString('en-IN')
}

export function formatPercentage(num) {
  return `${num.toFixed(1)}%`
}
