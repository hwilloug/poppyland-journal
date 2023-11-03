import React from 'react';
import styled from '@emotion/styled'
import SideBarComponent from '../components/SideBar';
import MoodTrackerComponent from '../components/MoodTracker';
import PreviousEntriesComponent from '../components/PreviousEntries';
import SleepTrackerComponent from '../components/SleepTracker';

const PageContainer = styled.div`
    margin: 0px;
    display: flex;
    flex-direction: row;
`

const HomePageContainer = styled.div`
    padding: 20px;
    flex-grow: 1;
    background-color: #fffcf5;
`

const HomePage: React.FunctionComponent = () => {
    return (
        <PageContainer>
            <SideBarComponent />
            <HomePageContainer>
                <MoodTrackerComponent />
                <SleepTrackerComponent />
                <PreviousEntriesComponent />
            </HomePageContainer>
        </PageContainer>
    )
  
}
  
export default HomePage