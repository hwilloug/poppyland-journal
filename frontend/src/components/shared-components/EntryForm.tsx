import { useAuth0 } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"
import { apiEndpoints } from "../../api-endpoints"
import axios from "axios"
import { ResponseType } from "../../pages/HomePage"
import MoodEntryComponent from "../todaysentrypage/MoodEntry"
import SleepEntryComponent from "../todaysentrypage/SleepEntry"
import DailyAffirmationComponent from "../todaysentrypage/DailyAffirmation"
import DailyGoalComponent from "../todaysentrypage/DailyGoal"
import DailyQuestionComponent from "../todaysentrypage/DailyQuestion"
import MentalHealthEntryComponent from "../todaysentrypage/MentalHealthEntry"
import SubstanceEntryComponent from "../todaysentrypage/SubstanceEntry"
import EntryComponent from "../todaysentrypage/Entry"
import { SubHeader, SubmitButton } from "./styled-components"
import { Alert, Snackbar } from "@mui/material"
import { Link } from "react-router-dom"
import LoadingComponent from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../../store"
import { getProfile } from "../../utils/get-profile"

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const MedicationsContainer = styled.div`
  margin: 20px;
`

interface EntryFormProps {
  date: string
}

const EntryForm: React.FunctionComponent<EntryFormProps> = ({ date }) => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const dateFull = new Date(date.replace(/-/g, "/")).toLocaleDateString(
    "en-US",
    { dateStyle: "full" },
  )

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [mood, setMood] = useState<number>()
  const [bedTime, setBedTime] = useState<Dayjs | null>()
  const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>()
  const [hoursSleep, setHoursSleep] = useState<number>()
  const [sleepQuality, setSleepQuality] = useState<string>()
  const [affirmation, setAffirmation] = useState<string>()
  const [goal, setGoal] = useState<string>()
  const [mentalHealth, setMentalHealth] = useState<string[]>([])
  const [substances, setSubstances] = useState<string[]>([])
  const [entryContent, setEntryContent] = useState<string>()
  const [dailyQuestionQ, setDailyQuestionQ] = useState<string>()
  const [dailyQuestionA, setDailyQuestionA] = useState<string>()
  const [currentMedications, setCurrentMedications] = useState<string[]>([])

  const getEntry = async () => {
    setIsLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(
        apiEndpoints.getEntry.insert({ date: date }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data: ResponseType = response.data
      if (data) {
        setMood(parseInt(data.mood))
        setBedTime(dayjs(data.bed_time))
        setWakeUpTime(dayjs(data.wake_up_time))
        setHoursSleep(parseInt(data.hours_sleep))
        setSleepQuality(data.sleep_quality)
        setMentalHealth(data.mental_health || [])
        setEntryContent(data.entry_content)
        setSubstances(data.substances || [])
        setAffirmation(data.affirmation)
        setGoal(data.goal)
        setDailyQuestionA(data.daily_question_a)
        setDailyQuestionQ(data.daily_question_q)
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  const getCurrentMedications = async () => {
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(
        apiEndpoints.getMedications.insert({ date: date }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data = response.data
      let currentMeds = []
      if (data) {
        for (let i = 0; i < data.length; i++) {
          !data[i].end_data && currentMeds.push(data[i].medication_name)
        }
        setCurrentMedications([...currentMeds])
      }
      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getEntry()
    getCurrentMedications()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (bedTime && wakeUpTime) {
      let s = wakeUpTime.diff(bedTime, "minute")
      s = s / 24
      if (s < 0) {
        s = s + 24
      }
      setHoursSleep(s)
    }
  }, [bedTime, wakeUpTime])

  const modifyMentalHealth = (symptom: string) => {
    if (mentalHealth.includes(symptom)) {
      let symptoms = mentalHealth
      let index = symptoms.indexOf(symptom)
      symptoms.splice(index, 1)
      setMentalHealth([...symptoms])
    } else {
      setMentalHealth([...mentalHealth, symptom])
    }
  }

  const modifySubstances = (substance: string) => {
    if (substances.includes(substance)) {
      let s = substances
      let index = s.indexOf(substance)
      s.splice(index, 1)
      setSubstances([...s])
    } else {
      setSubstances([...substances, substance])
    }
  }

  const onSubmit = async () => {
    try {
      const token = await getAccessTokenSilently()
      await axios.put(
        apiEndpoints.createEntry.insert(),
        {
          user_id: userId,
          date,
          mood: mood ? mood.toString() : null,
          bed_time: bedTime,
          wake_up_time: wakeUpTime,
          hours_sleep: hoursSleep ? hoursSleep.toString() : null,
          sleep_quality: sleepQuality,
          affirmation: affirmation,
          goal: goal,
          mental_health: mentalHealth,
          substances: substances,
          entry_content: entryContent,
          daily_question_q: dailyQuestionQ,
          daily_question_a: dailyQuestionA,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setSnackbarMessage("Successfully saved entry!")
      setSnackbarOpen(true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <SubHeader>{dateFull}</SubHeader>
      {preferences.showMood && (
        <MoodEntryComponent mood={mood} onChange={setMood} />
      )}
      {preferences.showSleep && (
        <SleepEntryComponent
          onBedTimeChange={setBedTime}
          onWakeUpTimeChange={setWakeUpTime}
          onSleepQualityChange={setSleepQuality}
          bedTime={bedTime}
          wakeUpTime={wakeUpTime}
          sleepQuality={sleepQuality}
          hoursSleep={hoursSleep}
        />
      )}
      {preferences.showDailyAffirmation && (
        <DailyAffirmationComponent
          affirmation={affirmation}
          onChange={setAffirmation}
        />
      )}
      {preferences.showDailyAffirmation && (
        <DailyGoalComponent goal={goal} onChange={setGoal} />
      )}
      {preferences.showDailyQuestion && (
        <DailyQuestionComponent
          question={dailyQuestionQ}
          answer={dailyQuestionA}
          onChange={setDailyQuestionA}
          setQuestion={setDailyQuestionQ}
          date={date}
        />
      )}

      {preferences.showMentalHealth && (
        <MentalHealthEntryComponent
          mentalHealth={[...mentalHealth]}
          onChange={modifyMentalHealth}
        />
      )}
      {preferences.showSubstance && (
        <SubstanceEntryComponent
          substances={[...substances]}
          onChange={modifySubstances}
        />
      )}
      <EntryComponent content={entryContent} onChange={setEntryContent} />

      {currentMedications.length && (
        <MedicationsContainer>
          Current Medications: {currentMedications.join(", ")}{" "}
          <Link to="/medications">(Edit)</Link>
        </MedicationsContainer>
      )}

      <SubmitContainer>
        <SubmitButton onClick={onSubmit}>Save</SubmitButton>
      </SubmitContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EntryForm
