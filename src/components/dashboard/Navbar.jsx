import React from 'react'

export const Navbar = ({title}) => {
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
                    🔍
                </span>
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="pl-10 pr-4 py-1.5 bg-gray-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-48 lg:w-64 transition-all"
                />
                </div>

                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                🔔
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900 leading-none">Admin User</p>
                    <p className="text-xs text-gray-500 mt-1">Quản trị viên</p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                    A
                </div>
                </div>
            </div>
            </header>
    </>
  )
}
