/**
 * Layout Component - Xanh dương sang trọng
 */

import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { AnimatedBackground } from '../canvas/AnimatedBackground'

function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="flex relative z-10">
        {user && <Sidebar user={user} />}
        
        <main className="flex-1 overflow-x-hidden">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
