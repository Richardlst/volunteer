/**
 * Community Page - Xanh dương sáng, dễ đọc
 */

import React, { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Heart, MessageCircle, Share2, Send } from 'lucide-react'

function Community() {
  const [newPost, setNewPost] = useState('')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Cộng đồng</h1>
        <p className="text-blue-100 text-lg">Kết nối và chia sẻ với cộng đồng tình nguyện</p>
      </div>

      {/* Create Post */}
      <div className="glass p-6 rounded-2xl border border-blue-400/30">
        <h3 className="text-xl font-bold text-white mb-4">Tạo bài viết mới</h3>
        <textarea 
          className="w-full bg-blue-950/30 border border-blue-400/30 rounded-xl p-4 text-white placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-none"
          placeholder="Bạn đang nghĩ gì? Chia sẻ câu chuyện tình nguyện của bạn..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50">
            <Send className="w-4 h-4 mr-2" />
            Đăng bài
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {/* Sample Posts */}
        {[1, 2].map((i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-blue-400/30">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                NV
              </div>
              <div>
                <p className="font-semibold text-white">Nguyễn Văn A</p>
                <p className="text-sm text-blue-200">2 giờ trước</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-blue-100 mb-4 leading-relaxed">
              Hôm nay mình đã có một ngày thật ý nghĩa khi tham gia chương trình dạy học cho trẻ em vùng cao. 
              Những nụ cười hồn nhiên của các em là động lực lớn nhất! 💙
            </p>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-blue-400/20">
              <button className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors">
                <Heart className="w-5 h-5" />
                <span>24</span>
              </button>
              <button className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>8</span>
              </button>
              <button className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
          <MessageCircle className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
          <p className="text-blue-100 text-lg">Hãy là người đầu tiên chia sẻ câu chuyện của bạn!</p>
          <p className="text-blue-200/70 mt-2">Cộng đồng đang chờ đợi những câu chuyện tình nguyện ý nghĩa</p>
        </div>
      </div>
    </div>
  )
}

export default Community
