import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import ShowUser from '@/components/users/ShowUser'
import React from 'react'

function ShowUserPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Thông tin người dùng</h1>

        <ShowUser />
        
    </DashboardLayout>
  )
}

export default ShowUserPage