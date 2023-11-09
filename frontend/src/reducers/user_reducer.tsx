import { createSlice } from '@reduxjs/toolkit'

export type UserType = {
    preferences: PreferencesType
    userId: string
}

export type PreferencesType = {
    showDailyAffirmation?: boolean
    showDailyGoal?: boolean
    showDailyQuestion?: boolean
    showMood?: boolean
    showMentalHealth?: boolean
    showSleep?: boolean
    showSubstance?: boolean
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    preferences: {},
    userId: ''
  },
  reducers: {
    setUserPreferences: (state, action) => {
      state.preferences = {...action.payload}
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserPreferences, setUserId } = userSlice.actions

export default userSlice.reducer