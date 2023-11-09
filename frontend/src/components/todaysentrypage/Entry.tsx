import { SectionHeader } from "../../pages/TodaysEntryPage"
import MarkdownComponent from "../shared-components/Markdown"

interface EntryProps {
  content?: string
  onChange: Function
}

const EntryComponent: React.FunctionComponent<EntryProps> = ({
  content,
  onChange,
}) => {
  return (
    <>
      <SectionHeader>Entry</SectionHeader>
      <MarkdownComponent
        view="edit"
        value={content}
        onChange={onChange}
        height={500}
      />
    </>
  )
}

export default EntryComponent
