import { useContext } from 'react'
import userContext from '../context/user'

const useAuth = () => {
  return useContext(userContext)
}

export default useAuth
