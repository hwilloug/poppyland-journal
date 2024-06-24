import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import { Typography } from "@mui/material"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

interface DailyAffirmationProps {
  date: string
}

const DailyAffirmationComponent: React.FunctionComponent<
  DailyAffirmationProps
> = ({ date }) => {
  const affirmation = useSelector(
    (state: State) => state.journal.entries[date]?.affirmation,
  )

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Daily Affirmation
      </Typography>
      <MarkdownComponent
        view="edit"
        value={affirmation}
        onChange={(e: any) => {
          journalActions.setAffirmation(date, e)
        }}
        height={100}
        preview="edit"
      />
    </EntrySectionContainer>
  )
}

export default DailyAffirmationComponent
