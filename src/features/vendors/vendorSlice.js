import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { vendorService } from '../../services/vendorService'

export const fetchVendors = createAsyncThunk('vendors/fetchAll', async () => await vendorService.getAll())
export const fetchVendorById = createAsyncThunk('vendors/fetchById', async (id) => await vendorService.getById(id))

const vendorSlice = createSlice({
  name: 'vendors',
  initialState: { vendors: [], selectedVendor: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => { state.loading = true })
      .addCase(fetchVendors.fulfilled, (state, action) => { state.loading = false; state.vendors = action.payload })
      .addCase(fetchVendors.rejected, (state, action) => { state.loading = false; state.error = action.error.message })
      .addCase(fetchVendorById.fulfilled, (state, action) => { state.selectedVendor = action.payload })
  }
})
export default vendorSlice.reducer
