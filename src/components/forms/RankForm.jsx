"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function RankForm({initialData = {}, onSubmit }) {
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (!initialData || Object.keys(initialData).length === 0) return;

        setCode(initialData.code || '')
        setName(initialData.name || '')
    }, [initialData])
    
    const handleChangeCode = (e) => {
        setCode(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setErrors([])
        const data = {
            code: code,
            name: name
        }
        
        try {
            await onSubmit(data)
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            toast.error('Đã có lỗi xảy ra');
        }
    }

    return (
        <form onSubmit={handleSubmitForm}>
			<div className="flex justify-between gap-4">
				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Kí hiệu cấp bậc
					</label>
					<input
						type="text"
						name='code'
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập kí hiệu cấp bậc..."
						value={code}
						onChange={handleChangeCode}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.code}</p>
					)}
				</div>

				<div className="w-1/2">
					<label className="block text-sm font-bold text-gray-700 mb-1">
						Tên cấp bậc
					</label>
					<input
						type="text"
						name='name'	
						className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
						placeholder="Nhập tên cấp bậc..."
						value={name}
						onChange={handleChangeName}
					/>
					{errors && (
						<p className="text-red-500 p-2">{errors.name}</p>
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
				<Link href='/dashboard/ranks' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700 transition cursor-pointer'>Quay lại</Link>
			</div>
		</form>
    )
}

export default RankForm