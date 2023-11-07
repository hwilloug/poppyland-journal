import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import SideBarComponent from '../components/SideBar';
import MoodTrackerComponent from '../components/MoodTracker';
import PreviousEntriesComponent from '../components/PreviousEntries';
import SleepTrackerComponent from '../components/SleepTracker';
import { apiEndpoints } from '../api-endpoints';
import axios from 'axios';

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
    mental_health: string[]
    entry_content: string
}

interface DataType {
    [date: string]: number
}

const HomePage: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [entryDates, setEntryDates] = useState<string[]>([])
    const [moodData, setMoodData] = useState<DataType>({})
    const [sleepData, setSleepData] = useState<DataType>({})

    const getEntries = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                apiEndpoints.getEntries.insert({ userId: "test" })
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
            { isLoading && <>Loading...</>}
        </PageContainer>
    )
  
}
  
export default HomePage