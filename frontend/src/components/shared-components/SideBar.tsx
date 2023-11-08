import React from 'react';
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

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

const AppTitle = styled.h1`
`

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

const LogoutButton = styled.button`
    background-color: #bdcfbc;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
`

const SideBarComponent: React.FunctionComponent = () => {
    const { user, logout } = useAuth0()
    return (
        <Container>
            <AppTitle>Poppyland Journal</AppTitle>
            <NavContainer>
                <NavItem>
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/today">Today's Entry</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/previous">Previous Entries</NavLink>
                </NavItem>
            </NavContainer>
            <AccountContainer>
                <UserName>{user?.email}</UserName>
                <LogoutButton onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>Logout</LogoutButton>
            </AccountContainer>
        </Container>
    )
  
}
  
export default SideBarComponent