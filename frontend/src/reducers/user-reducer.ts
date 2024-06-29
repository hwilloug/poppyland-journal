import { UserActionTypes } from "../actions/user-actions"
import { UserState } from "../types/user-types"

const initialState: UserState = {
  isLoading: true,
  preferences: {
    showMood: true,
  },
  userId: "",
  firstName: "",
  lastName: "",
  journalName: "My Journal",
  isDarkMode: false,
  idealHoursSleep: "8",
  emergency: {},
  habits: [],
}

export function userReducer(
  state: UserState = initialState,
  action: { type: any; payload: any },
) {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...action.payload.user,
      }
    case UserActionTypes.SET_USER_PREFERENCES:
      return {
        ...state,
        preferences: { ...action.payload.preferences },
      }
    case UserActionTypes.SET_SUBSTANCES_PREFERENCE:
      return {
        ...state,
        substances: action.payload.substances,
      }
    case UserActionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.payload.userId,
      }
    case UserActionTypes.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload.firstName,
      }
    case UserActionTypes.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload.lastName,
      }
    case UserActionTypes.SET_USER_PREFERENCE:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          [action.payload.preference]: action.payload.value,
        },
      }
    case UserActionTypes.SET_JOURNAL_NAME:
      return {
        ...state,
        journalName: action.payload.journalName,
      }
    case UserActionTypes.SET_IS_DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload.isDarkMode,
      }
    case UserActionTypes.SET_IDEAL_HOURS_SLEEP:
      return {
        ...state,
        idealHoursSleep: action.payload.idealHoursSleep,
      }
    case UserActionTypes.SET_EMERGENCY_CONTACTS:
      return {
        ...state,
        emergency: {
          ...state.emergency,
          contacts: action.payload.contacts,
        },
      }
    case UserActionTypes.SET_EMERGENCY_PLAN:
      return {
        ...state,
        emergency: {
          ...state.emergency,
          plan: action.payload.plan,
        },
      }
    case UserActionTypes.SET_HABITS:
      return {
        ...state,
        habits: action.payload.habits,
      }
    case UserActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      }
    default:
      return state
  }
}
