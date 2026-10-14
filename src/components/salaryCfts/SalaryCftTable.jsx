"use client"

import React, { useEffect, useState } from 'react'
import PermissionGuard from '../guards/PermissionGuard'
import Link from 'next/link'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { deleteSalaryCftById, getAllSalaryCft } from '@/services/salaryCftService'
import Pagination from '../comon/Pagination'
import LoadingBlock from '../comon/LoadingBlock'
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt'
import { toast } from 'react-toastify'

function SalaryCftTable() {
    const [salaryCfts, setSalaryCfts] = useState([])
    const [selectedSalaryId, setSelectedSalaryId] = useState('');
    const [links, setLinks] = useState([])
    const [meta, setMeta] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [showFormDelete, setShowFormDelete] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)
    const [search, setSearch] = useState('')
    const [submittedSearch, setSubmittedSearch] = useState('')

    useEffect(() => {
            let isCancelled = false

            async function loadSalaryCfts() {
                setIsLoading(true);
                try {
                    const response = await getAllSalaryCft({
                        page: currentPage,
                        user_id: selectedUser?.id,
                        search: selectedUser ? undefined : submittedSearch,
                    });
                    if (isCancelled) return

                    setSalaryCfts(response.data);
                    setLinks(response.links);
                    setMeta(response.meta);
                } catch (error) {
                    if (isCancelled) return

                    console.error(error);
                    toast.error('Không thể tải dữ liệu hệ số lương');
                } finally {
                    if (!isCancelled) {
                        setIsLoading(false);
                    }
                }
            }
    
            loadSalaryCfts();

            return () => {
                isCancelled = true
            }
        }, [currentPage, selectedUser, submittedSearch]);

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        setSubmittedSearch(search.trim())
        setCurrentPage(1)
    }

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setCurrentPage(1);
    }

    const handleShowAllUsers = () => {
        setSelectedUser(null);
        setCurrentPage(1);
    }

    const handleCancelDeleteUnit = () => {
        setShowFormDelete(false);
    }

    const handleDelete = (salaryCftId) => {
        setSelectedSalaryId(salaryCftId);
        setShowFormDelete(true);
    }

    const hanldeConfirmDeleteUnit = async () => {
        try {
            await deleteSalaryCftById(selectedSalaryId);
            setShowFormDelete(false);
            setSalaryCfts((prev) => prev.filter((salaryCft) => salaryCft.id !== selectedSalaryId));
            toast.success('Xóa dữ liệu hệ số lương thành công');
        } catch (error) {
            toast.error('Có lỗi xảy ra khi xóa đội công tác');
        }
    }

    if (isLoading)
    {
        return <LoadingBlock tittle='Đang tải dữ liệu hệ số lương' />
    }

    return (
        <>
            {!selectedUser && (
                <form onSubmit={handleSearchSubmit} className="mb-4 flex max-w-md gap-2">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Tìm theo tên hoặc mã người dùng..."
                        aria-label="Tìm hệ số lương theo người dùng"
                        className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-slate-300"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                    >
                        Tìm kiếm
                    </button>
                </form>
            )}
            {selectedUser && (
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                        Các hệ số lương của đồng chí <strong>{selectedUser.name}</strong>, mới nhất trước
                    </p>
                    <button
                        type="button"
                        onClick={handleShowAllUsers}
                        className="rounded-md bg-red-700 text-white px-3 py-2 text-sm font-medium  hover:bg-red-500 cursor-pointer"
                    >
                        Quay lại danh sách
                    </button>
                </div>
            )}
            <table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên cán bộ / chiến sĩ</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Hệ số lương</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Từ năm</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Đến năm</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày cập nhật</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {salaryCfts?.length > 0 ? (
                        salaryCfts.map((salaryCft) => (
                            <tr key={salaryCft.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{salaryCft.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    {selectedUser ? (
                                        salaryCft.user.user_name
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleSelectUser({
                                                    id: salaryCft.user.user_id,
                                                    name: salaryCft.user.user_name,
                                                })
                                            }
                                            className="inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-left transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        >
                                            <span className="font-semibold text-indigo-700 hover:text-indigo-900">
                                                {salaryCft.user.user_name}
                                            </span>

                                            {salaryCft.user.user_code && (
                                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                                                    {salaryCft.user.user_code}
                                                </span>
                                            )}
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{salaryCft.salary}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{salaryCft.from_year}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{salaryCft.to_year}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{salaryCft.created_at}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{salaryCft.updated_at}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <PermissionGuard permissions={["update-salary-cfts"]}>
                                            <Link href={`/dashboard/salary-cfts/${salaryCft.id}/edit`} className="p-2 rounded hover:bg-gray-100">
                                                <PencilSquareIcon className="w-6 h-6" />
                                            </Link>
                                        </PermissionGuard>
                                        <PermissionGuard permissions={["delete-salary-cfts"]}>
                                            <a onClick={() => handleDelete(salaryCft.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
                                                <TrashIcon className="w-6 h-6 text-red-600" />
                                            </a>
                                        </PermissionGuard>
                                        
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="px-4 py-6 text-center text-sm text-gray-500">
                                {selectedUser
                                    ? 'Người dùng này chưa có dữ liệu hệ số lương.'
                                    : submittedSearch
                                        ? 'Không tìm thấy người dùng phù hợp.'
                                        : 'Chưa có dữ liệu hệ số lương.'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showFormDelete && (
                <ConfirmPrompt
                    message="Bạn có chắc chắn muốn xóa không?"
                    onCancel={handleCancelDeleteUnit}
                    onConfirm={hanldeConfirmDeleteUnit}
                />
            )}

            <Pagination 
                totalPages={meta.last_page}
                currentPage={meta.current_page || currentPage}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    )
}

export default SalaryCftTable