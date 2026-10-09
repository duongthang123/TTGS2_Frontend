import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditRank from '@/components/ranks/EditRank'
import React from 'react'

function EditPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa cấp bậc</h1>

        <EditRank />
    </DashboardLayout>
  )
}

export default EditPage