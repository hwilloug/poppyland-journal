import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import SideBarComponent from '../components/shared-components/SideBar';
import MoodTrackerComponent from '../components/homepage/MoodTracker';
import PreviousEntriesComponent from '../components/homepage/PreviousEntries';
import SleepTrackerComponent from '../components/homepage/SleepTracker';
import { apiEndpoints } from '../api-endpoints';
import axios from 'axios';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getToken } from '../get-token';
import LoadingComponent from '../components/shared-components/Loading';

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

export interface ResponseType {
    date: string
    mood: string
    hours_sleep: string
    bed_time: string
    wake_up_time: string
    sleep_quality: string
    affirmation: string
    mental_health: string[]
    substances: string[]
    entry_content: string
}

interface DataType {
    [date: string]: number
}

const HomePage: React.FunctionComponent = () => {
    const { user } = useAuth0()
    const userId = user!.sub

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [entryDates, setEntryDates] = useState<string[]>([])
    const [moodData, setMoodData] = useState<DataType>({})
    const [sleepData, setSleepData] = useState<DataType>({})

    const getEntries = async () => {
        setIsLoading(true)
        try {
            const token = await getToken()
            const response = await axios.get(
                apiEndpoints.getEntries.insert({ userId }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data: ResponseType[] = response.data
            let dates = []
            let moods: DataType = {}
            let sleepTimes: DataType = {}
            for (let i=0; i < data.length; i++) {
                dates.push(data[i]['date'])
                moods[data[i]['date']] = parseInt(data[i]['mood'])
                sleepTimes[data[i]['date']] = parseInt(data[i]['hours_sleep'])
            }
            setEntryDates(dates)
            setMoodData(moods)
            setSleepData(sleepTimes)
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getEntries()
        // eslint-disable-next-line
    }, [])

    return (
        <PageContainer>
            <SideBarComponent />
            { !isLoading &&
                <HomePageContainer>
                    <MoodTrackerComponent moodData={moodData} />
                    <SleepTrackerComponent sleepData={sleepData} />
                    <PreviousEntriesComponent dates={entryDates} />
                </HomePageContainer>
            }
            { isLoading && <LoadingComponent />}
        </PageContainer>
    )
  
}
  
export default withAuthenticationRequired(HomePage)