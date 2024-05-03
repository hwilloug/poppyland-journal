import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import SideBarComponent from "../components/shared-components/SideBar"
import MoodTrackerComponent, {
  MoodDataType,
} from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"
import SleepTrackerComponent, {
  SleepDataType,
} from "../components/homepage/SleepTracker"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { getProfile } from "../utils/get-profile"
import ExerciseTrackerComponent, {
  ExerciseDataType,
} from "../components/homepage/ExerciseTracker"
import { Paper, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { convertToShortDate } from "../utils/date-utils"

const PageContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
`

const HomePageContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  background-color: #fffcf5;
  max-width: 100%;
`

const DailyAffiramtionContainer = styled(Paper)`
  background-color: ${deepPurple[500]};
  margin: 20px;
  padding: 20px;
  color: white;
  text-align: center;
`

export interface ResponseType {
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
  exercise: string
}

interface DataType {
  [date: string]: number
}

const HomePage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [entryDates, setEntryDates] = useState<string[]>([])
  const [moodData, setMoodData] = useState<MoodDataType[]>([])
  const [sleepData, setSleepData] = useState<SleepDataType[]>([])
  const [exerciseData, setExerciseData] = useState<ExerciseDataType[]>([])
  const [dailyAffirmation, setDailyAffirmation] = useState("")

  const getEntries = async () => {
    setIsLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(apiEndpoints.getEntries.insert(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: ResponseType[] = response.data
      let dates = []
      let moods: MoodDataType[] = []
      let sleep: SleepDataType[] = []
      let exercise: ExerciseDataType[] = []
      for (let i = 0; i < data.length; i++) {
        const date = data[i]["date"]
        dates.push(date)
        if (date === convertToShortDate(new Date())) {
          setDailyAffirmation(data[i].affirmation)
        }
        moods.push({
          date: new Date(date.replace(/-/g, "/")).valueOf(),
          mood: parseInt(data[i]["mood"]),
        })
        sleep.push({
          date: new Date(date.replace(/-/g, "/")).valueOf(),
          hoursSleep: parseFloat(data[i]["hours_sleep"]),
        })
        exercise.push({
          date: new Date(date.replace(/-/g, "/")).valueOf(),
          minutesExercise: parseInt(data[i]["exercise"]),
        })
      }
      setEntryDates(dates)
      setMoodData(moods)
      setSleepData(sleep)
      setExerciseData(exercise)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEntries()
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <HomePageContainer>
      {preferences.showDailyAffirmation && dailyAffirmation && (
        <DailyAffiramtionContainer>
          <Typography>
            Daily Affirmation:
            <br />
            {dailyAffirmation}
          </Typography>
        </DailyAffiramtionContainer>
      )}
      {preferences.showMood && <MoodTrackerComponent moodData={moodData} />}
      {preferences.showSleep && <SleepTrackerComponent sleepData={sleepData} />}
      {preferences.showExercise && (
        <ExerciseTrackerComponent data={exerciseData} />
      )}
      <PreviousEntriesListComponent dates={entryDates} />
    </HomePageContainer>
  )
}

export default withAuthenticationRequired(HomePage)
