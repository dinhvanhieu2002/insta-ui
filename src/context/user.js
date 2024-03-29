import { createContext, useState } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState({})

  return <UserContext.Provider value={{ auth, setAuth }}>{children}</UserContext.Provider>
}

export default UserContext
