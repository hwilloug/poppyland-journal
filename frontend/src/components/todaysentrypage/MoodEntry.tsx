import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"

const MoodContainer = styled.div`
  display: flex;
  flex-direciton: row;
  gap: 10px;
`

interface MoodEntryProps {
  mood?: number
  onChange: Function
}

const MoodEntryComponent: React.FunctionComponent<MoodEntryProps> = ({
  mood,
  onChange,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Mood
      </Typography>
      <MoodContainer>
        <SentimentVeryDissatisfiedIcon
          fontSize="large"
          color="error"
          style={mood === 0 ? { border: "1px solid black" } : {}}
          onClick={() => {
            onChange(0)
          }}
        />
        <SentimentDissatisfiedIcon
          fontSize="large"
          color="warning"
          style={mood === 1 ? { border: "1px solid black" } : {}}
          onClick={() => {
            onChange(1)
          }}
        />
        <SentimentNeutralIcon
          fontSize="large"
          color="info"
          style={mood === 2 ? { border: "1px solid black" } : {}}
          onClick={() => {
            onChange(2)
          }}
        />
        <SentimentSatisfiedIcon
          fontSize="large"
          color="success"
          style={mood === 3 ? { border: "1px solid black" } : {}}
          onClick={() => {
            onChange(3)
          }}
        />
        <SentimentVerySatisfiedIcon
          fontSize="large"
          style={
            mood === 4
              ? { color: "purple", border: "1px solid black" }
              : { color: "purple" }
          }
          onClick={() => {
            onChange(4)
          }}
        />
      </MoodContainer>
    </EntrySectionContainer>
  )
}

export default MoodEntryComponent
