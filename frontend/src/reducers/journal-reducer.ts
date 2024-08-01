import { JournalActionTypes } from "../actions/journal-actions"
import { getQuestion } from "../components/todaysentrypage/DailyQuestion"
import { substancesList } from "../components/todaysentrypage/SubstanceEntry"
import { JournalEntry, JournalState } from "../types/journal-types"
import { convertToDateObject } from "../utils/date-utils"

const initialState: JournalState = {
  isLoading: true,
  isSaving: false,
  entries: {},
}

export const getInitialEntryState = (date: string): JournalEntry => {
  return {
    date,
    mood: undefined,
    hoursSleep: undefined,
    bedTime: undefined,
    wakeUpTime: undefined,
    sleepQuality: undefined,
    affirmation: undefined,
    mentalHealth: [],
    substances: substancesList.map((s) => ({ substance: s, amount: 0 })),
    entryContent: undefined,
    goals: undefined,
    weeklyGoals: [],
    monthlyGoals: [],
    yearlyGoals: [],
    dailyQuestionQ: getQuestion(convertToDateObject(date).getDate()),
    dailyQuestionA: undefined,
    exercise: "0",
    habits: [],
  }
}

export function journalReducer(
  state: JournalState = initialState,
  action: { type: any; payload: any },
) {
  switch (action.type) {
    case JournalActionTypes.SET_ENTRIES:
      return {
        ...state,
        entries: {
          ...action.payload.entries,
        },
      }
    case JournalActionTypes.SET_ENTRY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: action.payload.entry,
        },
      }
    case JournalActionTypes.SET_MOOD:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            mood: action.payload.mood,
          },
        },
      }
    case JournalActionTypes.SET_HOURS_SLEEP:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            hoursSleep: action.payload.hoursSleep,
          },
        },
      }
    case JournalActionTypes.SET_WAKE_UP_TIME:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            wakeUpTime: action.payload.wakeUpTime,
          },
        },
      }
    case JournalActionTypes.SET_BED_TIME:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            bedTime: action.payload.bedTime,
          },
        },
      }
    case JournalActionTypes.SET_SLEEP_QUALITY:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            sleepQuality: action.payload.sleepQuality,
          },
        },
      }
    case JournalActionTypes.SET_AFFIRMATION:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            affirmation: action.payload.affirmation,
          },
        },
      }
    case JournalActionTypes.SET_MENTAL_HEALTH:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            mentalHealth: action.payload.mentalHealth,
          },
        },
      }
    case JournalActionTypes.SET_SUBSTANCES:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            substances: action.payload.substances,
          },
        },
      }
    case JournalActionTypes.SET_ENTRY_CONTENT:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            entryContent: action.payload.entryContent,
          },
        },
      }
    case JournalActionTypes.SET_MORNING_ENTRY_CONTENT:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            morningEntryContent: action.payload.entryContent,
          },
        },
      }
    case JournalActionTypes.SET_GOALS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            goals: action.payload.goals,
          },
        },
      }
    case JournalActionTypes.SET_WEEKLY_GOALS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            weeklyGoals: action.payload.weeklyGoals,
          },
        },
      }
    case JournalActionTypes.SET_MONTHLY_GOALS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            monthlyGoals: action.payload.monthlyGoals,
          },
        },
      }
    case JournalActionTypes.SET_YEARLY_GOALS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            yearlyGoals: action.payload.yearlyGoals,
          },
        },
      }
    case JournalActionTypes.SET_DAILY_QUESTION_Q:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            dailyQuestionQ: action.payload.dailyQuestionQ,
          },
        },
      }
    case JournalActionTypes.SET_DAILY_QUESTION_A:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            dailyQuestionA: action.payload.dailyQuestionA,
          },
        },
      }
    case JournalActionTypes.SET_EXERCISE:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            exercise: action.payload.exercise,
          },
        },
      }
    case JournalActionTypes.SET_HABITS:
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.date]: {
            ...state.entries[action.payload.date],
            habits: action.payload.habits,
          },
        },
      }
    case JournalActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    case JournalActionTypes.SET_IS_SAVING:
      return {
        ...state,
        isSaving: action.payload.isSaving,
      }
    default:
      return state
  }
}
