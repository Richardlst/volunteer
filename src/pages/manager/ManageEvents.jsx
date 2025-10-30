/**
 * Manage Events - Quản lý sự kiện (Manager)
 */

import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Plus, Edit, Trash2, Calendar, MapPin } from 'lucide-react'

function ManageEvents() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Dạy học cho trẻ em vùng cao',
      date: '15/02/2024',
      location: 'Hà Giang',
      status: 'pending',
      participants: 25,
    },
  ])

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa sự kiện này?')) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Quản lý sự kiện</h1>
          <p className="text-blue-100 text-lg">Tạo và quản lý các sự kiện tình nguyện</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50">
          <Plus className="w-5 h-5 mr-2" />
          Tạo sự kiện mới
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Calendar className="h-5 w-5 text-blue-300" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="h-5 w-5 text-blue-300" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    event.status === 'pending' 
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {event.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                  </span>
                  <span className="text-blue-200">{event.participants} người đăng ký</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="text-blue-300 hover:text-white hover:bg-blue-500/20">
                  <Edit className="w-4 h-4 mr-1" />
                  Sửa
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                  onClick={() => handleDelete(event.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ManageEvents
