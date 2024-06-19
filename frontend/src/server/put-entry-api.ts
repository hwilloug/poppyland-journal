import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { JournalEntry } from "../types/journal-types"
const _ = require("lodash")

export interface PutEntryResponseType {}

export const call = async (
  token: string,
  userId: string,
  date: string,
  entry: JournalEntry,
): Promise<any> => {
  const newEntry = _.cloneDeep(entry)

  try {
    const response = await axios.put(
      apiEndpoints.createEntry.insert(),
      {
        user_id: userId,
        date,
        mood:
          newEntry.mood !== undefined && newEntry.mood !== null
            ? newEntry.mood.toString()
            : undefined,
        bed_time: newEntry.bedTime,
        wake_up_time: newEntry.wakeUpTime,
        hours_sleep: newEntry.hoursSleep
          ? newEntry.hoursSleep.toString()
          : undefined,
        sleep_quality: newEntry.sleepQuality,
        affirmation: newEntry.affirmation,
        goals: Array.isArray(newEntry.goals)
          ? JSON.stringify(newEntry.goals)
          : newEntry.goals,
        weekly_goals: newEntry.weeklyGoals
          ? JSON.stringify(newEntry.weeklyGoals)
          : undefined,
        monthly_goals: newEntry.monthlyGoals
          ? JSON.stringify(newEntry.monthlyGoals)
          : undefined,
        mental_health: newEntry.mentalHealth,
        substances: JSON.stringify(newEntry.substances),
        entry_content: newEntry.entryContent,
        daily_question_q: newEntry.dailyQuestionQ,
        daily_question_a: newEntry.dailyQuestionA,
        exercise:
          newEntry.exercise !== undefined
            ? newEntry.exercise.toString()
            : undefined,
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
