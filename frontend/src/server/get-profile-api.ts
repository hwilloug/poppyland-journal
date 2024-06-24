import axios from "axios"
import { apiEndpoints } from "../api-endpoints"
import { EmergencyType, PreferencesType } from "../types/user-types"

export interface ProfileResponseType {
  preferences: PreferencesType
  user_id: string
  first_name: string
  last_name: string
  journal_name: string
  is_dark_mode: boolean
  ideal_hours_sleep: string
  emergency: EmergencyType
}

export const call = async (token: string): Promise<ProfileResponseType> => {
  try {
    const response = await axios.get(apiEndpoints.getUserPreferences.insert(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status == 200) {
      return response.data
    } else {
      console.error("something went wrong")
      return response.data
    }
  } catch (e: any) {
    console.error(e)
    return e
  }
}
