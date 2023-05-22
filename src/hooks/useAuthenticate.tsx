import { useEffect } from 'react'
import useFetch from './useFetch'

const useAuthenticate = () => {
  const { data, fetchGet } = useFetch('/authenticate', { isAuthenticated: false })
  const loggedIn = true

  useEffect(() => {
    fetchGet()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return { loggedIn }
}

export default useAuthenticate
