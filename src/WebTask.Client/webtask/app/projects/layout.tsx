import UserLayout from '@/components/user-layout'
import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <UserLayout>
        {children}
    </UserLayout>
  )
}

export default layout
