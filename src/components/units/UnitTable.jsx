"use client"

import { deleteUnitById, getAllUnits } from '@/services/unitService';
import React, { useEffect, useState } from 'react'
import PermissionGuard from '../guards/PermissionGuard';
import Link from 'next/link';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import LoadingBlock from '../comon/LoadingBlock';
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt';
import { toast } from 'react-toastify';
import Pagination from '../comon/Pagination';

function UnitTable() {
    const [units, setUnits] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const [links, setLinks] = useState([]);
    const [meta, setMeta] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function loadUnits() {
            setIsLoading(true);
            try {
                const response = await getAllUnits();
                
                setUnits(response.data);
                setLinks(response.links);
                setMeta(response.meta);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        loadUnits();
    }, []);

    const handleCancelDeleteUnit = () => {
        setShowFormDelete(false);
    }

    const handleDelete = (unitId) => {
        setSelectedUnitId(unitId);
        setShowFormDelete(true);
    }

    const hanldeConfirmDeleteUnit = async () => {
        try {
            await deleteUnitById(selectedUnitId);
            setShowFormDelete(false);
            setUnits((prev) => prev.filter((unit) => unit.id !== selectedUnitId));
            toast.success('Xóa đội công tác thành công');
        } catch (error) {
            console.log(error);
            toast.error('Có lỗi xảy ra khi xóa đội công tác');
        }
    }

    if(isLoading) {
        return <LoadingBlock tittle='Đang tải dữ liệu đội công tác' />
    }

    return (
    <>
        <table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Kí hiệu</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên đội công tác</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Đội trưởng</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày cập nhật</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {units?.length > 0 ? (
                    units.map((unit) => (
                        <tr key={unit.id} className="hover:bg-gray-100">
                            <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{unit.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{unit.code}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{unit.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600"><b>{unit.leader_name ?? ''}</b></td>
                            <td className="px-4 py-3 text-sm text-gray-600">{unit.created_at}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{unit.updated_at}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <PermissionGuard permissions={["update-unit"]}>
                                        <Link href={`/dashboard/units/${unit.id}/edit`} className="p-2 rounded hover:bg-gray-100">
                                            <PencilSquareIcon className="w-6 h-6" />
                                        </Link>
                                    </PermissionGuard>
                                    <PermissionGuard permissions={["delete-unit"]}>
                                        <a onClick={() => handleDelete(unit.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
                                            <TrashIcon className="w-6 h-6 text-red-600" />
                                        </a>
                                    </PermissionGuard>
                                    
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
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
            currentPage={meta.current_page}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  )
}

export default UnitTable