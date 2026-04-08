import React from 'react'
import { SideBar } from './SideBar'
import { Navbar } from './Navbar'

export const DashboardLayout = ({children, title = "Tổng quan" }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Navbar title={title}/>
        <main className="p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
