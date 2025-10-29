'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Heart,
  MessageCircle,
  Send,
  Trophy,
  Star,
  Calendar,
  TrendingUp
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore'
import { db, getSlowAgePostsPath } from '@/lib/firebase'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Post {
  id: string
  userId: string
  content: string
  cheerCount: number
  timestamp: Timestamp | null
  createdAt?: string
}

export default function Community() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentUserId] = useState(() => {
    // 간단한 사용자 ID 생성 (실제로는 인증 시스템 사용)
    if (typeof window !== 'undefined') {
      let userId = localStorage.getItem('slowage_user_id')
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('slowage_user_id', userId)
      }
      return userId
    }
    return 'anonymous'
  })

  // 실시간 게시물 가져오기
  useEffect(() => {
    try {
      const postsPath = getSlowAgePostsPath()
      const postsRef = collection(db, postsPath)
      const q = query(postsRef, orderBy('timestamp', 'desc'))

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          const postsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Post[]
          setPosts(postsData)
          setLoading(false)
        },
        (error) => {
          console.error('Error fetching posts:', error)
          toast.error('게시물을 불러오는데 실패했습니다.')
          setLoading(false)
        }
      )

      return () => unsubscribe()
    } catch (error) {
      console.error('Error setting up listener:', error)
      setLoading(false)
    }
  }, [])

  // 게시물 작성
  const handleCreatePost = async () => {
    if (!newPost.trim()) {
      toast.error('내용을 입력해주세요!')
      return
    }

    setSubmitting(true)
    try {
      const postsPath = getSlowAgePostsPath()
      const postsRef = collection(db, postsPath)

      await addDoc(postsRef, {
        userId: currentUserId,
        content: newPost.trim(),
        cheerCount: 0,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      })

      setNewPost('')
      toast.success('오늘의 성공을 공유했어요! 🎉')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('게시물 작성에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  // 응원하기
  const handleCheer = async (postId: string) => {
    try {
      const postsPath = getSlowAgePostsPath()
      const postRef = doc(db, postsPath, postId)

      await updateDoc(postRef, {
        cheerCount: increment(1)
      })

      toast.success('응원을 보냈어요! ❤️')
    } catch (error) {
      console.error('Error cheering post:', error)
      toast.error('응원에 실패했습니다.')
    }
  }

  const formatTimestamp = (timestamp: Timestamp | null) => {
    if (!timestamp) return '방금 전'

    const date = timestamp.toDate()
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return '방금 전'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}일 전`

    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="page-container bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* 네비게이션 */}
      <nav className="w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SlowAge Journey</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors">나이측정</a>
            <a href="/missions" className="text-gray-600 hover:text-primary-600 transition-colors">미션</a>
            <a href="/ar-simulator" className="text-gray-600 hover:text-primary-600 transition-colors">전망</a>
            <a href="/community" className="text-primary-600 font-semibold">공유</a>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-4">
            저속노화 커뮤니티
          </h1>
          <p className="text-gray-600 text-lg">
            함께 성장하는 저속노화 실천자들의 공간
          </p>
        </motion.div>

        {/* 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="card p-6 text-center shadow-xl rounded-xl">
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary-600 mb-1">{posts.length}</div>
            <div className="text-sm text-gray-600">공유된 성공</div>
          </div>
          <div className="card p-6 text-center shadow-xl rounded-xl">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-red-600 mb-1">
              {posts.reduce((sum, post) => sum + post.cheerCount, 0)}
            </div>
            <div className="text-sm text-gray-600">보낸 응원</div>
          </div>
          <div className="card p-6 text-center shadow-xl rounded-xl col-span-2 md:col-span-1">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-yellow-600 mb-1">
              {new Set(posts.map(p => p.userId)).size}
            </div>
            <div className="text-sm text-gray-600">활성 사용자</div>
          </div>
        </motion.div>

        {/* 게시물 작성 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-6 mb-8 shadow-xl rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            오늘의 성공을 공유하세요
          </h3>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all mb-4 resize-none"
            placeholder="예: 오늘 30분 걷기 완료! 💪&#10;예: MIND 식단으로 아침 식사 성공! 🥗&#10;예: 5분 명상으로 하루를 시작했어요 🧘"
            rows={4}
            disabled={submitting}
          />
          <button
            onClick={handleCreatePost}
            disabled={submitting || !newPost.trim()}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>공유하기</span>
              </>
            )}
          </button>
        </motion.div>

        {/* 게시물 목록 */}
        {loading ? (
          <div className="card p-12 text-center shadow-xl rounded-xl">
            <LoadingSpinner size="lg" text="게시물을 불러오는 중..." />
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 text-center shadow-xl rounded-xl"
          >
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              첫 게시물을 작성해보세요!
            </h3>
            <p className="text-gray-500">
              오늘의 작은 성공을 공유하고 서로 응원해요
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-6 hover:shadow-2xl transition-all duration-300 rounded-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {post.userId.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {post.userId}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatTimestamp(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleCheer(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-5 h-5 group-hover:fill-red-500" />
                      </motion.div>
                      <span className="font-semibold">{post.cheerCount}</span>
                      <span className="text-sm">응원</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* 커뮤니티 가이드 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card p-6 mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl rounded-xl"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center">
            <TrendingUp className="w-5 h-5 text-primary-600 mr-2" />
            커뮤니티 가이드
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>오늘 달성한 작은 성공을 자유롭게 공유해주세요</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>다른 분들의 게시물에 응원 버튼으로 격려를 보내주세요</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              <span>긍정적이고 건설적인 분위기를 함께 만들어가요</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
