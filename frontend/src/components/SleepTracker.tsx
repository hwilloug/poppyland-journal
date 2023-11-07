import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components';

const Container = styled.div`
`

interface SleepTrackerProps {
    sleepData: {[date: string]: number}
}

const SleepTrackerComponent: React.FunctionComponent<SleepTrackerProps> = ({ sleepData }) => {
    return (
        <Container>
            <SubHeader>Sleep Tracker - Last 30 days</SubHeader>
        </Container>
    )
  
}
  
export default SleepTrackerComponent