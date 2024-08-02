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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material"
import LoadingComponent from "./Loading"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import ExerciseEntryComponent from "../todaysentrypage/ExerciseEntry"
import { JournalEntry } from "../../types/journal-types"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useEffect, useMemo, useState } from "react"
import { HeaderText } from "./styled-components"
import { convertToDateObject } from "../../utils/date-utils"
import { getInitialEntryState } from "../../reducers/journal-reducer"
import DailyQuestionComponent from "../todaysentrypage/DailyQuestion"
import { ArrowDownward } from "@mui/icons-material"
import HabitsChecker from "./HabitsChecker"
import FeelingsEntryComponent from "../todaysentrypage/Feelings"

const SavingContainer = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
})

interface EntryFormProps {
  date: string
}

const enum TimeOfDay {
  Morning = "Morning",
  Evening = "Evening",
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
  const yesterdaysEntry: JournalEntry | undefined = useMemo(() => {
    const yesterday = dayjs(dateObject).subtract(1, "day").format("YYYY-MM-DD")
    if (Object.keys(entries).includes(yesterday)) {
      return entries[yesterday]
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
      loadedEntry.substances ||
      loadedEntry.entryContent ||
      loadedEntry.morningEntryContent ||
      loadedEntry.goals ||
      loadedEntry.weeklyGoals ||
      loadedEntry.monthlyGoals ||
      loadedEntry.yearlyGoals ||
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

  const morningEntryContent = useMemo(() => {
    return loadedEntry.morningEntryContent
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

  const yearlyGoals = useMemo(() => {
    return loadedEntry.yearlyGoals
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
        if (goal === undefined) {
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

  const modifyYearlyGoals = (index: number, goal: string, checked: boolean) => {
    if (yearlyGoals !== undefined && yearlyGoals !== null) {
      let newGoals = [...yearlyGoals]
      if (goal === "") {
        newGoals.push({ goal, checked })
      } else {
        newGoals[index] = { goal, checked }
      }
      journalActions.setYearlyGoals(date, [...newGoals])
    } else {
      journalActions.setYearlyGoals(date, [{ goal, checked }])
    }
  }

  const removeYearlyGoal = (index: number) => {
    if (yearlyGoals !== undefined && yearlyGoals !== null) {
      let newGoals = [...yearlyGoals]
      newGoals.splice(index, 1)
      journalActions.setYearlyGoals(date, [...newGoals])
    }
  }

  const onSubmit = async () => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, user!.sub!, date, loadedEntry)
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
        morningEntryContent ||
        goals !== undefined ||
        weeklyGoals !== undefined ||
        monthlyGoals !== undefined ||
        yearlyGoals !== undefined ||
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
        morningEntryContent ||
        goals !== undefined ||
        weeklyGoals !== undefined ||
        monthlyGoals !== undefined ||
        yearlyGoals !== undefined ||
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
    morningEntryContent,
    goals,
    weeklyGoals,
    monthlyGoals,
    yearlyGoals,
    dailyQuestionA,
    dailyQuestionQ,
    minutesExercise,
  ])

  const [timeOfDay, setTimeOfDay] = useState(TimeOfDay.Morning)

  const SelectTimeOfDay: React.FC = () => (
    <FormControl>
      <RadioGroup
        value={timeOfDay}
        row
        onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
      >
        <FormControlLabel
          value={TimeOfDay.Morning}
          control={<Radio />}
          label={
            <Typography
              fontWeight={"bold"}
              sx={{
                textShadow:
                  "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
              }}
            >
              {TimeOfDay.Morning}
            </Typography>
          }
          labelPlacement="bottom"
        />
        <FormControlLabel
          value={TimeOfDay.Evening}
          control={<Radio />}
          label={
            <Typography
              fontWeight={"bold"}
              sx={{
                textShadow:
                  "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
              }}
            >
              {TimeOfDay.Evening}
            </Typography>
          }
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  )

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <>
      <HeaderText>{dateFull}</HeaderText>
      <Box textAlign={"center"} mt={4}>
        <SelectTimeOfDay />
      </Box>
      {timeOfDay === TimeOfDay.Morning && (
        <>
          {preferences.showSleep && <SleepEntryComponent date={date} />}

          {preferences.showMood && <MoodEntryComponent date={date} />}

          {preferences.showDailyAffirmation && (
            <>
              <DailyAffirmationComponent date={date} />
              {yesterdaysEntry?.affirmation && (
                <Accordion sx={{ backgroundColor: "#e0f0bb" }}>
                  <AccordionSummary
                    expandIcon={<ArrowDownward color="primary" />}
                    sx={{
                      "& .MuiAccordionSummary-content": {
                        justifyContent: "center",
                      },
                    }}
                  >
                    <Typography>Yesterday's Affirmation</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{yesterdaysEntry?.affirmation}</Typography>
                  </AccordionDetails>
                </Accordion>
              )}
            </>
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
          {preferences.showYearlyGoal &&
            dateObject.getMonth() === 0 &&
            dateObject.getDate() === 1 && (
              <DailyGoalComponent
                goals={yearlyGoals || []}
                cadence={"Yearly"}
                onChange={modifyYearlyGoals}
                onRemove={removeYearlyGoal}
              />
            )}

          <EntryComponent date={date} timeOfDay={timeOfDay} />
        </>
      )}

      {timeOfDay === TimeOfDay.Evening && (
        <>
          {preferences.showHabits && (
            <Box mt={4}>
              <Paper
                sx={{ backgroundColor: "rgba(224, 240, 187, .65)", p: 4 }}
                elevation={24}
              >
                <Typography variant={"h6"} align="center">
                  Daily Habits
                </Typography>
                <HabitsChecker date={date} />
              </Paper>
            </Box>
          )}

          {preferences.showMentalHealth && (
            <MentalHealthEntryComponent date={date} />
          )}

          {preferences.showFeelings && <FeelingsEntryComponent date={date} />}

          {preferences.showSubstance && <SubstanceEntryComponent date={date} />}

          {preferences.showExercise && <ExerciseEntryComponent date={date} />}

          {preferences.showDailyQuestion && (
            <DailyQuestionComponent date={date} />
          )}

          <EntryComponent date={date} timeOfDay={timeOfDay} />
        </>
      )}

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
