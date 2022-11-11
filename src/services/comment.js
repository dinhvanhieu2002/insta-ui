import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/comments'

//comment
export const addComment = async (credentials) => {
  const response = await axios.post(`${baseUrl}/`, credentials)

  return response.data
}

//get comment
export const getCommentsByPost = async (postId) => {
  const response = await axios.get(`${baseUrl}/${postId}`)

  return response.data
}
// const getCommentsByPost = (postId) => {
//   const request = axios.get(`${baseUrl}/${postId}`)

//   return request.then((res) => res.data)
// }

// export default { getCommentsByPost }

// eslint-disable-next-line
// export default { addComment, getCommentsByPost }
