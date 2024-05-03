import React from "react"
import { PageContainer } from "./components/shared-components/styled-components"
import SideBarComponent from "./components/shared-components/SideBar"
import { Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <PageContainer>
      <SideBarComponent defaultOpen={false} />
      <Outlet />
    </PageContainer>
  )
}

export default Layout
