import { useState, useEffect, useContext } from 'react'
import useUser from '../hooks/useUser'
import Skeleton from 'react-loading-skeleton'
import postService from '../services/post'
import Post from './Post'
import UserContext from '../context/user'

export default function Timeline() {
  const {
    user: { user },
  } = useContext(UserContext)

  const [posts, setPosts] = useState(null)

  useEffect(() => {
    // async function getPosts() {
    //   const posts = await getPostsByFollowing(user.id)
    //   setPosts(posts)
    // }

    // if (user.id) {
    //   getPosts()
    // }
    postService.getPostsByFollowing(user.id).then((posts) => setPosts(posts))
  }, [])

  console.log(posts)

  return (
    <div className="container col-span-2 flex justify-center flex-col items-center mt-4">
      {!posts ? (
        <Skeleton count={4} width={640} height={500} className="mb-5" />
      ) : posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} loggedUser={user.id} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see new posts</p>
      )}
    </div>
  )
}
