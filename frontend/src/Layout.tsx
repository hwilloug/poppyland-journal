import React from "react"
import { PageContainer } from "./components/shared-components/styled-components"
import AppBarComponent from "./components/shared-components/AppBar"
import { Outlet } from "react-router-dom"
import Footer from "./components/shared-components/Footer"
import SideBar from "./components/shared-components/SideBar"
import { Alert, Box, Snackbar } from "@mui/material"
import { useSelector } from "react-redux"
import { State, snackbarActions } from "./store"

const Layout: React.FC = () => {
  const snackbar = useSelector((state: State) => state.snackbar)

  return (
    <PageContainer>
      <AppBarComponent />
      <SideBar />
      <Box marginLeft={"32px"} minHeight={window.innerHeight - 145}>
        <Outlet />
      </Box>
      <Footer />
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={() => snackbarActions.setIsOpen(false)}
      >
        <Alert
          onClose={() => snackbarActions.setIsOpen(false)}
          severity={snackbar.type}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  )
}

export default Layout
