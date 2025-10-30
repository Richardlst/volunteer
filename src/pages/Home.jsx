/**
 * Home Page - Landing Page với Canvas Effects
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Calendar, Users, Award, Heart, Globe } from 'lucide-react'
import { AnimatedBackground } from '../components/canvas/AnimatedBackground'
import { FloatingOrbs } from '../components/canvas/FloatingOrbs'
import { WaveEffect } from '../components/canvas/WaveEffect'

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Canvas Backgrounds */}
      <AnimatedBackground />
      <FloatingOrbs count={6} />
      
      {/* Hero Section */}
      <section className="relative py-32 text-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 mb-8 animate-float">
            <Heart className="w-10 h-10 text-blue-300" />
          </div>
          
          <h1 className="text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text-ocean">VolunteerHub</span>
          </h1>
          
          <p className="text-xl mb-4 max-w-2xl mx-auto text-blue-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Nền tảng kết nối tình nguyện viên với các hoạt động ý nghĩa
          </p>
          
          <p className="text-lg mb-12 max-w-xl mx-auto text-blue-200/80 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Tham gia cùng hàng nghìn tình nguyện viên để tạo nên sự thay đổi tích cực cho cộng đồng
          </p>
          
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 px-8">
                <Heart className="w-5 h-5 mr-2" />
                Bắt đầu ngay
              </Button>
            </Link>
            <Link to="/events">
              <Button size="lg" className="glass border-blue-400/30 text-white hover:bg-white/10 backdrop-blur-md">
                <Globe className="w-5 h-5 mr-2" />
                Khám phá sự kiện
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Tại sao chọn VolunteerHub?
          </h2>
          <p className="text-center text-blue-200 mb-16 max-w-2xl mx-auto">
            Chúng tôi cung cấp nền tảng tốt nhất để bạn có thể tạo ra sự khác biệt
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl text-center card-hover border border-blue-400/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 mb-6">
                <Calendar className="h-10 w-10 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Dễ dàng tìm kiếm</h3>
              <p className="text-blue-200/80">
                Tìm kiếm và đăng ký các hoạt động tình nguyện phù hợp với bạn chỉ trong vài click
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl text-center card-hover border border-blue-400/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 mb-6">
                <Users className="h-10 w-10 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Cộng đồng lớn</h3>
              <p className="text-blue-200/80">
                Kết nối với hàng nghìn tình nguyện viên nhiệt huyết trên cả nước
              </p>
            </div>
            
            <div className="glass p-8 rounded-2xl text-center card-hover border border-blue-400/20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 mb-6">
                <Award className="h-10 w-10 text-blue-300" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-white">Theo dõi thành tích</h3>
              <p className="text-blue-200/80">
                Ghi nhận và theo dõi mọi đóng góp của bạn cho cộng đồng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <WaveEffect />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="glass max-w-3xl mx-auto p-12 rounded-3xl border border-blue-400/30">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Sẵn sàng tạo sự khác biệt?
            </h2>
            <p className="text-blue-200 mb-8 text-lg">
              Hãy bắt đầu hành trình tình nguyện của bạn ngay hôm nay
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 px-12">
                <Heart className="w-5 h-5 mr-2" />
                Đăng ký miễn phí
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
