import React from 'react'
import clsx from 'clsx'

const TextField = ({ type = 'text', placeholder, className, errors }) => {
  const errorMessage = errors
  return (
    <div>
      <div className={clsx('border-1 border-line rounded-sm', 'bg-body', className)}>
        <input
          className={clsx('w-full px-2 py-2 text-sm', 'placeholder:text-sm-1')}
          type={type}
          placeholder={placeholder}
        />
      </div>
      {errorMessage && <span className={clsx('text-sm-1 mt-1 text-left', 'text-red-500')}>{errorMessage}</span>}
    </div>
  )
}

export default TextField
