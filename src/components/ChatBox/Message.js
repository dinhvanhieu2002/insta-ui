export default function Message({ message, owner }) {
  console.log('owner', owner)
  return owner ? (
    <div className="message mb-4 flex text-right">
      <div className="flex-1 px-2">
        <div className="inline-block bg-blue-600 rounded-full p-2 px-6">
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  ) : (
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
          <span>{message.text}</span>
        </div>
      </div>
    </div>
  )
}
