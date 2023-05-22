import { Link } from 'react-router-dom'
import useGetNavObj, { useIsLoggedIn } from '../../context/AppContext'
import type { NavObj } from '../../context/Nav.types'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'

const Nav = () => {
  const nav = useGetNavObj()
  const loggedIn = useIsLoggedIn()
  const { fetchPost } = useFetch('/logout')
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClickLogout = () => {
    fetchPost()
  }

  const test = () => {
    console.log(document.cookie)
  }

  return (
    <nav id={isOpen ? 'nav-open' : 'nav-closed'}>
      <button aria-expanded={isOpen} onClick={handleClick}>
        <i className={`bi bi-${isOpen ? 'x-lg' : 'list'}`} />
        <span className='visually-hidden'>{isOpen ? 'Öppna meny' : 'Stäng meny'}</span>
      </button>
      <ul className="nav-links" id={isOpen ? 'nav-links-open' : 'nav-links-closed'}>
        { nav.map((navItem: NavObj) => (
          <li key={navItem.order}>
            <Link to={navItem.endpoint}>{navItem.name}</Link>
          </li>
        ))}
        { loggedIn && (
          <>
            <li>
              <Link to="/admin/redigera">Admin</Link>
            </li>
            <li>
              <button onClick={handleClickLogout}>Logga ut</button>
            </li>
            <li>
              <button onClick={test}>Test</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Nav
