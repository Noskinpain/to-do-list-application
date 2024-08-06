import React from 'react'

const SideBar = () => {
  return (
    <div className='w-1/5'>
      <h1 className='text-3xl font-bold'>Todo</h1>
      <input type='text' placeholder='Search for tags...' className='mt-5 placeholder:text-gray-600'/>
    </div>
  )
}

export default SideBar