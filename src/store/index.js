import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { combineReducers } from 'redux'

import authReducer from '../features/auth/authSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import procurementReducer from '../features/procurement/procurementSlice'
import vendorReducer from '../features/vendors/vendorSlice'
import riskReducer from '../features/risk/riskSlice'
import complianceReducer from '../features/compliance/complianceSlice'
import auditReducer from '../features/audit/auditSlice'
import reportReducer from '../features/reports/reportSlice'
import notificationReducer from '../features/notifications/notificationSlice'
import uiReducer from './uiSlice'

// Custom in-memory storage — avoids all localStorage/sessionStorage issues
const memoryStorage = {
  _data: {},
  getItem(key) {
    return Promise.resolve(this._data[key] ?? null)
  },
  setItem(key, value) {
    this._data[key] = value
    return Promise.resolve()
  },
  removeItem(key) {
    delete this._data[key]
    return Promise.resolve()
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  procurement: procurementReducer,
  vendors: vendorReducer,
  risk: riskReducer,
  compliance: complianceReducer,
  audit: auditReducer,
  reports: reportReducer,
  notifications: notificationReducer,
  ui: uiReducer
})

const persistConfig = {
  key: 'root',
  storage: memoryStorage,
  whitelist: ['auth', 'ui']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
  devTools: true
})

export const persistor = persistStore(store)