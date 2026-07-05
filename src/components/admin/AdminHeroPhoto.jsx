import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../../firebase.js'
import { uploadImage } from '../../cloudinary.js'

export default function AdminHeroPhoto() {
  const [site, setSite] = useState({ heroPhotoUrl: '', tagline: '' })
  const [file, setFile] = useState(null)
  const [tagline, setTagline] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'site'), (snap) => {
      if (snap.exists()) {
        setSite(snap.data())
        setTagline(snap.data().tagline || '')
      }
    })
    return unsub
  }, [])

  async function handleUpload(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      let heroPhotoUrl = site.heroPhotoUrl || ''
      if (file) {
        heroPhotoUrl = await uploadImage(file)
      }
      await setDoc(doc(db, 'config', 'site'), { heroPhotoUrl, tagline }, { merge: true })
      setFile(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card">
      <h3 style={{marginBottom: 14}}>Session photo &amp; homepage text</h3>
      <p style={{marginBottom: 16, fontSize: 13}}>This photo (e.g. sir taking the session) appears at the top of the homepage, separate from the general gallery.</p>
      {error && <p className="error-text">{error}</p>}

      {site.heroPhotoUrl && (
        <img src={site.heroPhotoUrl} alt="Current hero" style={{width:'100%', borderRadius:10, marginBottom:16, maxHeight:180, objectFit:'cover'}} />
      )}

      <form onSubmit={handleUpload}>
        <div className="field">
          <label>Replace photo</label>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="field">
          <label>Homepage tagline</label>
          <input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Our journey through MPOWER" />
        </div>
        <button className="btn btn-primary" disabled={busy}>{busy ? 'Saving...' : 'Save changes'}</button>
      </form>
    </div>
  )
}
