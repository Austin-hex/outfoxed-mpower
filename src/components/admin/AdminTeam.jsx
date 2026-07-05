import { useEffect, useState } from 'react'
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { uploadImage } from '../../cloudinary.js'

export default function AdminTeam() {
  const [members, setMembers] = useState([])
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'members'), orderBy('order', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!name) return
    setBusy(true)
    setError('')
    try {
      let photoUrl = ''
      if (file) {
        photoUrl = await uploadImage(file)
      }
      await addDoc(collection(db, 'members'), {
        name, role, photoUrl,
        order: members.length,
        createdAt: serverTimestamp()
      })
      setName(''); setRole(''); setFile(null)
      e.target.reset && e.target.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(m) {
    await deleteDoc(doc(db, 'members', m.id))
  }

  return (
    <div>
      <form className="card" onSubmit={handleAdd} style={{marginBottom: 20}}>
        <h3 style={{marginBottom: 14}}>Add a team member</h3>
        {error && <p className="error-text">{error}</p>}
        <div className="field">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Aditi Menon" required />
        </div>
        <div className="field">
          <label>Role (optional)</label>
          <input value={role} onChange={e => setRole(e.target.value)} placeholder="Team lead" />
        </div>
        <div className="field">
          <label>Photo (optional)</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        </div>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Adding...' : 'Add member'}</button>
      </form>

      <div className="card">
        <h3 style={{marginBottom: 10}}>Team members</h3>
        {members.length === 0 ? (
          <div className="empty-state">No members added yet.</div>
        ) : members.map(m => (
          <div className="admin-list-row" key={m.id}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              {m.photoUrl ? (
                <img src={m.photoUrl} alt="" style={{width:40, height:40, objectFit:'cover', borderRadius:'50%'}} />
              ) : (
                <div style={{width:40, height:40, borderRadius:'50%', background:'var(--teal-light)'}} />
              )}
              <div>
                <div style={{fontWeight:600, fontSize:13}}>{m.name}</div>
                {m.role && <div style={{fontSize:11, color:'var(--text-muted)'}}>{m.role}</div>}
              </div>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(m)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
