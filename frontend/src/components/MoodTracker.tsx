import React from 'react';
import styled from '@emotion/styled'
import { SubHeader } from './styled-components'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'

const Container = styled.div`
`

export type MoodDataType = {
    date: number,
    mood: number
}

interface MoodTrackerProps {
    moodData: MoodDataType[]
}

const MoodTrackerComponent: React.FunctionComponent<MoodTrackerProps> = ({ moodData }) => {

    const today = (new Date()).valueOf()
    const thirtyDaysAgo = (new Date(new Date().setDate(new Date().getDate() - 30))).valueOf()

    const renderCustomAxisTick = ({ y }: { y: number }) => {      
        switch (y) {
            case 0:
                return <SentimentVeryDissatisfiedIcon color='error' />
            default:
                return <SentimentVerySatisfiedIcon style={{color: 'purple'}} />;
        }
    }
    
    return (
        <Container>
            <SubHeader>Mood Tracker - Last 30 days</SubHeader>
            <LineChart width={900} height={300} data={moodData}>
                <Line
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#8d5bc1" 
                    dot={{ stroke: '#8d5bc1', strokeWidth: 7, r: 4}}
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                    dataKey="date"
                    type='number'
                    domain={[thirtyDaysAgo, today]}
                    includeHidden
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        const months = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ]
                        return `${months[date.getMonth()]} ${date.getDate()}`
                    }}
                />
                <YAxis domain={[0,4]} includeHidden />
            </LineChart>
        </Container>
    )
  
}
  
export default MoodTrackerComponent