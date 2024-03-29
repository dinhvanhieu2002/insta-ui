import { useState, useEffect } from 'react'
import userService from '../../services/user'

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser)
    console.log(friendId)

    userService
      .getUserById(friendId)
      .then((res) => setUser(res))
      .catch((err) => console.log(err))
  }, [currentUser, conversation])

  console.log(user)
  return (
    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
      <div className="flex-2">
        <div className="w-12 h-12 relative">
          <img className="w-12 h-12 rounded-full mx-auto" src={user?.avatar} alt="chat-user" />
          <span className="absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32">
          <span className="text-gray-800">{user?.username}</span>
        </div>
        <div>
          <small className="text-gray-600">Yea, Sure!</small>
        </div>
      </div>
      <div className="flex-2 text-right">
        <div>
          <small className="text-gray-500">15 April</small>
        </div>
        <div>
          <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
            23
          </small>
        </div>
      </div>
    </div>
  )
}
