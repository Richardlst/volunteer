/**
 * Event Registrations - Duyệt đăng ký (Manager)
 */

import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Check, X, User } from 'lucide-react'

function EventRegistrations() {
  const [registrations, setRegistrations] = useState([
    {
      id: '1',
      userName: 'Nguyễn Văn A',
      userEmail: 'nguyenvana@email.com',
      eventTitle: 'Dạy học cho trẻ em vùng cao',
      registeredAt: '10/10/2024',
      status: 'pending',
    },
    {
      id: '2',
      userName: 'Trần Thị B',
      userEmail: 'tranthib@email.com',
      eventTitle: 'Dạy học cho trẻ em vùng cao',
      registeredAt: '11/10/2024',
      status: 'approved',
    },
  ])

  const handleApprove = (id) => {
    setRegistrations(registrations.map(r => 
      r.id === id ? { ...r, status: 'approved' } : r
    ))
  }

  const handleReject = (id) => {
    if (confirm('Bạn có chắc muốn từ chối đăng ký này?')) {
      setRegistrations(registrations.map(r => 
        r.id === id ? { ...r, status: 'rejected' } : r
      ))
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Quản lý đăng ký</h1>
        <p className="text-blue-100 text-lg">Duyệt đăng ký tham gia sự kiện</p>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div key={reg.id} className="glass p-6 rounded-2xl border border-blue-400/30">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{reg.userName}</h3>
                  <p className="text-blue-200 text-sm mb-2">{reg.userEmail}</p>
                  <p className="text-blue-100 mb-2">Sự kiện: <span className="font-medium">{reg.eventTitle}</span></p>
                  <p className="text-sm text-blue-300">Đăng ký: {reg.registeredAt}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                    reg.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                    reg.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {reg.status === 'pending' ? 'Chờ duyệt' :
                     reg.status === 'approved' ? 'Đã duyệt' : 'Đã từ chối'}
                  </span>
                </div>
              </div>
              {reg.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    onClick={() => handleApprove(reg.id)}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Duyệt
                  </Button>
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    onClick={() => handleReject(reg.id)}
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

export default EventRegistrations
