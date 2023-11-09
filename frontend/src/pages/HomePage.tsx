import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import SideBarComponent from "../components/shared-components/SideBar"
import MoodTrackerComponent, {
  MoodDataType,
} from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"
import SleepTrackerComponent from "../components/homepage/SleepTracker"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { getProfile } from "../utils/get-profile"

const PageContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
`

const HomePageContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  background-color: #fffcf5;
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
  const [sleepData, setSleepData] = useState<DataType>({})

  const getEntries = async () => {
    setIsLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(
        apiEndpoints.getEntries.insert(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data: ResponseType[] = response.data
      let dates = []
      let moods: MoodDataType[] = []
      let sleepTimes: DataType = {}
      for (let i = 0; i < data.length; i++) {
        dates.push(data[i]["date"])
        moods.push({
          date: new Date(data[i]["date"].replace(/-/g, "/")).valueOf(),
          mood: parseInt(data[i]["mood"]),
        })
        sleepTimes[data[i]["date"]] = parseInt(data[i]["hours_sleep"])
      }
      setEntryDates(dates)
      setMoodData(moods)
      setSleepData(sleepTimes)
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getEntries()
    // eslint-disable-next-line
  }, [])

  return (
    <PageContainer>
      <SideBarComponent />
      {!isLoading && (
        <HomePageContainer>
          {preferences.showMood && <MoodTrackerComponent moodData={moodData} />}
          {preferences.showSleep && (
            <SleepTrackerComponent sleepData={sleepData} />
          )}
          <PreviousEntriesListComponent dates={entryDates} />
        </HomePageContainer>
      )}
      {isLoading && <LoadingComponent />}
    </PageContainer>
  )
}

export default withAuthenticationRequired(HomePage)
