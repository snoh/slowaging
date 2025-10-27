'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { initializeFirebase, getInitialAuthToken } from '@/lib/firebase'

interface AuthContextType {
  userId: string | null
  isAuthReady: boolean
  setUserId: (userId: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 임시 userId를 'user-id-1a2b3c4d5e'로 설정
  const [userId, setUserId] = useState<string | null>('user-id-1a2b3c4d5e')
  // 인증 상태를 true로 설정
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false)

  useEffect(() => {
    // Firebase 초기화
    try {
      initializeFirebase()
      console.log('Firebase initialized in AuthProvider')

      // 초기 Auth Token 확인
      const initialToken = getInitialAuthToken()
      if (initialToken) {
        console.log('Initial auth token found:', initialToken)
        // 토큰이 있으면 여기서 추가 처리 가능
      }

      // 인증 준비 완료 (임시로 즉시 true로 설정)
      setIsAuthReady(true)
      console.log('Auth ready with userId:', userId)
    } catch (error) {
      console.error('Error initializing Firebase in AuthProvider:', error)
      // 에러가 발생해도 임시로 인증 준비 완료로 설정
      setIsAuthReady(true)
    }
  }, [])

  const value = {
    userId,
    isAuthReady,
    setUserId,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
