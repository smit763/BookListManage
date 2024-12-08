import React from 'react'

const LoadingPage = () => {
  return (
    <>
     <div
      className="d-flex justify-content-center align-items-center h-100vh"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading, please wait...</p>
      </div>
    </div>
    </>
  )
}

export default LoadingPage