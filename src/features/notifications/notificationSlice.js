import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notificationsData from '../../mocks/notifications.json'

export const fetchNotifications = createAsyncThunk('notifications/fetchAll', async () => {
  await new Promise(r => setTimeout(r, 400))
  return notificationsData
})

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { notifications: [], loading: false },
  reducers: {
    markAsRead: (state, action) => {
      const notif = state.notifications.find(n => n.id === action.payload)
      if (notif) notif.read = true
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => { n.read = true })
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => { state.loading = true })
      .addCase(fetchNotifications.fulfilled, (state, action) => { state.loading = false; state.notifications = action.payload })
  }
})

export const { markAsRead, markAllAsRead } = notificationSlice.actions
export default notificationSlice.reducer