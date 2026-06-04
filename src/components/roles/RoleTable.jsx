"use client"

import {deleteRole, getRoles} from '@/services/roleService';

import React, { useEffect, useState } from 'react'
import Pagination from '../comon/Pagination'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function RoleTable() {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const loadRoles = async () => {
            try {
                const response = await getRoles(currentPage);
                setRoles(response.data);
                setMeta(response.meta);
            } catch (error) {
                console.log(error);
            } 
        }

        loadRoles();
    }, [currentPage]);

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowForm(true)
    }

    const handleCancel = () => {
        setShowForm(false);
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteRole(selectedId);
            setShowForm(false);
            setRoles((prev) => prev.filter((role) => role.id !== selectedId));
            toast.success('Xóa quyền thành công');
        } catch (error) {
            console.log(error.response?.data?.errors);
            toast.error('Xóa quyền thất bại');
            setShowForm(false);
        }
    }

    const handleEditRole = (roleId) => {
        router.push(`/dashboard/roles/${roleId}/edit`);
    }

  return (
    <>
        <table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên quyền</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày cập nhật</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {roles?.length > 0 ? (
                    roles.map((role) => (
                         <tr key={role.id} className="hover:bg-gray-100">
                            <td className="px-4 py-3 text-sm text-gray-600 font-semibold">{role.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{role.display_name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{role.created_at}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{role.updated_at}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <a onClick={() => handleEditRole(role.id)} className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                                        <PencilSquareIcon className="w-6 h-6" />
                                    </a>
                                    <a onClick={() => handleDelete(role.id)} className="p-2 rounded hover:bg-gray-100 cursor-pointer">
                                        <TrashIcon className="w-6 h-6 text-red-600" />
                                    </a>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr></tr>
                )}
            </tbody>
        </table>

        {
            showForm && (
                <ConfirmPrompt 
                    message="Bạn có chắc chắn muốn xóa không?"
                    onCancel={handleCancel}
                    onConfirm={handleConfirmDelete}
                />
            )
        }

        <Pagination 
            totalPages={meta.last_page}
            currentPage={meta.current_page}
            onPageChange={(page) => setCurrentPage(page)}
        />
    </>
  )
}

export default RoleTable