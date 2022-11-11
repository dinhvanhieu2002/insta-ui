import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'

export default function Comment({ userId, caption }) {
  const { activeUser } = useUser(userId)

  return (
    <p className="mb-1">
      <Link to={`/p/${activeUser?.username}`}>
        <span className="mr-1 font-bold text-sm">{activeUser?.username}</span>
      </Link>
      <span>{caption}</span>
    </p>
  )
}
