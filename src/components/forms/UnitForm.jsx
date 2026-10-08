"use client"

import React, { useEffect, useState } from 'react'
import { getTeamLeaders } from '@/services/userService'
import Link from 'next/link';
import { toast } from 'react-toastify';

function UnitForm({initialData = {}, onSubmit }) {
	const [name, setName] = useState('');
	const [code, setCode] = useState('');
	const [leader_id, setLeaderId] = useState('');
	const [teamLeaders, setTeamLeaders] = useState([]);
	const [isLoadingLeaders, setIsLoadingLeaders] = useState(true);
	const [leaderLoadError, setLeaderLoadError] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		let cancelled = false;

		const loadTeamLeaders = async () => {
			setIsLoadingLeaders(true);
			setLeaderLoadError('');

			try {
				const users = await getTeamLeaders();
				if (!cancelled) {
					setTeamLeaders(users);
				}
			} catch (error) {
				console.error('Không thể tải danh sách đội trưởng:', error);
				if (!cancelled) {
					setLeaderLoadError('Không thể tải danh sách đội trưởng.');
				}
			} finally {
				if (!cancelled) {
					setIsLoadingLeaders(false);
				}
			}
		};

		loadTeamLeaders();

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		if (!initialData || Object.keys(initialData).length === 0) return;

		setCode(initialData.code || '');
		setName(initialData.name || '');
		setLeaderId(initialData.leader_id || '');
	}, [initialData]);

	const handleChangeCode = (e) => {
		setCode(e.target.value);
	}

	const handleChangeName = (e) => {
		setName(e.target.value);
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		setErrors([]);

		const data = {
			code: code,
			name: name,
			...(leader_id ? { leader_id } : {})
		}

		try {
			await onSubmit(data);
		} catch (error) {	
			console.log(error);
			
			setErrors(error.response?.data?.errors || {});
			toast.error('Đã có lỗi xảy ra');
		}
	}

  	return (
    	<form onSubmit={handleSubmitForm}>
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Kí hiệu đội
					</label>
					<input
						type="text"
						name='code'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập kí hiệu đội công tác..."
						value={code}
						onChange={handleChangeCode}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.code}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Tên đội công tác
					</label>
					<input
						type="text"
						name='name'	
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập tên đội công tác..."
						value={name}
						onChange={handleChangeName}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.name}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Chọn đội trưởng
					</label>
					<select
						name="leader_id"
						value={leader_id}
						onChange={(e) => setLeaderId(e.target.value)}
						disabled={isLoadingLeaders || Boolean(leaderLoadError)}
						className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300 disabled:bg-gray-100"
					>
						<option value="">
							{isLoadingLeaders ? 'Đang tải đội trưởng...' : 'Chọn đội trưởng'}
						</option>
						{teamLeaders.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name} · {user.code || ''}
							</option>
						))}
					</select>
					{leaderLoadError && (
						<p className="mt-1 text-sm text-red-500">{leaderLoadError}</p>
					)}
				</div>
			</div>

			<div className='flex gap-4 mt-2 mb-6'>
				<button 
					type='submit' 
					className='p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition cursor-pointer'
				>
					{initialData?.id ? 'Cập nhật' : 'Thêm mới'}
				</button>
				<Link href='/dashboard/units' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700-700 transition cursor-pointer'>Quay lại</Link>
			</div>
		</form>
  )
}

export default UnitForm