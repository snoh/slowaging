'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Heart, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Trophy,
  Star,
  Calendar,
  TrendingUp,
  Award,
  Send,
  Image as ImageIcon,
  Smile
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Post {
  id: string
  author: string
  avatar: string
  level: number
  title: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  category: 'success' | 'question' | 'tip' | 'challenge'
  tags: string[]
  isLiked: boolean
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: '김저속',
    avatar: '👨‍💼',
    level: 5,
    title: '3개월 만에 생체 나이 3세 젊어졌어요!',
    content: '정희원 교수님의 저속노화 식단을 꾸준히 실천한 결과입니다. MIND 식단과 주 3회 운동, 그리고 명상을 병행했더니 정말 놀라운 변화가 있었어요. 여러분도 포기하지 마세요!',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
    likes: 127,
    comments: 23,
    shares: 15,
    timestamp: '2시간 전',
    category: 'success',
    tags: ['성공스토리', '생체나이', 'MIND식단'],
    isLiked: false
  },
  {
    id: '2',
    author: '건강한영희',
    avatar: '👩‍⚕️',
    level: 4,
    title: '명상 초보자를 위한 팁',
    content: '처음 명상을 시작할 때는 5분부터 시작하세요. 너무 길게 하려고 하면 오히려 스트레스가 될 수 있어요. 꾸준함이 중요합니다!',
    likes: 89,
    comments: 12,
    shares: 8,
    timestamp: '4시간 전',
    category: 'tip',
    tags: ['명상', '초보자', '팁'],
    isLiked: true
  },
  {
    id: '3',
    author: '운동마니아',
    avatar: '💪',
    level: 3,
    title: '7일 연속 운동 챌린지 참여하세요!',
    content: '함께 운동해요! 매일 30분씩 걷기 챌린지에 참여하시는 분들 댓글로 인증해주세요. 함께하면 더 재미있어요!',
    likes: 156,
    comments: 45,
    shares: 32,
    timestamp: '6시간 전',
    category: 'challenge',
    tags: ['챌린지', '운동', '걷기'],
    isLiked: false
  },
  {
    id: '4',
    author: '수면전문가',
    avatar: '😴',
    level: 4,
    title: '수면의 질을 높이는 방법',
    content: '11시 전에 잠자리에 드는 것이 중요해요. 스마트폰은 침실 밖에 두고, 따뜻한 우유나 허브차를 마시면 도움이 됩니다.',
    likes: 73,
    comments: 18,
    shares: 11,
    timestamp: '8시간 전',
    category: 'tip',
    tags: ['수면', '건강', '습관'],
    isLiked: false
  }
]

const sampleComments: Comment[] = [
  {
    id: '1',
    author: '응원단장',
    avatar: '👏',
    content: '정말 대단하세요! 저도 따라해보겠습니다.',
    timestamp: '1시간 전',
    likes: 5,
    isLiked: false
  },
  {
    id: '2',
    author: '건강지킴이',
    avatar: '🛡️',
    content: 'MIND 식단 레시피 공유해주실 수 있나요?',
    timestamp: '30분 전',
    likes: 3,
    isLiked: true
  }
]

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState('')
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'tip' as const
  })
  const [showNewPost, setShowNewPost] = useState(false)

  const categories = [
    { id: 'all', name: '전체', icon: <Users className="w-5 h-5" /> },
    { id: 'success', name: '성공스토리', icon: <Trophy className="w-5 h-5" /> },
    { id: 'tip', name: '팁&노하우', icon: <Star className="w-5 h-5" /> },
    { id: 'challenge', name: '챌린지', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'question', name: '질문&답변', icon: <MessageCircle className="w-5 h-5" /> }
  ]

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  )

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ))
    
    const post = posts.find(p => p.id === postId)
    if (post) {
      toast.success(post.isLiked ? '좋아요를 취소했습니다' : '좋아요를 눌렀습니다!')
    }
  }

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ))
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: '나',
      avatar: '👤',
      content: newComment,
      timestamp: '방금 전',
      likes: 0,
      isLiked: false
    }

    setComments(prev => [comment, ...prev])
    setNewComment('')
    
    if (selectedPost) {
      setPosts(prev => prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: post.comments + 1 }
          : post
      ))
    }
    
    toast.success('댓글이 작성되었습니다!')
  }

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: '나',
      avatar: '👤',
      level: 1,
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: '방금 전',
      category: newPost.category,
      tags: [],
      isLiked: false
    }

    setPosts(prev => [post, ...prev])
    setNewPost({ title: '', content: '', category: 'tip' })
    setShowNewPost(false)
    
    toast.success('게시글이 작성되었습니다!')
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'tip': return 'bg-blue-100 text-blue-800'
      case 'challenge': return 'bg-orange-100 text-orange-800'
      case 'question': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'success': return '성공스토리'
      case 'tip': return '팁&노하우'
      case 'challenge': return '챌린지'
      case 'question': return '질문&답변'
      default: return '일반'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      {/* 네비게이션 */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SlowAge Journey</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary-600 transition-colors">생체 나이</a>
            <a href="/missions" className="text-gray-600 hover:text-primary-600 transition-colors">미션</a>
            <a href="/ar-simulator" className="text-gray-600 hover:text-primary-600 transition-colors">AR 시뮬레이터</a>
            <a href="/community" className="text-primary-600 font-semibold">커뮤니티</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-6xl">
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">2,547</div>
            <div className="text-sm text-gray-600">활성 사용자</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,234</div>
            <div className="text-sm text-gray-600">성공 스토리</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5,678</div>
            <div className="text-sm text-gray-600">공유된 팁</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">89</div>
            <div className="text-sm text-gray-600">진행 중인 챌린지</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 사이드바 */}
          <div className="lg:col-span-1">
            {/* 카테고리 필터 */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">카테고리</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 새 게시글 작성 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">새 게시글</h3>
              <button
                onClick={() => setShowNewPost(true)}
                className="w-full btn-primary"
              >
                글쓰기
              </button>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            {/* 게시글 목록 */}
            <div className="space-y-6">
              <AnimatePresence>
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    {/* 게시글 헤더 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                          {post.avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">
                              Lv.{post.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{post.timestamp}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(post.category)}`}>
                              {getCategoryName(post.category)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 게시글 내용 */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4">
                          <img 
                            src={post.image} 
                            alt="게시글 이미지" 
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* 태그 */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-2 transition-colors ${
                            post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                          }`}
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 새 게시글 작성 모달 */}
        {showNewPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6">새 게시글 작성</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value as any})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="tip">팁&노하우</option>
                    <option value="success">성공스토리</option>
                    <option value="challenge">챌린지</option>
                    <option value="question">질문&답변</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 h-32"
                    placeholder="내용을 입력하세요"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleCreatePost}
                  className="btn-primary"
                >
                  게시하기
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* 댓글 모달 */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">댓글</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              {/* 원본 게시글 */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">{selectedPost.title}</h3>
                <p className="text-gray-700">{selectedPost.content}</p>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center space-x-1 text-xs transition-colors ${
                          comment.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* 댓글 작성 */}
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="댓글을 입력하세요..."
                />
                <button
                  onClick={handleAddComment}
                  className="btn-primary"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
