import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context/user'
import * as ROUTES from '../../constants/routes'
import { CreatePostIcon, ExploreIcon, HeartIcon, HomeIcon, MessageIcon } from '../Icons'
import HeadlessTippy from '@tippyjs/react/headless'
// import Tippy from '@tippyjs/react/headless'
import clsx from 'clsx'

import Search from '../Search'

export default function Header() {
  const [isClicked, setIsClicked] = useState(false)
  const {
    user: { user },
  } = useContext(UserContext)

  const navigate = useNavigate()

  console.log(user)

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/')
  }

  // useEffect(() => {

  // })

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 fixed top-0 left-0 right-0 z-40 border-b border-1 border-line bg-white">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="grid md:grid-cols-3 items-center justify-center h-header-h py-3 px-4 lg:px-0 mt-0">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer order-first">
            <h1 className="flex w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img src="/images/logo.svg" alt="Instagram" className="mt-2" />
              </Link>
            </h1>
          </div>
          <Search />
          <div className="flex items-center justify-end pl-6">
            <HomeIcon className={clsx('cursor-pointer')} />
            <MessageIcon className={clsx('ml-5 cursor-pointer')} />
            <CreatePostIcon className={clsx('ml-5 cursor-pointer')} />
            <ExploreIcon className={clsx('ml-5 cursor-pointer')} />
            <HeartIcon className={clsx('ml-5 cursor-pointer')} />
            <HeadlessTippy
              interactive
              visible={isClicked}
              onClickOutside={() => setIsClicked(false)}
              render={(attrs) => (
                <div className="w-32 bg-white shadow-slate-50 mt-2 rounded-md" tabIndex="-1" {...attrs}>
                  <div className="w-full">
                    <div className="flex flex-col items-center px-4 py-1.5 bg-white hover:bg-white cursor-pointer">
                      <Link to={`/p/${user.username}`} className="mt-3">
                        <span>View profile</span>
                      </Link>
                      <div className="mt-3">
                        <span onClick={handleLogout}>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            >
              <img
                onClick={() => setIsClicked(true)}
                className="w-6 h-6 rounded-full focus:outline-none ml-5 cursor-pointer object-cover"
                src={user.avatar}
                alt={`avatar of ${user.username}`}
              />
            </HeadlessTippy>
          </div>
        </div>
      </div>
    </header>
  )
}
