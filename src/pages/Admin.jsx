import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import AdminMarks from '../components/admin/AdminMarks.jsx'
import AdminGallery from '../components/admin/AdminGallery.jsx'
import AdminTeam from '../components/admin/AdminTeam.jsx'
import AdminHeroPhoto from '../components/admin/AdminHeroPhoto.jsx'

const TABS = [
  { key: 'marks', label: 'Marks' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'team', label: 'Team' },
  { key: 'hero', label: 'Session photo' }
]

export default function Admin() {
  const { logout, user } = useAuth()
  const [tab, setTab] = useState('marks')

  return (
    <div className="section">
      <div className="section-title">
        <div>
          <div className="eyebrow">Signed in as {user?.email}</div>
          <h1>Admin</h1>
        </div>
        <button className="btn btn-outline" style={{width:'auto', padding:'8px 14px'}} onClick={logout}>Log out</button>
      </div>

      <div className="tabbar">
        {TABS.map(t => (
          <button key={t.key} className={tab === t.key ? 'active' : ''} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'marks' && <AdminMarks />}
      {tab === 'gallery' && <AdminGallery />}
      {tab === 'team' && <AdminTeam />}
      {tab === 'hero' && <AdminHeroPhoto />}
    </div>
  )
}
