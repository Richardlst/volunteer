/**
 * Event Detail Page - Xanh dương sáng, dễ đọc
 */

import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Calendar, MapPin, Users, Clock, Heart, ArrowLeft } from 'lucide-react'

function EventDetail() {
  const { id } = useParams()

  const event = {
    title: 'Dạy học cho trẻ em vùng cao',
    description: 'Chương trình giáo dục tình nguyện tại các vùng núi phía Bắc. Chúng tôi cần tình nguyện viên để dạy học cho các em nhỏ, giúp các em tiếp cận với kiến thức và phát triển toàn diện.',
    location: 'Hà Giang',
    date: '15/02/2024',
    time: '08:00 - 17:00',
    participants: 25,
    maxParticipants: 30,
    organizer: 'Nguyễn Văn A',
    category: 'Giáo dục',
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/events">
        <Button variant="ghost" className="text-blue-200 hover:text-white hover:bg-blue-500/20">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
      </Link>

      {/* Event Header */}
      <div className="glass p-8 rounded-3xl border border-blue-400/30">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm font-medium">
              {event.category}
            </span>
            <h1 className="text-4xl font-bold text-white mt-4 mb-3">{event.title}</h1>
            <p className="text-blue-100 text-lg">{event.description}</p>
          </div>
        </div>
        
        {/* Event Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Calendar className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-blue-200 mb-1">Ngày diễn ra</p>
              <p className="font-semibold text-white text-lg">{event.date}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Clock className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-blue-200 mb-1">Thời gian</p>
              <p className="font-semibold text-white text-lg">{event.time}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <MapPin className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-blue-200 mb-1">Địa điểm</p>
              <p className="font-semibold text-white text-lg">{event.location}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Users className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-blue-200 mb-1">Người tham gia</p>
              <p className="font-semibold text-white text-lg">{event.participants}/{event.maxParticipants}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 py-6 text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Đăng ký tham gia
          </Button>
          <Button variant="ghost" className="px-6 text-blue-200 hover:text-white hover:bg-blue-500/20">
            Chia sẻ
          </Button>
        </div>
      </div>

      {/* Organizer Info */}
      <div className="glass p-6 rounded-2xl border border-blue-400/30">
        <h3 className="text-xl font-bold text-white mb-4">Người tổ chức</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white">{event.organizer}</p>
            <p className="text-sm text-blue-200">Quản lý sự kiện</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
