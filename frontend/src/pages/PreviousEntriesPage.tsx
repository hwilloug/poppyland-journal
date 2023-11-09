import React, { useEffect, useState } from "react"
import SideBarComponent from "../components/shared-components/SideBar"
import {
  PageContainer,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import { SubHeader } from "../components/shared-components/styled-components"
import axios from "axios"
import { apiEndpoints } from "../api-endpoints"
import styled from "@emotion/styled"
import MarkdownComponent from "../components/shared-components/Markdown"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { getToken } from "../get-token"
import LoadingComponent from "../components/shared-components/Loading"
import { Link } from "react-router-dom"

const EntriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`

const MoodContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

const SleepContainer = styled.div`
  margin: 10px;
`

const MentalHealthContainer = styled.div`
  margin: 10px;
`

const SubstancesContainer = styled.div`
  margin: 10px;
`

const AffirmationsContainer = styled.div`
  margin: 20px 10px;
`

const GoalContainer = styled.div`
  margin: 20px 10px;
`

const DailyQuestionContainer = styled.div`
  margin: 20px 10px;
`

const EntryDate = styled.h3``

interface EntryType {
  date: string
  mood: string
  hours_sleep: string
  bed_time: string
  wake_up_time: string
  sleep_quality: string
  affirmation: string
  mental_health: string[]
  substances: string[]
  entry_content: string
  goal: string
  daily_question_q: string
  daily_question_a: string
}

const PreviousEntriesPage: React.FunctionComponent = () => {
  const { user } = useAuth0()
  const userId = user!.sub

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [entries, setEntries] = useState<EntryType[]>([])

  const getEntries = async () => {
    setIsLoading(true)
    try {
      const token = await getToken()
      const response = await axios.get(
        apiEndpoints.getEntries.insert({ userId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data: ResponseType[] = response.data
      setEntries(data as unknown as EntryType[])
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEntries()
    // eslint-disable-next-line
  }, [])

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "0":
        return <SentimentVeryDissatisfiedIcon color="error" />
      case "1":
        return <SentimentDissatisfiedIcon color="warning" />
      case "2":
        return <SentimentNeutralIcon color="info" />
      case "3":
        return <SentimentSatisfiedIcon color="success" />
      case "4":
        return <SentimentVerySatisfiedIcon style={{ color: "purple" }} />
    }
  }

  return (
    <PageContainer>
      <SideBarComponent />
      <PageContentContainer>
        <SubHeader>Previous Entries</SubHeader>
        <EntriesContainer>
          {!isLoading &&
            entries.map((entry) => (
              <div>
                <EntryDate>
                  {new Date(entry.date.replace(/-/g, "/")).toLocaleDateString(
                    "en-US",
                    { dateStyle: "full" },
                  )}
                </EntryDate>
                <MoodContainer>Mood: {getMoodIcon(entry.mood)}</MoodContainer>
                <SleepContainer>
                  Hours sleep: {entry.hours_sleep}
                </SleepContainer>
                <AffirmationsContainer>
                  Daily Affirmation:{" "}
                  <MarkdownComponent view="view" value={entry.affirmation} />
                </AffirmationsContainer>
                <GoalContainer>
                  Daily Goal:{" "}
                  <MarkdownComponent view="view" value={entry.goal} />
                </GoalContainer>
                <DailyQuestionContainer>
                  Daily Question: {entry.daily_question_q}
                  <MarkdownComponent
                    view="view"
                    value={entry.daily_question_a}
                  />
                </DailyQuestionContainer>
                <MentalHealthContainer>
                  Mental Health:{" "}
                  {entry.mental_health && entry.mental_health.join(", ")}
                </MentalHealthContainer>
                <SubstancesContainer>
                  Substances: {entry.substances && entry.substances.join(", ")}
                </SubstancesContainer>
                <MarkdownComponent view="view" value={entry.entry_content} />
                <Link to={`/edit/${entry.date}`}>Edit Entry</Link>
              </div>
            ))}
          {isLoading && <LoadingComponent />}
        </EntriesContainer>
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(PreviousEntriesPage)
