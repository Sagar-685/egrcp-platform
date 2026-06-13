import { memo, useState, useMemo } from 'react'
import styles from './DataTable.module.css'

const DataTable = memo(({ columns, data, onRowClick, loading, emptyText = 'No data found' }) => {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortKey, sortDir])

  const paginated = useMemo(() => sorted.slice((page - 1) * pageSize, page * pageSize), [sorted, page])
  const totalPages = Math.ceil(data.length / pageSize)

  if (loading) return <div className={styles.loading}>Loading data...</div>

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className={styles.th} onClick={() => col.sortable !== false && handleSort(col.key)}>
                {col.label}
                {col.sortable !== false && sortKey === col.key && (sortDir === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 ? (
            <tr><td colSpan={columns.length} className={styles.empty}>{emptyText}</td></tr>
          ) : paginated.map((row, idx) => (
            <tr key={row.id || idx} className={styles.row} onClick={() => onRowClick?.(row)}>
              {columns.map(col => (
                <td key={col.key} className={styles.td}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Showing {Math.min((page-1)*pageSize+1, data.length)}–{Math.min(page*pageSize, data.length)} of {data.length}</span>
          <div className={styles.pageButtons}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>◀</button>
            <span>{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>▶</button>
          </div>
        </div>
      )}
    </div>
  )
})

export default DataTable
