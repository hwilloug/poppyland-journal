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
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { getToken } from '../get-token';


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
    const { user } = useAuth0()
    const userId = user!.sub

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [entries, setEntries] = useState<EntryType[]>([])

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
            setEntries(data as unknown as EntryType[])
            setIsLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getEntries()
        // eslint-disable-next-line
    }, [])

    const getMoodIcon = (mood: string) => {
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
    }

    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>Previous Entries</SubHeader>
                <EntriesContainer>
                    {!isLoading && entries.map((entry) => <div>
                        <EntryDate>{new Date(entry.date).toLocaleDateString("en-US", { dateStyle: "full" })}</EntryDate>
                        <MoodContainer>Mood: {getMoodIcon(entry.mood)}</MoodContainer>
                        <SleepContainer>Hours sleep: {entry.hours_sleep}</SleepContainer>
                        <MentalHealthContainer>Mental Health: {entry.mental_health && entry.mental_health.join(", ")}</MentalHealthContainer>
                        <MarkdownComponent view='view' value={entry.entry_content} />
                    </div>)}
                    { isLoading &&
                        <>Loading...</>
                    }
                </EntriesContainer>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default withAuthenticationRequired(PreviousEntriesPage)