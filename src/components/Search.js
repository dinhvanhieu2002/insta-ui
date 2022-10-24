import { useState, useEffect, useRef } from 'react'
import HeadlessTippy from '@tippyjs/react/headless'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useDebounce from '../hooks/useDebounce'
import { SearchIcon } from '../components/Icons'
import AccountItem from './AccountItem'

import * as searchServices from '../services/search'

function Search() {
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(true)
  const [loading, setLoading] = useState(false)
  const debounced = useDebounce(searchValue, 500)

  const inputRef = useRef()

  useEffect(() => {
    if (!debounced) {
      setSearchResult([])
      return
    }

    const fetchApi = async () => {
      setLoading(true)

      const result = await searchServices.search(debounced)

      console.log(result)

      setSearchResult(result)
      setLoading(false)
    }

    fetchApi()
  }, [debounced])

  const handleClear = () => {
    setSearchValue('')
    setSearchResult([])
  }

  const handleHideResult = () => {
    setShowResult(false)
  }

  const handleChange = (e) => {
    const searchValue = e.target.value

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  return (
    <div>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className="w-96 bg-white shadow-slate-50 mt-2 rounded-md" tabIndex="-1" {...attrs}>
            <div className="w-full pt-3">
              {searchResult && searchResult.map((result, index) => <AccountItem key={index} data={result} />)}
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className="relative hidden md:block ml-auto w-full h-full bg-gray-highlight border-0 rounded-lg">
          <div className="flex items-center px-4 py-2 h-full rounded-md bg-gray-100">
            <SearchIcon />
            <input
              ref={inputRef}
              value={searchValue}
              placeholder="Search"
              spellCheck={false}
              onChange={handleChange}
              className="bg-gray-highlight text-base ml-2 focus:outline-none w-full h-full text-sm placeholder:font-normal placeholder:text-base-gray"
            />

            {!!searchValue && !loading && (
              <button className="absolute top-1/4 right-2 text-gray-bold" onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

            {loading && (
              <FontAwesomeIcon className="absolute top-1/4 right-2 animate-spin text-gray-bold" icon={faSpinner} />
            )}
          </div>
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default Search
