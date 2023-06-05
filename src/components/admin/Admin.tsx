import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminRoutes from './AdminRoutes'

const Admin = () => {
  return (
    <div>
      <Routes>
        <Route path='logga-in' element={<Login />} />
        <Route path='/*' element={<AdminRoutes />} />
      </Routes>
    </div>
  )
}

export default Admin
