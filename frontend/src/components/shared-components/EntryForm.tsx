import { useAuth0 } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import dayjs, { Dayjs } from "dayjs"
import MoodEntryComponent from "../todaysentrypage/MoodEntry"
import SleepEntryComponent from "../todaysentrypage/SleepEntry"
import DailyAffirmationComponent from "../todaysentrypage/DailyAffirmation"
import DailyGoalComponent from "../todaysentrypage/DailyGoal"
import DailyQuestionComponent, {
  getQuestion,
} from "../todaysentrypage/DailyQuestion"
import MentalHealthEntryComponent from "../todaysentrypage/MentalHealthEntry"
import SubstanceEntryComponent from "../todaysentrypage/SubstanceEntry"
import EntryComponent from "../todaysentrypage/Entry"
import { CircularProgress, SelectChangeEvent, Typography } from "@mui/material"
import LoadingComponent from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { getProfile } from "../../utils/get-profile"
import ExerciseEntryComponent from "../todaysentrypage/ExerciseEntry"
import { JournalEntry } from "../../types/journal-types"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { ReactNode, useEffect, useMemo, useState } from "react"
const _ = require("lodash")

const SavingContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
})

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

  const isSaving = useSelector((state: State) => state.journal.isSaving)

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
  const prevFormStateLoaded = useMemo(() => {
    return (
      loadedEntry.mood ||
      loadedEntry.hoursSleep ||
      loadedEntry.wakeUpTime ||
      loadedEntry.bedTime ||
      loadedEntry.sleepQuality ||
      loadedEntry.affirmation ||
      loadedEntry.mentalHealth.length ||
      loadedEntry.substances.length ||
      loadedEntry.entryContent ||
      loadedEntry.goal ||
      loadedEntry.dailyQuestionA ||
      loadedEntry.exercise !== "0"
    )
  }, [loadedEntry])

  const dateFull = new Date(date.replace(/-/g, "/")).toLocaleDateString(
    "en-US",
    { dateStyle: "full" },
  )

  const [mood, setMood] = useState<number | undefined>(
    loadedEntry.mood ? parseInt(loadedEntry.mood) : undefined,
  )
  const [bedTime, setBedTime] = useState<Dayjs | null>(
    loadedEntry.bedTime ? dayjs(loadedEntry.bedTime) : null,
  )
  const [wakeUpTime, setWakeUpTime] = useState<Dayjs | null>(
    loadedEntry.wakeUpTime ? dayjs(loadedEntry.wakeUpTime) : null,
  )
  const [hoursSleep, setHoursSleep] = useState<string | undefined>(
    loadedEntry.hoursSleep ? loadedEntry.hoursSleep : undefined,
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
    loadedEntry.dailyQuestionQ || getQuestion(new Date(date).getDate()),
  )
  const [dailyQuestionA, setDailyQuestionA] = useState<string | undefined>(
    loadedEntry.dailyQuestionA || undefined,
  )
  const [minutesExercise, setMinutesExercise] = useState<number>(
    loadedEntry.exercise ? parseInt(loadedEntry.exercise) : 0,
  )

  const [stateLoaded, setStateLoaded] = useState(false)

  const loadForm = (entry: JournalEntry) => {
    setMood(entry.mood ? parseInt(entry.mood) : undefined)
    setBedTime(entry.bedTime ? dayjs(entry.bedTime) : null)
    setWakeUpTime(entry.wakeUpTime ? dayjs(entry.wakeUpTime) : null)
    setHoursSleep(entry.hoursSleep)
    setAffirmation(entry.affirmation)
    setGoal(entry.goal)
    setMentalHealth(entry.mentalHealth)
    setSubstances(entry.substances)
    setEntryContent(entry.entryContent)
    setDailyQuestionA(entry.dailyQuestionA)
    setDailyQuestionQ(
      entry.dailyQuestionQ || getQuestion(new Date(date).getDate()),
    )
    setSleepQuality(entry.sleepQuality)
    setMinutesExercise(entry.exercise ? parseInt(entry.exercise) : 0)
    setStateLoaded(true)
  }

  useEffect(() => {
    loadForm(loadedEntry)
  }, [loadedEntry])

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
      setHoursSleep(s.toFixed(2))
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
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (prevFormStateLoaded && !isLoading) {
      if (
        stateLoaded &&
        (mood ||
          hoursSleep ||
          wakeUpTime ||
          bedTime ||
          sleepQuality ||
          affirmation ||
          mentalHealth.length ||
          substances.length ||
          entryContent ||
          goal ||
          dailyQuestionA ||
          minutesExercise !== 0)
      ) {
        if (
          loadedEntry.mood != mood?.toString() ||
          loadedEntry.hoursSleep != hoursSleep?.toString() ||
          loadedEntry.wakeUpTime != wakeUpTime?.toString() ||
          loadedEntry.bedTime != bedTime?.toString() ||
          loadedEntry.sleepQuality != sleepQuality ||
          loadedEntry.affirmation != affirmation ||
          !_.isEqual(loadedEntry.mentalHealth, mentalHealth) ||
          !_.isEqual(loadedEntry.substances, substances) ||
          loadedEntry.entryContent != entryContent ||
          loadedEntry.goal != goal ||
          loadedEntry.dailyQuestionA != dailyQuestionA ||
          loadedEntry.dailyQuestionQ != dailyQuestionQ ||
          loadedEntry.exercise != minutesExercise.toString()
        ) {
          onSubmit()
        }
      }
    } else {
      if (
        mood ||
        hoursSleep ||
        wakeUpTime ||
        bedTime ||
        sleepQuality ||
        affirmation ||
        mentalHealth.length ||
        substances.length ||
        entryContent ||
        goal ||
        dailyQuestionA ||
        minutesExercise !== 0
      ) {
        if (!isLoading) {
          onSubmit()
        }
      }
    }
  }, [
    stateLoaded,
    prevFormStateLoaded,
    loadedEntry,
    mood,
    hoursSleep,
    wakeUpTime,
    bedTime,
    sleepQuality,
    affirmation,
    mentalHealth,
    substances,
    entryContent,
    goal,
    dailyQuestionA,
    dailyQuestionQ,
    minutesExercise,
  ])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        sx={{
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
      >
        {dateFull}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
      >
        Morning
      </Typography>
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
      {preferences.showDailyGoal && (
        <DailyGoalComponent goal={goal} onChange={setGoal} />
      )}
      <Typography
        variant="h5"
        sx={{
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
      >
        Evening
      </Typography>
      {preferences.showMood && (
        <MoodEntryComponent mood={mood} onChange={setMood} />
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

      {preferences.showExercise && (
        <ExerciseEntryComponent
          minutesExercise={minutesExercise}
          onChange={modifyMinutesExercise}
        />
      )}

      <EntryComponent content={entryContent} onChange={setEntryContent} />

      <SavingContainer>
        {isSaving && <CircularProgress color="primary" />}
        {!isSaving && <CheckCircleIcon color="primary" fontSize="large" />}
      </SavingContainer>
    </>
  )
}

export default EntryForm
