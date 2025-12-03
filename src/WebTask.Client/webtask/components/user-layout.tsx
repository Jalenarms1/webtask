import React, { ReactNode } from 'react'
import { ProtectedRoute } from './protected-route'
import { DashboardSidebar } from './dashboard/sidebar'
import { DashboardHeader } from './dashboard/header'

const UserLayout = ({children}: {children: ReactNode}) => {
  return (
    <ProtectedRoute >
        <div className="flex h-screen bg-background">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    </ProtectedRoute>
  )
}

export default UserLayout
