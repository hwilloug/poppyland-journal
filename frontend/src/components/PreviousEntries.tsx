import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components'

const Container = styled.div`
`

interface PreviousEntriesProps {
    dates: string[]
}

const PreviousEntriesComponent: React.FunctionComponent<PreviousEntriesProps> = ({ dates }) => {
    return (
        <Container>
            <SubHeader>View Previous Entries</SubHeader>
        </Container>
    )
}
  
export default PreviousEntriesComponent