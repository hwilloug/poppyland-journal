import {
  GoalsType,
  HabitsType,
  JournalEntries,
  JournalEntry,
  SubstancesType,
} from "../types/journal-types"
import { createAction } from "./actions-utils"

export const JournalActionTypes = {
  GET_ENTRIES: "@journal/get-entries",
  SET_ENTRIES: "@journal/set-entries",
  SET_ENTRY: "@journal/set-entry",
  PUT_ENTRY: "@journal/put-entry",
  DELETE_ENTRY: "@journal/delete-entry",
  SET_MOOD: "@journal/set-mood",
  SET_HOURS_SLEEP: "@journal/set-hours-sleep",
  SET_WAKE_UP_TIME: "@journal/set-wake-up-time",
  SET_BED_TIME: "@journal/set-bed-time",
  SET_SLEEP_QUALITY: "@journal/set-sleep-quality",
  SET_AFFIRMATION: "@journal/set-affirmation",
  SET_MENTAL_HEALTH: "@journal/set-mental-health",
  SET_SUBSTANCES: "@journal/set-substances",
  SET_ENTRY_CONTENT: "@journal/set-entry-content",
  SET_GOALS: "@journal/set-goals",
  SET_WEEKLY_GOALS: "@journal/set-weekly-goals",
  SET_MONTHLY_GOALS: "@journal/set-monthly-goals",
  SET_YEARLY_GOALS: "@journal/set-yearly-goals",
  SET_DAILY_QUESTION_Q: "@journal/set-daily-question-q",
  SET_DAILY_QUESTION_A: "@journal/set-daily-question-a",
  SET_EXERCISE: "@journal/set-exercise",
  SET_HABITS: "@journal/set-habits",
  SET_IS_LOADING: "@journal/set-is-loading",
  SET_IS_SAVING: "@journal/set-is-saving",
}

export const createJournalActions = (dispatch: any) => ({
  getEntries: (token: string) =>
    createAction(dispatch, JournalActionTypes.GET_ENTRIES, { token }),
  setEntries: (entries: JournalEntries) =>
    createAction(dispatch, JournalActionTypes.SET_ENTRIES, { entries }),
  setEntry: (date: string, entry: JournalEntry) =>
    createAction(dispatch, JournalActionTypes.SET_ENTRY, { date, entry }),
  putEntry: (
    token: string,
    userId: string,
    date: string,
    entry: JournalEntry,
  ) =>
    createAction(dispatch, JournalActionTypes.PUT_ENTRY, {
      token,
      date,
      userId,
      entry,
    }),
  deleteEntry: (token: string, date: string) =>
    createAction(dispatch, JournalActionTypes.DELETE_ENTRY, { token, date }),
  setMood: (date: string, mood: string) =>
    createAction(dispatch, JournalActionTypes.SET_MOOD, { date, mood }),
  setHoursSleep: (date: string, hoursSleep: string) =>
    createAction(dispatch, JournalActionTypes.SET_HOURS_SLEEP, {
      date,
      hoursSleep,
    }),
  setWakeUpTime: (date: string, wakeUpTime: string) =>
    createAction(dispatch, JournalActionTypes.SET_WAKE_UP_TIME, {
      date,
      wakeUpTime,
    }),
  setBedTime: (date: string, bedTime: string) =>
    createAction(dispatch, JournalActionTypes.SET_BED_TIME, { date, bedTime }),
  setSleepQuality: (date: string, sleepQuality: string) =>
    createAction(dispatch, JournalActionTypes.SET_SLEEP_QUALITY, {
      date,
      sleepQuality,
    }),
  setAffirmation: (date: string, affirmation: string) =>
    createAction(dispatch, JournalActionTypes.SET_AFFIRMATION, {
      date,
      affirmation,
    }),
  setMentalHealth: (date: string, mentalHealth: string[]) =>
    createAction(dispatch, JournalActionTypes.SET_MENTAL_HEALTH, {
      date,
      mentalHealth,
    }),
  setSubstances: (date: string, substances: SubstancesType[]) =>
    createAction(dispatch, JournalActionTypes.SET_SUBSTANCES, {
      date,
      substances,
    }),
  setEntryContent: (date: string, entryContent: string) =>
    createAction(dispatch, JournalActionTypes.SET_ENTRY_CONTENT, {
      date,
      entryContent,
    }),
  setGoals: (date: string, goals: GoalsType[]) =>
    createAction(dispatch, JournalActionTypes.SET_GOALS, { date, goals }),
  setWeeklyGoals: (date: string, weeklyGoals: GoalsType[]) =>
    createAction(dispatch, JournalActionTypes.SET_WEEKLY_GOALS, {
      date,
      weeklyGoals,
    }),
  setMonthlyGoals: (date: string, monthlyGoals: GoalsType[]) =>
    createAction(dispatch, JournalActionTypes.SET_MONTHLY_GOALS, {
      date,
      monthlyGoals,
    }),
  setYearlyGoals: (date: string, yearlyGoals: GoalsType[]) =>
    createAction(dispatch, JournalActionTypes.SET_YEARLY_GOALS, {
      date,
      yearlyGoals,
    }),
  setDailyQuestionQ: (date: string, dailyQuestionQ: string) =>
    createAction(dispatch, JournalActionTypes.SET_DAILY_QUESTION_Q, {
      date,
      dailyQuestionQ,
    }),
  setDailyQuestionA: (date: string, dailyQuestionA: string) =>
    createAction(dispatch, JournalActionTypes.SET_DAILY_QUESTION_A, {
      date,
      dailyQuestionA,
    }),
  setExercise: (date: string, exercise: string) =>
    createAction(dispatch, JournalActionTypes.SET_EXERCISE, { date, exercise }),
  setHabits: (date: string, habits: HabitsType[]) =>
    createAction(dispatch, JournalActionTypes.SET_HABITS, { date, habits }),
  setIsLoading: (isLoading: boolean) =>
    createAction(dispatch, JournalActionTypes.SET_IS_LOADING, { isLoading }),
  setIsSaving: (isSaving: boolean) =>
    createAction(dispatch, JournalActionTypes.SET_IS_SAVING, { isSaving }),
})
