import React from 'react'
import { SideBar } from './SideBar'
import { Navbar } from './Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const DashboardLayout = ({children, title = "Phần mềm quản lý CBCS" }) => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[2000px] flex-col bg-[#f8fafc] md:flex-row">
      <SideBar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar title={title}/>
        <main className="w-full min-w-0 flex-1 px-4">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
