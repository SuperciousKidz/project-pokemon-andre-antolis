import React from 'react'
import { Spinner } from 'react-bootstrap'
import '../components/css/Loading.css'

const Loading = () => {
  return (
      <div>
        <div className='loading justify-content-center'>
            <Spinner className='loading-size' animation="border" variant="primary" />
        </div>
        <div className='description justify-content-center d-flex'>
            Loading Data Pokemon...
        </div>
      </div>

  )
}

export default Loading