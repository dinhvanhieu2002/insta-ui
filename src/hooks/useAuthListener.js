import { useState, useEffect } from 'react'

export default function useAuthListener() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userToken')))
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      //   setUser({})
      // } else {
      setUser(JSON.parse(localStorage.getItem('userToken')))
    }
  }, [localStorage.getItem('userToken')])

  return { user }
}
