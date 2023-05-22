import { Routes, Route } from 'react-router-dom'
import Main from '../containers/MainContainer'
import Login from './Login'
import Edit from './Edit'

const Admin = () => {
//   const loggedIn = localStorage.getItem('token')

  //   if (!loggedIn) {
  //     return <Navigate to="admin/logga-in" replace />
  //   }

  return (
    <Main title='admin'>
      <Routes>
        <Route path='logga-in' element={<Login />} />
        <Route path='redigera' element={<Edit />} />
      </Routes>
    </Main>
  )
}

export default Admin
