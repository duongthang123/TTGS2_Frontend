"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PRISONER_STATUS_LABELS } from '@/constants/prisonerStatus'

function PrisonerForm({ onSubmit, initialData = {} }) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const [gender, setGender] = useState('')
    const [citizen_number, setCitizenNumber] = useState('')
    const [address, setAddress] = useState('')
    const [permanent_address, setPermanentAddress] = useState('')
    const [crime, setCrime] = useState('')
    const [sentence, setSentence] = useState('')
    const [admitted_at, setAdmittedAt] = useState('')
    const [status, setStatus] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setName(initialData.name || '')
        setDate(initialData.date ? String(initialData.date).slice(0, 10) : '')
        setGender(initialData.gender !== null && initialData.gender !== undefined
            ? String(initialData.gender)
            : '')
        setCitizenNumber(initialData.citizen_number || '')
        setAddress(initialData.address || '')
        setPermanentAddress(initialData.permanent_address || '')
        setCrime(initialData.crime || '')
        setSentence(initialData.sentence || '')
        setAdmittedAt(initialData.admitted_at
            ? String(initialData.admitted_at).slice(0, 10)
            : '')
        setStatus(initialData.status !== null && initialData.status !== undefined
            ? String(initialData.status)
            : '')
    }, [initialData])

    const clearFieldError = (field) => {
        setErrors((previous) => ({ ...previous, [field]: '' }))
    }

    const handleChangeName = (event) => {
        setName(event.target.value)
        clearFieldError('name')
    }

    const handleChangeDate = (event) => {
        setDate(event.target.value)
        clearFieldError('date')
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value)
        clearFieldError('gender')
    }

    const handleChangeCitizenNumber = (event) => {
        setCitizenNumber(event.target.value)
        clearFieldError('citizen_number')
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
        clearFieldError('address')
    }

    const handleChangePermanentAddress = (event) => {
        setPermanentAddress(event.target.value)
        clearFieldError('permanent_address')
    }

    const handleChangeCrime = (event) => {
        setCrime(event.target.value)
        clearFieldError('crime')
    }

    const handleChangeSentence = (event) => {
        setSentence(event.target.value)
        clearFieldError('sentence')
    }

    const handleChangeAdmittedAt = (event) => {
        setAdmittedAt(event.target.value)
        clearFieldError('admitted_at')
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value)
        clearFieldError('status')
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        setErrors({})

        const data = {
            name,
            date,
            gender,
            citizen_number,
            address,
            permanent_address,
            crime,
            sentence,
            admitted_at,
            status,
        }

        try {
            await onSubmit(data)
        } catch (error) {
            setErrors(error.response?.data?.errors || {})
            toast.error(error.response?.data?.message || 'Đã có lỗi xảy ra')
        }
    }

    const renderError = (field) => {
        const error = errors[field]
        const message = Array.isArray(error) ? error[0] : error

        return message ? <p className="p-2 text-red-500">{message}</p> : null
    }

    return (
        <form onSubmit={handleSubmitForm}>
            <div className="flex justify-between gap-4">
                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Họ tên
                    </label>
                    <input
                        type="text"
                        name="name"
                        maxLength={150}
                        required
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        placeholder="Nhập tên can phạm nhân..."
                        value={name}
                        onChange={handleChangeName}
                    />
                    {renderError('name')}
                </div>

                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={date}
                        onChange={handleChangeDate}
                    />
                    {renderError('date')}
                </div>
            </div>

            <div className="mt-2 flex justify-between gap-4">
                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Giới tính
                    </label>
                    <select
                        className="w-full cursor-pointer rounded-md border-[1px] border-gray-300 px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        name="gender"
                        required
                        value={gender}
                        onChange={handleChangeGender}
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="0">Nam</option>
                        <option value="1">Nữ</option>
                    </select>
                    {renderError('gender')}
                </div>

                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Số căn cước công dân
                    </label>
                    <input
                        type="text"
                        name="citizen_number"
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        placeholder="Nhập số căn cước công dân..."
                        value={citizen_number}
                        onChange={handleChangeCitizenNumber}
                    />
                    {renderError('citizen_number')}
                </div>
            </div>

            <div className="mt-2 flex justify-between gap-4">
                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Địa chỉ hiện tại
                    </label>
                    <input
                        type="text"
                        name="address"
                        maxLength={255}
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={address}
                        onChange={handleChangeAddress}
                    />
                    {renderError('address')}
                </div>

                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Hộ khẩu thường trú
                    </label>
                    <input
                        type="text"
                        name="permanent_address"
                        maxLength={255}
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={permanent_address}
                        onChange={handleChangePermanentAddress}
                    />
                    {renderError('permanent_address')}
                </div>
            </div>

            <div className="mt-2 flex justify-between gap-4">
                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Tội danh
                    </label>
                    <textarea
                        name="crime"
                        required
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={crime}
                        onChange={handleChangeCrime}
                    />
                    {renderError('crime')}
                </div>

                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Mức án
                    </label>
                    <input
                        type="text"
                        name="sentence"
                        maxLength={255}
                        required
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={sentence}
                        onChange={handleChangeSentence}
                    />
                    {renderError('sentence')}
                </div>
            </div>

            <div className="mt-2 flex justify-between gap-4">
                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Ngày tiếp nhận
                    </label>
                    <input
                        type="date"
                        name="admitted_at"
                        required
                        className="w-full rounded-md border-[1px] border-gray-300 px-3 py-2 outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={admitted_at}
                        onChange={handleChangeAdmittedAt}
                    />
                    {renderError('admitted_at')}
                </div>

                <div className="w-1/2">
                    <label className="mb-1 block text-sm font-bold text-gray-700">
                        Trạng thái
                    </label>
                    <select
                        name="status"
                        required
                        className="w-full cursor-pointer rounded-md border-[1px] border-gray-300 px-3 py-2 text-sm outline-none transition-all focus:ring-1 focus:ring-slate-300"
                        value={status}
                        onChange={handleChangeStatus}
                    >
                        <option value="">Chọn trạng thái</option>
                        {Object.entries(PRISONER_STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    {renderError('status')}
                </div>
            </div>

            <div className="mb-6 mt-4 flex gap-4">
                <button
                    type="submit"
                    className="cursor-pointer rounded-md bg-indigo-600 p-2 font-semibold text-white transition hover:bg-indigo-700"
                >
                    {initialData?.id ? 'Cập nhật' : 'Thêm mới'}
                </button>
                <Link
                    href="/dashboard/prisoners"
                    className="cursor-pointer rounded-md bg-red-400 p-2 font-semibold text-white transition hover:bg-red-700"
                >
                    Quay lại
                </Link>
            </div>
        </form>
    )
}

export default PrisonerForm
