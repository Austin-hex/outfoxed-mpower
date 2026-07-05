import { useEffect, useState } from 'react'
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'

export default function AdminMarks() {
  const [marks, setMarks] = useState([])
  const [activity, setActivity] = useState('')
  const [points, setPoints] = useState('')
  const [date, setDate] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const q = query(collection(db, 'marks'), orderBy('date', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMarks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!activity || points === '') return
    setBusy(true)
    try {
      await addDoc(collection(db, 'marks'), {
        activity,
        points: Number(points),
        date: date || new Date().toISOString().slice(0, 10),
        createdAt: serverTimestamp()
      })
      setActivity(''); setPoints(''); setDate('')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id) {
    await deleteDoc(doc(db, 'marks', id))
  }

  const total = marks.reduce((s, m) => s + (Number(m.points) || 0), 0)

  return (
    <div>
      <form className="card" onSubmit={handleAdd} style={{marginBottom: 20}}>
        <h3 style={{marginBottom: 14}}>Add a mark entry</h3>
        <div className="field">
          <label>Activity name</label>
          <input value={activity} onChange={e => setActivity(e.target.value)} placeholder="Group discussion round" required />
        </div>
        <div style={{display:'flex', gap:10}}>
          <div className="field" style={{flex:1}}>
            <label>Points</label>
            <input type="number" value={points} onChange={e => setPoints(e.target.value)} placeholder="10" required />
          </div>
          <div className="field" style={{flex:1}}>
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Adding...' : 'Add entry'}</button>
      </form>

      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 10}}>
          <h3>All entries</h3>
          <span className="badge">Total: {total}</span>
        </div>
        {marks.length === 0 ? (
          <div className="empty-state">No entries yet.</div>
        ) : marks.map(m => (
          <div className="admin-list-row" key={m.id}>
            <div>
              <div style={{fontWeight:600, fontSize:14}}>{m.activity}</div>
              <div style={{fontSize:11, color:'var(--text-muted)'}}>{m.date} &middot; {m.points} pts</div>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(m.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
