import { Link } from 'react-router-dom'

function AccountItem({ data }) {
  return (
    <Link
      to={`/p/${data.username}`}
      className="flex items-center px-4 py-1.5 bg-white hover:bg-gray-background cursor-pointer"
    >
      <img className="object-cover rounded-full w-10 h-10" src={`${data.avatar}`} alt="Hincute" />
      <div className="flex-1 ml-3">
        <span className="text-sm font-medium text-black-primary">{data.username}</span>
        <h4 className="text-sm text-black-light">
          <span>{data.fullname}</span>
        </h4>
      </div>
    </Link>
  )
}

export default AccountItem
