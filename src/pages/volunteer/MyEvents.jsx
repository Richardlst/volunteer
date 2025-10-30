/**
 * My Events - Sự kiện của tôi (Tình nguyện viên)
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Calendar, MapPin, Users, X } from 'lucide-react'

function MyEvents() {
  const [activeTab, setActiveTab] = useState('registered') // registered, completed

  const registeredEvents = [
    {
      id: '1',
      title: 'Dạy học cho trẻ em vùng cao',
      date: '15/02/2024',
      location: 'Hà Giang',
      status: 'confirmed',
    },
  ]

  const completedEvents = [
    {
      id: '2',
      title: 'Làm sạch bãi biển',
      date: '10/01/2024',
      location: 'Vũng Tàu',
      status: 'completed',
    },
  ]

  const handleUnregister = (eventId) => {
    if (confirm('Bạn có chắc muốn hủy đăng ký sự kiện này?')) {
      // TODO: Call API
      alert('Đã hủy đăng ký')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Sự kiện của tôi</h1>
        <p className="text-blue-100 text-lg">Quản lý các sự kiện bạn đã đăng ký</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-blue-400/30">
        <button
          onClick={() => setActiveTab('registered')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'registered'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-blue-200 hover:text-white'
          }`}
        >
          Đã đăng ký ({registeredEvents.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'completed'
              ? 'text-white border-b-2 border-blue-500'
              : 'text-blue-200 hover:text-white'
          }`}
        >
          Đã hoàn thành ({completedEvents.length})
        </button>
      </div>

      {/* Event List */}
      <div className="space-y-4">
        {activeTab === 'registered' && registeredEvents.map((event) => (
          <div key={event.id} className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Calendar className="h-5 w-5 text-blue-300" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="h-5 w-5 text-blue-300" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                  Đã xác nhận
                </span>
              </div>
              <div className="flex gap-2">
                <Link to={`/events/${event.id}`}>
                  <Button size="sm">Chi tiết</Button>
                </Link>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  onClick={() => handleUnregister(event.id)}
                >
                  <X className="w-4 h-4 mr-1" />
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'completed' && completedEvents.map((event) => (
          <div key={event.id} className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Calendar className="h-5 w-5 text-blue-300" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="h-5 w-5 text-blue-300" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                  Đã hoàn thành
                </span>
              </div>
              <Link to={`/events/${event.id}`}>
                <Button size="sm">Xem lại</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyEvents
