'use client'

import React, { ReactNode } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navbar } from './Navbar'

interface ClientLayoutProps {
  children: ReactNode
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  )
}
