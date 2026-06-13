/* global describe, it, expect */
import authReducer, { clearError } from '../features/auth/authSlice'

describe('authSlice', () => {
  it('should return initial state', () => {
    const state = authReducer(undefined, { type: '@@INIT' })
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.loading).toBe(false)
  })

  it('should clear error', () => {
    const state = authReducer({ error: 'Some error' }, clearError())
    expect(state.error).toBeNull()
  })
})