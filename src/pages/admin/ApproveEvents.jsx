/**
 * Approve Events - Duyệt sự kiện (Admin)
 */

import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Check, X, Calendar, MapPin, User } from 'lucide-react'

function ApproveEvents() {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Dạy học cho trẻ em vùng cao',
      description: 'Chương trình giáo dục tình nguyện',
      date: '15/02/2024',
      location: 'Hà Giang',
      managerName: 'Nguyễn Văn A',
      status: 'pending',
    },
  ])

  const handleApprove = (id) => {
    setEvents(events.map(e => 
      e.id === id ? { ...e, status: 'approved' } : e
    ))
  }

  const handleReject = (id) => {
    if (confirm('Bạn có chắc muốn từ chối sự kiện này?')) {
      setEvents(events.filter(e => e.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Duyệt sự kiện</h1>
        <p className="text-blue-100 text-lg">Phê duyệt các sự kiện do quản lý tạo</p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-blue-100 mb-4">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-blue-100">
                    <Calendar className="h-5 w-5 text-blue-300" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <MapPin className="h-5 w-5 text-blue-300" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-100">
                    <User className="h-5 w-5 text-blue-300" />
                    <span>Quản lý: {event.managerName}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  event.status === 'pending' 
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {event.status === 'pending' ? 'Chờ duyệt' : 'Đã duyệt'}
                </span>
              </div>
              {event.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    onClick={() => handleApprove(event.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Duyệt
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    onClick={() => handleReject(event.id)}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Từ chối
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApproveEvents
