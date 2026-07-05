import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.js'

export default function Gallery() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('uploadedAt', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  return (
    <div className="section">
      <div className="section-title">
        <div>
          <div className="eyebrow">Moments</div>
          <h1>Gallery</h1>
        </div>
      </div>

      {photos.length === 0 ? (
        <div className="empty-state">Activity photos will show up here once the admin uploads them.</div>
      ) : (
        <div className="gallery-grid">
          {photos.map(p => (
            <div className="gallery-item" key={p.id}>
              <img src={p.url} alt={p.caption || 'Gallery photo'} />
              {p.caption && <div className="gallery-caption">{p.caption}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
