import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const mockAuditLogs = [
  { id: 1, user: 'Alice Johnson', action: 'Approved PR002', module: 'Procurement', timestamp: '2024-01-20 10:30', ip: '192.168.1.1' },
  { id: 2, user: 'Bob Smith', action: 'Login successful', module: 'Auth', timestamp: '2024-01-20 09:15', ip: '192.168.1.5' },
  { id: 3, user: 'Carol White', action: 'Created PR004', module: 'Procurement', timestamp: '2024-01-20 08:00', ip: '192.168.1.10' },
  { id: 4, user: 'David Lee', action: 'Exported vendor report', module: 'Reports', timestamp: '2024-01-19 17:45', ip: '192.168.1.2' },
  { id: 5, user: 'Eva Martinez', action: 'Updated compliance settings', module: 'Compliance', timestamp: '2024-01-19 14:20', ip: '192.168.1.8' }
]

export const fetchAuditLogs = createAsyncThunk('audit/fetchLogs', async () => {
  await new Promise(r => setTimeout(r, 600))
  return mockAuditLogs
})

const auditSlice = createSlice({
  name: 'audit',
  initialState: { logs: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuditLogs.pending, (state) => { state.loading = true })
      .addCase(fetchAuditLogs.fulfilled, (state, action) => { state.loading = false; state.logs = action.payload })
  }
})
export default auditSlice.reducer