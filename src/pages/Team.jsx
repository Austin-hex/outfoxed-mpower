import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.js'

function initials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Team() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'members'), orderBy('order', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  return (
    <div>
      <div className="section">
        <div className="section-title">
          <div>
            <div className="eyebrow">Team Outfoxed</div>
            <h1>Our team</h1>
          </div>
        </div>

        {members.length === 0 ? (
          <div className="empty-state">Team members will appear here once added by the admin.</div>
        ) : (
          <div className="team-grid">
            {members.map(m => (
              <div className="team-member" key={m.id}>
                <div className="avatar">
                  {m.photoUrl ? <img src={m.photoUrl} alt={m.name} /> : initials(m.name)}
                </div>
                <div className="name">{m.name}</div>
                {m.role && <div className="role">{m.role}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
