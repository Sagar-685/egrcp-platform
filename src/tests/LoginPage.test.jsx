import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from '../features/auth/LoginPage'
import authReducer from '../features/auth/authSlice'

const testStore = configureStore({ reducer: { auth: authReducer } })

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<Provider store={testStore}><MemoryRouter><LoginPage /></MemoryRouter></Provider>)
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    render(<Provider store={testStore}><MemoryRouter><LoginPage /></MemoryRouter></Provider>)
    fireEvent.click(screen.getByText('Sign In'))
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
  })
})