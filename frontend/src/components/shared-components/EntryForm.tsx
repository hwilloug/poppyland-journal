import { useAuth0 } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import dayjs, { Dayjs } from "dayjs"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { apiEndpoints } from "../../api-endpoints"
import axios from "axios"
import { EntryResponseType } from "../../server/get-entries-api"
import MoodEntryComponent from "../todaysentrypage/MoodEntry"
import SleepEntryComponent from "../todaysentrypage/SleepEntry"
import DailyAffirmationComponent from "../todaysentrypage/DailyAffirmation"
import DailyGoalComponent from "../todaysentrypage/DailyGoal"
import DailyQuestionComponent from "../todaysentrypage/DailyQuestion"
import MentalHealthEntryComponent from "../todaysentrypage/MentalHealthEntry"
import SubstanceEntryComponent from "../todaysentrypage/SubstanceEntry"
import EntryComponent from "../todaysentrypage/Entry"
import {
  Alert,
  Button,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material"
import LoadingComponent from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { getProfile } from "../../utils/get-profile"
import ExerciseEntryComponent from "../todaysentrypage/ExerciseEntry"
import { FormPrompt } from "./FormPrompt"
import { JournalEntry } from "../../types/journal-types"

const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  bottom: 50px;
  right: 50px;
  position: fixed;
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

  const entries = useSelector((state: State) => state.journal.entries)
  const isLoading = useSelector((state: State) => state.journal.isLoading)
  const loadedEntry: JournalEntry = useMemo(() => {
    if (Object.keys(entries).includes(date)) {
      return entries[date]
    } else {
      return {
        date,
        mood: undefined,
        hoursSleep: undefined,
        bedTime: undefined,
        wakeUpTime: undefined,
        sleepQuality: undefined,
        affirmation: undefined,
        mentalHealth: [],
        substances: [],
        entryContent: undefined,
        goal: undefined,
        dailyQuestionQ: undefined,
        dailyQuestionA: undefined,
        exercise: "0",
      }
    }
  }, [entries])

  const dateFull = new Date(date.replace(/-/g, "/")).toLocaleDateString(
    "en-US",
    { dateStyle: "full" },
  )

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")
  const [mood, setMood] = useState<number | undefined>(
    loadedEntry.mood ? parseInt(loadedEntry.mood) : undefined,
  )
  const [bedTime, setBedTime] = useState<Dayjs | null>(
    loadedEntry.bedTime ? dayjs(loadedEntry.bedTime) : null,
  )
  const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>(
    loadedEntry.wakeUpTime ? dayjs(loadedEntry.wakeUpTime) : null,
  )
  const [hoursSleep, setHoursSleep] = useState<number | undefined>(
    loadedEntry.hoursSleep ? parseInt(loadedEntry.hoursSleep) : undefined,
  )
  const [sleepQuality, setSleepQuality] = useState<string | undefined>(
    loadedEntry.sleepQuality || undefined,
  )
  const [affirmation, setAffirmation] = useState<string | undefined>(
    loadedEntry.affirmation || undefined,
  )
  const [goal, setGoal] = useState<string | undefined>(
    loadedEntry.goal || undefined,
  )
  const [mentalHealth, setMentalHealth] = useState<string[]>(
    loadedEntry.mentalHealth,
  )
  const [substances, setSubstances] = useState<string[]>(loadedEntry.substances)
  const [entryContent, setEntryContent] = useState<string | undefined>(
    loadedEntry.entryContent || undefined,
  )
  const [dailyQuestionQ, setDailyQuestionQ] = useState<string | undefined>(
    loadedEntry.dailyQuestionQ || undefined,
  )
  const [dailyQuestionA, setDailyQuestionA] = useState<string | undefined>(
    loadedEntry.dailyQuestionA || undefined,
  )
  const [minutesExercise, setMinutesExercise] = useState<number | undefined>(
    loadedEntry.exercise ? parseInt(loadedEntry.exercise) : undefined,
  )

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    if (bedTime && wakeUpTime) {
      let fixedBedTime = bedTime
      if (bedTime.isAfter(new Date().setHours(12))) {
        fixedBedTime = dayjs(bedTime).subtract(1, "day")
      }
      let s = wakeUpTime.diff(fixedBedTime, "minute")
      s = s / 60 // convert to hours
      if (s < 0) {
        s = s + 24
      }
      setHoursSleep(s)
    }
  }, [bedTime, wakeUpTime])

  const modifyMentalHealth = (
    event: SelectChangeEvent<string[]>,
    child: ReactNode,
  ) => {
    const symptoms = event.target.value
    setMentalHealth([...symptoms])
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

  const modifyMinutesExercise = (minutes: number) => {
    if (minutes >= 0) {
      setMinutesExercise(minutes)
    }
  }

  const onSubmit = async () => {
    try {
      const token = await getAccessTokenSilently()
      journalActions.putEntry(token, user!.sub!, date, {
        date,
        mood: mood?.toString(),
        hoursSleep: hoursSleep?.toString(),
        wakeUpTime: wakeUpTime?.toString(),
        bedTime: bedTime?.toString(),
        sleepQuality,
        affirmation,
        mentalHealth,
        substances,
        entryContent,
        goal,
        dailyQuestionA,
        dailyQuestionQ,
        exercise: minutesExercise?.toString(),
      })
      setSnackbarMessage("Successfully saved entry!")
      setSnackbarOpen(true)
      setHasUnsavedChanges(false)
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
      <FormPrompt hasUnsavedChanges={hasUnsavedChanges} />
      <Typography variant="h5" align="center">
        {dateFull}
      </Typography>
      <Typography variant="h5">Morning</Typography>
      {preferences.showSleep && (
        <SleepEntryComponent
          onBedTimeChange={setBedTime}
          onWakeUpTimeChange={setWakeUpTime}
          onSleepQualityChange={setSleepQuality}
          bedTime={bedTime}
          wakeUpTime={wakeUpTime}
          sleepQuality={sleepQuality}
          hoursSleep={hoursSleep}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
      {preferences.showDailyAffirmation && (
        <DailyAffirmationComponent
          affirmation={affirmation}
          onChange={setAffirmation}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
      {preferences.showDailyGoal && (
        <DailyGoalComponent
          goal={goal}
          onChange={setGoal}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
      <Typography variant="h5">Evening</Typography>
      {preferences.showMood && (
        <MoodEntryComponent
          mood={mood}
          onChange={setMood}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
      {preferences.showDailyQuestion && (
        <DailyQuestionComponent
          question={dailyQuestionQ}
          answer={dailyQuestionA}
          onChange={setDailyQuestionA}
          setQuestion={setDailyQuestionQ}
          date={date}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}

      {preferences.showMentalHealth && (
        <MentalHealthEntryComponent
          mentalHealth={[...mentalHealth]}
          onChange={modifyMentalHealth}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}
      {preferences.showSubstance && (
        <SubstanceEntryComponent
          substances={[...substances]}
          onChange={modifySubstances}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}

      {preferences.showExercise && (
        <ExerciseEntryComponent
          minutesExercise={minutesExercise}
          onChange={modifyMinutesExercise}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}

      <EntryComponent
        content={entryContent}
        onChange={setEntryContent}
        setHasUnsavedChanges={setHasUnsavedChanges}
      />

      {/* {currentMedications.length && (
        <MedicationsContainer>
          Current Medications: {currentMedications.join(", ")}{" "}
          <Link to="/medications">(Edit)</Link>
        </MedicationsContainer>
      )} */}

      <SubmitContainer>
        <Button color="primary" variant="contained" onClick={onSubmit}>
          Save
        </Button>
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
