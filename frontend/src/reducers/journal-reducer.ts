import { JournalActionTypes } from "../actions/journal-actions"
import { getQuestion } from "../components/todaysentrypage/DailyQuestion"
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
    substances: [],
    entryContent: undefined,
    goals: undefined,
    weeklyGoals: [],
    monthlyGoals: [],
    dailyQuestionQ: getQuestion(convertToDateObject(date).getDate()),
    dailyQuestionA: undefined,
    exercise: "0",
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
