import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function layout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <>
      {/* <Navbar/> */}
      <main className="container w-[100%] mt-0 mb-6"> 
          {children}
        </main>
        <ToastContainer/> 
    </>
  )
}

export default layout