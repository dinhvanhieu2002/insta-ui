import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import { CreatePostIcon, ExploreIcon, HeartIcon, HomeIcon, MessageIcon, SearchIcon } from '../Icons'

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 fixed top-0 left-0 right-0 z-40 border-b border-1 border-line bg-white">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="grid md:grid-cols-3 items-center justify-center h-header-h py-3 px-4 lg:px-0 mt-0">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img src="/images/logo.svg" alt="Instagram" className="mt-2" />
              </Link>
            </h1>
          </div>
          <div className="relative hidden md:block ml-auto w-[268px] h-full">
            <div className="flex items-center px-4 py-1 h-full rounded-md bg-gray-100">
              <SearchIcon />
              <input
                type="text"
                className="w-full h-full font-medium text-sm placeholder:font-normal placeholder:text-base-gray"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-5">
            <HomeIcon />
            <MessageIcon className="flex-shrink-0 cursor-pointer" />
            <CreatePostIcon className="flex-shrink-0 cursor-pointer" />
            <ExploreIcon className="flex-shrink-0 cursor-pointer" />
            <HeartIcon className="flex-shrink-0 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  )
}
