"use client"

import api from '@/services/api';
import { Cog6ToothIcon, HomeIcon, UserGroupIcon, UserIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import Cookies from 'js-cookie';
import { AuthContext } from '@/context/AuthContext';

const menuItems = [
    { name : "Tổng quan", href: "/dashboard", icon: <HomeIcon className='w-6 h-6'/>},
    { name : "Người dùng", href: "/dashboard/users", icon: <UserIcon className='w-6 h-6'/>},
    { name : "Đội công tác", href: "/dashboard/users", icon: <UserGroupIcon className='w-6 h-6' />},
    { name : "Cài đặt", href: "/dashboard/settings", icon: <Cog6ToothIcon className='w-6 h-6' />},
    { name : "Đăng xuất", href: null, icon: <ArrowRightStartOnRectangleIcon className='w-6 h-6'/>,},
];

const isActiveRoute = (pathname, href) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
};

export const SideBar = () => {
    const {user, setUser} = useContext(AuthContext);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.log(error)
        } finally {
            Cookies.remove('access_token');
            setUser(null);
            router.push("/login");
        }
    };

  return (
    <>
        <aside className="w-64 bg-slate-600 text-slate-300 hidden md:flex flex-col border-r border-slate-800">
            <div className="p-6 text-white text-center text-xl font-bold tracking-wider">PC11B</div>
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = isActiveRoute(pathname, item.href);
                
                    if(item.name === "Đăng xuất") {
                        return (
                            <button
                                key={item.name}
                                onClick={handleLogout}
                                className="flex items-center cursor-pointer w-full gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
                            >
                                <span>{item.icon}</span>
                                {item.name}
                            </button>
                        );
                    }
                    return (
                        <Link key={item.name} href={item.href} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                                     hover:bg-slate-800 hover:text-white transition-all
                                     ${isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white"}
                            `}>
                                <span>{item.icon}</span>
                                {item.name}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    </>
  )
}
