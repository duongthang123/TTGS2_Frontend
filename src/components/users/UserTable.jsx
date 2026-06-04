"use client"

import { getUsers } from '@/services/userService';
import { STATUS_MAP } from '@/utils/statusMap';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Pagination from '../comon/Pagination';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await getUsers(currentPage);
                setUsers(response.data);
                setLinks(response.links);
                setMeta(response.meta);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(true);
            }
        }   

        loadUser();
    }, [currentPage]);

    const STATUS_STYLE = {
        0: "text-gray-700",   // inactive
        1: "text-green-700", // active
        2: "text-red-700",     // suspended
        3: "text-yellow-700", // retired
        4: "text-blue-700",   // transferred
        5: "text-purple-700", // archived
    };

  return (
    <>
        <table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Họ tên / Số hiệu CAND</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Điện thoại</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {users?.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-100">
                            <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{user.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">{user.name}</span>
                                    <span className="text-xs text-gray-500">{user.code}</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{user.phone}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{user.new_address}</td>
                            <td className={`px-4 py-3 text-sm text-center text-gray-600 ${STATUS_STYLE[user.status] ?? ''}`}>{STATUS_MAP[user.status] ?? ''}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Link href="/" className="p-2 rounded hover:bg-gray-100">
                                        <EyeIcon className="w-6 h-6" />
                                    </Link>
                                    <Link href="/" className="p-2 rounded hover:bg-gray-100">
                                        <PencilSquareIcon className="w-6 h-6" />
                                    </Link>
                                    <Link href="/" className="p-2 rounded hover:bg-gray-100">
                                        <TrashIcon className="w-6 h-6 text-red-600" />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr></tr>
                )}
            </tbody>
        </table>

        <Pagination 
            totalPages={meta.last_page}
            currentPage={meta.current_page}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  )
}

export default UserTable;