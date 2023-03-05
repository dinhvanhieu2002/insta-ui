import { io } from 'socket.io-client'
import { useState, useEffect, useContext, useRef } from 'react'
import Conversation from '../components/ChatBox/Conversation'
import Message from '../components/ChatBox/Message'
import { getConversatonsByUserId } from '../services/conversation'
import { createNewMessage, getMessagesByConversation } from '../services/messages'
import UserContext from '../context/user'

export default function Chat() {
  const [conversations, setConversatons] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef()
  // const [socket, setSocket] = useState(null)

  const {
    user: { user },
  } = useContext(UserContext)

  // const socket = io('http://localhost:3001')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newMessage = {
      conversationId: currentChat.id,
      userId: user.id,
      text: message,
    }
    console.log(currentChat)
    const receiverId = currentChat.members.find((m) => m !== user.id)

    socket.current.emit('sendMessage', {
      senderId: user.id,
      receiverId,
      text: message,
    })

    try {
      const res = await createNewMessage(newMessage)

      setMessages([...messages, res])
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    socket.current = io('http://localhost:3001')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', user.id)
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  console.log('online user', onlineUsers)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await getConversatonsByUserId(user.id)
        // console.log(res)

        setConversatons(res)
      } catch (error) {
        console.log(error)
      }
    }
    getConversations()
  }, [user.id])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getMessagesByConversation(currentChat.id)

        setMessages(res)
      } catch (error) {
        console.log(error)
      }
    }
    if (currentChat) {
      getMessages()
    }
  }, [currentChat])

  // console.log('conversations', conversations)
  // console.log('onlineUser', onlineUsers)

  return (
    <div className="w-full h-screen bg-gray-background">
      <div className="flex h-full">
        <div className="flex-1 bg-gray-100 w-full h-full">
          <div className="main-body container m-auto w-11/12 h-full flex flex-col py-6">
            <div className="main flex-1 flex flex-col border border-gray-bold rounded bg-white">
              <div className="flex-1 flex h-full">
                <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col border-r border-gray-bold">
                  <div className="flex justify-center flex-2 py-8 w-full mx-auto h-20 shadow-sm shadow-gray-bold ">
                    <span className="outline-none block bg-transparent border-gray-200 ">
                      <a href="/">
                        <img src="/images/logo.svg" alt="" />
                      </a>
                    </span>
                  </div>
                  <div className="flex-1 h-full overflow-auto px-2 mt-2">
                    {/* map conservation */}
                    {conversations.map((c) => (
                      <div key={c.id} onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser={user.id} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chat-area flex-1 flex flex-col">
                  <div className="flex-3 shadow-sm shadow-gray-bold h-20">
                    <div className="bg-white rounded-tr p-4 flex border-gray-bold">
                      {/* <div className="flex-2 flex-start items-center">
                        <div className="w-8 h-8 relative">
                          <img
                            className="w-8 h-8 rounded-full mx-auto my-auto"
                            src="https://el.tvu.edu.vn/images/avatar/no-avatar.png"
                            alt="chat-user"
                          />
                          <span className="absolute w-3 h-3 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"></span>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <div className="truncate w-32">
                          <span className="text-gray-800">Ryann Remo</span>
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
                      </div> */}
                    </div>
                  </div>
                  <div className="messages flex-1 overflow-y-scroll">
                    {/* <div className="message mb-4 flex">
                      <div className="flex ">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://el.tvu.edu.vn/images/avatar/no-avatar.png"
                            alt="chat-user"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="inline-block bg-gray-300 rounded-full p-2 text-gray-700">
                          <span>
                            Hey there. We would like to invite you over to our office for a visit. How about it?
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="message mb-4 flex">
                      <div className="flex ">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://el.tvu.edu.vn/images/avatar/no-avatar.png"
                            alt="chat-user"
                          />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="inline-block bg-gray-300 rounded-full p-2 text-gray-700">
                          <span>
                            Hey there. We would like to invite you over to our office for a visit. How about it?
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="message mb-4 flex text-right">
                      <div className="flex-1 px-2">
                        <div className="inline-block bg-blue-600 rounded-full p-2 px-6">
                          <span>It's like a dream come true</span>
                        </div>
                      </div>
                    </div> */}
                    {messages.map((m) => (
                      <Message key={m.id} message={m} owner={m.userId === user.id} />
                    ))}
                  </div>
                  <div className="flex-2 pt-4 pb-10">
                    <div className="write bg-white shadow flex rounded-lg mx-4">
                      <div className="flex-3 flex content-center items-center text-center p-4 pr-0">
                        <span className="block text-center text-gray-400 hover:text-gray-800">
                          <svg
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="h-6 w-6"
                          >
                            <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </span>
                      </div>
                      <div className="flex-1">
                        <input
                          onChange={(e) => setMessage(e.target.value)}
                          value={message}
                          name="message"
                          className="w-full block outline-none py-4 px-4 bg-transparent"
                          placeholder="Type a message..."
                          autoFocus
                        />
                      </div>
                      <div className="flex-2 w-32 p-2 flex content-center items-center">
                        <div className="flex-1 text-center">
                          <span className="text-gray-400 hover:text-gray-800">
                            <span className="inline-block align-text-bottom">
                              <svg
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                              >
                                <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                              </svg>
                            </span>
                          </span>
                        </div>
                        <div className="flex-1">
                          <button onClick={handleSubmit} className="bg-blue-400 w-10 h-10 rounded-full inline-block">
                            <span className="inline-block align-text-bottom">
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 "
                              >
                                <path d="M5 13l4 4L19 7"></path>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
