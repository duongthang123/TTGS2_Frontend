import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import EditPrisoner from '@/components/prisoners/EditPrisoner'
import React from 'react'

function EditPrisonerPage() {
    return (
        <DashboardLayout>
            <h1 className="mb-3 py-4 text-2xl font-bold">
                Chỉnh sửa thông tin phạm nhân
            </h1>

            <EditPrisoner />
        </DashboardLayout>
    )
}

export default EditPrisonerPage
