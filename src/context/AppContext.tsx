import { createContext, useContext, useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import type { NavResponse, NavObj } from './Nav.types'
import useHandleLocation from '../hooks/useHandleLocation'
import useAuthenticate from '../hooks/useAuthenticate'
import { AdminProvider } from './DataContext'

const NavContext = createContext<NavObj[]>([])
const AuthContext = createContext(false)

export const AppProvider = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  const { data: nav, fetchGet } = useFetch('/nav')
  const [navContext, setNavContext] = useState<NavObj[]>([])
  const { toPathString } = useHandleLocation()
  const { loggedIn } = useAuthenticate()

  useEffect(() => {
    fetchGet()
  }, [])

  useEffect(() => {
    if (nav) {
      const newNavArr: NavObj[] = []
      nav.forEach((navItem: NavResponse) => {
        const newNavObj: NavObj = {
          name: '',
          endpoint: '/',
          type: 'Text page',
          text: '',
          banner: '',
          page_img: '',
          id: navItem.id,
          order: navItem.navigation_order
        }

        if (navItem.category) {
          newNavObj.name = navItem.category
          newNavObj.endpoint = '/malningar/'
          newNavObj.type = 'Category'
        } else if (navItem.page && navItem.page_type_id) {
          newNavObj.name = navItem.page
          newNavObj.type = navItem.page_type_id
          newNavObj.text = navItem.text
          newNavObj.banner = navItem.banner || ''
          newNavObj.page_img = navItem.page_img || ''
        }

        const pathName = toPathString(newNavObj.name)
        newNavObj.endpoint += pathName
        newNavArr.push(newNavObj)
      })
      setNavContext(newNavArr)
    }
  }, [nav])

  return (
    <AuthContext.Provider value={loggedIn}>
      <NavContext.Provider value={navContext}>
        <AdminProvider>
          { children }
        </AdminProvider>
      </NavContext.Provider>
    </AuthContext.Provider>

  )
}

export const useIsLoggedIn = () => {
  return useContext(AuthContext)
}

const useGetNavObj = () => {
  return useContext(NavContext)
}

export default useGetNavObj
