import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"



const AffirmationsContainer = styled.div``

interface DailyGoalProps {
    goal?: string
    onChange: Function
}

const DailyGoalComponent: React.FunctionComponent<DailyGoalProps> = ({ goal, onChange }) => {
    return (
        <AffirmationsContainer>
            <SectionHeader>Daily Goal</SectionHeader>
            <MarkdownComponent view='edit' value={goal} onChange={onChange} height={75} hideToolbar editMode />
        </AffirmationsContainer>
    )
}

export default DailyGoalComponent