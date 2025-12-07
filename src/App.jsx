import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Community from './pages/Community'
import MyEvents from './pages/volunteer/MyEvents'
import Notifications from './pages/volunteer/Notifications'
import ManageEvents from './pages/manager/ManageEvents'
import EventRegistrations from './pages/manager/EventRegistrations'
import ApproveEvents from './pages/admin/ApproveEvents'
import UserManagement from './pages/admin/UserManagement'
import AdminDashboard from './pages/admin/AdminDashboard'
import EventApproval from './pages/admin/EventApproval'
import VolunteerHistory from './pages/volunteer/VolunteerHistory'

function App() {
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
  }

  // Load user from localStorage or API
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('auth_token')
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/events"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Events />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/events/:id"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <EventDetail />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/community"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Community />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my-events"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <MyEvents />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/volunteer/history"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <VolunteerHistory />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Manager routes */}
        <Route
          path="/manager/events"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <ManageEvents />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/manager/registrations"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <EventRegistrations />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            user && user.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/events/pending"
          element={
            user && user.role === 'admin' ? (
              <EventApproval />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/events"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <ApproveEvents />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            user ? (
              <Layout user={user} onLogout={handleLogout}>
                <UserManagement />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
