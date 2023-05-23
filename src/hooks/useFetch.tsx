import { useEffect, useState } from 'react'
import type { Method, DataObj, ResponseTypes } from './useFetch.types'

const useFetch = (urlEndPoint: string, dataInitState: ResponseTypes = []) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(dataInitState)

  useEffect(() => () => {
    setError('')
  }, [])

  const getCookie = (name: string) => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  const baseFetch = async (method: Method = 'GET', body: Record<string, unknown> = {}) => {
    setIsLoading(true)
    setError('')

    let returnValue

    let fetchSettings = {}

    if (method !== 'GET') {
      const csrftoken = getCookie('csrftoken')
      console.log(csrftoken)

      fetchSettings = {
        method,
        credentials: 'include',
        headers: {
          ...(csrftoken && { 'X-CSRFToken': csrftoken }),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${urlEndPoint}`, fetchSettings)
      console.log(res)
      const data: DataObj = await res.json()
      console.log(data)
      if (data.error) {
        setError(data.error)
      } else if (data.success) {
        setData(data.success)
      }
      return returnValue
    } catch (err) {
      setError('Hoppsan! Ett oväntat fel har uppstått.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchGet = () => {
    baseFetch('GET')
  }

  const fetchPost = (body: Record<string, unknown> = {}) => {
    baseFetch('POST', body)
  }

  const fetchPut = (body: Record<string, unknown> = {}) => {
    baseFetch('PUT', body)
  }

  const fetchDelete = (body: Record<string, unknown>) => {
    baseFetch('DELETE', body)
  }

  return { fetchGet, fetchPost, fetchPut, fetchDelete, isLoading, error, data }
}

export default useFetch
