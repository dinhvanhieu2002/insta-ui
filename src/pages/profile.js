import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getUserByUsername } from '../services/user'
import * as ROUTES from '../constants/routes'
import Header from '../components/Header/Header'
import UserProfile from '../components/Profile'

export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  console.log(username)

  const navigate = useNavigate()

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username)
      if (user?.id) {
        setUser(user)
      } else {
        navigate(ROUTES.NOT_FOUND)
      }
    }
    checkUserExists()
  }, [username, navigate])

  console.log(user)

  return user?.username ? (
    <div className="bg-gray-background min-h-screen">
      <Header />
      <div className="mx-auto max-w-screen-lg mt-16">
        <UserProfile userProfile={user} />
      </div>
    </div>
  ) : null
}
