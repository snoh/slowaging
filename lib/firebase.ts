import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase 설정 - 환경변수 사용 권장
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemoKey123456789",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "slowage-journey.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "slowage-journey",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "slowage-journey.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
}

// Firebase 앱 초기화 (이미 초기화되어 있으면 기존 앱 사용)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Firestore 인스턴스
export const db = getFirestore(app)

// Firestore 컬렉션 경로 헬퍼
export const getSlowAgePostsPath = () => {
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'slowage-default'
  return `artifacts/${appId}/public/data/slowAgePosts`
}

export const getUserProgressPath = (userId: string) => {
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'slowage-default'
  return `artifacts/${appId}/users/${userId}/progress`
}

export const getUserBadgesPath = (userId: string) => {
  const appId = process.env.NEXT_PUBLIC_APP_ID || 'slowage-default'
  return `artifacts/${appId}/users/${userId}/badges`
}
