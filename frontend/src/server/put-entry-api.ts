import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { JournalEntry } from "../types/journal-types"

export interface PutEntryResponseType {}

export const call = async (
  token: string,
  userId: string,
  date: string,
  entry: JournalEntry,
): Promise<any> => {
  try {
    const response = await axios.put(
      apiEndpoints.createEntry.insert(),
      {
        user_id: userId,
        date,
        mood:
          entry.mood !== undefined && entry.mood !== null
            ? entry.mood.toString()
            : undefined,
        bed_time: entry.bedTime,
        wake_up_time: entry.wakeUpTime,
        hours_sleep: entry.hoursSleep ? entry.hoursSleep.toString() : undefined,
        sleep_quality: entry.sleepQuality,
        affirmation: entry.affirmation,
        goal: entry.goal,
        mental_health: entry.mentalHealth,
        substances: entry.substances,
        entry_content: entry.entryContent,
        daily_question_q: entry.dailyQuestionQ,
        daily_question_a: entry.dailyQuestionA,
        exercise:
          entry.exercise !== undefined ? entry.exercise.toString() : undefined,
      },
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
