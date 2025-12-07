/**
 * Login Page - Xanh dương sang trọng
 */

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { StarField } from '../components/canvas/StarField'
import { FloatingOrbs } from '../components/canvas/FloatingOrbs'
import { Mail, Lock, Heart, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react'
import { authRepository } from '../services/repositories/authRepository'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authRepository.login({ email, password })
      
      // Login successful - authRepository already saved token and user
      // Just navigate to home page
      navigate('/')
      
      // Reload to update user state
      window.location.reload()
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.')
    } finally {
      setLoading(false)
    }
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
          <p className="text-blue-200/80">Chào mừng trở lại</p>
        </div>

        {/* Login Card */}
        <div className="glass p-8 rounded-3xl border border-blue-400/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Đăng nhập</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-blue-200 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-blue-950/30 border border-blue-400/30 rounded-xl text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-blue-200 cursor-pointer">
                <input type="checkbox" className="rounded border-blue-400/30 bg-blue-950/30" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-400/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-blue-300/70 bg-transparent">Hoặc</span>
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-blue-200/70">Chưa có tài khoản? </span>
              <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-blue-200/60 mt-6">
          Bằng việc đăng nhập, bạn đồng ý với{' '}
          <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
            Điều khoản dịch vụ
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
