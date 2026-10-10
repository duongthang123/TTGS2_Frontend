"use client"

import { deleteRankById, getAllRanks } from '@/services/rankService';
import React, { useEffect, useState } from 'react'
import LoadingBlock from '../comon/LoadingBlock';
import PermissionGuard from '../guards/PermissionGuard';
import Link from 'next/link';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import Pagination from '../comon/Pagination';
import ConfirmPrompt from '../ConfirmPrompt/ConfirmPrompt';
import { toast } from 'react-toastify';

function RankTable() {
	const [ranks, setRanks] = useState([]);
	const [showFormDelete, setShowFormDelete] = useState(false);
	const [selectedRankId, setSelectedRankId] = useState(null);
	const [meta, setMeta] = useState([]);
	const [links, setLinks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchRanks() {
			try {
				const response = await getAllRanks();
				setRanks(response.data);
				setMeta(response.meta);
				setLinks(response.links);
			} catch (error) {
				console.error('Error fetching ranks:', error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchRanks();
	}, [])

	const handleDelete = (rankId) => {
		setSelectedRankId(rankId);
		setShowFormDelete(true);
	}

	const handleCancelDeleteUnit = () => {
		setShowFormDelete(false);
	}

	const hanldeConfirmDeleteUnit = async () => {
		try {
			await deleteRankById(selectedRankId);
			setShowFormDelete(false);
			setRanks((prev) => prev.filter((rank) => rank.id !== selectedRankId));
			toast.success('Xóa cấp bậc thành công');
		} catch (error) {
			console.log(error);
			toast.error('Có lỗi xảy ra khi xóa cấp bậc');
		}
	}

	if (isLoading) {
		return <LoadingBlock tittle='Đang tải dữ liệu cấp bậc' />
	}

	return (
		<>
			<table className='min-w-full border-t border-b border-gray-200 rounded-lg'>
				<thead className="bg-gray-100">
					<tr>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Kí hiệu</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Tên cấp bậc</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Ngày cập nhật</th>
						<th className="px-4 py-2 text-left text-sm font-semibold text-gray-700"></th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200">
					{ranks?.length > 0 ? (
						ranks.map((rank) => (
							<tr key={rank.id} className="hover:bg-gray-100">
								<td className="px-4 py-3 text-sm text-gray-600 font-semibold">{rank.id}</td>
								<td className="px-4 py-3 text-sm text-gray-600">{rank.code}</td>
								<td className="px-4 py-3 text-sm text-gray-600"><b>{rank.name}</b></td>
								<td className="px-4 py-3 text-sm text-gray-600">{rank.created_at}</td>
								<td className="px-4 py-3 text-sm text-gray-600">{rank.updated_at}</td>
								<td className="px-4 py-3 text-sm text-gray-600">
									<div className="flex items-center space-x-2">
										<PermissionGuard permissions={["update-rank"]}>
											<Link href={`/dashboard/ranks/${rank.id}/edit`} className="p-2 rounded hover:bg-gray-100">
												<PencilSquareIcon className="w-6 h-6" />
											</Link>
										</PermissionGuard>
										<PermissionGuard permissions={["delete-rank"]}>
											<a onClick={() => handleDelete(rank.id)} className="p-2 rounded cursor-pointer hover:bg-gray-100">
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

export default RankTable