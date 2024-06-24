import { Typography } from "@mui/material"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import MarkdownComponent from "../shared-components/Markdown"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"

interface EntryProps {
  date: string
}

const EntryComponent: React.FunctionComponent<EntryProps> = ({ date }) => {
  const entryContent = useSelector(
    (state: State) => state.journal.entries[date]?.entryContent,
  )

  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Entry
      </Typography>
      <MarkdownComponent
        view="edit"
        value={entryContent}
        onChange={(e: any) => {
          journalActions.setEntryContent(date, e)
        }}
        height={500}
        preview={"edit"}
      />
    </EntrySectionContainer>
  )
}

export default EntryComponent
