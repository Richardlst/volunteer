/**
 * Event Approval Page - Admin duyệt/từ chối events
 */

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckCircle, XCircle, Calendar, MapPin, 
  User, Clock, ArrowLeft, AlertCircle 
} from 'lucide-react'
import { adminRepository } from '../../services/repositories/adminRepository'
import { Button } from '../../components/ui/Button'

function EventApproval() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  useEffect(() => {
    loadPendingEvents()
  }, [])

  const loadPendingEvents = async () => {
    try {
      setLoading(true)
      const data = await adminRepository.getPendingEvents()
      setEvents(data)
    } catch (err) {
      console.error('Error loading events:', err)
      setError('Không thể tải danh sách sự kiện')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (eventId) => {
    if (!confirm('Bạn có chắc muốn duyệt sự kiện này?')) return

    try {
      setActionLoading(eventId)
      await adminRepository.approveEvent(eventId)
      setEvents(events.filter(e => e.id !== eventId))
      alert('Đã duyệt sự kiện thành công!')
    } catch (err) {
      console.error('Error approving event:', err)
      alert('Không thể duyệt sự kiện')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (eventId) => {
    const reason = prompt('Lý do từ chối:')
    if (!reason) return

    try {
      setActionLoading(eventId)
      await adminRepository.rejectEvent(eventId, { reason })
      setEvents(events.filter(e => e.id !== eventId))
      alert('Đã từ chối sự kiện')
    } catch (err) {
      console.error('Error rejecting event:', err)
      alert('Không thể từ chối sự kiện')
    } finally {
      setActionLoading(null)
    }
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
          <Link to="/admin" className="inline-flex items-center text-blue-300 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Duyệt sự kiện</h1>
          <p className="text-blue-200">
            {events.length} sự kiện đang chờ phê duyệt
          </p>
        </div>

        {error && (
          <div className="mb-6 glass p-4 rounded-xl border border-red-400/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {events.length === 0 ? (
          <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Không có sự kiện chờ duyệt
            </h2>
            <p className="text-blue-200">
              Tất cả sự kiện đã được xử lý
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="glass p-6 rounded-2xl border border-blue-400/30 hover:border-blue-400/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-blue-200 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-blue-300">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.startTime).toLocaleDateString('vi-VN')}
                          {' - '}
                          {new Date(event.endTime).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-blue-300">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location || 'Chưa có địa điểm'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-blue-300">
                        <User className="w-4 h-4" />
                        <span>Danh mục: {event.category || 'Chưa phân loại'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-blue-300">
                        <Clock className="w-4 h-4" />
                        <span>
                          Tạo: {new Date(event.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-3 lg:w-48">
                    <Button
                      onClick={() => handleApprove(event.id)}
                      disabled={actionLoading === event.id}
                      className="flex-1 lg:flex-none bg-green-500 hover:bg-green-600 text-white py-3 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {actionLoading === event.id ? 'Đang xử lý...' : 'Duyệt'}
                    </Button>
                    
                    <Button
                      onClick={() => handleReject(event.id)}
                      disabled={actionLoading === event.id}
                      className="flex-1 lg:flex-none bg-red-500 hover:bg-red-600 text-white py-3 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Từ chối
                    </Button>
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

export default EventApproval
