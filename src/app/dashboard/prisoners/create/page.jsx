import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreatePrisoner from '@/components/prisoners/CreatePrisoner'
import React from 'react'

function CreatePrisonerPage() {
    return (
        <DashboardLayout>
            <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới thông tin CPN</h1>

            <CreatePrisoner />
        </DashboardLayout>
    )
}

export default CreatePrisonerPage