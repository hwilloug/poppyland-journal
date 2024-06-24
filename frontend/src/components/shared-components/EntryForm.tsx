import { useAuth0 } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import dayjs, { Dayjs } from "dayjs"
import MoodEntryComponent from "../todaysentrypage/MoodEntry"
import SleepEntryComponent from "../todaysentrypage/SleepEntry"
import DailyAffirmationComponent from "../todaysentrypage/DailyAffirmation"
import DailyGoalComponent from "../todaysentrypage/DailyGoal"
import MentalHealthEntryComponent from "../todaysentrypage/MentalHealthEntry"
import SubstanceEntryComponent from "../todaysentrypage/SubstanceEntry"
import EntryComponent from "../todaysentrypage/Entry"
import { CircularProgress } from "@mui/material"
import LoadingComponent from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import ExerciseEntryComponent from "../todaysentrypage/ExerciseEntry"
import { JournalEntry } from "../../types/journal-types"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useEffect, useMemo } from "react"
import { HeaderText } from "./styled-components"
import { convertToDateObject } from "../../utils/date-utils"
import { getInitialEntryState } from "../../reducers/journal-reducer"
import DailyQuestionComponent from "../todaysentrypage/DailyQuestion"

const SavingContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
})

interface EntryFormProps {
  date: string
}

