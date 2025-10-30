/**
 * useEventService Hook - Business Logic Layer
 */

import { useState, useCallback } from 'react'
import { eventRepository } from '../services/repositories/eventRepository.js'

export function useEventService() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchEvents = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const data = await eventRepository.getEvents(filters)
      setEvents(data.events || data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const registerForEvent = useCallback(async (eventId) => {
    try {
      setLoading(true)
      await eventRepository.registerForEvent(eventId)
      // Update UI
      setEvents(prev => prev.map(e => 
        e.id === eventId ? { ...e, isRegistered: true } : e
      ))
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    events,
    loading,
    error,
    fetchEvents,
    registerForEvent,
  }
}
