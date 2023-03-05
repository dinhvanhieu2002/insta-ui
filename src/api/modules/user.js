import privateClient from '../client/private.client'

const userEndpoints = {
  signin: 'users/signin',
  signup: 'users/signup',
  getInfo: 'users/info',
  getUserByUsername: ({ username }) => `users/${username}`,
  passwordUpdate: 'user/update-password',
}

const userApi = {
  signin: async ({ username, password }) => {
    try {
      const response = await privateClient.post(userEndpoints.signin, {
        username,
        password,
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
  signup: async ({ username, fullname, password, confirmPassword }) => {
    try {
      const response = await privateClient.post(userEndpoints.signup, {
        username,
        fullname,
        password,
        confirmPassword,
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo)

      return { response }
    } catch (error) {
      return { error }
    }
  },
  getUserByUsername: async ({ username }) => {
    try {
      const response = await privateClient.get(userEndpoints.getUserByUsername(username))

      return { response }
    } catch (error) {
      return { error }
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      })

      return { response }
    } catch (error) {
      return { error }
    }
  },
}

export default userApi
