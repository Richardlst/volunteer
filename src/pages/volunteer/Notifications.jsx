/**
 * Notifications - Thông báo (Tình nguyện viên)
 */

import React from 'react'
import { Bell, Check, X } from 'lucide-react'

function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Đăng ký thành công',
      message: 'Bạn đã đăng ký thành công sự kiện "Dạy học cho trẻ em vùng cao"',
      time: '2 giờ trước',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Sự kiện sắp diễn ra',
      message: 'Sự kiện "Làm sạch bãi biển" sẽ diễn ra vào ngày mai',
      time: '1 ngày trước',
      read: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Thông báo</h1>
          <p className="text-blue-100 text-lg">Cập nhật mới nhất về sự kiện của bạn</p>
        </div>
        <button className="text-blue-400 hover:text-blue-300 text-sm">
          Đánh dấu tất cả đã đọc
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`glass p-6 rounded-2xl border ${
              notif.read ? 'border-blue-400/20' : 'border-blue-400/40 bg-blue-500/5'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${
                notif.type === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
              }`}>
                <Bell className={`w-5 h-5 ${
                  notif.type === 'success' ? 'text-green-300' : 'text-blue-300'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">{notif.title}</h3>
                <p className="text-blue-100 mb-2">{notif.message}</p>
                <span className="text-sm text-blue-300">{notif.time}</span>
              </div>
              {!notif.read && (
                <button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors">
                  <Check className="w-5 h-5 text-blue-300" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
