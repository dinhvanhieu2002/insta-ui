function AccountItem({ data }) {
  return (
    <div className="flex items-center px-4 py-1.5 bg-white hover:bg-gray-background cursor-pointer">
      <img
        className="object-cover rounded-full w-10 h-10"
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f89b316574f8f0ab300e20d4b7ff6a29~c5_100x100.jpeg?x-expires=1666710000&x-signature=QqIR0CYsenheN46VhfVulyqZUjc%3D"
        alt="Hincute"
      />
      <div className="flex-1 ml-3">
        <span className="text-sm font-medium text-black-primary">{data.username}</span>
        <h4 className="text-sm text-black-light">
          <span>{data.fullname}</span>
        </h4>
      </div>
    </div>
  )
}

export default AccountItem
