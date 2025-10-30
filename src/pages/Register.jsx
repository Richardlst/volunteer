/**
 * Register Page - Xanh dương sang trọng
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { StarField } from '../components/canvas/StarField'
import { FloatingOrbs } from '../components/canvas/FloatingOrbs'
import { User, Mail, Lock, Heart, ArrowLeft } from 'lucide-react'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <StarField starCount={150} />
      <FloatingOrbs count={4} />
      
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 z-20">
        <Button variant="ghost" className="text-blue-200 hover:text-white hover:bg-blue-500/20">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Trang chủ
        </Button>
      </Link>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 mb-4 animate-float">
            <Heart className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-3xl font-bold gradient-text-ocean mb-2">VolunteerHub</h1>
          <p className="text-blue-200/80">Bắt đầu hành trình tình nguyện</p>
        </div>

        {/* Register Card */}
        <div className="glass p-8 rounded-3xl border border-blue-400/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Đăng ký tài khoản</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-blue-200 mb-2 block">Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-blue-950/30 border border-blue-400/30 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-blue-200 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-blue-950/30 border border-blue-400/30 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-blue-200 mb-2 block">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-blue-950/30 border border-blue-400/30 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 rounded border-blue-400/30 bg-blue-950/30" 
                required 
              />
              <label htmlFor="terms" className="text-sm text-blue-200/80">
                Tôi đồng ý với{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                  Điều khoản dịch vụ
                </Link>
                {' '}và{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 py-3 text-base"
            >
              <Heart className="w-5 h-5 mr-2" />
              Tạo tài khoản
            </Button>

            <div className="text-center text-sm">
              <span className="text-blue-200/70">Đã có tài khoản? </span>
              <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
