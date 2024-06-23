import React, { CSSProperties } from "react"
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
  useTheme,
} from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"
import { ContactEmergency } from "@mui/icons-material"

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

const AppBarComponent: React.FunctionComponent<SideBarProps> = ({
  defaultOpen,
}) => {
  const { user, logout } = useAuth0()
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <NavItem>
            <Link to="/" style={navItemStyle}>
              <img src="/logo.png" width={50} style={{}}></img>
              <Typography variant="h5" fontFamily={"DancingScript"}>
                Whispering Willow Diary
              </Typography>
            </Link>
          </NavItem>
          <Box sx={{ flexGrow: 1 }} />
          <NavItem>
            <Typography>
              {firstName ? `${firstName} ${lastName}` : user?.email}
            </Typography>
          </NavItem>
          <NavItem>
            <StyledTooltip title="Emergency Plan">
              <Link to="/emergency-plan" style={navItemStyle}>
                <ContactEmergency />
              </Link>
            </StyledTooltip>
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

export default AppBarComponent
