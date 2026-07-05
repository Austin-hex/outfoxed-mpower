import { useAuth } from '../context/AuthContext.jsx'
import Login from '../pages/Login.jsx'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="center-screen"><p>Loading...</p></div>
  }

  if (!user) {
    return <Login />
  }

  return children
}
