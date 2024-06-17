import MarkdownComponent from "../shared-components/Markdown"
import { EntrySectionContainer } from "../shared-components/styled-components"
import { Typography } from "@mui/material"

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
  }
}

interface DailyQuestionProps {
  date?: string
  question?: string
  answer?: string
  onChange: Function
  setQuestion: Function
}

const DailyQuestionComponent: React.FunctionComponent<DailyQuestionProps> = ({
  question,
  answer,
  onChange,
  date,
}) => {
  const day = date
    ? new Date(date?.replace(/-/g, "/")).getDay()
    : new Date().getDay()

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
          onChange(e)
        }}
        height={100}
        preview="edit"
      />
    </EntrySectionContainer>
  )
}

export default DailyQuestionComponent
