import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditUser from '@/components/users/EditUser'
import React from 'react'

function EditUserPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa người dùng</h1>

        <EditUser />
        
    </DashboardLayout>
  )
}

export default EditUserPage