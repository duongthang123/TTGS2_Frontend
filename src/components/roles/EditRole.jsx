"use client"

import React, { useEffect, useState } from 'react'
import RoleForm from '../forms/RoleForm'
import { useParams, useRouter } from 'next/navigation'
import { getRoleById, updateRole } from '@/services/roleService';
import { toast } from 'react-toastify';
import LoadingBlock from '../comon/LoadingBlock';

function EditRole() {
  const params = useParams();
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!params.id) return;

    const fetchRole = async () => {
      try {
        const response = await getRoleById(params.id);
        setRole(response.data);
      } catch (error) {        
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [params.id]);

  const handleUpdate = async data => {
    if (!role?.id) return;
    await updateRole(role.id, data);
    toast.success('Cập nhật quyền thành công');
    setTimeout(() => {
		router.push('/dashboard/roles');
	}, 1500);
  }
  
  if (loading) {
    return <LoadingBlock tittle='Đang tải dữ liệu quyền...' />
  }
  
  return (
    <RoleForm 
      onSubmit={handleUpdate}
      initialData={role} 
    />
  )
}

export default EditRole