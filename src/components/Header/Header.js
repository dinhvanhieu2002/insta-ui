import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { CreatePostIcon, ExploreIcon, HeartIcon, HomeIcon, MessageIcon } from '../Icons'
// import Tippy from '@tippyjs/react/headless'
import clsx from 'clsx'

import Search from '../Search'

export default function Header() {
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
            <img
              className="w-6 h-6 rounded focus:outline-none ml-5 cursor-pointer"
              src="https://el.tvu.edu.vn/images/avatar/no-avatar.png"
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
