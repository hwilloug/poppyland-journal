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
import { Dayjs } from 'dayjs'
import { MenuItem, Select, Checkbox } from '@mui/material'



const SectionHeader = styled.h3`
    margin-top: 50px;
`

const SubmitButton = styled.button`
    margin-top: 50px;
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
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 200px;
`

const MentalHealthItemContainer = styled.div`
    margin-right: 20px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
    const [mood, setMood] = useState<number>()
    const [bedTime, setBedTime] = useState<Dayjs | null>()
    const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>()
    const [sleepQuality, setSleepQuality] = useState<string>()
    const [mentalHealth, setMentalHealth] = useState<string[]>([])
    const [entryContent, setEntryContent] = useState<string>()

    const modifyMentalHealth = (symptom: string) => {
        console.log(mentalHealth)
        if (mentalHealth.includes(symptom)) {
            let symptoms = mentalHealth
            let index = symptoms.indexOf(symptom)
            symptoms.splice(index, 1)
            setMentalHealth(symptoms)
        } else {
            setMentalHealth([...mentalHealth, symptom])
        }
    }

    const [anxietyChecked, setAnxietyChecked] = useState<boolean>(mentalHealth.includes("Anxiety"))
    const [depressionChecked, setDepressionChecked] = useState<boolean>(mentalHealth.includes("Depression"))
    const [maniaChecked, setManiaChecked] = useState<boolean>(mentalHealth.includes("Mania"))
    const [hyperFixationChecked, setHyperFixationChecked] = useState<boolean>(mentalHealth.includes("Hyper-fixation"))
    const [irritabilityChecked, setIrritabilityChecked] = useState<boolean>(mentalHealth.includes("Irritability"))
    const [paranoiaChecked, setParanoiaChecked] = useState<boolean>(mentalHealth.includes("Paranoia"))
    const [lowAppetiteChecked, setLowAppetiteChecked] = useState<boolean>(mentalHealth.includes("Low Appetite"))
    const [pressuredSpeechChecked, setPressuredSpeechChecked] = useState<boolean>(mentalHealth.includes("Pressured Speech"))
    const [sociabilityUpChecked, setSociabilityUpChecked] = useState<boolean>(mentalHealth.includes("Sociability Up"))
    const [sociabilityDownChecked, setSociabilityDownChecked] = useState<boolean>(mentalHealth.includes("Sociability Down"))
    const [libidoUpChecked, setLibidoUpChecked] = useState<boolean>(mentalHealth.includes("Libido Up"))
    const [libidoDownChecked, setLibidoDownChecked] = useState<boolean>(mentalHealth.includes("Libido Down"))

    const date = new Date().toLocaleDateString("en-US", { dateStyle: "full" })

    return (
        <PageContainer>
            <SideBarComponent />
            <PageContentContainer>
                <SubHeader>Today's Entry</SubHeader>
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
                            checked={anxietyChecked} 
                            onChange={() => {
                                modifyMentalHealth("Anxiety")
                                setAnxietyChecked(!anxietyChecked)
                            }}
                            sx={{ backgroundColor: 'white' }}
                        /> Anxiety
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={depressionChecked} 
                            onChange={() => {
                                modifyMentalHealth("Depression")
                                setDepressionChecked(!depressionChecked)
                            }}
                            sx={{ backgroundColor: 'white' }}
                        /> Depression
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={maniaChecked} 
                            onChange={() => {
                                modifyMentalHealth("Mania")
                                setManiaChecked(!maniaChecked)
                            }}
                            sx={{ backgroundColor: 'white' }}
                        /> Mania
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={hyperFixationChecked} 
                            onChange={() => {
                                modifyMentalHealth("Hyper-fixation")
                                setHyperFixationChecked(!hyperFixationChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Hyper-fixation
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={irritabilityChecked} 
                            onChange={() => {
                                modifyMentalHealth("Irritability")
                                setIrritabilityChecked(!irritabilityChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Irritability
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={paranoiaChecked} 
                            onChange={() => {
                                modifyMentalHealth("Paranoia")
                                setParanoiaChecked(!paranoiaChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Paranoia
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={lowAppetiteChecked} 
                            onChange={() => {
                                modifyMentalHealth("Low Appetite")
                                setLowAppetiteChecked(!lowAppetiteChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Low Appetite
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={pressuredSpeechChecked} 
                            onChange={() => {
                                modifyMentalHealth("Pressured Speech")
                                setPressuredSpeechChecked(!pressuredSpeechChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Pressured Speech
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={sociabilityUpChecked} 
                            onChange={() => {
                                modifyMentalHealth("Sociability Up")
                                setSociabilityUpChecked(!sociabilityUpChecked)
                            }}
                            sx={{ backgroundColor: 'white' }}
                        /> Sociability Up
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={sociabilityDownChecked} 
                            onChange={() => {
                                modifyMentalHealth("Sociability Down")
                                setSociabilityDownChecked(!sociabilityDownChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Sociability Down
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={libidoUpChecked} 
                            onChange={() => {
                                modifyMentalHealth("Libido Up")
                                setLibidoUpChecked(!libidoUpChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Libido Up
                    </MentalHealthItemContainer>
                    <MentalHealthItemContainer>
                        <Checkbox 
                            checked={libidoDownChecked} 
                            onChange={() => {
                                modifyMentalHealth("Libido Down")
                                setLibidoDownChecked(!libidoDownChecked)
                            }} 
                            sx={{ backgroundColor: 'white' }}
                        /> Libido Down
                    </MentalHealthItemContainer>
                </MentalHealthContainer>

                <SectionHeader>Entry</SectionHeader>
                <MarkdownComponent view='edit' value={entryContent} onChange={setEntryContent} />

                <SubmitButton>Submit</SubmitButton>
            </PageContentContainer>
        </PageContainer>
    )
  
}
  
export default TodaysEntryPage