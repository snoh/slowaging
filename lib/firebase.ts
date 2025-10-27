import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

// Window에 Firebase config와 token 타입 선언
declare global {
  interface Window {
    __firebase_config?: {
      apiKey: string
      authDomain: string
      projectId: string
      storageBucket: string
      messagingSenderId: string
      appId: string
    }
    __initial_auth_token?: string
  }
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

// Firebase 초기화 함수
export const initializeFirebase = () => {
  // 이미 초기화되었으면 반환
  if (app) {
    return { app, auth, db }
  }

  try {
    // Window에서 Firebase config 가져오기
    const firebaseConfig = typeof window !== 'undefined' ? window.__firebase_config : null

    if (!firebaseConfig) {
      console.warn('Firebase config not found in window.__firebase_config. Using default config.')
      // 기본 설정 (개발/테스트용)
      const defaultConfig = {
        apiKey: 'AIzaSyDummy-Key-For-Development',
        authDomain: 'slowaging-demo.firebaseapp.com',
        projectId: 'slowaging-demo',
        storageBucket: 'slowaging-demo.appspot.com',
        messagingSenderId: '123456789',
        appId: '1:123456789:web:abcdef123456'
      }

      app = initializeApp(defaultConfig)
    } else {
      app = initializeApp(firebaseConfig)
    }

    // Auth 초기화
    auth = getAuth(app)

    // Firestore 초기화
    db = getFirestore(app)

    console.log('Firebase initialized successfully')

    return { app, auth, db }
  } catch (error) {
    console.error('Error initializing Firebase:', error)
    throw error
  }
}

// Firebase 인스턴스 가져오기
export const getFirebaseApp = () => {
  if (!app) {
    initializeFirebase()
  }
  return app
}

export const getFirebaseAuth = () => {
  if (!auth) {
    initializeFirebase()
  }
  return auth
}

export const getFirebaseDb = () => {
  if (!db) {
    initializeFirebase()
  }
  return db
}

// 초기 Auth Token 가져오기
export const getInitialAuthToken = () => {
  if (typeof window !== 'undefined') {
    return window.__initial_auth_token || null
  }
  return null
}
