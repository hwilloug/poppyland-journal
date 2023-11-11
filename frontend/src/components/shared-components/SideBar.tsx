import React, { CSSProperties, useState } from "react"
import styled from "@emotion/styled"
import { Link, NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./styled-components"
import { Chip, Divider, Drawer, Typography } from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"
import { Home, Image } from "@mui/icons-material"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import MedicationIcon from "@mui/icons-material/Medication"
import HomeIcon from "@mui/icons-material/Home"

const drawerWidth = "17rem"
const drawerClosedWidth = "5rem"

const NavContainer = styled.li`
  list-style-type: none;
  flex-grow: 2;
`

const NavItem = styled.ul`
  padding: 0px;
`

const navItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textDecoration: "None",
  gap: "10px",
  color: "black",
}

const NavContainerCompact = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 20px;
`

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`

const AccountContainerCompact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const SideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  max-width: ${drawerWidth};
`

const SideBarComponent: React.FunctionComponent = () => {
  const { user, logout } = useAuth0()
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <>
      <Drawer
        variant="persistent"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: isDrawerOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            padding: "20px",
            backgroundColor: "#bdcfbc",
            maxWidth: drawerWidth,
          },
        }}
        anchor="left"
      >
        <SideBarHeader>
          <img src="logo.png" width={100}></img>
          <Typography variant="h5">Poppyland Journal</Typography>
          <Chip label="BETA" color="primary" sx={{ width: "100px" }} />
        </SideBarHeader>
        <Divider />
        <NavContainer>
          <NavItem>
            <NavLink to="/" style={navItemStyle}>
              <HomeIcon />
              <Typography>Home</Typography>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/today" style={navItemStyle}>
              <TodayIcon />
              <Typography>Today's Entry</Typography>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/medications" style={navItemStyle}>
              <MedicationIcon />
              <Typography>Medications</Typography>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/journal" style={navItemStyle}>
              <MenuBookIcon />
              <Typography>My Journal</Typography>
            </NavLink>
          </NavItem>
        </NavContainer>
        <AccountContainer>
          <Typography>
            {firstName ? `${firstName} ${lastName}` : user?.email}
          </Typography>
          <Link to="/preferences" style={navItemStyle}>
            <ManageAccountsIcon />
          </Link>
          <LogoutIcon
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            style={navItemStyle}
          />
          <ArrowCircleLeftIcon
            onClick={handleDrawerToggle}
            fontSize="small"
            style={navItemStyle}
          />
        </AccountContainer>
      </Drawer>
      <Drawer
        variant="persistent"
        open={!isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: !isDrawerOpen ? drawerClosedWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            padding: "20px",
            backgroundColor: "#bdcfbc",
          },
        }}
        anchor="left"
      >
        <SideBarHeader>
          <img src="logo.png" width={50} />
        </SideBarHeader>
        <Divider />
        <NavContainerCompact>
          <NavLink to="/" style={navItemStyle}>
            <HomeIcon fontSize="large" />
          </NavLink>
          <NavLink to="/today" style={navItemStyle}>
            <TodayIcon fontSize="large" />
          </NavLink>
          <NavLink to="/medications" style={navItemStyle}>
            <MedicationIcon fontSize="large" />
          </NavLink>
          <NavLink to="/journal" style={navItemStyle}>
            <MenuBookIcon fontSize="large" />
          </NavLink>
        </NavContainerCompact>
        <AccountContainerCompact>
          <Link to="/preferences" style={navItemStyle}>
            <ManageAccountsIcon fontSize="large" />
          </Link>
          <LogoutIcon
            style={navItemStyle}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            fontSize="large"
          />
          <ArrowCircleRightIcon
            onClick={handleDrawerToggle}
            fontSize="small"
            style={navItemStyle}
          />
        </AccountContainerCompact>
      </Drawer>
    </>
  )
}

export default SideBarComponent
