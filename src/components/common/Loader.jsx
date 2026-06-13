import styles from './Loader.module.css'

const Loader = ({ fullScreen = false }) => (
  <div className={`${styles.wrapper} ${fullScreen ? styles.fullScreen : ''}`}>
    <div className={styles.spinner} />
    <span className={styles.text}>Loading...</span>
  </div>
)

export default Loader