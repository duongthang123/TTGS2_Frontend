"use client"

import Link from 'next/link';
import React from 'react'

const menuItems = [
    { name : "Tổng quan", href: "/dashboard", icon: "acs"},
    { name : "Người dùng", href: "/dashboard/users", icon: "acs"},
    { name : "Đội công tác", href: "/dashboard/users", icon: "acs"},
    { name : "Cài đặt", href: "/dashboard/settings", icon: "acs"},
];

export const SideBar = () => {
  return (
    <>
        <aside className="w-64 bg-slate-600 text-slate-300 hidden md:flex flex-col border-r border-slate-800">
            <div className="p-6 text-white text-center text-xl font-bold tracking-wider">PC11B</div>
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => (
                    <Link key={item.name} href={item.href} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                            <span>{item.icon}</span>
                            {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    </>
  )
}
