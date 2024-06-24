import styled from "@emotion/styled"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"
import { State, journalActions } from "../../store"
import { useSelector } from "react-redux"

const MoodContainer = styled.div`
  display: flex;
  flex-direciton: row;
  gap: 10px;
  justify-content: center;
  svg {
    :hover {
      cursor: pointer;
    }
  }
`

interface MoodEntryProps {
  date: string
}

const MoodEntryComponent: React.FunctionComponent<MoodEntryProps> = ({
  date,
}) => {
  const mood = useSelector((state: State) => state.journal.entries[date]?.mood)

  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Mood
      </Typography>
      <MoodContainer>
        <SentimentVeryDissatisfiedIcon
          fontSize="large"
          color="error"
          style={
            mood === "0"
              ? { outline: "1px solid purple", borderRadius: "50%" }
              : {}
          }
          onClick={() => {
            journalActions.setMood(date, "0")
          }}
        />
        <SentimentDissatisfiedIcon
          fontSize="large"
          color="warning"
          style={
            mood === "1"
              ? { outline: "1px solid purple", borderRadius: "50%" }
              : {}
          }
          onClick={() => {
            journalActions.setMood(date, "1")
          }}
        />
        <SentimentNeutralIcon
          fontSize="large"
          color="info"
          style={
            mood === "2"
              ? { outline: "1px solid purple", borderRadius: "50%" }
              : {}
          }
          onClick={() => {
            journalActions.setMood(date, "2")
          }}
        />
        <SentimentSatisfiedIcon
          fontSize="large"
          color="success"
          style={
            mood === "3"
              ? { outline: "1px solid purple", borderRadius: "50%" }
              : {}
          }
          onClick={() => {
            journalActions.setMood(date, "3")
          }}
        />
        <SentimentVerySatisfiedIcon
          fontSize="large"
          style={
            mood === "4"
              ? {
                  color: "purple",
                  outline: "1px solid purple",
                  borderRadius: "50%",
                }
              : { color: "purple" }
          }
          onClick={() => {
            journalActions.setMood(date, "4")
          }}
        />
      </MoodContainer>
    </EntrySectionContainer>
  )
}

export default MoodEntryComponent
