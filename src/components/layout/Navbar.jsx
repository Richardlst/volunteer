/**
 * Navbar Component - Xanh dương sang trọng
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, User, Heart } from 'lucide-react'
import { Button } from '../ui/Button'

function Navbar({ user, onLogout }) {
  return (
    <nav className="glass border-b border-blue-400/30 sticky top-0 z-50 backdrop-blur-xl">
      <div className="w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text-ocean">VolunteerHub</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/30 border border-blue-400/30">
                  <User className="h-4 w-4 text-blue-300" />
                  <span className="text-sm text-white">{user.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  className="text-blue-200 hover:text-white hover:bg-blue-500/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-blue-200 hover:text-white hover:bg-blue-500/20">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    Đăng ký
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
