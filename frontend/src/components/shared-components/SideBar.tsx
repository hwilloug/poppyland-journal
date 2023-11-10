import React from "react"
import styled from "@emotion/styled"
import { Link, NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./styled-components"
import { Chip } from "@mui/material"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import LogoutIcon from "@mui/icons-material/Logout"
import { useSelector } from "react-redux"
import { State } from "../../store"

const Container = styled.div`
  width: 25%;
  flex-shrink: 0;
  border-right: 1px solid black;
  min-height: 100vh;
  padding: 20px;
  background-color: #bdcfbc;
  display: flex;
  flex-direction: column;
`

const AppTitle = styled.h1``

const NavContainer = styled.li`
  list-style-type: none;
  flex-grow: 2;
`

const NavItem = styled.ul`
  padding: 0px;
`

const AccountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const UserName = styled.h4``

const LogoutButton = styled(Button)`
  color: black;
`

const SideBarComponent: React.FunctionComponent = () => {
  const { user, logout } = useAuth0()
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)
  return (
    <Container>
      <AppTitle>Poppyland Journal</AppTitle>
      <Chip label="BETA" color="primary" sx={{ width: "100px" }} />
      <NavContainer>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/today">Today's Entry</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/medications">Medications</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/previous">Previous Entries</NavLink>
        </NavItem>
      </NavContainer>
      <AccountContainer>
        <UserName>
          {firstName ? `${firstName} ${lastName}` : user?.email}
        </UserName>
        <Link to="/preferences">
          <ManageAccountsIcon />
        </Link>
        <a href="#">
          <LogoutIcon
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          />
        </a>
      </AccountContainer>
    </Container>
  )
}

export default SideBarComponent
