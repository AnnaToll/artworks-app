import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import NotFound from './pages/404'
import useGetNavObj from '../context/AppContext'
import TextPage from './pages/TextPage'
import Admin from './admin/Admin'

const BaseRoutes = () => {
  const nav = useGetNavObj()

  const dynamicRoutes = nav.map((navItem) => {
    let element = <Home data={navItem} />
    if (navItem.type === 'Category') {
      element = <CategoryPage data={navItem} />
    } else if (navItem.type === 'Text page') {
      element = <TextPage data={navItem} />
    }
    return <Route key={navItem.order} path={navItem.endpoint} element={element} />
  })

  return (
    <Routes>
      <Route path='/' element={<Navigate to={nav[0]?.endpoint} /> || '/'} />
      { dynamicRoutes }
      <Route path='/404' element={<NotFound />} />
      <Route path='/admin/*' element={<Admin />} />
    </Routes>
  )
}

export default BaseRoutes
