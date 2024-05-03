import React, { CSSProperties, useState } from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Box,
  Chip,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import HomeIcon from "@mui/icons-material/Home"

const NavItem = styled(Box)`
  margin: 10px;
`

const navItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textDecoration: "None",
  gap: "10px",
  color: "black",
}

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

interface SideBarProps {
  defaultOpen: boolean
}

const SideBarComponent: React.FunctionComponent<SideBarProps> = ({
  defaultOpen,
}) => {
  const { user, logout } = useAuth0()
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)
  const journalName = useSelector((state: State) => state.user.journalName)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(defaultOpen)

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <NavItem>
            <Link to="/" style={navItemStyle}>
              <img src="/logo.png" width={50} style={{}}></img>
              <Typography variant="h5">Poppyland Journal</Typography>
            </Link>
          </NavItem>
          <Box sx={{ flexGrow: 1 }} />
          <NavItem>
            <Link to="/today" style={navItemStyle}>
              <TodayIcon />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/journal" style={navItemStyle}>
              <MenuBookIcon />
            </Link>
          </NavItem>
          <Box sx={{ flexGrow: 1 }} />
          <NavItem>
            <Typography>
              {firstName ? `${firstName} ${lastName}` : user?.email}
            </Typography>
          </NavItem>
          <NavItem>
            <Link to="/preferences" style={navItemStyle}>
              <ManageAccountsIcon />
            </Link>
          </NavItem>
          <NavItem>
            <LogoutIcon
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              style={navItemStyle}
            />
          </NavItem>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SideBarComponent
