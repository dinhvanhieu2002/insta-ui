import { useState, useEffect, useContext } from 'react'
import userService from '../services/user'

export default function useUser(userId) {
  const [activeUser, setActiveUser] = useState()

  useEffect(() => {
    // async function getUserObjectByUserId() {
    //   const response = await getUserById(userId)
    //   setActiveUser(response || {})
    // }

    userService.getUserById(userId).then((user) => setActiveUser(user))

    // if (userId) {
    //   getUserObjectByUserId()
    // }
  }, [])
  // console.log(activeUser)

  return { activeUser }
}
