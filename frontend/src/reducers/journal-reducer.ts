import { JournalActionTypes } from "../actions/journal-actions"
import { JournalState } from "../types/journal-types"

const initialState: JournalState = {
  isLoading: true,
  entries: {},
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
    default:
      return state
  }
}
