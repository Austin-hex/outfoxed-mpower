import { NavLink } from 'react-router-dom'

export default function TopNav() {
  return (
    <div className="topnav">
      <div className="brand">Team<span>Outfoxed</span></div>
      <nav>
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/team" className={({isActive}) => isActive ? 'active' : ''}>Team</NavLink>
        <NavLink to="/gallery" className={({isActive}) => isActive ? 'active' : ''}>Gallery</NavLink>
        <NavLink to="/marks" className={({isActive}) => isActive ? 'active' : ''}>Marks</NavLink>
        <NavLink to="/admin" className={({isActive}) => isActive ? 'active' : ''}>Admin</NavLink>
      </nav>
    </div>
  )
}
