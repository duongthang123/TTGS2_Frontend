import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditPosition from '@/components/positions/EditPosition'
import React from 'react'

function EditPositionPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa cấp bậc</h1>

        <EditPosition />
    </DashboardLayout>
  )
}

export default EditPositionPage