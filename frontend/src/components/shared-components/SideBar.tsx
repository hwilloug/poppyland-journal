import React, { CSSProperties, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Box,
  Toolbar,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FlagIcon from "@mui/icons-material/Flag"
import DashboardIcon from "@mui/icons-material/Dashboard"

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

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} enterDelay={500} classes={{ popper: className }} />
))(({ theme }) => ({
  [`.${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: "white",
    fontSize: 18,
  },
}))

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <NavItem>
            <Link to="/" style={navItemStyle}>
              <img src="/logo.png" width={50} style={{}}></img>
              <Typography variant="h5" fontFamily={"DancingScript"}>
                Poppyland Journal
              </Typography>
            </Link>
          </NavItem>
          <Box sx={{ flexGrow: 1 }} />
          <NavItem>
            <StyledTooltip title="Dashboard">
              <Link to="/" style={navItemStyle}>
                <DashboardIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Today's Entry">
              <Link to="/today" style={navItemStyle}>
                <TodayIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Goals">
              <Link to="/goals" style={navItemStyle}>
                <FlagIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Entries List">
              <Link to="/entries" style={navItemStyle}>
                <FormatListBulletedIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Journal">
              <Link to="/journal" style={navItemStyle}>
                <MenuBookIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <Box sx={{ flexGrow: 1 }} />
          <NavItem>
            <Typography>
              {firstName ? `${firstName} ${lastName}` : user?.email}
            </Typography>
          </NavItem>
          <NavItem>
            <StyledTooltip title="User Preferences">
              <Link to="/preferences" style={navItemStyle}>
                <ManageAccountsIcon />
              </Link>
            </StyledTooltip>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Logout">
              <LogoutIcon
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                style={navItemStyle}
              />
            </StyledTooltip>
          </NavItem>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default SideBarComponent
