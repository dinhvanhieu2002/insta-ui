import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export async function getUserByUsername(username) {
  const response = await axios.get(baseUrl + '/' + username)

  return response.data
}

// export async function getUserById(id) {
//   const response = await axios.get(baseUrl + '/id/' + id)

//   return response.data
// }

const getUserById = (id) => {
  const request = axios.get(baseUrl + '/id/' + id)

  return request.then((res) => res.data)
}

export async function getSuggestedProfiles(id) {
  const response = await axios.get(baseUrl + '/suggested/' + id)

  return response.data
}

//update following
export async function updateLoggedInUserFollowing(userId, profileId) {
  await axios.put(`${baseUrl}/following/${userId}/${profileId}`)
}

//update follower
export async function updateFollowedUserFollowers(profileId, userId) {
  await axios.put(`${baseUrl}/followers/${profileId}/${userId}`)
}

export default { getUserById }
