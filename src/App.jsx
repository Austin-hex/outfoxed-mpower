import { Routes, Route } from 'react-router-dom'
import TopNav from './components/TopNav.jsx'
import BottomNav from './components/BottomNav.jsx'
import MobileHeader from './components/MobileHeader.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Team from './pages/Team.jsx'
import Gallery from './pages/Gallery.jsx'
import Marks from './pages/Marks.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  return (
    <>
      <TopNav />
      <MobileHeader />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </div>
      <BottomNav />
    </>
  )
}
