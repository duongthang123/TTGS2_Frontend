"use client"

import { USER_STATUS, USER_STATUS_LABELS } from '@/constants/userStatus'
import { getAllPositions } from '@/services/positionService'
import { getAllRanks } from '@/services/rankService'
import { getRoles } from '@/services/roleService'
import { getAllUnits } from '@/services/unitService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingBlock from '../comon/LoadingBlock'

function UserForm({initialData = {}, onSubmit}) {
	const [name, setName] = useState('')
	const [code, setCode] = useState('')
	const [position_id, setPositionId] = useState('')
	const [positions, setPositions] = useState([])
	const [rank_id, setRankId] = useState('')
	const [ranks, setRanks] = useState([])
	const [unit_id, setUnitId] = useState('')
	const [units, setUnits] = useState([])
	const [gender, setGender] = useState('')
	const [citizen_number, setCitizenNumber] = useState('')
	const [date, setDate] = useState('')
	const [old_address, setOldAddress] = useState('')
	const [new_address, setNewAddress] = useState('')
	const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
	const [joined_date, setJoinedDate] = useState('')
	const [unit_assigned_date, setUnitAssignedDate] = useState('')
	const [party_joined_date, setPartyJoinedDate] = useState('')
	const [status, setStatus] = useState('')
	const [roles_id, setRolesId] = useState([])
	const [roles, setRoles] = useState([])

	const [errors, setErrors] = useState([])
	const [isLoading, setIsLoading] = useState(true)


	useEffect(() => {
		const loadData = async () => {
			try {
				const [positionsRes, ranksRes, unitsRes, rolesRes] = await Promise.all([
					getAllPositions(),
					getAllRanks(),
					getAllUnits(),
					getRoles(),
				])

				setPositions(positionsRes.data)
				setRanks(ranksRes.data)
				setUnits(unitsRes.data)
				setRoles(rolesRes.data)
			} catch (error) {
				console.error('Error loading form data:', error)
			} finally {
				setIsLoading(false)
			}}
			loadData()
		}, [])

	// fetch initial data 
	useEffect(() => {
		if (!initialData || Object.keys(initialData).length === 0) return;

		setName(initialData.name || '');
		setCode(initialData.code || '');
		setPositionId(initialData.position_id || '');
		setRankId(initialData.rank_id || '');
		setUnitId(initialData.unit_id || '');
		setGender(initialData.gender ?? '');
		setCitizenNumber(initialData.citizen_number || '');
		setDate(initialData.date || '');
		setOldAddress(initialData.old_address || '');
		setNewAddress(initialData.new_address || '');
		setEmail(initialData.email || '');
		setPhone(initialData.phone || '');
		setJoinedDate(initialData.joined_date || '');
		setUnitAssignedDate(initialData.unit_assigned_date || '');
		setPartyJoinedDate(initialData.party_joined_date || '');
		setStatus(initialData.status || '');
		setRolesId(
			initialData.roles?.map((role) => String(role.id)) ||
			initialData.role_ids?.map(String) ||
			initialData.roles_id?.map(String) ||
			[]
		);
	}, [initialData]);

	const clearFieldError = (field) => {
		setErrors((prev) => ({ ...prev, [field]: '' }))
	}

	const handleChangeName = (e) => {
		setName(e.target.value)
		clearFieldError('name')
	}

	const handleChangeCode = (e) => {
		setCode(e.target.value)
		clearFieldError('code')
	}

	const handleChangeGender = (e) => {
		setGender(e.target.value)
		clearFieldError('gender')
	}

	const handleChangeCitizenNumber = (e) => {
		setCitizenNumber(e.target.value)
		clearFieldError('citizen_number')
	}
	const handleChangeDate = (e) => {
		setDate(e.target.value)
		clearFieldError('date')
	}

	const handleChangeOldAddress = (e) => {
		setOldAddress(e.target.value)
		clearFieldError('old_address')
	}

	const handleChangeNewAddress = (e) => {
		setNewAddress(e.target.value)
		clearFieldError('new_address')
	}

	const handleChangeEmail = (e) => {
		setEmail(e.target.value)
		clearFieldError('email')
	}

	const handleChangePhone = (e) => {
		setPhone(e.target.value)
		clearFieldError('phone')
	}

	const handleChangeJoinedDate = (e) => {
		setJoinedDate(e.target.value)
		clearFieldError('joined_date')
	}

	const handleChangeUnitAssignedDate = (e) => {
		setUnitAssignedDate(e.target.value)
		clearFieldError('unit_assigned_date')
	}

	const handleChangePartyJoinedDate = (e) => {
		setPartyJoinedDate(e.target.value)
		clearFieldError('party_joined_date')
	}
	
	const handleChangeStatus = (e) => {
		setStatus(e.target.value)
		clearFieldError('status')
	}

	const handleChangePositionId = (e) => {
		setPositionId(e.target.value)
		clearFieldError('position_id')
	}

	const handleChangeRankId = (e) => {
		setRankId(e.target.value)
		clearFieldError('rank_id')
	}

	const handleChangeUnitId = (e) => {
		setUnitId(e.target.value)
		clearFieldError('unit_id')
	}

	const handleChangeRolesId = (e) => {
		const value = String(e.target.value)
		const checked = e.target.checked
		setRolesId((prev) =>
			checked ? [...prev, value] : prev.filter((id) => id !== value)
		)
		clearFieldError('roles_id')
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		setErrors({})

		const data = {
			code: code,
			name: name,
			gender: gender,
			citizen_number: citizen_number,
			date: date,
			old_address: old_address,
			new_address: new_address,
			email: email,
			phone: phone,
			rank_id: rank_id,
			position_id: position_id,
			unit_id: unit_id,
			joined_date: joined_date,
			unit_assigned_date: unit_assigned_date,
			party_joined_date: party_joined_date,
			status: status,
			roles_id: roles_id
		}

		try {
			await onSubmit(data);
		} catch (error) {	
			setErrors(error.response?.data?.errors || {});
			toast.error('Đã có lỗi xảy ra');
		}

	}

	
	if (isLoading) {
		return <LoadingBlock tittle='Đang tải dữ liệu người dùng' />
	}

	return (
		<form onSubmit={handleSubmitForm}>
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Tên cán bộ / chiến sĩ
					</label>
					<input
						type="text"
						name='name'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập tên cán bộ chiến sĩ..."
						value={name}
						onChange={handleChangeName}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.name}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Số hiệu CAND
					</label>
					<input
						type="text"
						name='code'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số hiệu CAND..."
						value={code}
						onChange={handleChangeCode}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.code}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Chức vụ
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='position_id'
						value={position_id}
						onChange={handleChangePositionId}
					>
						<option value="">Chọn chức vụ</option>
						{positions.map((position) => (
							<option key={position.id} value={position.id}>
								{position.name}
							</option>
						))}
					</select>
					{errors && (
						<p className="text-red-500 p-2">{errors.position_id}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Cấp bậc
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='rank_id'
						value={rank_id}
						onChange={handleChangeRankId}
					>
						<option value="">Chọn cấp bậc</option>
						{ranks.map((rank) => (
							<option key={rank.id} value={rank.id}>
								{rank.name}
							</option>
						))}
					</select>
					{errors && (
						<p className="text-red-500 p-2">{errors.rank_id}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Giới tính
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='gender'
						value={gender}
						onChange={handleChangeGender}
					>
						<option value="">Chọn giới tính</option>
						<option value="0">Nam</option>
						<option value="1">Nữ</option>
					</select>
					{errors && (
						<p className="text-red-500 p-2">{errors.gender}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Số định danh cá nhân
					</label>
					<input
						type="text"
						name='citizen_number'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số định danh..."
						value={citizen_number}
						onChange={handleChangeCitizenNumber}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.citizen_number}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Ngày, tháng, năm sinh
					</label>
					<input
						type="date"
						name='date'
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						value={date}
						onChange={handleChangeDate}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.date}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Quê quán (trước khi sáp nhập)
					</label>
					<input
						type="text"
						name='old_address'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập quê quán (trước khi sáp nhập)..."
						value={old_address}
						onChange={handleChangeOldAddress}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.old_address}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Quê quán (địa chỉ mới)
					</label>
					<input
						type="text"
						name='new_address'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập quê quán (địa chỉ mới)..."
						value={new_address}
						onChange={handleChangeNewAddress}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.new_address}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Email
					</label>
					<input
						type="text"
						name='email'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập email..."
						value={email}
						onChange={handleChangeEmail}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.email}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Số điện thoại
					</label>
					<input
						type="number"
						name='phone'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số điện thoại..."
						value={phone}
						onChange={handleChangePhone}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.phone}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Ngày vào ngành
					</label>
					<input
						type="date"
						name='joined_date'
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày vào ngành..."
						value={joined_date}
						onChange={handleChangeJoinedDate}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.joined_date}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Ngày về đơn vị
					</label>
					<input
						type="date"
						name='unit_assigned_date'
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày về đơn vị..."
						value={unit_assigned_date}
						onChange={handleChangeUnitAssignedDate}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.unit_assigned_date}</p>
					)}
				</div>

				
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Đội công tác
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='unit_id'
						value={unit_id}
						onChange={handleChangeUnitId}
					>
						<option value="">Chọn đội công tác</option>
						{units.map((unit) => (
							<option key={unit.id} value={unit.id}>
								{unit.name}
							</option>
						))}
					</select>
					{errors && (
						<p className="text-red-500 p-2">{errors.unit_id}</p>
					)}
				</div>

			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Ngày vào Đảng
					</label>
					<input
						type="date"
						name='party_joined_date'
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày vào Đảng..."
						value={party_joined_date}
						onChange={handleChangePartyJoinedDate}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.party_joined_date}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Trạng thái
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='status'
						value={status}
						onChange={handleChangeStatus}
					>
						<option value="">Chọn trạng thái</option>
						{Object.entries(USER_STATUS).map(([key, value]) => (
							<option key={key} value={value}>{USER_STATUS_LABELS[value]}</option>
						))}
					</select>
					{errors && (
						<p className="text-red-500 p-2">{errors.status}</p>
					)}
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-full">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Quyền truy cập
					</label>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
						{roles.map((role) => (
							<label
								key={role.id}
								className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2 hover:border-indigo-500 transition"
							>
								<input
									type="checkbox"
									value={String(role.id)}
									checked={roles_id.includes(String(role.id))}
									onChange={handleChangeRolesId}
									className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
								/>
								<span className="text-sm text-gray-700">{role.display_name}</span>
							</label>
						))}
					</div>

					{roles_id.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-2">
							{roles
								.filter((role) => roles_id.includes(String(role.id)))
								.map((role) => (
									<span
										key={`chip-${role.id}`}
										className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm"
									>
										{role.display_name}
									</span>
								))}
						</div>
					)}

					{errors?.roles_id && (
						<p className="text-red-500 p-2">{errors.roles_id}</p>
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
				<Link href='/dashboard/users' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700-700 transition cursor-pointer'>Quay lại</Link>
			</div>
		</form>
	)
}

export default UserForm