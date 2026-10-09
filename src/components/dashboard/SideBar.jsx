"use client"

import api from '@/services/api';
import { Cog6ToothIcon, HomeIcon, UserGroupIcon, UserIcon, ArrowRightStartOnRectangleIcon, UsersIcon, ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import Cookies from 'js-cookie';
import { AuthContext } from '@/context/AuthContext';
import PermissionGuard from '@/components/guards/PermissionGuard';
import RoleGuard from '../guards/RoleGuard';

const isActiveRoute = (pathname, href) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
};

export const SideBar = () => {
    const {setUser} = useContext(AuthContext);
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
                <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard") ? "bg-slate-800 text-white" : ""}`}>
                    <HomeIcon className="w-6 h-6" />
                    Tổng quan
                </Link>

                <PermissionGuard permissions={["show-role"]}>
                    <Link href="/dashboard/roles" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/roles") ? "bg-slate-800 text-white" : ""}`}>
                        <UsersIcon className="w-6 h-6" />
                        Quản lý quyền
                    </Link>
                </PermissionGuard>

                <PermissionGuard permissions={["show-user"]}>
                    <Link href="/dashboard/users" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/users") ? "bg-slate-800 text-white" : ""}`}>
                        <UserIcon className="w-6 h-6" />
                        Cán bộ chiến sĩ
                    </Link>
                </PermissionGuard>

                <PermissionGuard permissions={["show-unit"]}>
                    <Link href="/dashboard/units" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/units") ? "bg-slate-800 text-white" : ""}`}>
                        <UserGroupIcon className="w-6 h-6" />
                        Đội công tác
                    </Link>
                </PermissionGuard>
                
                {/* <PermissionGuard permissions={["show-ranks"]}> */}
                    <Link href="/dashboard/ranks" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/ranks") ? "bg-slate-800 text-white" : ""}`}>
                        <ChevronDoubleUpIcon className="w-6 h-6" />
                        Quản lý cấp bậc
                    </Link>
                {/* </PermissionGuard> */}

                <Link href="/dashboard/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/settings") ? "bg-slate-800 text-white" : ""}`}>
                    <Cog6ToothIcon className="w-6 h-6" />
                    Cài đặt
                </Link>

                <button onClick={handleLogout} className="flex items-center cursor-pointer w-full gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                    <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                    Đăng xuất
                </button>
            </nav>
        </aside>
    </>
  )
}
