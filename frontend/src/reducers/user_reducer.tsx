import { createSlice } from "@reduxjs/toolkit"

export type UserType = {
  preferences: PreferencesType
  userId: string
  firstName: string
  lastName: string
  journalName: string
  isDarkMode: boolean
}

export type PreferencesType = {
  showDailyAffirmation?: boolean
  showDailyGoal?: boolean
  showDailyQuestion?: boolean
  showMood?: boolean
  showMentalHealth?: boolean
  showSleep?: boolean
  showSubstance?: boolean
  showExercise?: boolean
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    preferences: {},
    userId: "",
    firstName: "",
    lastName: "",
    journalName: "My Journal",
    isDarkMode: false,
  },
  reducers: {
    setUserPreferences: (state, action) => {
      state.preferences = { ...action.payload }
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload
    },
    setLastName: (state, action) => {
      state.lastName = action.payload
    },
    setUserPreference: (state, action) => {
      // @ts-ignore
      state.preferences = {
        ...state.preferences,
        [action.payload.preference]: action.payload.value,
      }
    },
    setJournalName: (state, action) => {
      state.journalName = action.payload
    },
    setIsDarkMode: (state, action) => {
      state.isDarkMode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setUserPreferences,
  setUserId,
  setUserPreference,
  setFirstName,
  setLastName,
  setJournalName,
  setIsDarkMode,
} = userSlice.actions

export default userSlice.reducer
