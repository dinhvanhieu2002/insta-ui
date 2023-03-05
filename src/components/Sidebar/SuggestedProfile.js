import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/user'

export default function SuggestedProfile({ avatar, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false)

  async function handleFollowed() {
    setFollowed(true)

    //call service de update following cho user va follower cho nguoi duoc follow
    await updateLoggedInUserFollowing(userId, profileId)
    await updateFollowedUserFollowers(profileId, userId)
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full object-cover w-8 h-8 flex mr-3"
          src={avatar || 'https://el.tvu.edu.vn/images/avatar/no-avatar.png'}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button className="text-xs font-bold text-blue-medium" type="button" onClick={handleFollowed}>
        Follow
      </button>
    </div>
  ) : null
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}
