/**
 * Events Page - Xanh dương sáng, dễ đọc
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useEventService } from '../hooks/useEventService'
import { Button } from '../components/ui/Button'
import { Calendar, MapPin, Users, Plus } from 'lucide-react'

function Events() {
  const { events, loading, fetchEvents } = useEventService()

  useEffect(() => {
    // Mock data cho demo
    // fetchEvents()
  }, [])

  const mockEvents = [
    {
      id: '1',
      title: 'Dạy học cho trẻ em vùng cao',
      description: 'Chương trình giáo dục tình nguyện',
      location: 'Hà Giang',
      date: '2024-02-15',
      participants: 25,
      maxParticipants: 30,
    },
    {
      id: '2',
      title: 'Làm sạch bãi biển',
      description: 'Hoạt động bảo vệ môi trường',
      location: 'Vũng Tàu',
      date: '2024-02-18',
      participants: 42,
      maxParticipants: 50,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Sự kiện</h1>
          <p className="text-blue-100 text-lg">Tìm kiếm và tham gia các hoạt động tình nguyện</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50">
          <Plus className="w-5 h-5 mr-2" />
          Tạo sự kiện
        </Button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <div key={event.id} className="glass p-6 rounded-2xl border border-blue-400/30 card-hover">
            <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
            <p className="text-blue-100 mb-4">{event.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="h-5 w-5 text-blue-300" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Calendar className="h-5 w-5 text-blue-300" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Users className="h-5 w-5 text-blue-300" />
                <span>{event.participants}/{event.maxParticipants} người</span>
              </div>
            </div>

            <Link to={`/events/${event.id}`}>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                Xem chi tiết
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Events
