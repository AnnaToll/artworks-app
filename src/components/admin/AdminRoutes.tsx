import { Routes, Route, Link } from 'react-router-dom'
import Pages from './edit/Pages'
import AdminArt from './edit/AdminArt'
import Categories from './edit/Categories'
import CategoryEdit from './edit/CategoryEdit'
import Menu from './edit/Menu'

const AdminRoutes = () => {
  return (
    <div id="admin-edit-container">
      <nav aria-label="admin meny">
        <ul>
          <li><Link to='sidor'>Sidor</Link></li>
          <li><Link to='konstverk'>Konstverk</Link></li>
          <li><Link to='konstverk'>Kategorier</Link></li>
          <li><Link to='konstverk'>Meny</Link></li>
        </ul>
        <Routes>
          <Route path='sidor' element={<Pages />} />
          <Route path='konstverk' element={<AdminArt />} />
          <Route path='kategorier' element={<Categories />} />
          <Route path='kategorier/:id' element={<CategoryEdit />} />
          <Route path='meny' element={<Menu />} />
        </Routes>
      </nav>
    </div>
  )
}

export default AdminRoutes
