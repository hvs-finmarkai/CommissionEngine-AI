import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Plus, Trash2, Edit, Shield, Search, X } from 'lucide-react'

const initialUsers = [
  { id: 1, name: 'Anita Desai', email: 'anita@finmark.ai', role: 'Admin', department: 'Finance', status: 'active', lastLogin: '19 Jul 2026, 09:00 AM' },
  { id: 2, name: 'Vikash Kumar', email: 'vikash@finmark.ai', role: 'Sales Manager', department: 'Sales', status: 'active', lastLogin: '19 Jul 2026, 08:45 AM' },
  { id: 3, name: 'Priya Sharma', email: 'priya@finmark.ai', role: 'Finance', department: 'Finance', status: 'active', lastLogin: '18 Jul 2026, 06:30 PM' },
  { id: 4, name: 'Rahul Verma', email: 'rahul@finmark.ai', role: 'HR', department: 'HR', status: 'active', lastLogin: '18 Jul 2026, 05:15 PM' },
  { id: 5, name: 'Neha Singh', email: 'neha@finmark.ai', role: 'Employee', department: 'Sales', status: 'active', lastLogin: '17 Jul 2026, 04:00 PM' },
  { id: 6, name: 'Arjun Patel', email: 'arjun@finmark.ai', role: 'Employee', department: 'Operations', status: 'inactive', lastLogin: '10 Jul 2026, 11:00 AM' },
]

const roleOptions = ['Admin', 'Finance', 'HR', 'Sales Manager', 'Employee']
const departmentOptions = ['Finance', 'Sales', 'HR', 'Operations', 'Technology']

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Employee', department: 'Sales', password: '' })

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  function handleCreate() {
    if (!formData.name || !formData.email) return
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u))
      setEditingUser(null)
    } else {
      const newUser = {
        id: Date.now(),
        ...formData,
        status: 'active',
        lastLogin: 'Never',
      }
      setUsers([...users, newUser])
    }
    setFormData({ name: '', email: '', role: 'Employee', department: 'Sales', password: '' })
    setShowForm(false)
  }

  function handleEdit(user) {
    setEditingUser(user)
    setFormData({ name: user.name, email: user.email, role: user.role, department: user.department, password: '' })
    setShowForm(true)
  }

  function handleDelete(userId) {
    setUsers(users.filter(u => u.id !== userId))
  }

  function handleToggleStatus(userId) {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create, edit, and manage user accounts and permissions</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingUser(null); setFormData({ name: '', email: '', role: 'Employee', department: 'Sales', password: '' }) }}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7C6BFF]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#7C6BFF]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Users</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.role === 'Admin').length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admins</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.filter(u => u.status === 'inactive').length}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Inactive</p>
            </div>
          </div>
        </Card>
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{editingUser ? 'Edit User' : 'Create New User'}</h3>
            <button onClick={() => { setShowForm(false); setEditingUser(null) }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
              <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter full name" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
              <Input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="user@finmark.ai" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Password</label>
              <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder={editingUser ? 'Leave blank to keep' : 'Enter password'} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Role</label>
              <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="flex h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0A1628] px-3 py-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7C6BFF]">
                {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Department</label>
              <select value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="flex h-9 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0A1628] px-3 py-1 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#7C6BFF]">
                {departmentOptions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleCreate} className="w-full">
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Users</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#7C6BFF] flex items-center justify-center text-white text-xs font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={user.role === 'Admin' ? 'default' : 'outline'}>{user.role}</Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{user.department}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleToggleStatus(user.id)}>
                      <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                        {user.status}
                      </Badge>
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">{user.lastLogin}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(user)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No users found matching your search.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
