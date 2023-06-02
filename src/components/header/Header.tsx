import Nav from './Nav'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div id="logo"><Link to="/">Gunilla Arnö-Toll</Link></div>
      <button id="to-main-content">Till huvudinnehållet</button>
      <Nav />
    </header>
  )
}

export default Header
