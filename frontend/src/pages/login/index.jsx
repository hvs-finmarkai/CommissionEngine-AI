import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from '@/hooks/use-app-store'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAppStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (email === 'admin@finmark.ai' && password === 'admin123') {
        const userData = { email, name: 'Admin', role: 'admin' }
        localStorage.setItem('user', JSON.stringify(userData))
        login(userData)
        navigate('/')
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1628] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C6BFF]">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">CommissionEngine AI</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back! Sign in to continue</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#0F1D32] dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700"
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#0F1D32] dark:bg-slate-900 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C6BFF]"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#0F1D32] dark:bg-slate-900 px-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C6BFF]"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#7C6BFF] text-white font-medium text-sm hover:bg-[#6B5AE6] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          Demo: admin@finmark.ai / admin123
        </p>

        <p className="text-center text-xs text-slate-500 mt-4">
          © 2025 Finmark.ai. All rights reserved.
        </p>
      </div>
    </div>
  )
}
