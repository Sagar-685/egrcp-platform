import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vendors from '../../mocks/vendors.json'

export const fetchComplianceData = createAsyncThunk('compliance/fetchData', async () => {
  await new Promise(r => setTimeout(r, 600))
  const expiredCerts = vendors.filter(v => new Date(v.certExpiry) < new Date())
  const lowScore = vendors.filter(v => v.complianceScore < 70)
  return {
    totalChecked: vendors.length,
    compliant: vendors.filter(v => v.complianceScore >= 80).length,
    violations: lowScore.length,
    expiredCertifications: expiredCerts,
    lowComplianceVendors: lowScore
  }
})

const complianceSlice = createSlice({
  name: 'compliance',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplianceData.pending, (state) => { state.loading = true })
      .addCase(fetchComplianceData.fulfilled, (state, action) => { state.loading = false; state.data = action.payload })
  }
})
export default complianceSlice.reducer