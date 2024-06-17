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

const MentalHealthContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 400px;
`

export const mentalHealthSymptoms = [
  "Anxiety",
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
  mentalHealth: string[]
  onChange: (event: SelectChangeEvent<string[]>, child: ReactNode) => void
}

const MentalHealthEntryComponent: React.FunctionComponent<
  MentalHealthEntryProps
> = ({ mentalHealth, onChange }) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Mental Health & Behavior
      </Typography>
      <MentalHealthContainer>
        <Select
          multiple
          value={mentalHealth}
          onChange={(e, child) => {
            onChange(e, child)
          }}
          sx={{ backgroundColor: "white" }}
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
