import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import styles from './LoginPage.module.css'

const schema = yup.object({ email: yup.string().email().required('Email is required') })

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>⚡ e-GRCP</div>
        <h1 className={styles.title}>Reset your password</h1>
        <p className={styles.subtitle}>Enter your email to receive reset instructions</p>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#36b37e' }}>
            ✅ Check your email for reset instructions
          </div>
        ) : (
          <form onSubmit={handleSubmit(() => setSubmitted(true))} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>
              <input {...register('email')} className={`${styles.input} ${errors.email ? styles.inputError : ''}`} placeholder="you@company.com" />
              {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
            </div>
            <button type="submit" className={styles.submitBtn}>Send Reset Link</button>
          </form>
        )}
        <Link to="/login" style={{ display: 'block', textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--primary)' }}>
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage