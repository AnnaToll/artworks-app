import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Category from './edit/Category'
import AdminArt from './edit/AdminArt'
import Page from './edit/Page'
import EditNav from './edit/EditNav'
import EditWrapper from './edit/EditWrapper'
import useAdminData from '../../context/DataContext'
import { useEffect } from 'react'
import { useIsLoggedIn } from '../../context/AppContext'
import Docs from './Docs'

const AdminRoutes = () => {
  const { fetchData, state } = useAdminData()
  const auth = useIsLoggedIn()

  useEffect(() => {
    fetchData()
  }, [])

  if (!auth.loggedIn && auth.loggedIn !== null) {
    return <Navigate to="logga-in" replace />
  }

  return (
    <div id="admin-edit-container">
      <nav aria-label="admin meny" id="admin-nav">
        <h3>Lägg till och ändra</h3>
        <ul>
          <li><Link to='sidor'>Sidor</Link></li>
          <li><Link to='konstverk'>Konstverk</Link></li>
          <li><Link to='kategorier'>Kategorier</Link></li>
          <li><Link to='meny'>Meny</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={< Docs />} />
        <Route path='sidor/:id' element={< Page />} />
        <Route path='sidor/*' element={
          <EditWrapper
            headline='Sidor'
            endpoint='/pages'
            state={state.pages}
          />
        } />
        <Route path='konstverk/*' element={
          <EditWrapper
            headline='Konstverk'
            endpoint='/artworks'
            state={state.art}
          />
        } />
        <Route path='konstverk/:id' element={< AdminArt />} />
        <Route path='kategorier/*' element={
          <EditWrapper
            headline='Kategorier'
            state={state.categories}
            endpoint='/categories'
          />
        } />
        <Route path='kategorier/:id' element={<Category />} />
        <Route path='meny' element={<EditNav />} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
