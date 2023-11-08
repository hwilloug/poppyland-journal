import React, { useEffect, useState } from 'react'
import SideBarComponent from '../components/shared-components/SideBar'
import { PageContainer, PageContentContainer } from '../components/shared-components/styled-components'
import { SubHeader } from '../components/shared-components/styled-components'
import styled from '@emotion/styled'
import dayjs, { Dayjs } from 'dayjs'
import { Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { apiEndpoints } from '../api-endpoints'
import { ResponseType } from './HomePage'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { getToken } from '../get-token'
import MoodEntryComponent from '../components/todaysentrypage/MoodEntry'
import SleepEntryComponent from '../components/todaysentrypage/SleepEntry'
import MentalHealthEntryComponent from '../components/todaysentrypage/MentalHealthEntry'
import EntryComponent from '../components/todaysentrypage/Entry'
import SubstanceEntryComponent from '../components/todaysentrypage/SubstanceEntry'
import LoadingComponent from '../components/shared-components/Loading'
import DailyAffirmationComponent from '../components/todaysentrypage/DailyAffirmation'
import DailyGoalComponent from '../components/todaysentrypage/DailyGoal'


export const SectionHeader = styled.h3`
    margin-top: 50px;
`

const SubmitContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const SubmitButton = styled.button`
    margin-top: 50px;
    background-color: #8d5bc1;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
    const { user } = useAuth0()
    const userId = user!.sub

    const date = new Date().toLocaleDateString("en-CA")
    const dateFull = new Date().toLocaleDateString("en-US", { dateStyle: "full" })

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [mood, setMood] = useState<number>()
    const [bedTime, setBedTime] = useState<Dayjs | null>()
    const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>()
    const [hoursSleep, setHoursSleep] = useState<number>()
    const [sleepQuality, setSleepQuality] = useState<string>()
    const [affirmation, setAffirmation] = useState<string>()
    const [goal, setGoal] = useState<string>()
    const [mentalHealth, setMentalHealth] = useState<string[]>([])
    const [substances, setSubstances] = useState<string[]>([])
    const [entryContent, setEntryContent] = useState<string>()

    const getEntry = async () => {
        setIsLoading(true)
        try {
            const token = await getToken()
            const response = await axios.get(
                apiEndpoints.getEntry.insert({ userId: userId, date: date }),
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const data: ResponseType = response.data
            if (data) {
                setMood(parseInt(data.mood))
                setBedTime(dayjs(data.bed_time))
                setWakeUpTime(dayjs(data.wake_up_time))
                setHoursSleep(parseInt(data.hours_sleep))
                setSleepQuality(data.sleep_quality)
                setMentalHealth(data.mental_health || [])
                setEntryContent(data.entry_content)
                setSubstances(data.substances || [])
                setAffirmation(data.affirmation)
                setGoal(data.goal)
            }
            setIsLoading(false)
        } catch (e) {
            console.log(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getEntry()
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (bedTime && wakeUpTime) {
            let s = wakeUpTime.diff(bedTime, 'hour')
            if (s < 0) {
                s = s + 24
            }
            setHoursSleep(s)
        }
    }, [bedTime, wakeUpTime])

    const modifyMentalHealth = (symptom: string) => {
        if (mentalHealth.includes(symptom)) {
            let symptoms = mentalHealth
            let index = symptoms.indexOf(symptom)
            symptoms.splice(index, 1)
            setMentalHealth([...symptoms])
        } else {
            setMentalHealth([...mentalHealth, symptom])
        }
    }

    const modifySubstances = (substance: string) => {
        if (substances.includes(substance)) {
            let s = substances
            let index = s.indexOf(substance)
            s.splice(index, 1)
            setSubstances([...s])
        } else {
            setSubstances([...substances, substance])
        }
    }

    const onSubmit = async () => {
        try {
            const token = await getToken()
            await axios.put(
                apiEndpoints.createEntry.insert(),
                {
                    user_id: userId, 
                    date,
                    mood: mood?.toString(),
                    bed_time: bedTime,
                    wake_up_time: wakeUpTime,
                    hours_sleep: hoursSleep?.toString(),
                    sleep_quality: sleepQuality,
                    affirmation: affirmation,
                    goal: goal,
                    mental_health: mentalHealth,
                    substances: substances,
                    entry_content: entryContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setSnackbarMessage("Successfully saved entry!")
            setSnackbarOpen(true)
        } catch(e) {
            console.log(e)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>Today's Entry</SubHeader>
                <SubHeader>{dateFull}</SubHeader>
                {!isLoading &&
                    <>
                        <MoodEntryComponent mood={mood} onChange={setMood} />
                        <SleepEntryComponent 
                            onBedTimeChange={setBedTime}
                            onWakeUpTimeChange={setWakeUpTime}
                            onSleepQualityChange={setSleepQuality}
                            bedTime={bedTime}
                            wakeUpTime={wakeUpTime}
                            sleepQuality={sleepQuality}
                            hoursSleep={hoursSleep}
                        />
                        <DailyAffirmationComponent affirmation={affirmation} onChange={setAffirmation} />
                        <DailyGoalComponent goal={goal} onChange={setGoal} />

                        <MentalHealthEntryComponent mentalHealth={[...mentalHealth]} onChange={modifyMentalHealth} />
                        <SubstanceEntryComponent substances={[...substances]} onChange={modifySubstances} />
                        <EntryComponent content={entryContent} onChange={setEntryContent} />

                        <SubmitContainer>
                            <SubmitButton onClick={onSubmit}>Save</SubmitButton>
                        </SubmitContainer>
                        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                            <Alert onClose={handleSnackbarClose} severity="success">
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                    </>
                }
                { isLoading && <LoadingComponent />}
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default withAuthenticationRequired(TodaysEntryPage)