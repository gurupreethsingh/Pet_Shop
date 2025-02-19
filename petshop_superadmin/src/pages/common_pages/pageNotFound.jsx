import React from 'react'

const PageNotFound = () => {
  return (
    <div className='flex justify-center items-center flex-col  p-5 m-5'>
      <h1 className='text-red-700 text-4xl font-bold text-center'>404 page not found</h1>

      <div>

        <a href = "/" className='mt-5 mb-5 btn  bg-green-500 hover:bg-green-600 text-light rounded-pill font-bold px-5'> &larr; Back To Homepage</a>

      </div>
      
    </div>
  )
}

export default PageNotFound
