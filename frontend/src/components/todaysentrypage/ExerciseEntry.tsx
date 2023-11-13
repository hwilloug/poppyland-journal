import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import { unstable_useNumberInput as useNumberInput } from "@mui/base"
import { TextField, Typography } from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"

const ExerciseContainer = styled.div``

const InputLabel = styled.div``

interface ExerciseEntryProps {
  minutesExercise: number
  onChange: Function
}

const ExerciseEntryComponent: React.FunctionComponent<ExerciseEntryProps> = ({
  minutesExercise,
  onChange,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Exercise
      </Typography>
      <ExerciseContainer>
        <TextField
          label="Minutes Exercise"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={minutesExercise}
          defaultValue={0}
          onChange={(e) => onChange(e.target.value)}
          sx={{ backgroundColor: "white", width: "150px" }}
        />
      </ExerciseContainer>
    </EntrySectionContainer>
  )
}

export default ExerciseEntryComponent
