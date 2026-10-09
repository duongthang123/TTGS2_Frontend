import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import CreateRank from '@/components/ranks/CreateRank'
import React from 'react'

function CreateRankPage() {
  return (
    <DashboardLayout>
        <h1 className='font-bold py-4 mb-3 text-2xl'>Thêm mới cấp bậc</h1>

        <CreateRank />
    </DashboardLayout>
  )
}

export default CreateRankPage