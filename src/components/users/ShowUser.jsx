"use client"

import { USER_STATUS, USER_STATUS_LABELS } from '@/constants/userStatus';
import { getAllPositions } from '@/services/positionService';
import { getAllRanks } from '@/services/rankService';
import { getRoles } from '@/services/roleService';
import { getAllUnits } from '@/services/unitService';
import { getUserById } from '@/services/userService';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LoadingBlock from '../comon/LoadingBlock';
import RoleGuard from '../guards/RoleGuard';

function ShowUser() {
    const params = useParams();
    const [user, setUser] = useState({});
    const [positions, setPositions] = useState([])
    const [ranks, setRanks] = useState([])
    const [units, setUnits] = useState([])
    const [roles, setRoles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!params.id) return;

        const fetchUserById = async () => {
            try {
                const response = await getUserById(params.id);
                setUser(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUserById();
    }, [params.id]);


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
    
	if (isLoading) {
		return <LoadingBlock tittle='Đang tải dữ liệu người dùng' />
	}

    return (
        <form>
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Tên cán bộ / chiến sĩ
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập tên cán bộ chiến sĩ..."
						defaultValue={user.name}
                        disabled
					/>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Số hiệu CAND
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số hiệu CAND..."
						defaultValue={user.code}
                        disabled
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Chức vụ
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='position_id'
						value={String(user.position_id)}
						disabled
					>
						<option value="">Chọn chức vụ</option>
						{positions.map((position) => (
							<option key={position.id} value={position.id}>
								{position.name}
							</option>
						))}
					</select>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Cấp bậc
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						name='rank_id'
						value={String(user.rank_id)}
						disabled
					>
						<option value="">Chọn cấp bậc</option>
						{ranks.map((rank) => (
							<option key={rank.id} value={rank.id}>
								{rank.name}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Giới tính
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						value={user.gender}
						disabled
					>
                        {user.gender !== undefined && (
                            <option value={user.gender} >
                                {user.gender === 0 ? "Nam" : "Nữ"}
                            </option>
                        )}
					</select>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Số định danh cá nhân
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số định danh..."
						defaultValue={user.citizen_number}
						disabled
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Ngày, tháng, năm sinh
					</label>
					<input
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						defaultValue={user.date}
						disabled
					/>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Quê quán (trước khi sáp nhập)
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập quê quán (trước khi sáp nhập)..."
						defaultValue={user.old_address}
						disabled
					/>
				</div>
			</div>
 
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Quê quán (địa chỉ mới)
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập quê quán (địa chỉ mới)..."
						defaultValue={user.new_address}
						disabled
					/>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Email
					</label>
					<input
						type="text"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập email..."
						defaultValue={user.email}
						disabled
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Số điện thoại
					</label>
					<input
						type="number"
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập số điện thoại..."
						defaultValue={user.phone}
						disabled
					/>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Ngày vào ngành
					</label>
					<input
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày vào ngành..."
						defaultValue={user.joined_date}
						disabled
					/>
				</div>
			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Ngày về đơn vị
					</label>
					<input
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày về đơn vị..."
						defaultValue={user.unit_assigned_date}
						disabled
					/>
				</div>

				
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Đội công tác
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						value={String(user.unit_id)}
						disabled
					>
						<option value="">Chọn đội công tác</option>
						{units.map((unit) => (
							<option key={unit.id} value={unit.id}>
								{unit.name}
							</option>
						))}
					</select>
				</div>

			</div>

			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Ngày vào Đảng
					</label>
					<input
						type="date"
						max={new Date().toISOString().split('T')[0]}
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập ngày vào Đảng..."
						defaultValue={user.party_joined_date}
						disabled
					/>
				</div>

				<div className="w-1/2">
					<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
						Trạng thái
					</label>
					<select
						className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						value={String(user.status)}
						disabled
					>
						<option value="">Chọn trạng thái</option>
						{Object.entries(USER_STATUS).map(([key, value]) => (
							<option key={key} value={value}>{USER_STATUS_LABELS[value]}</option>
						))}
					</select>
				</div>
			</div>

			<RoleGuard roles={["super-admin", "warden", "deputy_warden", "team_leader"]}>
				<div className="flex justify-between gap-4">
					<div className="w-full">
						<label className="block text-sm mt-1 font-bold text-gray-700 mb-1">
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
										defaultChecked={user.roles_id.includes(Number(role.id))}
										disabled
										className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
									/>
									<span className="text-sm text-gray-700">{role.display_name}</span>
								</label>
							))}
						</div>
					</div>
				</div>
			</RoleGuard>

			<div className='flex gap-4 mt-2 mb-6'>
				<Link href='/dashboard/users' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700-700 transition cursor-pointer'>Quay lại</Link>
			</div>
		</form>
  )
}

export default ShowUser