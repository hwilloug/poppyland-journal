import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import { Typography } from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"

interface DailyAffirmationProps {
  affirmation?: string
  onChange: Function
  setHasUnsavedChanges: Function
}

const DailyAffirmationComponent: React.FunctionComponent<
  DailyAffirmationProps
> = ({ affirmation, onChange, setHasUnsavedChanges }) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Daily Affirmation
      </Typography>
      <MarkdownComponent
        view="edit"
        value={affirmation}
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

export default DailyAffirmationComponent
