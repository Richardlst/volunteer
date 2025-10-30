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

function App() {
  const [user, setUser] = useState(null)

  const handleLogout = () => {
    setUser(null)
  }

  //Uncomment để test với user đã login
  React.useEffect(() => {
    setUser({
      name: 'Nguyễn Văn A',
      email: 'user@example.com',
      role: 'admin',
    })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
