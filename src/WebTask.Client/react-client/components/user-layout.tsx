import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from './protected-route'
import { DashboardSidebar } from './dashboard/sidebar'
import { DashboardHeader } from './dashboard/header'

const UserLayout = () => {
  return (
    <ProtectedRoute>
        <div className="flex h-screen bg-background">
            <DashboardSidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto">
                  <Outlet />
                </main>
            </div>
        </div>
    </ProtectedRoute>
  )
}

export default UserLayout
