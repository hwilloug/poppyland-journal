import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components';

const Container = styled.div`
`

const PreviousEntriesComponent: React.FunctionComponent = () => {
    return (
        <Container>
            <SubHeader>View Previous Entries</SubHeader>
        </Container>
    )
  
}
  
export default PreviousEntriesComponent