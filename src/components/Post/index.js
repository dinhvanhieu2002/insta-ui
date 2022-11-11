import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import Header from './Header'
import Image from './Image'
import Actions from './Actions'
import Footer from './Footer'
import Comments from './Comments'

// import { getUserById } from '../../services/user'
// import commentService from '../../services/comment'
import { getCommentsByPost } from '../../services/comment'
import useUser from '../../hooks/useUser'

export default function Post({ post, loggedUser }) {
  const commentInput = useRef(null)
  const handleFocus = () => commentInput.current.focus()
  const likedPhoto = post.reactions.includes(loggedUser) ? true : false

  // const [userPost, setUserPost] = useState({})
  const [comments, setComments] = useState(null)

  const { activeUser } = useUser(post.userId)
  // const { activeUser } = {}

  useEffect(() => {
    async function getComments() {
      const res = await getCommentsByPost(post.id)
      setComments(res)
    }

    if (post.id) {
      getComments()
    }
    // commentService.getCommentsByPost(post.id).then((comments) => setComments(comments))
  }, [post.id])

  // console.log(comments, activeUser)
  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md">
        <Header userPost={activeUser} />
        <Image src={post.photo} />
        <Actions
          loggedUser={loggedUser}
          postId={post.id}
          totalLikes={post.reactions.length}
          likedPhoto={likedPhoto}
          handleFocus={handleFocus}
        />

        <Footer caption={post.caption} userPost={activeUser} />
        <Comments postId={post.id} comments={comments} posted={post.createdAt} commentInput={commentInput} />
      </div>
    </div>
  )
}
