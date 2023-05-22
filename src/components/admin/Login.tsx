import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Error from '../features/Error'

const Login = () => {
  const { fetchPost, data, error } = useFetch('/login', null)
  const [userData, setUserData] = useState({
    email: '',
    pwd: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserData({
      ...userData,
      ...(e.target.type === 'email' ? { email: value } : { pwd: value })
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log('post:')
    console.log(userData)
    fetchPost(userData)
  }

  useEffect(() => {
    console.log(error)
    console.log(data)
    if (data) {
      console.log(data)
      localStorage.setItem('token', JSON.stringify(data))
    }
  }, [data, error])

  return (
    <section>
      <h2>Logga in</h2>
      <Error error={error} />
      <form onSubmit={handleSubmit}>
        <input
          autoComplete='email'
          type="email"
          placeholder="Epost"
          value={userData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={userData.pwd}
          onChange={handleChange}
        />
        <button>Logga in</button>
      </form>
    </section>
  )
}

export default Login
