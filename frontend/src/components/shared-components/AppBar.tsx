import React, { CSSProperties, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LockIcon from "@mui/icons-material/Lock"
import { useSelector } from "react-redux"
import { State } from "../../store"
import { ContactEmergency } from "@mui/icons-material"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import TableRowsIcon from "@mui/icons-material/TableRows"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TodayIcon from "@mui/icons-material/Today"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import FlagIcon from "@mui/icons-material/Flag"
import DashboardIcon from "@mui/icons-material/Dashboard"
import EventRepeatIcon from "@mui/icons-material/EventRepeat"

const NavItem = styled(Box)`
  margin: 10px;
`

const navItemStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  textDecoration: "None",
  gap: "10px",
  color: "#e0f0bb",
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

const AppBarComponent: React.FunctionComponent = () => {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0()
  const theme = useTheme()
  const navigation = useNavigate()

  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const authorizedLinks = [
    {
      title: "Dashboard",
      link: "/diary/dashboard",
      icon: <LockIcon />,
    },
    {
      title: "Today's Entry",
      link: "/diary/today",
      icon: <TodayIcon />,
    },
    {
      title: "Goals",
      link: "/diary/goals",
      icon: <FlagIcon />,
    },
    {
      title: "Habits",
      link: "/diary/habits",
      icon: <EventRepeatIcon />,
    },
    {
      title: "Entries",
      link: "/diary/entries",
      icon: <FormatListBulletedIcon />,
    },
    {
      title: "Journal",
      link: "/diary/journal",
      icon: <MenuBookIcon />,
    },
    {
      title: "Emergency Plan",
      link: "/diary/emergency-plan",
      icon: <ContactEmergency />,
    },
    {
      title: "User Preferences",
      link: "/diary/preferences",
      icon: <ManageAccountsIcon />,
    },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <NavItem>
            <Link to="/" style={navItemStyle}>
              <img
                src="/whispering_willow_logo.png"
                width={50}
                style={{}}
              ></img>
              <Typography
                variant="h5"
                fontFamily={"DancingScript"}
                color={"#e0f0bb"}
              >
                Whispering Willow Diary
              </Typography>
              <Typography color={"teal"}>Beta</Typography>
            </Link>
          </NavItem>
          {useMediaQuery(theme.breakpoints.up("sm")) &&
            isAuthenticated &&
            window.location.pathname !== "/" && (
              <>
                {" "}
                <Box sx={{ flexGrow: 1 }} />
                <NavItem>
                  <Typography color={"#e0f0bb"}>
                    {firstName ? `${firstName} ${lastName || ""}` : user?.email}
                  </Typography>
                </NavItem>
                <NavItem>
                  <StyledTooltip title="Emergency Plan">
                    <Link to="/diary/emergency-plan" style={navItemStyle}>
                      <ContactEmergency />
                    </Link>
                  </StyledTooltip>
                </NavItem>
                <NavItem>
                  <StyledTooltip title="User Preferences">
                    <Link to="/diary/preferences" style={navItemStyle}>
                      <ManageAccountsIcon />
                    </Link>
                  </StyledTooltip>
                </NavItem>
                <NavItem>
                  <StyledTooltip title="Logout">
                    <LockIcon
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      style={navItemStyle}
                    />
                  </StyledTooltip>
                </NavItem>
              </>
            )}
          {!isAuthenticated && (
            <>
              {" "}
              <Box sx={{ flexGrow: 1 }} />
              <NavItem>
                <StyledTooltip title="Login">
                  <VpnKeyIcon
                    style={navItemStyle}
                    onClick={() =>
                      loginWithRedirect({
                        authorizationParams: {
                          redirect_uri: `${window.location.href}diary/dashboard`,
                        },
                      })
                    }
                  />
                </StyledTooltip>
              </NavItem>
            </>
          )}
          {useMediaQuery(theme.breakpoints.up("sm")) &&
            isAuthenticated &&
            window.location.pathname === "/" && (
              <>
                {" "}
                <Box sx={{ flexGrow: 1 }} />
                <NavItem>
                  <Typography color={"#e0f0bb"}>
                    {firstName ? `${firstName} ${lastName || ""}` : user?.email}
                  </Typography>
                </NavItem>
                <NavItem>
                  <StyledTooltip title="Journal">
                    <Link to={"/diary/dashboard"}>
                      <MenuBookIcon style={navItemStyle} />
                    </Link>
                  </StyledTooltip>
                </NavItem>
                <NavItem>
                  <StyledTooltip title="Logout">
                    <LockIcon
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      style={navItemStyle}
                    />
                  </StyledTooltip>
                </NavItem>
              </>
            )}
          {useMediaQuery(theme.breakpoints.down("sm")) && isAuthenticated && (
            <>
              <Button onClick={() => setIsDrawerOpen(true)}>
                <TableRowsIcon sx={{ color: "rgba(224, 240, 187)" }} />
              </Button>
              <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                anchor="bottom"
              >
                <Box role="presentation" onClick={() => setIsDrawerOpen(false)}>
                  <List>
                    {authorizedLinks.map((link) => (
                      <ListItem
                        key={link.title}
                        onClick={() => navigation(link.link)}
                      >
                        <ListItemIcon>{link.icon}</ListItemIcon>
                        <ListItemText primary={link.title} />
                      </ListItem>
                    ))}
                    <ListItem
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                    >
                      <ListItemIcon>
                        <LockIcon />
                      </ListItemIcon>
                      <ListItemText primary={"Logout"} />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarComponent
