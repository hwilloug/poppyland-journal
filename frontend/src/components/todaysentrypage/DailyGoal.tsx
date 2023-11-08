import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"



const GoalsContainer = styled.div``

interface DailyGoalProps {
    goal?: string
    onChange: Function
}

const DailyGoalComponent: React.FunctionComponent<DailyGoalProps> = ({ goal, onChange }) => {
    return (
        <GoalsContainer>
            <SectionHeader>Daily Goal</SectionHeader>
            <MarkdownComponent view='edit' value={goal} onChange={onChange} height={75} hideToolbar editMode />
        </GoalsContainer>
    )
}

export default DailyGoalComponent