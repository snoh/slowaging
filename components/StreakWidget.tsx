'use client'

import { motion } from 'framer-motion'
import { Flame, TrendingUp, Calendar } from 'lucide-react'

interface StreakWidgetProps {
  streak: number
  maxStreak?: number
  lastActivityDate?: string
}

export default function StreakWidget({ streak, maxStreak = 0, lastActivityDate }: StreakWidgetProps) {
  const getStreakColor = () => {
    if (streak >= 30) return 'from-red-500 to-orange-500'
    if (streak >= 14) return 'from-orange-500 to-yellow-500'
    if (streak >= 7) return 'from-yellow-500 to-green-500'
    return 'from-green-500 to-emerald-500'
  }

  const getStreakMessage = () => {
    if (streak === 0) return '오늘부터 시작하세요!'
    if (streak === 1) return '좋은 시작이에요!'
    if (streak < 7) return '계속 이어가고 있어요!'
    if (streak < 14) return '1주일 달성! 대단해요!'
    if (streak < 30) return '2주 연속! 습관이 되고 있어요!'
    return '한 달 연속! 놀라워요!'
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="card p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div
            animate={streak > 0 ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{
              duration: 0.5,
              repeat: streak > 0 ? Infinity : 0,
              repeatDelay: 2
            }}
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getStreakColor()} flex items-center justify-center`}
          >
            <Flame className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">연속 성공 일수</h3>
            <p className="text-xs text-gray-500">{getStreakMessage()}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {streak}
          </div>
          <div className="text-xs text-gray-500">일째</div>
        </div>
      </div>

      {maxStreak > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-orange-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>최고 기록: {maxStreak}일</span>
          </div>
          {lastActivityDate && (
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{lastActivityDate}</span>
            </div>
          )}
        </div>
      )}

      {/* 진행 바 */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>다음 마일스톤</span>
          <span>{streak}/{Math.ceil((streak + 1) / 7) * 7}일</span>
        </div>
        <div className="progress-bar h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(streak % 7) / 7 * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${getStreakColor()} rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  )
}
