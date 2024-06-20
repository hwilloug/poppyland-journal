import React from "react"
import { PageContainer } from "./components/shared-components/styled-components"
import AppBarComponent from "./components/shared-components/AppBar"
import { Outlet } from "react-router-dom"
import Footer from "./components/shared-components/Footer"
import SideBar from "./components/shared-components/SideBar"
import { Box } from "@mui/material"

const Layout: React.FC = () => {
  return (
    <PageContainer>
      <AppBarComponent defaultOpen={false} />
      <SideBar />
      <Box marginLeft={"32px"}>
        <Outlet />
      </Box>
      <Footer />
    </PageContainer>
  )
}

export default Layout
