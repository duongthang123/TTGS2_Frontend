"use client"

import React, { useContext } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { AuthContext } from '@/context/AuthContext'

export const Navbar = ({title}) => {
    const {user} = useContext(AuthContext);
  return (
    <>
        <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h2 className="font-bold text-gray-800 text-lg hidden md:block">
                    {title}
                </h2>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <div className="relative hidden sm:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <MagnifyingGlassIcon className='w-5 h-5 text-slate-500' />
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="pl-10 pr-4 py-1.5 bg-gray-100 border-none  outline-none rounded-full text-sm focus:ring-2 focus:ring-slate-500 w-48 lg:w-64 transition-all"
                />
                </div>

                <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-9 h-9 rounded-lg bg-slate-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                        A
                    </div>
                    <div className="text-right hidden lg:block">
                        <p className="text-sm font-semibold text-gray-900 leading-none">{user?.name ?? ""}</p>
                        <p className="text-xs text-gray-500 mt-1">Quản trị viên</p>
                    </div>
                </div>
            </div>
            </header>
    </>
  )
}
