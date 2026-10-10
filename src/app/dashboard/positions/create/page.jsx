import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreatePosition from '@/components/positions/CreatePosition'
import React from 'react'

function CreatePositionPage() {
    return (
        <DashboardLayout>
            <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới chức vụ</h1>

            <CreatePosition />
        </DashboardLayout>
    )
}

export default CreatePositionPage