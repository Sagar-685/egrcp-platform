import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { reportService } from '../../services/reportService'

export const fetchReports = createAsyncThunk('reports/fetchAll', async () => await reportService.getAll())
export const generateReport = createAsyncThunk('reports/generate', async (type) => await reportService.generate(type))

const reportSlice = createSlice({
  name: 'reports',
  initialState: { reports: [], loading: false, generating: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => { state.loading = true })
      .addCase(fetchReports.fulfilled, (state, action) => { state.loading = false; state.reports = action.payload })
      .addCase(generateReport.pending, (state) => { state.generating = true })
      .addCase(generateReport.fulfilled, (state, action) => { state.generating = false; state.reports.unshift(action.payload) })
  }
})
export default reportSlice.reducer