import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { doc, onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase.js'

export default function Home() {
  const [site, setSite] = useState({ tagline: '', heroPhotoUrl: '' })
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const unsubSite = onSnapshot(doc(db, 'config', 'site'), (snap) => {
      if (snap.exists()) setSite(snap.data())
    })
    const unsubMarks = onSnapshot(collection(db, 'marks'), (snap) => {
      let t = 0
      snap.forEach((d) => { t += Number(d.data().points) || 0 })
      setTotal(t)
      setCount(snap.size)
    })
    return () => { unsubSite(); unsubMarks() }
  }, [])

  return (
    <div>
      <div className="hero">
        {site.heroPhotoUrl ? (
          <img src={site.heroPhotoUrl} alt="Sir taking the MPOWER session" />
        ) : (
          <div className="hero-empty">No session photo uploaded yet</div>
        )}
        <div className="hero-caption">
          <div className="eyebrow">MPOWER program</div>
          <h1>Team Outfoxed</h1>
        </div>
      </div>

      <div className="section">
        <p>{site.tagline || 'Our journey through the MPOWER personal enhancement program.'}</p>
      </div>

      <div className="section">
        <div className="scorecard">
          <div className="scorecard-row">
            <div className="scorecard-block">
              <div className="scorecard-label">Total marks</div>
              <div className="scorecard-value">{total}</div>
            </div>
            <div className="scorecard-block">
              <div className="scorecard-label">Activities logged</div>
              <div className="scorecard-value">{count}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">
          <div>
            <div className="eyebrow">Explore</div>
            <h2>See more</h2>
          </div>
        </div>
        <div style={{display:'flex', gap:10}}>
          <Link to="/team" className="card" style={{flex:1, textAlign:'center'}}>
            <h3>Team</h3>
          </Link>
          <Link to="/gallery" className="card" style={{flex:1, textAlign:'center'}}>
            <h3>Gallery</h3>
          </Link>
          <Link to="/marks" className="card" style={{flex:1, textAlign:'center'}}>
            <h3>Marks</h3>
          </Link>
        </div>
      </div>
    </div>
  )
}
