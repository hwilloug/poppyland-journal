import axios from "axios"
import { apiEndpoints } from "../api-endpoints"
import { useDispatch } from "react-redux"
import {
  setFirstName,
  setIdealHoursSleep,
  setIsDarkMode,
  setJournalName,
  setLastName,
  setUserId,
  setUserPreferences,
} from "../reducers/user_reducer"
import { AnyAction, Dispatch } from "@reduxjs/toolkit"

export const getProfile = async (
  userId: string,
  dispatch: Dispatch<AnyAction>,
  getAccessTokenSilently: Function,
) => {
  const defaultPreferences = {
    showDailyAffirmation: true,
    showDailyGoal: true,
    showWeeklyGoal: true,
    showMonthlyGoal: true,
    showYearlyGoal: true,
    showDailyQuestion: true,
    showMood: true,
    showMentalHealth: true,
    showSleep: true,
    showSubstance: true,
    showExercise: true,
  }
  try {
    const token = await getAccessTokenSilently()
    const response = await axios.get(apiEndpoints.getUserPreferences.insert(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = response.data
    dispatch(setUserId(userId))
    dispatch(setUserPreferences({ ...defaultPreferences, ...data.preferences }))
    data.first_name && dispatch(setFirstName(data.first_name))
    data.last_name && dispatch(setLastName(data.last_name))
    data.journal_name && dispatch(setJournalName(data.journal_name))
    dispatch(setIsDarkMode(data.is_dark_mode))
    data.ideal_hours_sleep &&
      dispatch(setIdealHoursSleep(data.ideal_hours_sleep))
  } catch (e) {
    const token = await getAccessTokenSilently()
    const response = await axios.put(
      apiEndpoints.putUserPreferences.insert(),
      {
        preferences: defaultPreferences,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    dispatch(setUserId(userId))
    dispatch(setUserPreferences({ ...defaultPreferences }))
  }
}
