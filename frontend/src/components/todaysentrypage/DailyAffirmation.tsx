import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"

const AffirmationsContainer = styled.div``

interface DailyAffirmationProps {
  affirmation?: string
  onChange: Function
}

const DailyAffirmationComponent: React.FunctionComponent<
  DailyAffirmationProps
> = ({ affirmation, onChange }) => {
  return (
    <AffirmationsContainer>
      <SectionHeader>Daily Affirmation</SectionHeader>
      <MarkdownComponent
        view="edit"
        value={affirmation}
        onChange={onChange}
        hideToolbar
        height={75}
        preview="edit"
      />
    </AffirmationsContainer>
  )
}

export default DailyAffirmationComponent
