/**
 * Community Page - Xanh dương sáng, dễ đọc
 */

import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Heart, MessageCircle, Share2, Send, AlertCircle } from 'lucide-react'
import { postRepository } from '../services/repositories/postRepository'

function Community() {
  const [newPost, setNewPost] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const data = await postRepository.getPosts()
      setPosts(data)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Không thể tải bài viết. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPost = async () => {
    if (!newPost.trim()) return

    setSubmitting(true)
    setError('')
    try {
      const createdPost = await postRepository.createPost({
        content: newPost,
        // eventId is optional - null for general community posts
      })
      setPosts([createdPost, ...posts])
      setNewPost('')
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Không thể đăng bài. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLikePost = async (postId) => {
    try {
      await postRepository.likePost(postId)
      // Update local state
      setPosts(posts.map(post => 
        post.postId === postId 
          ? { ...post, noLike: post.noLike + 1 }
          : post
      ))
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} phút trước`
    if (diffHours < 24) return `${diffHours} giờ trước`
    if (diffDays < 7) return `${diffDays} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Cộng đồng</h1>
        <p className="text-blue-100 text-lg">Kết nối và chia sẻ với cộng đồng tình nguyện</p>
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
          <Button 
            onClick={handleSubmitPost}
            disabled={submitting || !newPost.trim()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitting ? 'Đang đăng...' : 'Đăng bài'}
          </Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {loading && (
          <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
            <p className="text-blue-100 text-lg">Đang tải bài viết...</p>
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="glass p-12 rounded-2xl border border-blue-400/30 text-center">
            <MessageCircle className="w-16 h-16 text-blue-400/50 mx-auto mb-4" />
            <p className="text-blue-100 text-lg">Hãy là người đầu tiên chia sẻ câu chuyện của bạn!</p>
            <p className="text-blue-200/70 mt-2">Cộng đồng đang chờ đợi những câu chuyện tình nguyện ý nghĩa</p>
          </div>
        )}

        {/* Posts */}
        {posts.map((post) => (
          <div key={post.postId} className="glass p-6 rounded-2xl border border-blue-400/30">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                {post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-semibold text-white">{post.authorName || 'Người dùng'}</p>
                <p className="text-sm text-blue-200">{formatDate(post.createdAt)}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-blue-100 mb-4 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-4 border-t border-blue-400/20">
              <button 
                onClick={() => handleLikePost(post.postId)}
                className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>{post.noLike || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.noComment || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community
