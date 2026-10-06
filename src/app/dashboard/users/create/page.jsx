import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreateUser from '@/components/users/CreateUser'
import React from 'react'

function CreateUserPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới cán bộ chiến sĩ</h1>

        <CreateUser />
    </DashboardLayout>
  )
}

export default CreateUserPage