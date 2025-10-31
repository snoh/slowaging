import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SlowAge Journey - 저속노화 체험형 플랫폼',
  description: '심리학 이론 기반 저속노화 체험형 플랫폼으로 건강한 습관을 만들고 생체 나이를 젊게 유지하세요.',
  keywords: ['저속노화', '건강', '습관', '생체나이', '웰니스'],
  authors: [{ name: 'SlowAge Team' }],
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  )
}

