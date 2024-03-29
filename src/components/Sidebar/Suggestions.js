import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import { getSuggestedProfiles } from '../../services/user'
import SuggestedProfile from './SuggestedProfile'

export default function Suggestions({ userId }) {
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId)
      setProfiles(response)
    }
    if (userId) {
      suggestedProfiles()
    }
  }, [userId])

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.id}
            avatar={profile.avatar}
            username={profile.username}
            profileId={profile.id}
            userId={userId}
          />
        ))}
      </div>
    </div>
  ) : null
}

Suggestions.propTypes = {
  userId: PropTypes.string,
}
