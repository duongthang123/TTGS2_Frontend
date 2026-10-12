"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllRanks } from '@/services/rankService'
import { getUsers } from '@/services/userService'

function SalaryCftForm({initialData={}, onSubmit}) {
	const [rankId, setRankId] = useState('')
	const [salary, setSalary] = useState('')
	const [fromYear, setFromYear] = useState('')
	const [toYear, setToYear] = useState('')
	const [note, setNote] = useState('')
	const [ranks, setRanks] = useState([])
	const [isLoadingRanks, setIsLoadingRanks] = useState(true)
	const [userSearch, setUserSearch] = useState('')
	const [userResults, setUserResults] = useState([])
	const [selectedUser, setSelectedUser] = useState(initialData.user || null)
	const [showUserResults, setShowUserResults] = useState(false)
	const [isSearchingUsers, setIsSearchingUsers] = useState(false)
	const [errors, setErrors] = useState({})

	const getFieldError = (field) => {
		const error = errors[field]
		return Array.isArray(error) ? error[0] : error
	}

	const clearFieldError = (field) => {
		setErrors((currentErrors) => ({ ...currentErrors, [field]: '' }))
	}

	useEffect(() => {
		const loadRanks = async () => {
			try {
				const response = await getAllRanks()
				setRanks(response.data)
			} catch (error) {
				console.error('Error loading ranks:', error)
				toast.error('Không thể tải danh sách cấp bậc')
			} finally {
				setIsLoadingRanks(false)
			}
		}

		loadRanks()
	}, [])

	useEffect(() => {
		if (!initialData || Object.keys(initialData).length === 0) return
		
		setRankId(initialData.rank_id || '')
		setSelectedUser(initialData.user || null)
		setSalary(initialData.salary ?? '')
		setFromYear(initialData.from_year ?? '')
		setToYear(initialData.to_year ?? '')
		setNote(initialData.note ?? '')
	}, [initialData])

	useEffect(() => {
		let isCancelled = false
		const searchTerm = userSearch.trim()

		if (!showUserResults || searchTerm.length < 2) {
			setUserResults([])
			setIsSearchingUsers(false)
			return
		}

		setIsSearchingUsers(true)
		const timeoutId = setTimeout(async () => {
			try {
				const response = await getUsers(1, searchTerm)
				if (!isCancelled) {
					setUserResults(response.data)
				}
			} catch (error) {
				if (!isCancelled) {
					console.error('Error searching users:', error)
					toast.error('Không thể tìm kiếm người dùng')
				}
			} finally {
				if (!isCancelled) {
					setIsSearchingUsers(false)
				}
			}
		}, 300)

		return () => {
			isCancelled = true
			clearTimeout(timeoutId)
		}
	}, [showUserResults, userSearch])

	const handleSearchUsers = (e) => {
		setSelectedUser(null)
		setUserSearch(e.target.value)
		setShowUserResults(true)
		clearFieldError('user_id')
	}

	const handleSelectUser = (user) => {
		setSelectedUser(user)
		setRankId(user.rank_id ? String(user.rank_id) : '')
		setUserSearch('')
		setUserResults([])
		setShowUserResults(false)
		clearFieldError('user_id')
		clearFieldError('rank_id')
	}

	const handleSubmitForm = async (e) => {
		e.preventDefault()
		setErrors({})

		if (!selectedUser) {
			setErrors({ user_id: 'Vui lòng chọn người dùng' })
			return
		}

		try {
			await onSubmit({
				user_id: selectedUser.id,
				rank_id: rankId,
				salary,
				from_year: fromYear,
				to_year: toYear,
				note,
			})
		} catch (error) {
			setErrors(error.response?.data?.errors || {})
			toast.error(error.response?.data?.message || 'Đã có lỗi xảy ra')
		}
	}
    
    return (
        <form onSubmit={handleSubmitForm} noValidate>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Người dùng
					</label>
					<div className="relative">
						<input
							type="search"
							name="user_search"
							autoComplete="off"
							className="border-[1px] text-sm outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
							placeholder="Tìm theo tên hoặc mã người dùng..."
							value={selectedUser ? `${selectedUser.name}${selectedUser.code ? ` * ${selectedUser.code}` : ''}` : userSearch}
							onChange={handleSearchUsers}
							onFocus={() => {
								if (!selectedUser) setShowUserResults(true)
							}}
							onBlur={() => setTimeout(() => setShowUserResults(false), 150)}
							aria-label="Tìm kiếm người dùng"
							aria-autocomplete="list"
							aria-expanded={showUserResults && !selectedUser}
							aria-controls="salary-cft-user-results"
						/>
						{getFieldError('user_id') && (
							<p className="text-red-500 p-2">{getFieldError('user_id')}</p>
						)}
						{showUserResults && !selectedUser && (
							<div
								id="salary-cft-user-results"
								className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
								role="listbox"
							>
								{userSearch.trim().length < 2 ? (
									<p className="px-3 py-2 text-sm text-gray-500">Nhập ít nhất 2 ký tự để tìm người dùng</p>
								) : isSearchingUsers ? (
									<p className="px-3 py-2 text-sm text-gray-500">Đang tìm kiếm...</p>
								) : userResults.length > 0 ? (
									userResults.map((user) => (
										<button
											key={user.id}
											type="button"
											className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-100"
											onMouseDown={() => handleSelectUser(user)}
											role="option"
											aria-selected={false}
										>
											{user.name}{user.code ? ` * ${user.code}` : ''}
										</button>
									))
								) : (
									<p className="px-3 py-2 text-sm text-gray-500">Không tìm thấy người dùng</p>
								)}
							</div>
						)}
					</div>
				</div>

				<div>
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Cấp bậc
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name="rank_id"
						value={rankId}
						onChange={(e) => {
							setRankId(e.target.value)
							clearFieldError('rank_id')
						}}
						disabled={isLoadingRanks}
						required
					>
						<option value="">{isLoadingRanks ? 'Đang tải cấp bậc...' : 'Chọn cấp bậc'}</option>
						{ranks.map((rank) => (
							<option key={rank.id} value={rank.id}>
								{rank.name}
							</option>
						))}
					</select>
					{getFieldError('rank_id') && (
						<p className="text-red-500 p-2">{getFieldError('rank_id')}</p>
					)}
				</div>

				<div>
					<label htmlFor="salary" className="block text-sm font-bold text-gray-700 mb-1">
						Hệ số lương CFT
					</label>
					<input
						id="salary"
						type="number"
						name="salary"
						step="any"
						required
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập hệ số lương CFT..."
						value={salary}
						onChange={(e) => {
							setSalary(e.target.value)
							clearFieldError('salary')
						}}
					/>
					{getFieldError('salary') && (
						<p className="text-red-500 p-2">{getFieldError('salary')}</p>
					)}
				</div>

				<div>
					<label htmlFor="from_year" className="block text-sm font-bold text-gray-700 mb-1">
						Từ năm
					</label>
					<input
						id="from_year"
						type="text"
						name="from_year"
						inputMode="numeric"
						pattern="[0-9]{4}"
						maxLength={4}
						required
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="YYYY"
						value={fromYear}
						onChange={(e) => {
							setFromYear(e.target.value)
							clearFieldError('from_year')
						}}
					/>
					{getFieldError('from_year') && (
						<p className="text-red-500 p-2">{getFieldError('from_year')}</p>
					)}
				</div>

				<div>
					<label htmlFor="to_year" className="block text-sm font-bold text-gray-700 mb-1">
						Đến năm
					</label>
					<input
						id="to_year"
						type="text"
						name="to_year"
						inputMode="numeric"
						pattern="[0-9]{4}"
						maxLength={4}
						required
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="YYYY"
						value={toYear}
						onChange={(e) => {
							setToYear(e.target.value)
							clearFieldError('to_year')
						}}
					/>
					{getFieldError('to_year') && (
						<p className="text-red-500 p-2">{getFieldError('to_year')}</p>
					)}
				</div>

				<div className="md:col-span-2">
					<label htmlFor="note" className="block text-sm font-bold text-gray-700 mb-1">
						Ghi chú
					</label>
					<textarea
						id="note"
						name="note"
						rows={3}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ghi chú..."
						value={note}
						onChange={(e) => {
							setNote(e.target.value)
							clearFieldError('note')
						}}
					/>
					{getFieldError('note') && (
						<p className="text-red-500 p-2">{getFieldError('note')}</p>
					)}
				</div>
			</div>

			<div className='flex gap-4 mt-4 mb-6'>
				<button 
					type='submit' 
					className='p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition cursor-pointer'
				>
					{initialData?.id ? 'Cập nhật' : 'Thêm mới'}
				</button>
				<Link href='/dashboard/salary-cfts' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700-700 transition cursor-pointer'>Quay lại</Link>
			</div>
		</form>
    )
}

export default SalaryCftForm