import { useEffect, useState } from 'react'
import { formatDistance, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
// import { getUserById } from '../../services/user'
import AddComment from './AddComment'
import userService from '../../services/user'
import Comment from './Comment'

export default function Comments({ postId, comments, posted, commentInput }) {
  const [commentsSlice, setCommentsSlice] = useState(3)
  // console.log(allComments)

  // const [comments, setComments] = useState(allComments)

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3)
  }

  // const getUserNameById = (userId) => {
  //   userService.getUserById(userId)
  // }

  // console.log(getUserNameById('6356af66c11dbb76632446aa'))

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments?.length > 0 &&
          comments?.slice(0, commentsSlice).map((item) => (
            <Comment key={item.id} caption={item.caption} userId={item.userId} />
            // <p key={index} className="mb-1">
            //   <Link to={`/p/${getUserNameById(item.userId)}`}>
            //     <span className="mr-1 font-bold text-sm">{getUserNameById(item.userId)}</span>
            //   </Link>
            //   {/* {item.userId} */}
            //   <span>{item.caption}</span>
            // </p>
          ))}
        {comments?.length >= 3 && commentsSlice < comments?.length && (
          <button
            className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                showNextComments()
              }
            }}
          >
            View more comments
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(parseISO(posted), new Date(), { addSuffix: true })}
        </p>
      </div>
      <AddComment postId={postId} commentInput={commentInput} />
    </>
  )
}
