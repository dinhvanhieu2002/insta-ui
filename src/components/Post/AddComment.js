import { useState, useContext } from 'react'
import UserContext from '../../context/user'
import { addComment } from '../../services/comment'

export default function AddComment({ postId, commentInput }) {
  const [comment, setComment] = useState('')

  const {
    user: { id },
  } = useContext(UserContext)

  const handleSubmitComment = async (event) => {
    event.preventDefault()

    //service add comment
    await addComment({ postId, userId: id, caption: comment })
    // setComments([savedComment, ...comments])

    setComment('')
  }

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(e) => (comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault())}
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 focus:outline-none"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
          type="button"
          onClick={handleSubmitComment}
          disabled={comment.length < 1}
        >
          Post
        </button>
      </form>
    </div>
  )
}
