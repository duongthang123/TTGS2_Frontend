"use client"

import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditRole from '@/components/roles/EditRole'
import React from 'react'

function EditRolePage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa quyền</h1>

        <EditRole />
        
    </DashboardLayout>
  )
}

export default EditRolePage