"use client"

import { deletePrisonerById, getAllPrisoners } from '@/services/prisoner';
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Pagination from '../comon/Pagination';
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt';
import LoadingBlock from '../comon/LoadingBlock';
import PermissionGuard from '@/components/guards/PermissionGuard';
import { toast } from 'react-toastify';
import { PRISONER_STATUS_LABELS } from '@/constants/prisonerStatus';

function PrisonerTable() {
    const [prisoners, setPrisoners] = useState([]);
    const [selectedPrisonerId, setSelectedPrisonerId] = useState(null);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const formatDate = (value) => {
        if (!value) return '';
        const [year, month, day] = value.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        async function loadPrisoners() {
            setIsLoading(true);
            try {
                const response = await getAllPrisoners(currentPage, search);
                setPrisoners(response.data);
                setLinks(response.links);
                setMeta(response.meta);
            } catch (error) {
                console.error(error);
                toast.error('Không thể tải danh sách phạm nhân');
            } finally {
                setIsLoading(false);
            }
        }

        loadPrisoners();
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
        1: 'text-green-700',
        2: 'text-blue-700',
        3: 'text-yellow-700',
        4: 'text-gray-700',
    };

    const handleDelete = (prisonerId) => {
        setSelectedPrisonerId(prisonerId);
        setShowFormDelete(true);
    };

    const handleCancelDeletePrisoner = () => {
        setShowFormDelete(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePrisonerById(selectedPrisonerId);
            setShowFormDelete(false);
            setPrisoners((previous) => previous.filter((prisoner) => prisoner.id !== selectedPrisonerId));
            toast.success('Xóa phạm nhân thành công');
        } catch (error) {
            console.error(error);
            toast.error('Xóa phạm nhân thất bại');
        }
    };

    if (isLoading) {
        return <LoadingBlock tittle="Đang tải dữ liệu phạm nhân" />;
    }

    return (
        <>
            <form onSubmit={handleSearch} className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full sm:max-w-md">
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        placeholder="Tìm theo tên hoặc số căn cước"
                        aria-label="Tìm phạm nhân"
                        autoFocus
                        className="w-full rounded-md bg-gray-100 border-none focus:ring-2 focus:ring-slate-500 py-2 pl-3 pr-3 text-sm text-gray-900 outline-none transition"
                    />
                </div>

                <button
                    type="submit"
                    className="inline-flex items-center outline-none cursor-pointer justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <MagnifyingGlassIcon aria-hidden="true" className="h-4 w-4" />
                    <span>Tìm kiếm</span>
                </button>

                <p className="text-sm text-gray-500 sm:ml-auto">
                    {search ? `${meta.total ?? 0} kết quả` : `${meta.total ?? 0} phạm nhân`}
                </p>
            </form>

            <div className="w-full overflow-x-auto rounded-lg lg:overflow-x-visible">
                    <table className="w-full min-w-[1000px] rounded-lg border-t border-b border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="w-16 px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="min-w-56 px-4 py-3 text-left text-sm font-semibold text-gray-700">Họ tên</th>
                                <th className="min-w-52 px-4 py-3 text-left text-sm font-semibold text-gray-700">Quê quán</th>
                                <th className="min-w-52 px-4 py-3 text-left text-sm font-semibold text-gray-700">Tội danh / Mức án</th>
                                <th className="min-w-32 px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày vào trại</th>
                                <th className="min-w-32 px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                                <th className="min-w-40 px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                                <th className="w-24 px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
                            </tr>
                        </thead>
                    <tbody className="divide-y divide-gray-200">
                        {prisoners?.length > 0 ? (
                            prisoners.map((prisoner) => (
                                <tr key={prisoner.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{prisoner.id}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <div className="flex flex-col gap-1">
                                            <PermissionGuard permissions={['show-prisoner']}>
                                                <Link
                                                    href={`/dashboard/prisoners/${prisoner.id}/show`}
                                                    className="font-semibold text-indigo-700 hover:text-indigo-900 hover:underline"
                                                >
                                                    {prisoner.name}
                                                </Link>
                                            </PermissionGuard>
                                            <span className="text-xs text-gray-500">
                                                CCCD: {prisoner.citizen_number || '—'}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(prisoner.date)} · {prisoner.gender === 1 ? 'Nữ' : prisoner.gender === 0 ? 'Nam' : '—'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        <div className="flex flex-col gap-1">
                                            <span>{prisoner.address || '—'}</span>
                                            <span className="text-xs text-gray-500">
                                                HKTT: {prisoner.permanent_address || '—'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium text-gray-800">{prisoner.crime || '—'}</span>
                                            <span className="text-xs text-red-600">{prisoner.sentence || '—'}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{formatDate(prisoner.admitted_at)}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[prisoner.status] ?? 'text-gray-700'}`}>
                                            {PRISONER_STATUS_LABELS[prisoner.status] ?? '—'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{prisoner.created_at}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <PermissionGuard permissions={['update-prisoner']}>
                                                <Link href={`/dashboard/prisoners/${prisoner.id}/edit`} className="p-2 rounded hover:bg-gray-100">
                                                    <PencilSquareIcon className="w-6 h-6" />
                                                </Link>
                                            </PermissionGuard>
                                            <PermissionGuard permissions={['delete-prisoner']}>
                                                <a onClick={() => handleDelete(prisoner.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
                                                    <TrashIcon className="w-6 h-6 text-red-600" />
                                                </a>
                                            </PermissionGuard>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="px-4 py-10 text-center text-sm text-gray-500">
                                    {search ? 'Không tìm thấy phạm nhân phù hợp.' : 'Chưa có phạm nhân.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showFormDelete && (
                <ConfirmPrompt
                    message="Bạn có chắc chắn muốn xóa không?"
                    onCancel={handleCancelDeletePrisoner}
                    onConfirm={handleConfirmDelete}
                />
            )}

            <Pagination
                totalPages={meta.last_page}
                currentPage={meta.current_page}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </>
    );
}

export default PrisonerTable;
