/**
 * Sidebar Component - Xanh dương sang trọng
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, Users, Settings, Bell, Heart, FileText, CheckSquare, Shield, UserCog } from 'lucide-react'
import { cn } from '@/lib/utils'

function Sidebar({ user }) {
  const location = useLocation()

  // Menu theo role
  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Sự kiện', path: '/events' },
      { icon: Users, label: 'Cộng đồng', path: '/community' },
    ]

    if (user?.role === 'volunteer') {
      return [
        ...baseItems,
        { icon: Heart, label: 'Sự kiện của tôi', path: '/my-events' },
        { icon: Bell, label: 'Thông báo', path: '/notifications' },
        { icon: Settings, label: 'Cài đặt', path: '/settings' },
      ]
    }

    if (user?.role === 'manager') {
      return [
        ...baseItems,
        { icon: FileText, label: 'Quản lý sự kiện', path: '/manager/events' },
        { icon: CheckSquare, label: 'Duyệt đăng ký', path: '/manager/registrations' },
        { icon: Settings, label: 'Cài đặt', path: '/settings' },
      ]
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { icon: Shield, label: 'Duyệt sự kiện', path: '/admin/events' },
        { icon: UserCog, label: 'Quản lý user', path: '/admin/users' },
        { icon: Settings, label: 'Cài đặt', path: '/settings' },
      ]
    }

    return baseItems
  }

  const menuItems = getMenuItems()

  return (
    <aside className="w-64 glass border-r border-blue-400/30 h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'text-blue-200 hover:bg-blue-500/20 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
