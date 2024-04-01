import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='w-11/12 sm:w-4/5 max-w-4xl m-auto'>
      {children}
    </div>
  )
}

export default Wrapper
