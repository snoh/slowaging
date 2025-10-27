'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Award, Star, Trophy, Heart, Lock } from 'lucide-react'
import { useState } from 'react'

export interface Badge {
  id: string
  name: string
  description: string
  icon: 'mind-diet' | 'exercise-master' | 'community-leader'
  earned: boolean
  earnedDate?: string
  progress?: number
  requirement: number
}

interface BadgeDisplayProps {
  badges: Badge[]
  compact?: boolean
}

const badgeIcons = {
  'mind-diet': <Star className="w-6 h-6" />,
  'exercise-master': <Trophy className="w-6 h-6" />,
  'community-leader': <Heart className="w-6 h-6" />
}

const badgeColors = {
  'mind-diet': 'from-green-400 to-emerald-600',
  'exercise-master': 'from-orange-400 to-red-600',
  'community-leader': 'from-pink-400 to-purple-600'
}

export default function BadgeDisplay({ badges, compact = false }: BadgeDisplayProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)

  if (compact) {
    return (
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {badges.filter(b => b.earned).map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badgeColors[badge.icon]} flex items-center justify-center text-white shadow-lg cursor-pointer`}
            onClick={() => setSelectedBadge(badge)}
          >
            {badgeIcons[badge.icon]}
          </motion.div>
        ))}
        {badges.filter(b => !b.earned).length > 0 && (
          <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
            <Lock className="w-5 h-5" />
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`card p-6 cursor-pointer ${
              badge.earned ? '' : 'opacity-60'
            }`}
            onClick={() => setSelectedBadge(badge)}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                  badge.earned ? badgeColors[badge.icon] : 'from-gray-300 to-gray-400'
                } flex items-center justify-center text-white shadow-lg`}
              >
                {badge.earned ? badgeIcons[badge.icon] : <Lock className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                {badge.earned ? (
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <Award className="w-3 h-3" />
                    <span>획득완료</span>
                  </div>
                ) : (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      {badge.progress || 0}/{badge.requirement}
                    </div>
                    <div className="progress-bar h-1">
                      <div
                        className="progress-fill h-full"
                        style={{ width: `${((badge.progress || 0) / badge.requirement) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 배지 상세 모달 */}
      <AnimatePresence>
        {selectedBadge && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="card p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={selectedBadge.earned ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  } : {}}
                  transition={{ duration: 0.6 }}
                  className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${
                    selectedBadge.earned ? badgeColors[selectedBadge.icon] : 'from-gray-300 to-gray-400'
                  } flex items-center justify-center text-white shadow-2xl mx-auto mb-4`}
                >
                  {selectedBadge.earned ? (
                    <div className="text-4xl">{badgeIcons[selectedBadge.icon]}</div>
                  ) : (
                    <Lock className="w-10 h-10" />
                  )}
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{selectedBadge.name}</h3>
                <p className="text-gray-600 mb-4">{selectedBadge.description}</p>
                {selectedBadge.earned ? (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-green-600 mb-1">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">획득 완료!</span>
                    </div>
                    {selectedBadge.earnedDate && (
                      <p className="text-sm text-gray-600">획득일: {selectedBadge.earnedDate}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-2">진행 상황</p>
                    <div className="text-2xl font-bold text-primary-600 mb-2">
                      {selectedBadge.progress || 0}/{selectedBadge.requirement}
                    </div>
                    <div className="progress-bar h-2">
                      <div
                        className="progress-fill"
                        style={{ width: `${((selectedBadge.progress || 0) / selectedBadge.requirement) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="w-full mt-6 btn-primary"
              >
                닫기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
