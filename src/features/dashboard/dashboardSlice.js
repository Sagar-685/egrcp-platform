import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requests from '../../mocks/requests.json'
import vendors from '../../mocks/vendors.json'
import riskData from '../../mocks/riskData.json'

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async () => {
  await new Promise(r => setTimeout(r, 700))
  return {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'Pending').length,
    approvedRequests: requests.filter(r => r.status === 'Approved').length,
    rejectedRequests: requests.filter(r => r.status === 'Rejected').length,
    totalVendors: vendors.length,
    highRiskVendors: vendors.filter(v => v.riskLevel === 'High').length,
    totalRisks: riskData.risks.length,
    openRisks: riskData.risks.filter(r => r.status === 'Open').length,
    riskTrend: riskData.trendData,
    recentActivity: [
      { id: 1, action: 'PR004 submitted by Alice Johnson', time: '10 min ago', type: 'procurement' },
      { id: 2, action: 'Vendor V003 flagged for review', time: '1 hr ago', type: 'vendor' },
      { id: 3, action: 'Risk R001 status updated', time: '3 hr ago', type: 'risk' },
      { id: 4, action: 'Compliance report generated', time: '5 hr ago', type: 'compliance' }
    ]
  }
})

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => { state.loading = true })
      .addCase(fetchDashboardData.fulfilled, (state, action) => { state.loading = false; state.data = action.payload })
      .addCase(fetchDashboardData.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
  }
})

export default dashboardSlice.reducer