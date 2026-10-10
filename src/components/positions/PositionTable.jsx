"use client"

import React, { useEffect, useState } from 'react'
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt'
import Pagination from '../comon/Pagination'
import PermissionGuard from '../guards/PermissionGuard'
import Link from 'next/link'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { deletePositionById, getAllPositions } from '@/services/positionService'
import LoadingBlock from '../comon/LoadingBlock'
import { toast } from 'react-toastify'

function PositionTable() {
    const [positions, setPositions] = useState([]);
    const [showFormDelete, setShowFormDelete] = useState(false);
    const [selectedPositionId, setselectedPositionId] = useState(null);
    const [meta, setMeta] = useState([]);
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function fetchPositions() {
            try {
                const response = await getAllPositions();
                setPositions(response.data);
                setMeta(response.meta);
                setLinks(response.links);
            } catch (error) {
                console.error('Error fetching positions:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPositions();
    }, [])

    const handleDelete = (positionId) => {
		setselectedPositionId(positionId);
		setShowFormDelete(true);
	}

	const handleCancelDeletePosition = () => {
		setShowFormDelete(false);
	}

	const hanldeConfirmDeletePosition = async () => {
		try {
			await deletePositionById(selectedPositionId);
			setShowFormDelete(false);
			setPositions((prev) => prev.filter((position) => position.id !== selectedPositionId));
			toast.success('Xóa chức vụ thành công');
		} catch (error) {
			toast.error('Có lỗi xảy ra khi xóa chức vụ');
		}
	}

	if (isLoading) {
		return <LoadingBlock tittle='Đang tải dữ liệu chức vụ' />
	}

    return (
        <>
			<table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
				<thead className="bg-gray-100">
					<tr>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên chức vụ</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày cập nhật</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Hành động</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{positions?.length > 0 ? (
						positions.map((position) => (
							<tr key={position.id} className="hover:bg-gray-100">
								<td className="px-4 py-3 text-sm text-gray-600 font-semibold">{position.id}</td>
								<td className="px-4 py-3 text-sm text-gray-600"><b>{position.name}</b></td>
								<td className="px-4 py-3 text-sm text-gray-600">{position.created_at}</td>
								<td className="px-4 py-3 text-sm text-gray-600">{position.updated_at}</td>
								<td className="px-4 py-3 text-sm text-gray-600">
									<div className="flex items-center space-x-2">
										<PermissionGuard permissions={["update-position"]}>
											<Link href={`/dashboard/positions/${position.id}/edit`} className="p-2 rounded hover:bg-gray-100">
												<PencilSquareIcon className="w-6 h-6" />
											</Link>
										</PermissionGuard>
										<PermissionGuard permissions={["delete-position"]}>
											<a onClick={() => handleDelete(position.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
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
					onCancel={handleCancelDeletePosition}
					onConfirm={hanldeConfirmDeletePosition}
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

export default PositionTable