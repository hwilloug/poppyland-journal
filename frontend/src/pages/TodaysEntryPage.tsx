import React, { useEffect, useState } from 'react'
import SideBarComponent from '../components/SideBar'
import { PageContainer, PageContentContainer } from '../components/styled-components'
import { SubHeader } from '../components/styled-components'
import MarkdownComponent from '../components/Markdown'
import styled from '@emotion/styled'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs'
import { MenuItem, Select, Checkbox, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { apiEndpoints } from '../api-endpoints'
import { ResponseType } from './HomePage'



const SectionHeader = styled.h3`
    margin-top: 50px;
`

const SubmitContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`

const SubmitButton = styled.button`
    margin-top: 50px;
`

const MoodContainer = styled.div`
    display: flex;
    flex-direciton: row;
    gap: 10px;
`

const SleepTimeContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const SleepQualityContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    margin-top: 10px;
`

const MentalHealthContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 200px;
`

const MentalHealthItemContainer = styled.div`
    margin-right: 20px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
    const date = new Date().toISOString().split('T')[0]
    const dateFull = new Date().toLocaleDateString("en-US", { dateStyle: "full" })

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string>('')
    const [mood, setMood] = useState<number>()
    const [bedTime, setBedTime] = useState<Dayjs | null>()
    const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>()
    const [hoursSleep, setHoursSleep] = useState<number>()
    const [sleepQuality, setSleepQuality] = useState<string>()
    const [mentalHealth, setMentalHealth] = useState<string[]>([])
    const [entryContent, setEntryContent] = useState<string>()

    const getEntry = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                apiEndpoints.getEntry.insert({ userId: "test", date: date })
            )
            const data: ResponseType = response.data
            if (data) {
                setMood(parseInt(data.mood))
                setBedTime(dayjs(data.bed_time))
                setWakeUpTime(dayjs(data.wake_up_time))
                setHoursSleep(parseInt(data.hours_sleep))
                setSleepQuality(data.sleep_quality)
                setMentalHealth(data.mental_health)
                setEntryContent(data.entry_content)
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
            setHoursSleep(24 + wakeUpTime.diff(bedTime, 'hour'))
        }
    }, [bedTime, wakeUpTime])

    const modifyMentalHealth = (symptom: string) => {
        if (mentalHealth.includes(symptom)) {
            let symptoms = mentalHealth
            let index = symptoms.indexOf(symptom)
            symptoms.splice(index, 1)
            setMentalHealth(symptoms)
        } else {
            setMentalHealth([...mentalHealth, symptom])
        }
    }

    const onSubmit = async () => {
        try {
            await axios.put(
                apiEndpoints.createEntry.insert(),
                {
                    user_id: "test", 
                    date,
                    mood: mood?.toString(),
                    bed_time: bedTime,
                    wake_up_time: wakeUpTime,
                    hours_sleep: hoursSleep?.toString(),
                    sleep_quality: sleepQuality,
                    mental_health: mentalHealth,
                    entry_content: entryContent
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
                        <SectionHeader>Mood</SectionHeader>
                        <MoodContainer>
                            <SentimentVeryDissatisfiedIcon 
                                fontSize='large' 
                                color='error' 
                                style={mood === 0 ? {border: '1px solid black'} : {}}
                                onClick={() => {setMood(0)}}
                            />
                            <SentimentDissatisfiedIcon 
                                fontSize='large' 
                                color='warning' 
                                style={mood === 1 ? {border: '1px solid black'} : {}}
                                onClick={() => {setMood(1)}} 
                            />
                            <SentimentNeutralIcon 
                                fontSize='large' 
                                color='info' 
                                style={mood === 2 ? {border: '1px solid black'} : {}}
                                onClick={() => {setMood(2)}} 
                            />
                            <SentimentSatisfiedIcon 
                                fontSize='large' 
                                color='success' 
                                style={mood === 3 ? {border: '1px solid black'} : {}}
                                onClick={() => {setMood(3)}} 
                            />
                            <SentimentVerySatisfiedIcon 
                                fontSize='large' 
                                style={mood === 4 ? { color: 'purple', border: '1px solid black' } : { color: 'purple'}} 
                                onClick={() => {setMood(4)}}
                            />
                        </MoodContainer>

                        <SectionHeader>Sleep</SectionHeader>
                        <SleepTimeContainer>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* @ts-ignore */}
                                <TimePicker 
                                    label="Bedtime the night before" 
                                    value={bedTime} 
                                    onChange={(value) => setBedTime(value)} 
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                />
                                {/* @ts-ignore */}
                                <TimePicker 
                                    label="Wake-up time" 
                                    value={wakeUpTime} 
                                    onChange={(value) => setWakeUpTime(value)} 
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                />
                            </LocalizationProvider>
                            {bedTime && wakeUpTime &&
                                <p>{hoursSleep} hours sleep</p>
                            }
                        </SleepTimeContainer>
                        <SleepQualityContainer>
                            Sleep Quality:
                            <Select
                                value={sleepQuality}
                                name="Sleep Quality"
                                autoWidth={false}
                                style={{width: '200px'}}
                                onChange={(e) => setSleepQuality(e.target.value)}
                                sx={{ backgroundColor: 'white' }}
                            >
                                <MenuItem value="Good">Good</MenuItem>
                                <MenuItem value="Interrupted">Interrupted</MenuItem>
                                <MenuItem value="Bad">Bad</MenuItem>
                            </Select>
                        </SleepQualityContainer>

                        <SectionHeader>Mental Health</SectionHeader>
                        <MentalHealthContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes('Anxiety')} 
                                    onChange={() => {
                                        modifyMentalHealth("Anxiety")
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                /> Anxiety
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Depression")} 
                                    onChange={() => {
                                        modifyMentalHealth("Depression")
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                /> Depression
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Mania")} 
                                    onChange={() => {
                                        modifyMentalHealth("Mania")
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                /> Mania
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("No Focus")} 
                                    onChange={() => {
                                        modifyMentalHealth("No Focus")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> No Focus
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Hyper-fixation")} 
                                    onChange={() => {
                                        modifyMentalHealth("Hyper-fixation")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Hyper-fixation
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Irritability")} 
                                    onChange={() => {
                                        modifyMentalHealth("Irritability")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Irritability
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Paranoia")} 
                                    onChange={() => {
                                        modifyMentalHealth("Paranoia")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Paranoia
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Low Appetite")} 
                                    onChange={() => {
                                        modifyMentalHealth("Low Appetite")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Low Appetite
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Pressured Speech")} 
                                    onChange={() => {
                                        modifyMentalHealth("Pressured Speech")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Pressured Speech
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Sociability Up")} 
                                    onChange={() => {
                                        modifyMentalHealth("Sociability Up")
                                    }}
                                    sx={{ backgroundColor: 'white' }}
                                /> Sociability Up
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Sociability Down")} 
                                    onChange={() => {
                                        modifyMentalHealth("Sociability Down")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Sociability Down
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Libido Up")} 
                                    onChange={() => {
                                        modifyMentalHealth("Libido Up")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Libido Up
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Libido Down")} 
                                    onChange={() => {
                                        modifyMentalHealth("Libido Down")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Libido Down
                            </MentalHealthItemContainer>
                            <MentalHealthItemContainer>
                                <Checkbox 
                                    checked={mentalHealth.includes("Reckless Behavior")} 
                                    onChange={() => {
                                        modifyMentalHealth("Reckless Behavior")
                                    }} 
                                    sx={{ backgroundColor: 'white' }}
                                /> Reckless Behavior
                            </MentalHealthItemContainer>
                        </MentalHealthContainer>

                        <SectionHeader>Entry</SectionHeader>
                        <MarkdownComponent view='edit' value={entryContent} onChange={setEntryContent} />

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
                { isLoading && <>Loading...</>}
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default TodaysEntryPage