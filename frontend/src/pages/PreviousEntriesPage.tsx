import React, { useEffect, useState } from 'react';
import SideBarComponent from '../components/SideBar';
import { PageContainer, PageContentContainer } from '../components/styled-components';
import { SubHeader } from '../components/styled-components';
import axios from 'axios';
import { apiEndpoints } from '../api-endpoints';
import styled from '@emotion/styled';
import MarkdownComponent from '../components/Markdown';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'


const EntriesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`

const MoodContainer = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
`

const SleepContainer = styled.div`
    margin: 10px;
`

const MentalHealthContainer = styled.div`
    margin: 10px;
`

const EntryDate = styled.h3``

interface EntryType {
    date: string
    mood: string
    hours_sleep: string
    bed_time: string
    wake_up_time: string
    sleep_quality: string
    mental_health: string[]
    entry_content: string
}

const PreviousEntriesPage: React.FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [entries, setEntries] = useState<EntryType[]>([])

    const getEntries = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                apiEndpoints.getEntries.insert({ userId: "test" })
            )
            const data: ResponseType[] = response.data
            setEntries(data as unknown as EntryType[])
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getEntries()
    }, [])

    const getMoodIcon = (mood: string) => {
        try {
            switch (mood) {
                case "0":
                    return <SentimentVeryDissatisfiedIcon color='error' />
                case "1":
                    return <SentimentDissatisfiedIcon color='warning' />
                case "2":
                    return <SentimentNeutralIcon color='info' />
                case "3":
                    return <SentimentSatisfiedIcon color='success' />
                case "4":
                    return <SentimentVerySatisfiedIcon style={{color: 'purple'}} />
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>Previous Entries</SubHeader>
                <EntriesContainer>
                    {entries.map((entry) => <div>
                        <EntryDate>{new Date(entry.date).toLocaleDateString("en-US", { dateStyle: "full" })}</EntryDate>
                        <MoodContainer>Mood: {getMoodIcon(entry.mood)}</MoodContainer>
                        <SleepContainer>Hours sleep: {entry.hours_sleep}</SleepContainer>
                        <MentalHealthContainer>Mental Health: {entry.mental_health !== null && entry.mental_health.join(", ")}</MentalHealthContainer>
                        <MarkdownComponent view='view' value={entry.entry_content} />
                    </div>)}
                </EntriesContainer>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default PreviousEntriesPage