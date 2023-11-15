import { Typography } from "@mui/material"
import { SectionHeader } from "../../pages/TodaysEntryPage"
import MarkdownComponent from "../shared-components/Markdown"
import { EntrySectionContainer } from "../shared-components/styled-components"

interface EntryProps {
  content?: string
  onChange: Function
}

const EntryComponent: React.FunctionComponent<EntryProps> = ({
  content,
  onChange,
}) => {
  return (
    <EntrySectionContainer>
      <Typography variant="h6" sx={{ mb: "20px" }}>
        Entry
      </Typography>
      <MarkdownComponent
        view="edit"
        value={content}
        onChange={onChange}
        height={500}
        preview={"live"}
      />
    </EntrySectionContainer>
  )
}

export default EntryComponent
