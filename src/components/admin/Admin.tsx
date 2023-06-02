import { Routes, Route } from 'react-router-dom'
// import Main from '../containers/MainContainer'
import Login from './Login'
import AdminRoutes from './AdminRoutes'

const Admin = () => {
//   const loggedIn = localStorage.getItem('token')

  //   if (!loggedIn) {
  //     return <Navigate to="admin/logga-in" replace />
  //   }

  return (
    <div>
      <Routes>
        <Route path='logga-in' element={<Login />} />
        <Route path='redigera/*' element={<AdminRoutes />} />
      </Routes>
    </div>
  )
}

export default Admin
