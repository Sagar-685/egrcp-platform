import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, clearError } from './authSlice'
import styles from './LoginPage.module.css'

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useSelector(state => state.auth)

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    if (token) navigate('/dashboard')
    return () => dispatch(clearError())
  }, [token, navigate, dispatch])

  const onSubmit = (data) => dispatch(loginUser(data))

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⚡ e-GRCP</div>
        <h1 className={styles.title}>Sign in to your account</h1>
        <p className={styles.subtitle}>Enterprise Governance & Procurement Platform</p>

        {error && <div className={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input {...register('email')} className={`${styles.input} ${errors.email ? styles.inputError : ''}`} placeholder="you@company.com" />
            {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input {...register('password')} type="password" className={`${styles.input} ${errors.password ? styles.inputError : ''}`} placeholder="••••••••" />
            {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.demoHint}>
          <strong>Demo Credentials:</strong><br />
          Admin: alice@company.com / admin123<br />
          Manager: bob@company.com / manager123
        </div>
      </div>
    </div>
  )
}

export default LoginPage