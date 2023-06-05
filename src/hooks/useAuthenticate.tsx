import { useEffect, useState } from 'react'
import useFetch from './useFetch'

const useAuthenticate = () => {
  const { data, fetchGet } = useFetch('/authenticate', false)
  const [loggedIn, setLoggedIn] = useState<null | boolean>(null)

  useEffect(() => {
    fetchGet()
  }, [])

  useEffect(() => {
    if (data) {
      if (data.isAuthenticated) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    }
  }, [data])

  return { loggedIn, setLoggedIn }
}

export default useAuthenticate
