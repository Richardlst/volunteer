/**
 * Dashboard Page - Xanh dương sang trọng
 */

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { Calendar, Users, Award, TrendingUp, Clock, Heart } from 'lucide-react'

const stats = [
  { icon: Calendar, label: 'Sự kiện tham gia', value: '12', trend: '+3', color: 'from-blue-500 to-blue-600' },
  { icon: Clock, label: 'Giờ tình nguyện', value: '48', trend: '+12', color: 'from-cyan-500 to-cyan-600' },
  { icon: Award, label: 'Huy chương', value: '5', trend: '+2', color: 'from-indigo-500 to-indigo-600' },
]

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-blue-200">Chào mừng bạn trở lại! 👋</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl border border-blue-400/30">
          <p className="text-sm text-blue-200">Hôm nay</p>
          <p className="text-lg font-semibold text-white">{new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="glass p-6 rounded-2xl border border-blue-400/30 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <p className="text-sm text-blue-200 mb-1">{stat.label}</p>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="glass p-6 rounded-2xl border border-blue-400/30">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Hoạt động gần đây</h2>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            Xem tất cả →
          </button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-blue-950/30 border border-blue-400/20 hover:border-blue-400/40 transition-all">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">Tham gia sự kiện tình nguyện</p>
                <p className="text-sm text-blue-200/70">Dạy học cho trẻ em vùng cao</p>
              </div>
              <span className="text-sm text-blue-300">2 ngày trước</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="glass p-6 rounded-2xl border border-blue-400/30">
        <h2 className="text-2xl font-bold text-white mb-6">Sự kiện sắp tới</h2>
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-blue-400/50 mx-auto mb-4" />
          <p className="text-blue-200/70">Chưa có sự kiện nào</p>
          <p className="text-sm text-blue-300/50 mt-2">Hãy khám phá và đăng ký sự kiện mới</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
