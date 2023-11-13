import React, { CSSProperties, useState } from "react"
import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { Chip, Divider, Drawer, Typography } from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import HomeIcon from "@mui/icons-material/Home"

const drawerWidth = "17rem"
const drawerClosedWidth = "5rem"

const NavContainer = styled.li`
  list-style-type: none;
  flex-grow: 2;
`

const NavItem = styled.ul`
  margin-top: 30px;
  padding: 0px;
  margin-left: 20px;
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
  gap: 30px;
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
  gap: 30px;
`

const SideBarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  max-width: ${drawerWidth};
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
            backgroundColor: "secondary.main",
            width: drawerWidth,
          },
        }}
        anchor="left"
      >
        <SideBarHeader>
          <img src="logo.png" width={100}></img>
          <Typography variant="h5">Poppyland Journal</Typography>
          <Chip label="ALPHA" color="primary" sx={{ width: "100px" }} />
        </SideBarHeader>
        <Divider />
        <NavContainer>
          <NavItem>
            <Link to="/" style={navItemStyle}>
              <HomeIcon />
              <Typography>Home</Typography>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/today" style={navItemStyle}>
              <TodayIcon />
              <Typography>Today's Entry</Typography>
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link to="/medications" style={navItemStyle}>
              <MedicationIcon />
              <Typography>Medications</Typography>
            </Link>
          </NavItem> */}
          <NavItem>
            <Link to="/journal" style={navItemStyle}>
              <MenuBookIcon />
              <Typography>{journalName}</Typography>
            </Link>
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
            backgroundColor: "secondary.main",
          },
        }}
        anchor="left"
      >
        <SideBarHeader>
          <img src="logo.png" width={50} />
        </SideBarHeader>
        <Divider />
        <NavContainerCompact>
          <Link to="/" style={navItemStyle}>
            <HomeIcon />
          </Link>
          <Link to="/today" style={navItemStyle}>
            <TodayIcon />
          </Link>
          {/* <Link to="/medications" style={navItemStyle}>
            <MedicationIcon />
          </Link> */}
          <Link to="/journal" style={navItemStyle}>
            <MenuBookIcon />
          </Link>
        </NavContainerCompact>
        <AccountContainerCompact>
          <Link to="/preferences" style={navItemStyle}>
            <ManageAccountsIcon />
          </Link>
          <LogoutIcon
            style={navItemStyle}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
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
