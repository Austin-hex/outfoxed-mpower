import { useEffect, useState } from 'react'
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { uploadImage } from '../../cloudinary.js'

export default function AdminGallery() {
  const [photos, setPhotos] = useState([])
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setBusy(true)
    setError('')
    try {
      const url = await uploadImage(file)
      await addDoc(collection(db, 'gallery'), {
        url, caption, uploadedAt: serverTimestamp()
      })
      setFile(null); setCaption('')
      e.target.reset && e.target.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(p) {
    await deleteDoc(doc(db, 'gallery', p.id))
  }

  return (
    <div>
      <form className="card" onSubmit={handleUpload} style={{marginBottom: 20}}>
        <h3 style={{marginBottom: 14}}>Upload a photo</h3>
        {error && <p className="error-text">{error}</p>}
        <div className="field">
          <label>Photo</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
        </div>
        <div className="field">
          <label>Caption (optional)</label>
          <input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Team building activity" />
        </div>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Uploading...' : 'Upload photo'}</button>
      </form>

      <div className="card">
        <h3 style={{marginBottom: 10}}>Uploaded photos</h3>
        {photos.length === 0 ? (
          <div className="empty-state">No photos yet.</div>
        ) : photos.map(p => (
          <div className="admin-list-row" key={p.id}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <img src={p.url} alt="" style={{width:44, height:44, objectFit:'cover', borderRadius:8}} />
              <span style={{fontSize:13}}>{p.caption || 'Untitled'}</span>
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(p)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
