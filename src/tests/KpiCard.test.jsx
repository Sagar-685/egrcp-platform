
import { describe, it, expect } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import KpiCard from '../components/common/KpiCard'

describe('KpiCard', () => {
  it('renders title and value', () => {
    render(<KpiCard title="Total Requests" value={42} icon="📋" />)
    expect(screen.getByText('Total Requests')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })
})