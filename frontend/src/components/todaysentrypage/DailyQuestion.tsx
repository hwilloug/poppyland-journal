import styled from "@emotion/styled"
import MarkdownComponent from "../shared-components/Markdown"
import { SectionHeader } from "../../pages/TodaysEntryPage"



const DailyQuestionContainer = styled.div``

const QuestionContainer = styled.div``

interface DailyQuestionProps {
    date?: string
    question?: string
    answer?: string
    onChange: Function
    setQuestion: Function
}

const DailyQuestionComponent: React.FunctionComponent<DailyQuestionProps> = ({ question, answer, onChange, setQuestion, date }) => {
    const day = date ? new Date(date?.replace(/-/g, '\/')).getDay(): new Date().getDay()
    let todaysQuestion
    switch (day) {
        case 0: // Sunday
            todaysQuestion = "Say something positive about yourself."
            break
        case 1: // Monday
            todaysQuestion = "Are you taking care of your basic needs? How can you improve?"
            break
        case 2: // Tuesday
            todaysQuestion = "Are you avoiding anything right now?"
            break
        case 3: // Wednesday
            todaysQuestion = "What's something you're looking forward to?"
            break
        case 4: // Thursday
            todaysQuestion = "Are you taking anything for granted? What are you grateful for?"
            break
        case 5: // Friday
            todaysQuestion = "What are you doing for self-care?"
            break
        case 6: // Saturday
            todaysQuestion = "What was hard for you this week?"
            break
    }
    if (question === undefined || question === null) {
        setQuestion(todaysQuestion)
    }

    return (
        <DailyQuestionContainer>
            <SectionHeader>Daily Question</SectionHeader>
            <QuestionContainer>{question}</QuestionContainer>
            <MarkdownComponent view='edit' value={answer} onChange={onChange} height={100} hideToolbar editMode />
        </DailyQuestionContainer>
    )
}

export default DailyQuestionComponent