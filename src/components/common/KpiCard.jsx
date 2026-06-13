import { memo } from 'react'
import styles from './KpiCard.module.css'

const KpiCard = memo(({ title, value, icon, color = '#0052cc', change, subtitle }) => (
  <div className={styles.card} style={{ borderTop: `4px solid ${color}` }}>
    <div className={styles.header}>
      <div className={styles.icon} style={{ background: `${color}20`, color }}>{icon}</div>
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {change !== undefined && (
          <div className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  </div>
))

export default KpiCard