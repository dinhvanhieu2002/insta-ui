import React from 'react'
import clsx from 'clsx'

const FormDivider = ({ className }) => {
  return (
    <div>
      <div className={clsx('flex-between', className)}>
        <div className={clsx('h-0.5 w-full', 'bg-line')} />
        <div className={clsx('font-medium mx-4 text-sm', 'text-base-gray')}>OR</div>
        <div className={clsx('h-0.5 w-full', 'bg-line')} />
      </div>
    </div>
  )
}

export default FormDivider
