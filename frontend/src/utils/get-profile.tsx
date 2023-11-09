import axios from "axios"
import { apiEndpoints } from "../api-endpoints"
import { useDispatch } from "react-redux"
import { setUserId, setUserPreferences } from "../reducers/user_reducer"
import { AnyAction, Dispatch } from "@reduxjs/toolkit"

export const getProfile = async (
  userId: string,
  dispatch: Dispatch<AnyAction>,
  getAccessTokenSilently: Function,
) => {
  const defaultPreferences = {
    showDailyAffirmation: true,
    showDailyGoal: true,
    showDailyQuestion: true,
    showMood: true,
    showMentalHealth: true,
    showSleep: true,
    showSubstance: true,
  }
  try {
    const token = await getAccessTokenSilently()
    const response = await axios.get(
      apiEndpoints.getUserPreferences.insert({ userId }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const data = response.data
    dispatch(setUserId(userId))
    dispatch(setUserPreferences(data.preferences))
  } catch (e) {
    const token = await getAccessTokenSilently()
    const response = await axios.put(
      apiEndpoints.putUserPreferences.insert({ userId }),
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
    dispatch(setUserPreferences(defaultPreferences))
  }
}
