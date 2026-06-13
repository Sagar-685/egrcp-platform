import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    theme: 'light',
    loading: false
  },
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen },
    setTheme: (state, action) => { state.theme = action.payload },
    setLoading: (state, action) => { state.loading = action.payload }
  }
})

export const { toggleSidebar, setTheme, setLoading } = uiSlice.actions
export default uiSlice.reducer