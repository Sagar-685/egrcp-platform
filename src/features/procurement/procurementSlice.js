import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { procurementService } from '../../services/procurementService'

export const fetchRequests = createAsyncThunk('procurement/fetchAll', async (_, { rejectWithValue }) => {
  try { return await procurementService.getAll() }
  catch (err) { return rejectWithValue(err.message) }
})

export const fetchRequestById = createAsyncThunk('procurement/fetchById', async (id, { rejectWithValue }) => {
  try { return await procurementService.getById(id) }
  catch (err) { return rejectWithValue(err.message) }
})

export const createRequest = createAsyncThunk('procurement/create', async (data, { rejectWithValue }) => {
  try { return await procurementService.create(data) }
  catch (err) { return rejectWithValue(err.message) }
})

export const updateRequestStatus = createAsyncThunk('procurement/updateStatus', async ({ id, status }, { rejectWithValue }) => {
  try { return await procurementService.updateStatus(id, status) }
  catch (err) { return rejectWithValue(err.message) }
})

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: { requests: [], selectedRequest: null, loading: false, error: null, filters: { status: 'All', search: '' } },
  reducers: {
    setFilter: (state, action) => { state.filters = { ...state.filters, ...action.payload } },
    clearSelectedRequest: (state) => { state.selectedRequest = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => { state.loading = true })
      .addCase(fetchRequests.fulfilled, (state, action) => { state.loading = false; state.requests = action.payload })
      .addCase(fetchRequests.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(fetchRequestById.fulfilled, (state, action) => { state.selectedRequest = action.payload })
      .addCase(createRequest.fulfilled, (state, action) => { state.requests.unshift(action.payload) })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const idx = state.requests.findIndex(r => r.id === action.payload.id)
        if (idx !== -1) state.requests[idx].status = action.payload.status
      })
  }
})

export const { setFilter, clearSelectedRequest } = procurementSlice.actions
export default procurementSlice.reducer