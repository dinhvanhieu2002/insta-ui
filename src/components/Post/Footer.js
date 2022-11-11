export default function Footer({ caption, userPost }) {
  return (
    <div className="p-4 pt-2 pb-0">
      <span className="mr-1 font-bold">{userPost?.username}</span>
      <span className="">{caption}</span>
    </div>
  )
}
