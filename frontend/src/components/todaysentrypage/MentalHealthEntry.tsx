import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import CheckboxItemComponent from "../shared-components/CheckboxItem"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"

const MentalHealthContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 250px;
`

interface MentalHealthEntryProps {
  mentalHealth: string[]
  onChange: Function
}

const MentalHealthEntryComponent: React.FunctionComponent<
  MentalHealthEntryProps
> = ({ mentalHealth, onChange }) => {
  const mentalHealthSymptoms = [
    "Anxiety",
    "Depression",
    "Mania",
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

  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Mental Health & Behavior
      </Typography>
      <MentalHealthContainer>
        {mentalHealthSymptoms.map((s) => (
          <CheckboxItemComponent
            key={s}
            checked={mentalHealth.includes(s)}
            label={s}
            onChange={onChange}
          />
        ))}
      </MentalHealthContainer>
    </EntrySectionContainer>
  )
}

export default MentalHealthEntryComponent
