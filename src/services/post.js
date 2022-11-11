import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/posts'

// export const getPostsByFollowing = async (userId) => {
//   const response = await axios.get(`${baseUrl}/following/${userId}`)

//   return response.data
// }
export const createPost = (credentials) => {
  const res = axios.post(baseUrl, credentials)

  return res.data
}

const getPostsByFollowing = (userId) => {
  const request = axios.get(`${baseUrl}/following/${userId}`)

  return request.then((res) => res.data)
}

//update like post
export const updateLikesPost = async (postId, userId) => {
  await axios.put(`${baseUrl}/likes/${postId}/${userId}`)
}

export const getPostsById = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)

  return response.data
}

export default { getPostsByFollowing }
