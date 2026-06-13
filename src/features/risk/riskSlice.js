import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import riskData from '../../mocks/riskData.json'

export const fetchRisks = createAsyncThunk('risk/fetchAll', async () => {
  await new Promise(r => setTimeout(r, 600))
  return riskData
})

const riskSlice = createSlice({
  name: 'risk',
  initialState: { risks: [], trendData: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRisks.pending, (state) => { state.loading = true })
      .addCase(fetchRisks.fulfilled, (state, action) => {
        state.loading = false
        state.risks = action.payload.risks
        state.trendData = action.payload.trendData
      })
  }
})
export default riskSlice.reducer
