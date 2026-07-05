import { NavLink } from 'react-router-dom'
import { HomeIcon, TeamIcon, GalleryIcon, MarksIcon, AdminIcon } from './Icons.jsx'

export default function BottomNav() {
  return (
    <div className="bottomnav">
      <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>
        <span className="icon"><HomeIcon /></span>Home
      </NavLink>
      <NavLink to="/team" className={({isActive}) => isActive ? 'active' : ''}>
        <span className="icon"><TeamIcon /></span>Team
      </NavLink>
      <NavLink to="/gallery" className={({isActive}) => isActive ? 'active' : ''}>
        <span className="icon"><GalleryIcon /></span>Gallery
      </NavLink>
      <NavLink to="/marks" className={({isActive}) => isActive ? 'active' : ''}>
        <span className="icon"><MarksIcon /></span>Marks
      </NavLink>
      <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>
        <span className="icon"><AdminIcon /></span>Admin
      </NavLink>
    </div>
  )
}
