import { useSelector } from "react-redux"
import { convertToDateObject } from "../../utils/date-utils"
import MarkdownComponent from "../shared-components/Markdown"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"
import { State, journalActions } from "../../store"

export const getQuestion = (day: number) => {
  switch (day) {
    case 0: // Sunday
      return "Say something positive about yourself."
    case 1: // Monday
      return "Are you taking care of your basic needs? How can you improve?"
    case 2: // Tuesday
      return "Are you avoiding anything right now?"
    case 3: // Wednesday
      return "What's something you're looking forward to?"
    case 4: // Thursday
      return "Are you taking anything for granted? What are you grateful for?"
    case 5: // Friday
      return "What are you doing for self-care?"
    case 6: // Saturday
      return "What was hard for you this week?"
    case 7:
      return "What's one thing that you can let go of that's not serving you?"
    case 8:
      return "What accomplishment can you celebrate today?"
    case 9:
      return "What is one thing you need to forgive?"
    case 10:
      return "Describe a perfect day."
    case 11:
      return "What are some positive habits that you can start?"
    case 12:
      return "What are your top priorities?"
    case 13:
      return "What do you love most about your life?"
    case 14:
      return "Give yourself a compliment."
    case 15:
      return "What's something you're insecure of, and how can you overcome it?"
    case 16:
      return "How can you be kind to yourself in moments of failure?"
    case 17:
      return "What is something that brings you joy?"
    case 18:
      return "Do you feel fufilled at work? How can you improve?"
    case 19:
      return "What made you smile today?"
    case 20:
      return "Who is someone you admire?"
    case 21:
      return "How can you show more kindness and compassion to yourself?"
    case 22:
      return "How is your self-talk, and how can you make it more positive?"
    case 23:
      return "How can you be a better friend?"
    case 24:
      return "What is one way to break out of your comfort zone?"
    case 25:
      return "Describe the last time you felt beautiful/handsome?"
    case 26:
      return "What are some boundaries you have, and how are you upholding them?"
    case 27:
      return "What is one small act of kindness you can do today?"
    case 28:
      return "How can you be more present in your daily life?"
    case 29:
      return "Do you need to apologize for anything?"
    case 30:
      return "What's something you are learning?"
    case 31:
      return "Is there any place where you can improve your leadership?"
  }
}

interface DailyQuestionProps {
  date: string
}

const DailyQuestionComponent: React.FunctionComponent<DailyQuestionProps> = ({
  date,
}) => {
  const question = useSelector(
    (state: State) => state.journal.entries[date]?.dailyQuestionQ,
  )
  const answer = useSelector(
    (state: State) => state.journal.entries[date]?.dailyQuestionA,
  )
  return (
    <EntrySectionContainer>
      <Typography variant="h6" textAlign={"center"} sx={{ mb: "20px" }}>
        Daily Question
      </Typography>
      <Typography textAlign={"center"}>{question}</Typography>
      <MarkdownComponent
        view="edit"
        value={answer}
        onChange={(e: any) => {
          journalActions.setDailyQuestionA(date, e)
        }}
        height={100}
        preview="edit"
      />
    </EntrySectionContainer>
  )
}

export default DailyQuestionComponent
