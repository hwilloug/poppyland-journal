import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { JournalEntry } from "../types/journal-types"
import { UserState } from "../types/user-types"
import { ProfileResponseType } from "./get-profile-api"
const _ = require("lodash")

export interface PutProfileResponseType {
  ResponseMetadata: {
    HTTPStatusCode: number
  }
}

export const call = async (token: string, user: UserState): Promise<any> => {
  const payload: ProfileResponseType = {
    preferences: user.preferences,
    user_id: user.userId,
    first_name: user.firstName,
    last_name: user.lastName,
    journal_name: user.journalName,
    is_dark_mode: user.isDarkMode,
    ideal_hours_sleep: user.idealHoursSleep,
    emergency: JSON.stringify(user.emergency || {}),
    substances: user.substances || [],
  }

  try {
    const response = await axios.put(
      apiEndpoints.putUserPreferences.insert(),
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.status == 200) {
      return response.data
    } else {
      return response.data
    }
  } catch (e: any) {
    return e
  }
}
