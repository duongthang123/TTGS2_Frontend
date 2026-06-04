import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreateRole from '@/components/roles/CreateRole'
import React from 'react'


function CreateRolePage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới quyền</h1>

        <CreateRole />
        
    </DashboardLayout>
  )
}

export default CreateRolePage