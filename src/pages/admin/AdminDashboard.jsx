/**
 * Admin Dashboard - Tổng quan hệ thống
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, Calendar, CheckCircle, Clock, 
  UserCheck, Shield, TrendingUp, AlertCircle 
} from 'lucide-react'
import { adminRepository } from '../../services/repositories/adminRepository'
import { Button } from '../../components/ui/Button'

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      setLoading(true)
      const data = await adminRepository.getStatistics()
      setStats(data)
    } catch (err) {
      console.error('Error loading statistics:', err)
      setError('Không thể tải thống kê')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-red-300">{error}</div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Tổng người dùng',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/users'
    },
    {
      title: 'Tổng sự kiện',
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/events'
    },
    {
      title: 'Sự kiện chờ duyệt',
      value: stats?.pendingEvents || 0,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      link: '/admin/events/pending'
    },
    {
      title: 'Sự kiện đã duyệt',
      value: stats?.approvedEvents || 0,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      link: '/admin/events'
    },
    {
      title: 'Tình nguyện viên',
      value: stats?.volunteers || 0,
      icon: UserCheck,
      color: 'from-cyan-500 to-cyan-600',
      link: '/admin/users?role=volunteer'
    },
    {
      title: 'Tổ chức',
      value: stats?.organizers || 0,
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/users?role=organizer'
    },
    {
      title: 'Lượt đăng ký',
      value: stats?.totalRegistrations || 0,
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      link: '/admin/registrations'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-blue-200">Tổng quan quản trị hệ thống VolunteerHub</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link to="/admin/events/pending">
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              Duyệt sự kiện ({stats?.pendingEvents || 0})
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Quản lý người dùng
            </Button>
          </Link>
          <Link to="/admin/events">
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Quản lý sự kiện
            </Button>
          </Link>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Link 
                key={index} 
                to={card.link}
                className="glass p-6 rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-blue-200 text-sm mb-2">{card.title}</h3>
                <p className="text-3xl font-bold text-white">{card.value}</p>
              </Link>
            )
          })}
        </div>

        {/* Alerts */}
        {stats?.pendingEvents > 0 && (
          <div className="mt-8 glass p-6 rounded-2xl border border-yellow-400/30">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Có {stats.pendingEvents} sự kiện chờ duyệt
                </h3>
                <p className="text-blue-200 mb-4">
                  Các sự kiện này đang chờ bạn phê duyệt để có thể công khai.
                </p>
                <Link to="/admin/events/pending">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    Xem ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
