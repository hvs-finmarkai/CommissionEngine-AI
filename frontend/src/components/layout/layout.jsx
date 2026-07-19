import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import useAppStore from '@/hooks/use-app-store'
import Sidebar from './sidebar'
import Navbar from './navbar'

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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060E1A] text-gray-900 dark:text-gray-100">
      <Sidebar />
      <Navbar />
      <main
        className={`min-h-[calc(100vh-4rem)] mt-16 transition-all duration-300 p-6 ${
          sidebarCollapsed ? 'ml-[70px]' : 'ml-[260px]'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
