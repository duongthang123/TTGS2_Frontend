"use client"

import { deleteUserById, getUsers } from '@/services/userService';
import { STATUS_MAP } from '@/utils/statusMap';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { EyeIcon, MagnifyingGlassIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Pagination from '../comon/Pagination';
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt';
import LoadingBlock from '../comon/LoadingBlock';
import PermissionGuard from '@/components/guards/PermissionGuard';

import { toast } from 'react-toastify';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        async function loadUser() {
            setIsLoading(true);
            try {
                const response = await getUsers(currentPage, search);
                setUsers(response.data);
                setLinks(response.links);
                setMeta(response.meta);
            } catch (error) {
                setIsLoading(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }   

        loadUser();
    }, [currentPage, search]);

    const handleSearch = (event) => {
        event.preventDefault();
        setCurrentPage(1);
        setSearch(searchInput.trim());
    };

    const handleClearSearch = () => {
        setSearchInput('');
        setSearch('');
        setCurrentPage(1);
    };

    const STATUS_STYLE = {
        0: "text-gray-700",   // inactive
        1: "text-green-700", // active
        2: "text-red-700",     // suspended
        3: "text-yellow-700", // retired
        4: "text-blue-700",   // transferred
        5: "text-purple-700", // archived
    };

    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setShowFormDelete(true);
    }

    const handleCancelDeleteUser = () => {
        setShowFormDelete(false);
    }

    const hanldeConfirmDelete = async () => {
        try {
            await deleteUserById(selectedUserId)
            setShowFormDelete(false);
            setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
            toast.success('Xóa người dùng thành công');

        } catch (error) {
            console.log(error.response?.data?.errors);
            toast.error('Xoá người dùng thất bại!')
        }
    }

    if (isLoading) {
		return <LoadingBlock tittle='Đang tải dữ liệu người dùng' />
	}

  return (
    <>
        <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-md">
                <input
                    type="search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Tìm theo tên, mã, điện thoại hoặc email"
                    aria-label="Tìm người dùng"
                    className="w-full rounded-md bg-gray-100 border-none focus:ring-2 focus:ring-slate-500 py-2 pl-3 pr-3 text-sm text-gray-900 outline-none transition "
                />
            </div>
            <button
                type="submit"
                className="inline-flex items-center outline-none cursor-pointer justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4" />
                <span className="text-[16px">Tìm kiếm</span>
            </button>
            {(searchInput || search) && (
                <button
                    type="button"
                    onClick={handleClearSearch}
                    className="inline-flex outline-none cursor-pointer items-center justify-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                >
                </button>
            )}
            <p className="text-sm text-gray-500 sm:ml-auto">
                {search ? `${meta.total ?? 0} kết quả` : `${meta.total ?? 0} người dùng`}
            </p>
        </form>

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
                                    <PermissionGuard permissions={["show-user"]}>
                                        <Link href={`/dashboard/users/${user.id}/show`} className="p-2 rounded hover:bg-gray-100">
                                            <EyeIcon className="w-6 h-6" />
                                        </Link>
                                    </PermissionGuard>
                                    <PermissionGuard permissions={["update-user"]}>
                                        <Link href={`/dashboard/users/${user.id}/edit`} className="p-2 rounded hover:bg-gray-100">
                                            <PencilSquareIcon className="w-6 h-6" />
                                        </Link>
                                    </PermissionGuard>
                                    <PermissionGuard permissions={["delete-user"]}>
                                        <a onClick={() => handleDelete(user.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
                                            <TrashIcon className="w-6 h-6 text-red-600" />
                                        </a>
                                    </PermissionGuard>
                                    
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="px-4 py-10 text-center text-sm text-gray-500">
                            {search ? 'Không tìm thấy người dùng phù hợp.' : 'Chưa có người dùng.'}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

        {showFormDelete && (
            <ConfirmPrompt 
                message="Bạn có chắc chắn muốn xóa không?"
                onCancel={handleCancelDeleteUser}
                onConfirm={hanldeConfirmDelete}
            />
        )}

        <Pagination 
            totalPages={meta.last_page}
            currentPage={meta.current_page}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  )
}

export default UserTable;