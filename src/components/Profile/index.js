import { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/user'
import { getPostsById } from '../../services/post'
import Header from './Header'
import Posts from './Posts'
import PostCreator from '../Modal/PostCreator'
import UploadArea from './UploadArea'

export default function Profile({ userProfile }) {
  const {
    user: { user },
  } = useContext(UserContext)
  const [posts, setPosts] = useState([])
  const [isLoggedUser, setIsLoggedUser] = useState(false)
  //get post image of user
  useEffect(() => {
    async function getPosts() {
      const posts = await getPostsById(userProfile.id)

      setPosts(posts)
    }

    if (userProfile.id) {
      getPosts()
    }
  }, [])

  useEffect(() => {
    if (userProfile.id === user.id) {
      setIsLoggedUser(true)
    }
  }, [])

  return (
    <>
      <Header
        isLoggedUser={isLoggedUser}
        following={userProfile.following.length}
        followers={userProfile.followers.length}
        postCount={posts.length}
        userProfile={userProfile}
      />
      {/* //phần ảnh thay list ảnh <-> modal upload */}
      {isLoggedUser && posts ? <Posts posts={posts} /> : <UploadArea />}
    </>
  )
}
