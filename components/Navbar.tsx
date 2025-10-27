'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { userId, isAuthReady } = useAuth()

  if (!isAuthReady) {
    return (
      <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">Loading...</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <User className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-base">
                User ID: {userId}
              </span>
            </div>
          </div>
          <div className="text-white text-sm opacity-90">
            SlowAge Journey
          </div>
        </div>
      </div>
    </nav>
  )
}
