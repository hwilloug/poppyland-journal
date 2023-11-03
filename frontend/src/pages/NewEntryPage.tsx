import React, { useState } from 'react'
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
import { Dayjs } from 'dayjs'
import { MenuItem, Select, Checkbox } from '@mui/material'



const SectionHeader = styled.h3`
`

const SubmitButton = styled.button`
`

const MoodContainer = styled.div`
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
`

const NewEntryPage: React.FunctionComponent = () => {
    const [mood, setMood] = useState<number>()
    const [bedTime, setBedTime] = useState<Dayjs | null>()
    const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>()
    const [sleepQuality, setSleepQuality] = useState<string>()
    const [entryContent, setEntryContent] = useState<string>()

    const date = new Date().toLocaleDateString("en-US", { dateStyle: "full" })

    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>New Entry</SubHeader>
                <SubHeader>{date}</SubHeader>

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
                        />
                    </LocalizationProvider>
                    {bedTime && wakeUpTime &&
                        <p>{24 + wakeUpTime.diff(bedTime, 'hour')} hours sleep</p>
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
                    >
                        <MenuItem value="Good">Good</MenuItem>
                        <MenuItem value="Interrupted">Interrupted</MenuItem>
                        <MenuItem value="Bad">Bad</MenuItem>
                    </Select>
                </SleepQualityContainer>

                <SectionHeader>Mental Health</SectionHeader>
                <MentalHealthContainer>
                    <Checkbox label="Anxiety" />
                    <Checkbox label="Depression" />
                    <Checkbox label="Mania" />
                    <Checkbox label="Hyper-fixation" />
                    <Checkbox label="Irritability" />
                    <Checkbox label="Paranoia" />
                    <Checkbox label="Low Appetite" />
                    <Checkbox label="Pressured Speech" />
                    <Checkbox label="Sociability Up" />
                    <Checkbox label="Sociability Down" />
                    <Checkbox label="Libido Up" />
                    <Checkbox label="Libido Down" />
                </MentalHealthContainer>

                <SectionHeader>Entry</SectionHeader>
                <MarkdownComponent view='edit' value={entryContent} onChange={setEntryContent} />

                <SubmitButton>Submit</SubmitButton>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default NewEntryPage