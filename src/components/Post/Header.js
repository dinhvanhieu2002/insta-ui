import { Link } from 'react-router-dom'

export default function Header({ userPost }) {
  // console.log(userPost?.username)
  return (
    <Link to={`/p/${userPost?.username}`} className="flex items-center px-4 py-3">
      <img className="h-8 w-8 rounded-full" src={userPost?.avatar} />
      <div className="ml-3 ">
        <span className="text-sm font-semibold antialiased block leading-tight">{userPost?.username}</span>
      </div>
    </Link>
  )
}
