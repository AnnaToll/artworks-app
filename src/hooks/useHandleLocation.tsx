import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const useHandleLocation = () => {
  const navigate = useNavigate()
  const redirectToHomeTimer = useRef<any>()

  const toPathString = (string: string) => {
    return string.toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(/å|ä/g, 'a')
      .replaceAll('ö', 'o')
  }

  const redirectWhen404 = () => {
    navigate('/404')
    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)
    redirectToHomeTimer.current = timer
  }

  useEffect(() => {
    return () => { clearTimeout(redirectToHomeTimer.current) }
  }, [])

  return { toPathString, redirectWhen404 }
}

export default useHandleLocation
