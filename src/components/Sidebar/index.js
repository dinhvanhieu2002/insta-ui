// import useUser from '../../hooks/useUser'
import User from './User'
import Suggestions from './Suggestions'
import { useContext } from 'react'
import UserContext from '../../context/user'
import useUser from '../../hooks/useUser'

export default function Sidebar() {
  // const user = useUser()
  const {
    user: { user },
  } = useContext(UserContext)

  // console.log(user)

  return (
    <div className="p-4">
      <User username={user.username} fullName={user.fullname} />
      <Suggestions userId={user.id} />
    </div>
  )
}
