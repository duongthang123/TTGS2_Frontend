import React from 'react'
import { SideBar } from './SideBar'
import { Navbar } from './Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const DashboardLayout = ({children, title = "Phần mềm quản lý CBCS" }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
        <aside className="shrink-0 w-64 flex flex-col h-screen bg-slate-600 text-slate-300 border-r border-slate-800">
          <SideBar />
        </aside>
      <div className="flex-1 flex flex-col">
        <Navbar title={title}/>
        <main className="px-4 mx-auto w-full">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  )
}
