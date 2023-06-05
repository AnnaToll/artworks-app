import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Error from '../features/Error'
import { useNavigate } from 'react-router-dom'
import { useIsLoggedIn } from '../../context/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const { fetchPost, data, error } = useFetch('/login', null)
  const auth = useIsLoggedIn()
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
    fetchPost(userData)
  }

  useEffect(() => {
    if (data) {
      auth.setLoggedIn(true)
    }
  }, [data, error])

  useEffect(() => {
    if (auth.loggedIn) {
      navigate('/admin')
    }
  }, [auth.loggedIn])

  return (
    <main>
      <h2>Logga in</h2>
      <Error error={error} />
      <form onSubmit={handleSubmit} className='login-form'>
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
        <button className='btn-blue'>
          <span>Logga in</span>
        </button>
      </form>
    </main>
  )
}

export default Login
