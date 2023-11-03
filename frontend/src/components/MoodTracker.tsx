import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components';

const Container = styled.div`
`

const MoodTrackerComponent: React.FunctionComponent = () => {
    return (
        <Container>
            <SubHeader>Mood Tracker - Last 30 days</SubHeader>
        </Container>
    )
  
}
  
export default MoodTrackerComponent