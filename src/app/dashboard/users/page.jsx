import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import PermissionGuard from '@/components/guards/PermissionGuard';
import UserTable from '@/components/users/UserTable';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import React from 'react'

function UserPage() {
  return (
    <DashboardLayout>
      <div className='flex justify-between'>
			<h1 className='pt-2 py-4 font-bold'>Danh sách cán bộ chiến sĩ</h1>
			
			<PermissionGuard permissions={["create-user"]}>

				<Link href="/dashboard/users/create" 
						className="flex items-center px-3 py-2 h-[36px] my-auto bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
				>
					<UserPlusIcon className='w-6 h-6 font-bold pr-1'></UserPlusIcon>
					<span>Thêm mới</span>
				</Link>
			</PermissionGuard>
        </div>

      <UserTable />
    </DashboardLayout>
  )
}

export default UserPage;