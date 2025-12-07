/**
 * Volunteer History - Lịch sử tham gia sự kiện
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar, MapPin, CheckCircle, Clock, 
  XCircle, ArrowLeft, Award 
} from 'lucide-react'
import { registrationRepository } from '../../services/repositories/registrationRepository'
import { Button } from '../../components/ui/Button'

function VolunteerHistory() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, completed, pending, cancelled

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const data = await registrationRepository.getMyHistory()
      setRegistrations(data)
    } catch (err) {
      console.error('Error loading history:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      completed: { color: 'bg-green-500', icon: CheckCircle, text: 'Hoàn thành' },
      approved: { color: 'bg-blue-500', icon: CheckCircle, text: 'Đã duyệt' },
      pending: { color: 'bg-yellow-500', icon: Clock, text: 'Chờ duyệt' },
      rejected: { color: 'bg-red-500', icon: XCircle, text: 'Từ chối' },
      cancelled_by_volunteer: { color: 'bg-gray-500', icon: XCircle, text: 'Đã hủy' },
    }
    
    const badge = badges[status] || badges.pending
    const Icon = badge.icon
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-sm ${badge.color}`}>
        <Icon className="w-4 h-4" />
        {badge.text}
      </span>
    )
  }

  const filteredRegistrations = registrations.filter(reg => {
    if (filter === 'all') return true
    if (filter === 'completed') return reg.status === 'completed'
    if (filter === 'pending') return reg.status === 'pending'
    if (filter === 'cancelled') return reg.status === 'cancelled_by_volunteer'
    return true
  })

  const stats = {
    total: registrations.length,
    completed: registrations.filter(r => r.status === 'completed').length,
    pending: registrations.filter(r => r.status === 'pending').length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-blue-300 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Lịch sử tham gia</h1>
          <p className="text-blue-200">
            Xem lại các sự kiện bạn đã tham gia
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-blue-200 text-sm">Tổng sự kiện</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-green-400/30">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-blue-200 text-sm">Đã hoàn thành</p>
                <p className="text-3xl font-bold text-white">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 rounded-2xl border border-yellow-400/30">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-blue-200 text-sm">Đang chờ</p>
                <p className="text-3xl font-bold text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 overflow-x-auto">
          {[
            { value: 'all', label: 'Tất cả' },
            { value: 'completed', label: 'Hoàn thành' },
            { value: 'pending', label: 'Chờ duyệt' },
            { value: 'cancelled', label: 'Đã hủy' },
          ].map(({ value, label }) => (
            <Button
              key={value}
              onClick={() => setFilter(value)}
              className={`${
                filter === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-950/30 text-blue-300 hover:bg-blue-950/50'
              }`}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Events List */}
        {filteredRegistrations.length === 0 ? (
          <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
            <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Chưa có sự kiện nào
            </h2>
            <p className="text-blue-200 mb-6">
              Bạn chưa tham gia sự kiện nào
            </p>
            <Link to="/events">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                Khám phá sự kiện
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((registration) => (
              <div 
                key={registration.registrationId}
                className="glass p-6 rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all"
              >
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {registration.eventTitle}
                      </h3>
                      {getStatusBadge(registration.status)}
                    </div>

                    <div className="space-y-2 text-sm text-blue-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Đăng ký: {new Date(registration.registeredAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      
                      {registration.approvedAt && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>
                            Duyệt: {new Date(registration.approvedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      )}
                      
                      {registration.completedAt && (
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span>
                            Hoàn thành: {new Date(registration.completedAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Link to={`/events/${registration.eventId}`}>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VolunteerHistory
