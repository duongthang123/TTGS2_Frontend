"use client"

import { getAllPermissions } from '@/services/roleService';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function RoleForm({initialData = {}, onSubmit}) {
    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [roleDisplayName, setRoleDisplayName] = useState('');
    const [roleGroup, setRoleGroup] = useState('');
    const [rolePermission, setRolePermission] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
            const fetchAllPermissions =  async () => {
                try {
                    const response = await getAllPermissions();
                    setPermissions(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
    
            fetchAllPermissions();
        }, []);


    useEffect(() => {
        if (!initialData) return;

        setRoleName(initialData.name || '');
        setRoleDisplayName(initialData.display_name || '');
        setRoleGroup(initialData.group || '');
        const permIds = (initialData.permissions || []).map(perm => perm.id);
        setRolePermission(permIds);
    }, [initialData]);

    const handleChangeName = (e) => {
        setRoleName(e.target.value);
    }
    
    const handleChangeDisplayName = (e) => {
        setRoleDisplayName(e.target.value);
    }

    const handleChangeRoleGroup = (e) => {
        setRoleGroup(e.target.value);
    }

    const handleChangePermissionIds = (e) => {
        const value = parseInt(e.target.value);

        setRolePermission((prev) => {
            if (e.target.checked) {
                return prev.includes(value) ? prev : [...prev, value];
            } else {
                return prev.filter((id) => id !== value);
            }
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setErrors({});

        const data = {
            name: roleName,
            display_name: roleDisplayName,
            group: roleGroup,
            permission_ids: rolePermission,
        }

        try {
            await onSubmit(data);
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            toast.error('Có lỗi xảy ra khi cập nhật quyền');
        }
    }

  return (
    <form onSubmit={handleSubmitForm} className='text-sm'>
        <div className="flex justify-between gap-4">
            <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                    Tên quyền
                </label>
                <input
                    type="text"
                    name='name'
                    className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
                    placeholder="Nhập tên quyền..."
                    value={roleName}
                    onChange={handleChangeName}
                />
                {errors && (
                    <p className="text-red-500 p-2">{errors.name}</p>
                )}
            </div>

            <div className="w-1/2">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                    Tên hiển thị quyền
                </label>
                <input
                    type="text"
                    name='display_name'
                    className="w-full border-[1px] outline-none border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
                    placeholder="Nhập hiển thị..."
                    value={roleDisplayName}
                    onChange={handleChangeDisplayName}
                />
                {errors && (
                    <p className="text-red-500 p-2">{errors.display_name}</p>
                )}
            </div>
        </div>
        <div className=" my-4 w-full">
            <label className="block text-sm font-bold text-gray-700 mb-1">
                Nhóm quyền
            </label>
                
                <select
                    className="border-[1px] text-sm cursor-pointer outline-none w-full border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-slate-300 transition-all"
                    name='group'
                    value={roleGroup}
                    onChange={handleChangeRoleGroup}
                >
                    <option value="" disabled>Nhóm quyền</option>
                    <option value="system">Quản trị viên</option>
                    <option value="user">Người dùng</option>
                </select>

                {errors && (
                    <p className="text-red-500 p-2">{errors.group}</p>
                )}
        </div>

        <div className="space-y-6">
            <label className="block text-sm font-bold text-gray-700">
                Permission
            </label>

            <div className="grid grid-cols-3 gap-6">
                {Object.keys(permissions).length > 0 ? (
                    Object.entries(permissions).map(([groupName, groupPermissions]) => (
                        <div key={groupName} >
                            <div className='space-y-3'>
                                <h4 className='text-lg font-semibold text-gray-500'>{groupName}</h4>
                            </div>

                            <div className="space-y-2">
                                {groupPermissions.map((permission) => (
                                    <div key={permission.id} className="flex items-center">
                                        <input
                                            id={`permission_${permission.id}`}
                                            type="checkbox"
                                            value={permission.id}
                                            checked={rolePermission.includes(permission.id)}
                                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            name='permission_ids'
                                            onChange={handleChangePermissionIds}
                                        />
                                        <label
                                            htmlFor={`permission_${permission.id}`}
                                            className="ml-2 text-sm text-gray-700"
                                        >
                                            {permission.display_name}
                                        </label>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
        <div className='flex gap-4 mt-12'>
            <button 
                type='submit' 
                className='p-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition cursor-pointer'
            >
                {initialData?.id ? 'Cập nhật' : 'Thêm mới'}
            </button>
            <Link href='/dashboard/roles' className='p-2 bg-red-400 text-white font-semibold rounded-md hover:bg-red-700-700 transition cursor-pointer'>Quay lại</Link>
        </div>
        
    </form>
  )
}

export default RoleForm;