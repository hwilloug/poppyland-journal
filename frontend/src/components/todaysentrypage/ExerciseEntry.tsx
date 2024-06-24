import styled from "@emotion/styled"
import { TextField, Typography } from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

const ExerciseContainer = styled.div`
  text-align: center;
`

const InputLabel = styled.div``

interface ExerciseEntryProps {
  date: string
}

const ExerciseEntryComponent: React.FunctionComponent<ExerciseEntryProps> = ({
  date,
}) => {
  const minutesExercise = useSelector(
    (state: State) => state.journal.entries[date]?.exercise,
  )

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
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
          onChange={(e) => {
            journalActions.setExercise(date, e.target.value)
          }}
          sx={{ backgroundColor: "white", width: "150px" }}
        />
      </ExerciseContainer>
    </EntrySectionContainer>
  )
}

export default ExerciseEntryComponent
