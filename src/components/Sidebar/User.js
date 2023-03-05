import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

const User = ({ username, fullName, avatar }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="flex items-center px-4 py-1.5">
      <div className="">
        <img className="rounded-full w-8 h-8 flex mr-3 object-cover" src={avatar} alt={`${username}'s profile`} />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  )
}

export default User

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
}
