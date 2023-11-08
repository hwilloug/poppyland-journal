import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from '../shared-components/styled-components';

const Container = styled.div`
`

interface MoodTrackerProps {
    moodData: {[date: string]: number}
}

const MoodTrackerComponent: React.FunctionComponent<MoodTrackerProps> = ({ moodData }) => {
    return (
        <Container>
            <SubHeader>Mood Tracker - Last 30 days</SubHeader>
        </Container>
    )
  
}
  
export default MoodTrackerComponent