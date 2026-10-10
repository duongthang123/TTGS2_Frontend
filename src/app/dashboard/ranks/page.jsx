import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import PermissionGuard from '@/components/guards/PermissionGuard'
import RankTable from '@/components/ranks/RankTable'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

function RankPage() {
  return (
    <DashboardLayout>
        <div className='flex justify-between'>
          <h1 className='py-4 font-bold'>Danh sách cấp bậc</h1>
          
			<PermissionGuard permissions={["create-rank"]}>
				<Link href="/dashboard/ranks/create" 
						className="flex items-center px-3 py-2 h-[36px] my-auto bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
				>
					<UserPlusIcon className='w-6 h-6 font-bold pr-1'></UserPlusIcon>
					<span>Thêm mới</span>
				</Link>
			</PermissionGuard>
        </div>

      <RankTable />
    </DashboardLayout>
  )
}

export default RankPage