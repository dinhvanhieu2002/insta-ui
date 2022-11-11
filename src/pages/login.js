import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Facebook from '../components/Facebook'
import loginService from '../services/login'
import * as ROUTES from '../constants/routes'
// import { getUserByUsername } from '../services/user'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // const [error, setError] = useState('')
  const isInvalid = password === '' || username === ''

  useEffect(() => {
    // const userToken = window.localStorage.getItem('userToken')
    // if (userToken) {
    //   const user = JSON.parse(userToken)
    //   // setUser(user)
    // }
    // navigate(ROUTES.DASHBOARD)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('userToken', JSON.stringify(user))

      setTimeout(() => {
        window.localStorage.removeItem('userToken')
      }, 1000 * 60 * 60)

      // setUser(user)
      navigate('/')
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen mt-8">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.png" alt="iPhone with Insta Profile" className="" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.svg" alt="Insta logo" className="mt-2 w-6/12 mb-4" />
          </h1>
          {errorMessage && <p className="mb-4 text-xs text-red-primary">{errorMessage}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
            >
              Log in
            </button>
            <span>or</span>
            <Facebook />
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don't have an account
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
