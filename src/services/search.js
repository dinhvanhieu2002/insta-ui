import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users/search/'

export const search = async (username) => {
  const response = await axios.get(baseUrl + `${username}`)
  return response.data
}
