import { useState } from 'react'
import { SlCamera } from 'react-icons/sl'
import PostCreator from '../Modal/PostCreator'
export default function UploadArea() {
  const [showPostModal, setShowPostModal] = useState(false)
  const handleClose = () => {
    setShowPostModal(false)
  }

  return (
    <div className="relative min-h-screen border-t border-gray-primary mt-12 pt-4">
      <div className="flex flex-col mt-8 items-center ">
        <button type="button" onClick={() => setShowPostModal(true)}>
          <SlCamera className="w-20 h-20 rounded-full border p-4" />
        </button>
        <span>Share Photos</span>
        <p>When you share photos, they will appear on your profile</p>
        <span onClick={() => setShowPostModal(true)}>Share your first photo</span>
      </div>
      <PostCreator visible={showPostModal} onClose={handleClose} />
    </div>
  )
}
