import { useState, useEffect } from 'react'
import { getUserByUsername } from '../services/user'

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userToken')))

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('userToken')
    } else {
      setUser(JSON.parse(localStorage.getItem('userToken')))
    }
    // const userToken = JSON.parse(localStorage.getItem('userToken'))
    // const getUser = async () => {
    //   const result = await getUserByUsername(userToken.username)
    //   localStorage.setItem('authUser', JSON.stringify(result))

    //   setUser(result)
    // }
    // if (userToken) {
    //   getUser()
    // }
  }, [])

  return { user }
}
