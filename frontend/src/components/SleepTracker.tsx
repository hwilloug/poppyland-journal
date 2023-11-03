import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components';

const Container = styled.div`
`

const SleepTrackerComponent: React.FunctionComponent = () => {
    return (
        <Container>
            <SubHeader>Sleep Tracker - Last 30 days</SubHeader>
        </Container>
    )
  
}
  
export default SleepTrackerComponent