import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(email, password)
    } catch (err) {
      setError('Incorrect email or password.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="center-screen">
      <form className="card login-card" onSubmit={handleSubmit}>
        <div style={{marginBottom: 18}}>
          <div className="eyebrow" style={{color:'var(--teal-dark)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em'}}>Admin access</div>
          <h2 style={{marginTop:4}}>Log in</h2>
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}
