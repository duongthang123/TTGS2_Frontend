import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import UserTable from '@/components/users/UserTable';
import React from 'react'

function UserPage() {
  return (
    <DashboardLayout>
      <h1 className='py-4 font-bold'>Danh sách cán bộ chiến sĩ</h1>
      <UserTable />
    </DashboardLayout>
  )
}

export default UserPage;