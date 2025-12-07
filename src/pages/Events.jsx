/**
 * Events Page - Xanh dương sáng, dễ đọc
 */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Calendar, MapPin, Users, Plus, AlertCircle } from 'lucide-react'
import { eventRepository } from '../services/repositories/eventRepository'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await eventRepository.getEvents({ status: 'approved' })
      setEvents(data)
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Không thể tải sự kiện. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Sự kiện</h1>
          <p className="text-blue-100 text-lg">Tìm kiếm và tham gia các hoạt động tình nguyện</p>
        </div>
        <Link to="/events/create">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50">
            <Plus className="w-5 h-5 mr-2" />
            Tạo sự kiện
          </Button>
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass p-4 rounded-2xl border border-red-500/30 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Events Grid */}
      {loading && (
        <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
          <p className="text-blue-100 text-lg">Đang tải sự kiện...</p>
        </div>
      )}

      {!loading && events.length === 0 && !error && (
        <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
          <Calendar className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
          <p className="text-blue-100 text-lg">Chưa có sự kiện nào</p>
          <p className="text-blue-200/70 mt-2">Hãy tạo sự kiện đầu tiên của bạn!</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.eventId} className="glass p-6 rounded-2xl border border-blue-400/30 card-hover">
              <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
              <p className="text-blue-100 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-blue-100">
                  <MapPin className="h-5 w-5 text-blue-300" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Calendar className="h-5 w-5 text-blue-300" />
                  <span>{formatDate(event.startTime)}</span>
                </div>
                {event.category && (
                  <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-blue-200">
                    {event.category}
                  </div>
                )}
              </div>

              <Link to={`/events/${event.eventId}`}>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                  Xem chi tiết
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Events
