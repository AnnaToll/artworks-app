import { useEffect, useState } from 'react'
import type { Method, DataObj, ResponseTypes } from './useFetch.types'

const useFetch = (urlEndPoint: string, dataInitState: ResponseTypes = [], onSuccess: () => void = () => {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(dataInitState)

  useEffect(() => () => {
    setError('')
  }, [])

  const postImage = async (file: File) => {
    if (!process.env.REACT_APP_CLOUDINARY_PRESET || !process.env.REACT_APP_CLOUDINARY_URL) {
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
    const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: formData
    })
    const imageData = await res.json()
    return imageData
  }

  const deleteImage = async (publicId: string) => {
    if (!process.env.REACT_APP_CLOUDINARY_API_KEY || !process.env.REACT_APP_CLOUDINARY_DESTROY) {
      return
    }
    const formData = new FormData()
    formData.append('public_id', publicId)
    // formData.append('signature', <signature>)
    formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY)
    formData.append('timestamp', Math.round(new Date().getTime() / 1000).toString())
    const res = await fetch(process.env.REACT_APP_CLOUDINARY_DESTROY, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    return data
  }

  // const getCookie = (name: string) => {
  //   let cookieValue = null
  //   if (document.cookie && document.cookie !== '') {
  //     const cookies = document.cookie.split(';')
  //     for (let i = 0; i < cookies.length; i++) {
  //       const cookie = cookies[i].trim()
  //       // Does this cookie string begin with the name we want?
  //       if (cookie.substring(0, name.length + 1) === (name + '=')) {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
  //         break
  //       }
  //     }
  //   }
  //   return cookieValue
  // }

  const baseFetch = async (method: Method = 'GET', body: Record<string, unknown>, whenDoneFn: () => void) => {
    setIsLoading(true)
    setError('')

    if (method === 'PUT') {
      console.log(body)
    }

    let fetchSettings = {}

    if (method !== 'GET') {
      // const csrftoken = getCookie('csrftoken')

      fetchSettings = {
        method,
        credentials: 'include',
        headers: {
          // ...(csrftoken && { 'X-CSRFToken': csrftoken }),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    }

    if (urlEndPoint === '/all') {
      console.log('in fetch')
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${urlEndPoint}`, fetchSettings)
      // console.log(res)
      const data: DataObj = await res.json()
      if (data.error) {
        setError(data.error)
      } else if (data.success) {
        setData(data.success)
        onSuccess()
        return { success: true }
      }
      if (!data.success) {
        return { success: false }
      }
    } catch (err) {
      setError('Hoppsan! Ett oväntat fel har uppstått.')
      return { success: false }
    } finally {
      setIsLoading(false)
      whenDoneFn()
    }
  }

  const fetchGet = async (body: Record<string, unknown> = {}, whenDoneFn: () => void = () => {}) => {
    return await baseFetch('GET', body, whenDoneFn)
  }

  const fetchPost = async (body: any = {}, whenDoneFn: () => void = () => {}) => {
    return await baseFetch('POST', body, whenDoneFn)
  }

  const fetchPut = async (body: any = {}, whenDoneFn: () => void = () => {}) => {
    return await baseFetch('PUT', body, whenDoneFn)
  }

  const fetchDelete = async (body: Record<string, unknown> = {}, whenDoneFn: () => void = () => {}) => {
    return await baseFetch('DELETE', body, whenDoneFn)
  }

  return {
    postImage,
    deleteImage,
    fetchGet,
    fetchPost,
    fetchPut,
    fetchDelete,
    isLoading,
    error,
    data
  }
}

export default useFetch
