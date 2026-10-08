import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreateUnit from '@/components/units/CreateUnit'
import React from 'react'

function CreateUnitPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới đội công tác</h1>

        <CreateUnit />
    </DashboardLayout>
  )
}

export default CreateUnitPage