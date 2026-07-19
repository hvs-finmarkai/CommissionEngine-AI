import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AppStoreContext = createContext(null)

export function AppStoreProvider({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored || 'light'
  })
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleCollapse = useCallback(() => {
    setSidebarCollapsed(prev => !prev)
  }, [])

  const setTheme = useCallback((t) => {
    localStorage.setItem('theme', t)
    setThemeState(t)
  }, [])

  const login = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const value = {
    sidebarCollapsed,
    toggleCollapse,
    theme,
    setTheme,
    user,
    login,
    logout
  }

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  )
}

export default function useAppStore() {
  const context = useContext(AppStoreContext)
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider')
  }
  return context
}