const EntryForm: React.FunctionComponent<EntryFormProps> = ({ date }) => {
  const dateObject = convertToDateObject(date)
  const { user, getAccessTokenSilently } = useAuth0()
  const preferences = useSelector((state: State) => state.user.preferences)

  const isSaving = useSelector((state: State) => state.journal.isSaving)

  const entries = useSelector((state: State) => state.journal.entries)
  const isLoading = useSelector((state: State) => state.journal.isLoading)
  const loadedEntry: JournalEntry = useMemo(() => {
    if (Object.keys(entries).includes(date)) {
      return entries[date]
    } else {
      const state = getInitialEntryState(date)
      journalActions.setEntry(date, state)
      return state
    }
  }, [entries, date])
  const prevFormStateLoaded = useMemo(() => {
    return (
      loadedEntry.mood ||
      loadedEntry.hoursSleep ||
      loadedEntry.wakeUpTime ||
      loadedEntry.bedTime ||
      loadedEntry.sleepQuality ||
      loadedEntry.affirmation ||
      loadedEntry.mentalHealth.length ||
      loadedEntry.substances ||
      loadedEntry.entryContent ||
      loadedEntry.goals ||
      loadedEntry.weeklyGoals ||
      loadedEntry.monthlyGoals ||
      loadedEntry.dailyQuestionA ||
      loadedEntry.exercise !== "0"
    )
  }, [loadedEntry])

  const mood = useMemo(() => {
    return loadedEntry.mood
  }, [loadedEntry])

  const hoursSleep = useMemo(() => {
    return loadedEntry.hoursSleep
  }, [loadedEntry])

  const wakeUpTime = useMemo(() => {
    return dayjs(loadedEntry.wakeUpTime)
  }, [loadedEntry])

  const bedTime = useMemo(() => {
    return dayjs(loadedEntry.bedTime)
  }, [loadedEntry])

  const sleepQuality = useMemo(() => {
    return loadedEntry.sleepQuality
  }, [loadedEntry])

  const affirmation = useMemo(() => {
    return loadedEntry.affirmation
  }, [loadedEntry])

  const mentalHealth = useMemo(() => {
    return loadedEntry.mentalHealth
  }, [loadedEntry])

  const substances = useMemo(() => {
    return loadedEntry.substances
  }, [loadedEntry])

  const entryContent = useMemo(() => {
    return loadedEntry.entryContent
  }, [loadedEntry])

  const goals = useMemo(() => {
    return loadedEntry.goals
  }, [loadedEntry])

  const weeklyGoals = useMemo(() => {
    return loadedEntry.weeklyGoals
  }, [loadedEntry])

  const monthlyGoals = useMemo(() => {
    return loadedEntry.monthlyGoals
  }, [loadedEntry])

  const dailyQuestionQ = useMemo(() => {
    return loadedEntry.dailyQuestionQ
  }, [loadedEntry])

  const dailyQuestionA = useMemo(() => {
    return loadedEntry.dailyQuestionA
  }, [loadedEntry])

  const minutesExercise = useMemo(() => {
    return loadedEntry.exercise
  }, [loadedEntry])

  const dateFull = new Date(date.replace(/-/g, "/")).toLocaleDateString(
    "en-US",
    { dateStyle: "full" },
  )

  const modifyGoals = (index: number, goal: string, checked: boolean) => {
    if (goals !== undefined && goals !== null) {
      let newGoals = [...goals]
      if (typeof newGoals === "string") {
        newGoals = [{ goal: newGoals, checked }]
      } else {
        if (goal === "") {
          newGoals.push({ goal, checked })
        } else {
          newGoals[index] = { goal, checked }
        }
      }
      journalActions.setGoals(date, [...newGoals])
    } else {
      journalActions.setGoals(date, [{ goal, checked }])
    }
  }

  const removeGoal = (index: number) => {
    if (goals !== undefined && goals !== null) {
      let newGoals = [...goals]
      newGoals.splice(index, 1)
      journalActions.setGoals(date, [...newGoals])
    }
  }

  const modifyWeeklyGoals = (index: number, goal: string, checked: boolean) => {
    if (weeklyGoals !== undefined && weeklyGoals !== null) {
      let newGoals = [...weeklyGoals]
      if (goal === "") {
        newGoals.push({ goal, checked })
      } else {
        newGoals[index] = { goal, checked }
      }
      journalActions.setWeeklyGoals(date, [...newGoals])
    } else {
      journalActions.setWeeklyGoals(date, [{ goal, checked }])
    }
  }

  const removeWeeklyGoal = (index: number) => {
    if (weeklyGoals !== undefined && weeklyGoals !== null) {
      let newGoals = [...weeklyGoals]
      newGoals.splice(index, 1)
      journalActions.setWeeklyGoals(date, [...newGoals])
    }
  }

  const modifyMonthlyGoals = (
    index: number,
    goal: string,
    checked: boolean,
  ) => {
    if (monthlyGoals !== undefined && monthlyGoals !== null) {
      let newGoals = [...monthlyGoals]
      if (goal === "") {
        newGoals.push({ goal, checked })
      } else {
        newGoals[index] = { goal, checked }
      }
      journalActions.setMonthlyGoals(date, [...newGoals])
    } else {
      journalActions.setMonthlyGoals(date, [{ goal, checked }])
    }
  }

  const removeMonthlyGoal = (index: number) => {
    if (monthlyGoals !== undefined && monthlyGoals !== null) {
      let newGoals = [...monthlyGoals]
      newGoals.splice(index, 1)
      journalActions.setMonthlyGoals(date, [...newGoals])
    }
  }

  const onSubmit = async () => {
    try {
      const token = await getAccessTokenSilently()
      journalActions.putEntry(token, user!.sub!, date, loadedEntry)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (prevFormStateLoaded && !isLoading) {
      if (
        mood !== undefined ||
        hoursSleep ||
        wakeUpTime ||
        bedTime ||
        sleepQuality ||
        affirmation ||
        mentalHealth.length ||
        substances.length ||
        entryContent ||
        goals !== undefined ||
        weeklyGoals !== undefined ||
        monthlyGoals !== undefined ||
        dailyQuestionA ||
        minutesExercise !== "0"
      ) {
        onSubmit()
      }
    } else {
      if (
        mood !== undefined ||
        hoursSleep ||
        wakeUpTime ||
        bedTime ||
        sleepQuality ||
        affirmation ||
        mentalHealth.length ||
        substances.length ||
        entryContent ||
        goals !== undefined ||
        weeklyGoals !== undefined ||
        monthlyGoals !== undefined ||
        dailyQuestionA ||
        minutesExercise !== "0"
      ) {
        if (!isLoading) {
          onSubmit()
        }
      }
    }
  }, [
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
    goals,
    weeklyGoals,
    monthlyGoals,
    dailyQuestionA,
    dailyQuestionQ,
    minutesExercise,
  ])

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <HeaderText>{dateFull}</HeaderText>
      <HeaderText variant="h5" mt={4}>
        Morning
      </HeaderText>
      {preferences.showSleep && <SleepEntryComponent date={date} />}
      {preferences.showDailyAffirmation && (
        <DailyAffirmationComponent date={date} />
      )}
      {preferences.showDailyGoal && (
        <DailyGoalComponent
          cadence={"Daily"}
          onChange={modifyGoals}
          onRemove={removeGoal}
          goals={goals || []}
        />
      )}
      {preferences.showWeeklyGoal && dateObject.getDay() === 1 && (
        <DailyGoalComponent
          goals={weeklyGoals || []}
          cadence={"Weekly"}
          onChange={modifyWeeklyGoals}
          onRemove={removeWeeklyGoal}
        />
      )}
      {preferences.showMonthlyGoal && dateObject.getDate() === 1 && (
        <DailyGoalComponent
          goals={monthlyGoals || []}
          cadence={"Monthly"}
          onChange={modifyMonthlyGoals}
          onRemove={removeMonthlyGoal}
        />
      )}
      <HeaderText variant="h5">Evening</HeaderText>
      {preferences.showMood && <MoodEntryComponent date={date} />}
      {preferences.showDailyQuestion && <DailyQuestionComponent date={date} />}

      {preferences.showMentalHealth && (
        <MentalHealthEntryComponent date={date} />
      )}
      {preferences.showSubstance && <SubstanceEntryComponent date={date} />}

      {preferences.showExercise && <ExerciseEntryComponent date={date} />}

      <EntryComponent date={date} />

      <SavingContainer>
        {isSaving && <CircularProgress color="primary" />}
        {!isSaving && (
          <CheckCircleIcon
            color="primary"
            fontSize="large"
            sx={{ backgroundColor: "white", borderRadius: "50%" }}
          />
        )}
      </SavingContainer>
    </>
  )
}

export default EntryForm
