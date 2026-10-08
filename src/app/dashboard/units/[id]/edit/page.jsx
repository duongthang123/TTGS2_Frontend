import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditUnit from '@/components/units/EditUnit'
import React from 'react'

function EditUnitPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Chỉnh sửa đội công tác</h1>

        <EditUnit />
    </DashboardLayout>
  )
}

export default EditUnitPage