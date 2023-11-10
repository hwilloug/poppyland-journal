import styled from "@emotion/styled"
import { SectionHeader } from "../../pages/TodaysEntryPage"

const Container = styled.div``

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
    </Container>
  )
}

export default ExerciseEntryComponent
