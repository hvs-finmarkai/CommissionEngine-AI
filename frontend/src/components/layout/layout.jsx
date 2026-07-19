import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAppStore from '@/hooks/use-app-store'
import Sidebar from './sidebar'
import Navbar from './navbar'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout() {
  const { sidebarCollapsed, user } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#060E1A]">
      <Sidebar />
      <Navbar />
      <main
        className={cn(
          'min-h-[calc(100vh-4rem)] mt-16 transition-all duration-300 p-6',
          sidebarCollapsed ? 'ml-[70px]' : 'ml-[260px]'
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}
