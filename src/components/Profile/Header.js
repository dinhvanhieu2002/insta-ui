import { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/user'
import Skeleton from 'react-loading-skeleton'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/user'

export default function Header({ isLoggedUser, following, followers, postCount, userProfile }) {
  const {
    user: { user },
  } = useContext(UserContext)
  const followed = userProfile.followers.includes(user.id) ? true : false
  const [isFollowingProfile, setIsFollowingProfile] = useState(followed)
  const [followersCount, setFollowerCount] = useState(followers)
  const activeBtnFollow = isLoggedUser === false

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile)

    await updateFollowedUserFollowers(userProfile.id, user.id)
    await updateLoggedInUserFollowing(user.id, userProfile.id)

    setFollowerCount((followers) => (isFollowingProfile ? followers - 1 : followers + 1))
    // setFollowerCount({
    //   followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    // })
    // await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
  }

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg py-8">
      <div className="container flex justify-center items-center">
        {userProfile ? (
          <img
            className="rounded-full h-40 w-40 flex object-cover"
            alt={`${userProfile.username} profile picture`}
            src={userProfile.avatar}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{userProfile.username}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                type="button"
                onClick={handleToggleFollow}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleToggleFollow()
                  }
                }}
              >
                {isFollowingProfile ? 'Unfollow' : 'Follow'}
              </button>
            )
          )}
        </div>
        <div className="container flex mt-4">
          {followers === null || following === null ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{postCount}</span> posts
              </p>
              <p className="mr-10">
                <span className="font-bold">{followersCount}</span>
                {` `}
                {followersCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!userProfile.fullname ? <Skeleton count={1} height={24} /> : userProfile.fullname}
          </p>
        </div>
      </div>
    </div>
  )
}
