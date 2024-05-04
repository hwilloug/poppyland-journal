import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"

interface DailyGoalProps {
  goal?: string
  onChange: Function
  setHasUnsavedChanges: Function
}

const DailyGoalComponent: React.FunctionComponent<DailyGoalProps> = ({
  goal,
  onChange,
  setHasUnsavedChanges,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Daily Goal
      </Typography>
      <MarkdownComponent
        view="edit"
        value={goal}
        onChange={(e: any) => {
          onChange(e)
          setHasUnsavedChanges(true)
        }}
        height={100}
        preview="edit"
      />
    </EntrySectionContainer>
  )
}

export default DailyGoalComponent
