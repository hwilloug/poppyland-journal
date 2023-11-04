import React from 'react';
import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom';

const Container = styled.div`
    width: 25%;
    flex-shrink: 0;
    border-right: 1px solid black;
    min-height: 100vh;
    padding: 20px;
    background-color: #bdcfbc;
`

const AppTitle = styled.h1`
`

const NavContainer = styled.li`
    list-style-type: none
`

const NavItem = styled.ul`
    padding: 0px;
`

const SideBarComponent: React.FunctionComponent = () => {
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
            
        </Container>
    )
  
}
  
export default SideBarComponent