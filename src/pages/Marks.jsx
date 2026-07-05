import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.js'

export default function Marks() {
  const [marks, setMarks] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'marks'), orderBy('date', 'desc'))
    const unsub = onSnapshot(q, (snap) => {
      setMarks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return unsub
  }, [])

  const total = marks.reduce((s, m) => s + (Number(m.points) || 0), 0)

  return (
    <div>
      <div className="section">
        <div className="section-title">
          <div>
            <div className="eyebrow">Scoreboard</div>
            <h1>Marks</h1>
          </div>
        </div>

        <div className="scorecard" style={{marginBottom: 20}}>
          <div className="scorecard-row">
            <div className="scorecard-block">
              <div className="scorecard-label">Running total</div>
              <div className="scorecard-value">{total}</div>
            </div>
          </div>
        </div>

        {marks.length === 0 ? (
          <div className="empty-state">No marks logged yet.</div>
        ) : (
          <div className="ledger">
            {marks.map(m => (
              <div className="ledger-row" key={m.id}>
                <div>
                  <div className="ledger-activity">{m.activity}</div>
                  {m.date && <div className="ledger-date">{m.date}</div>}
                </div>
                <div className="ledger-points">+{m.points}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
