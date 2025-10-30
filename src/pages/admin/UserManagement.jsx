/**
 * User Management - Quản lý người dùng (Admin)
 */

import React, { useState } from 'react'
import { Button } from '../../components/ui/Button'
import { Lock, Unlock, User, Mail } from 'lucide-react'

function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      role: 'volunteer',
      status: 'active',
      joinedAt: '01/01/2024',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      role: 'manager',
      status: 'active',
      joinedAt: '15/01/2024',
    },
  ])

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'active' ? 'locked' : 'active' }
        : u
    ))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Quản lý người dùng</h1>
        <p className="text-blue-100 text-lg">Quản lý tài khoản tình nguyện viên và quản lý sự kiện</p>
      </div>

      <div className="glass p-6 rounded-2xl border border-blue-400/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-400/30">
                <th className="text-left py-3 px-4 text-blue-200 font-medium">Người dùng</th>
                <th className="text-left py-3 px-4 text-blue-200 font-medium">Vai trò</th>
                <th className="text-left py-3 px-4 text-blue-200 font-medium">Trạng thái</th>
                <th className="text-left py-3 px-4 text-blue-200 font-medium">Ngày tham gia</th>
                <th className="text-right py-3 px-4 text-blue-200 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-blue-400/20">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-sm text-blue-300">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'manager'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {user.role === 'manager' ? 'Quản lý' : 'Tình nguyện viên'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'active'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-blue-100">{user.joinedAt}</td>
                  <td className="py-4 px-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className={user.status === 'active' 
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-500/20'
                        : 'text-green-400 hover:text-green-300 hover:bg-green-500/20'
                      }
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.status === 'active' ? (
                        <>
                          <Lock className="w-4 h-4 mr-1" />
                          Khóa
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 mr-1" />
                          Mở khóa
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserManagement
