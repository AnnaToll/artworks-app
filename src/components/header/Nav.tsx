import { Link } from 'react-router-dom'
import useGetNavObj from '../../context/AppContext'
import type { NavObj } from '../../context/Nav.types'
import { useState } from 'react'

const Nav = () => {
  const nav = useGetNavObj()
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <nav id={isOpen ? 'nav-open' : 'nav-closed'}>
      <button aria-expanded={isOpen} onClick={handleClick}>
        <i className={`bi bi-${isOpen ? 'x-lg' : 'list'}`} />
        <span className='visually-hidden'>{isOpen ? 'Öppna meny' : 'Stäng meny'}</span>
      </button>
      <ul className="nav-links" id={isOpen ? 'nav-links-open' : 'nav-links-closed'}>
        { nav.map((navItem: NavObj) => (
          <li key={navItem.id}>
            <Link to={navItem.endpoint}>{navItem.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav
