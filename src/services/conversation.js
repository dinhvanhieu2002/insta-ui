import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/conversation'

export const getConversatonsByUserId = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)

  return response.data
}

export const createNewConversation = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)

  return response.data
}
