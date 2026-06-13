import { memo } from 'react'

const colors = {
  Pending: { bg: '#fff7e6', text: '#ff8b00' },
  Approved: { bg: '#e3fcef', text: '#006644' },
  Rejected: { bg: '#ffebe6', text: '#bf2600' },
  Active: { bg: '#e3fcef', text: '#006644' },
  Inactive: { bg: '#f4f5f7', text: '#6b778c' },
  'Under Review': { bg: '#deebff', text: '#0052cc' },
  Low: { bg: '#e3fcef', text: '#006644' },
  Medium: { bg: '#fff7e6', text: '#ff8b00' },
  High: { bg: '#ffebe6', text: '#bf2600' },
  Critical: { bg: '#f3f0ff', text: '#6554c0' },
  Open: { bg: '#ffebe6', text: '#bf2600' },
  Mitigated: { bg: '#e3fcef', text: '#006644' },
  'In Progress': { bg: '#deebff', text: '#0052cc' }
}

const StatusBadge = memo(({ status }) => {
  const style = colors[status] || { bg: '#f4f5f7', text: '#6b778c' }
  return (
    <span style={{
      background: style.bg, color: style.text,
      padding: '3px 10px', borderRadius: '12px',
      fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap'
    }}>
      {status}
    </span>
  )
})

export default StatusBadge