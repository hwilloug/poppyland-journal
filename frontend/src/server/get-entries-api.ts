import { apiEndpoints } from "../api-endpoints"
import axios from "axios"

export interface EntryResponseType {
  date: string
  mood: string
  hours_sleep: string
  bed_time: string
  wake_up_time: string
  sleep_quality: string
  affirmation: string
  mental_health: string[]
  substances: string[] | string
  entry_content: string
  goal: string
  goals: string
  weekly_goals: string
  monthly_goals: string
  yearly_goals: string
  daily_question_q: string
  daily_question_a: string
  exercise: string
}

export const call = async (token: string): Promise<EntryResponseType[]> => {
  try {
    const response = await axios.get(apiEndpoints.getEntries.insert(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.status == 200) {
      return response.data
    } else {
      console.log("something went wrong")
      return response.data
    }
  } catch (e: any) {
    return e
  }
}
