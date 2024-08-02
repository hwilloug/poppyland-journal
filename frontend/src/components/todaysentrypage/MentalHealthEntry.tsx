import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import CheckboxItemComponent from "../shared-components/CheckboxItem"
import { EntrySectionContainer } from "../shared-components/styled-components"
import {
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material"
import { ReactNode } from "react"
import { State, journalActions } from "../../store"
import { useSelector } from "react-redux"

const MentalHealthContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 400px;
`

export const mentalHealthSymptoms = [
  "Anxiety",
  "Avoidance",
  "Depression",
  "Hypomania",
  "No Focus",
  "Hyper-fixation",
  "Irritability",
  "Paranoia",
  "Low Appetite",
  "Food Restriction",
  "Pressured Speech",
  "Sociability Up",
  "Sociability Down",
  "Libido Up",
  "Libido Down",
  "Reckless Behavior",
  "Fatigue",
  "Illusions of Grandeur",
  "Low Self-Esteem",
  "Reckless Spending",
  "Suicidal Ideation",
]

interface MentalHealthEntryProps {
  date: string
}

const MentalHealthEntryComponent: React.FunctionComponent<
  MentalHealthEntryProps
> = ({ date }) => {
  const mentalHealth = useSelector(
    (state: State) => state.journal.entries[date]?.mentalHealth,
  )

  const modifyMentalHealth = (
    event: SelectChangeEvent<string[]>,
    child: ReactNode,
  ) => {
    const symptoms = event.target.value
    journalActions.setMentalHealth(date, [...symptoms])
  }

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Mental Health & Behavior
      </Typography>
      <MentalHealthContainer>
        <Select
          multiple
          value={mentalHealth || []}
          onChange={(e, child) => {
            modifyMentalHealth(e, child)
          }}
          sx={{ backgroundColor: "#e0f0bb" }}
        >
          {mentalHealthSymptoms.map((s) => (
            <MenuItem value={s}>{s}</MenuItem>
          ))}
        </Select>
      </MentalHealthContainer>
    </EntrySectionContainer>
  )
}

export default MentalHealthEntryComponent
