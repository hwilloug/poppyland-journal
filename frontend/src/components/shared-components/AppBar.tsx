import React, { CSSProperties, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import {
  AppBar,
  Box,
  Button,
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
import MenuBookIcon from "@mui/icons-material/MenuBook"
import TableRowsIcon from "@mui/icons-material/TableRows"

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
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
          {useMediaQuery(theme.breakpoints.up("sm")) && !isAuthenticated && (
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
          {useMediaQuery(theme.breakpoints.down("xs")) && (
            <>
              <Button>
                <TableRowsIcon />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarComponent
