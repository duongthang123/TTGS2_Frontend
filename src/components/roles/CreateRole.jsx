"use client"

import React from 'react'
import RoleForm from '../forms/RoleForm'
import { useRouter } from 'next/navigation'
import { createRole } from '@/services/roleService';
import { toast } from 'react-toastify';

function CreateRole() {
  const router = useRouter();

  const handleCreate = async (data) => {
    await createRole(data);
    toast.success('Tạo quyền thành công');
    setTimeout(() => {
      router.push('/dashboard/roles');
    }, 1500);
  }
  
  return (
    <RoleForm 
      onSubmit={handleCreate}
    />
  )
}

export default CreateRole