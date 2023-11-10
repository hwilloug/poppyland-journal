import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import { unstable_useNumberInput as useNumberInput } from "@mui/base"
import { TextField } from "@mui/material"

const Container = styled.div``

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
    <Container>
      <SectionHeader>Exercise</SectionHeader>
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
    </Container>
  )
}

export default ExerciseEntryComponent
