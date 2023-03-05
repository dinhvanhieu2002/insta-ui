import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/messages'

export const getMessagesByConversation = async (conversationId) => {
  const response = await axios.get(`${baseUrl}/${conversationId}`)

  return response.data
}

export const createNewMessage = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)

  return response.data
}
