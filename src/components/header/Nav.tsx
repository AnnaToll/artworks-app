import { Link } from 'react-router-dom'
import useGetNavObj, { useIsLoggedIn } from '../../context/AppContext'
import type { NavObj } from '../../context/Nav.types'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

const Nav = () => {
  const nav = useGetNavObj()
  const auth = useIsLoggedIn()
  const { fetchPost } = useFetch('/logout')
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClickLink = () => {
    setIsOpen(false)
  }

  const handleClickLogout = () => {
    fetchPost()
  }

  return (
    <nav id={isOpen ? 'nav-open' : 'nav-closed'} className='main-nav' aria-label='Huvudmeny'>
      <button aria-expanded={isOpen} onClick={handleClick}>
        <i className={`bi bi-${isOpen ? 'x-lg' : 'list'}`} />
        <span className='visually-hidden'>{isOpen ? 'Öppna meny' : 'Stäng meny'}</span>
      </button>
      <ul className="nav-links" id={isOpen ? 'nav-links-open' : 'nav-links-closed'}>
        { nav.map((navItem: NavObj) => (
          <li key={navItem.order} onClick={handleClickLink}>
            <Link to={navItem.endpoint}>{navItem.name}</Link>
          </li>
        ))}
        { auth.loggedIn && (
          <>
            <li onClick={handleClickLink}>
              <Link to="/admin">Admin</Link>
            </li>
            <li onClick={handleClickLink}>
              <button onClick={handleClickLogout} className='btn-blue-s'><span>Logga ut</span></button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
