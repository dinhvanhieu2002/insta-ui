import { useDropzone } from 'react-dropzone'
import { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/user'
import { postUpload } from '../../services/uploads'
import { createPost } from '../../services/post'

const thumb = {
  display: 'block',
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
}

export default function PostCreator({ visible, onClose }) {
  const [files, setFiles] = useState([])
  const [caption, setCaption] = useState('')
  const {
    user: { user },
  } = useContext(UserContext)
  const isInvalid = files.length === 0 || caption === ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formUpload = new FormData()
    formUpload.append('file', files[0], 'file')

    try {
      const urlUpload = await postUpload(formUpload)
      await createPost({ caption, photo: urlUpload.secure_url, userId: user.id })
    } catch (error) {
      console.log(error.message)
    }
  }

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  useEffect(() => {
    if (onClose) {
      setFiles([])
      setCaption('')
    }
  }, [onClose])

  const thumbs = files.map((file) => (
    <div className="w-full h-full" style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          className="rounded-br-lg rounded-bl-lg max-w-none h-96 object-cover overflow-x-hidden"
          src={file.preview}
          alt=""
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [])

  if (!visible) return null

  return (
    <div className="flex flex-col items-center justify-center bg-gray-blur fixed top-0 right-0 left-0 z-50 w-full md:inset-0">
      <div className="relative p-4">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data"> */}
          <div className="flex items-center justify-between p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create new post</h3>
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isInvalid}
              className={`${isInvalid && 'opacity-50'} p-1 text-blue-medium`}
            >
              Post
            </button>

            <button
              onClick={onClose}
              type="button"
              className={`fixed top-0 right-0 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`}
            >
              <svg
                aria-hidden="true"
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-2">
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              className="outline-none focus:outline-none w-full"
              placeholder="Write your caption here"
            />
          </div>
          <div className="w-96 h-96">
            <div className="container h-full w-full relative">
              <div {...getRootProps({ className: 'dropzone flex flex-col items-center justify-center h-full' })}>
                <input onChange={(e) => console.log(e.target.value)} {...getInputProps()} />
                <svg
                  aria-label="Icon to represent media such as images or videos"
                  color="#262626"
                  fill="#262626"
                  height="77"
                  role="img"
                  viewBox="0 0 97.6 77.3"
                  width="96"
                >
                  <path
                    d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>Drag photos and videos here</p>
                <button type="button" onClick={open}>
                  Select from computer
                </button>
              </div>
              <div className="absolute w-full bottom-0 border-none">{thumbs}</div>
            </div>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}
