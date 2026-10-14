"use client"

import api from '@/services/api';
import { Cog6ToothIcon, HomeIcon, UserGroupIcon, UserIcon, ArrowRightStartOnRectangleIcon, UsersIcon, ChevronDoubleUpIcon, CurrencyDollarIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        setIsMobileMenuOpen(false);
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

    const navigation = (
        <>
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard") ? "bg-slate-800 text-white" : ""}`}>
                <HomeIcon className="w-6 h-6" />
                Tổng quan
            </Link>

            <PermissionGuard permissions={["show-role"]}>
                <Link href="/dashboard/roles" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/roles") ? "bg-slate-800 text-white" : ""}`}>
                    <UsersIcon className="w-6 h-6" />
                    Quản lý quyền
                </Link>
            </PermissionGuard>

            <PermissionGuard permissions={["show-user"]}>
                <Link href="/dashboard/users" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/users") ? "bg-slate-800 text-white" : ""}`}>
                    <UserIcon className="w-6 h-6" />
                    Cán bộ chiến sĩ
                </Link>
            </PermissionGuard>

            <PermissionGuard permissions={["show-unit"]}>
                <Link href="/dashboard/units" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/units") ? "bg-slate-800 text-white" : ""}`}>
                    <UserGroupIcon className="w-6 h-6" />
                    Đội công tác
                </Link>
            </PermissionGuard>

            <PermissionGuard permissions={["show-rank"]}>
                <Link href="/dashboard/ranks" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/ranks") ? "bg-slate-800 text-white" : ""}`}>
                    <ChevronDoubleUpIcon className="w-6 h-6" />
                    Quản lý cấp bậc
                </Link>
            </PermissionGuard>

            <PermissionGuard permissions={["show-position"]}>
                <Link href="/dashboard/positions" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/positions") ? "bg-slate-800 text-white" : ""}`}>
                    <ChevronDoubleUpIcon className="w-6 h-6" />
                    Quản lý chức vụ
                </Link>
            </PermissionGuard>

            <PermissionGuard permissions={["show-salary-cfts"]}>
                <Link href="/dashboard/salary-cfts" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/salary-cfts") ? "bg-slate-800 text-white" : ""}`}>
                    <CurrencyDollarIcon className="w-6 h-6" />
                    Quản lý hệ số lương
                </Link>
            </PermissionGuard>

            <Link href="/dashboard/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all ${isActiveRoute(pathname, "/dashboard/settings") ? "bg-slate-800 text-white" : ""}`}>
                <Cog6ToothIcon className="w-6 h-6" />
                Cài đặt
            </Link>

            <button onClick={handleLogout} className="flex items-center cursor-pointer w-full gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                Đăng xuất
            </button>
        </>
    );

  return (
    <>
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-600 text-slate-300 md:flex">
            <div className="p-6 text-white text-center text-xl font-bold tracking-wider">PC11B</div>
            <nav className="flex-1 px-4 space-y-1">
                {navigation}
            </nav>
        </aside>
        <div className="sticky top-0 z-30 w-full bg-slate-600 text-slate-300 md:hidden">
            <div className="flex h-14 items-center justify-between px-4">
                <span className="text-lg font-bold tracking-wider text-white">PC11B</span>
                <button
                    type="button"
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-dashboard-navigation"
                    aria-label={isMobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                    onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                    className="rounded-md p-2 hover:bg-slate-800 hover:text-white"
                >
                    {isMobileMenuOpen
                        ? <XMarkIcon className="h-6 w-6" />
                        : <Bars3Icon className="h-6 w-6" />}
                </button>
            </div>
            {isMobileMenuOpen && (
                <nav id="mobile-dashboard-navigation" className="space-y-1 border-t border-slate-500 px-4 py-2">
                    {navigation}
                </nav>
            )}
        </div>
    </>
  )
}
