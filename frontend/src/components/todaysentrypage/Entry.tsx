import { Typography } from "@mui/material"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import MarkdownComponent from "../shared-components/Markdown"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

interface EntryProps {
  date: string
  timeOfDay: "Morning" | "Evening"
}

const EntryComponent: React.FunctionComponent<EntryProps> = ({
  date,
  timeOfDay,
}) => {
  const entryContent = useSelector(
    (state: State) => state.journal.entries[date]?.entryContent,
  )

  const morningEntryContent = useSelector(
    (state: State) => state.journal.entries[date]?.morningEntryContent,
  )

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Entry
      </Typography>
      <MarkdownComponent
        view="edit"
        value={timeOfDay === "Morning" ? morningEntryContent : entryContent}
        onChange={(e: any) => {
          timeOfDay === "Evening" && journalActions.setEntryContent(date, e)
          timeOfDay === "Morning" &&
            journalActions.setMorningEntryContent(date, e)
        }}
        height={500}
        preview={"edit"}
      />
    </EntrySectionContainer>
  )
}

export default EntryComponent
