import { call, put } from "redux-saga/effects"
import { GetEntriesAPI } from "../server"
import { journalActions } from "../store"
import { EntryResponseType } from "../server/get-entries-api"
import {
  JournalEntries,
  JournalEntry,
  JournalState,
} from "../types/journal-types"

export function* getEntriesSaga(action: any) {
  yield put(journalActions.setIsLoading(true))
  try {
    const response: EntryResponseType[] = yield call(
      GetEntriesAPI.call,
      action.payload.token,
    )

    const mappedEntries: JournalEntries = response.reduce(
      (previousValue, currentValue: EntryResponseType) => {
        console.log(currentValue.goals)
        return {
          ...previousValue,
          [currentValue.date]: {
            date: currentValue.date,
            mood: currentValue.mood,
            hoursSleep: currentValue.hours_sleep,
            bedTime: currentValue.bed_time,
            wakeUpTime: currentValue.wake_up_time,
            sleepQuality: currentValue.sleep_quality,
            affirmation: currentValue.affirmation,
            mentalHealth: currentValue.mental_health,
            substances: currentValue.substances,
            entryContent: currentValue.entry_content,
            goals:
              typeof currentValue.goals === "string" &&
              currentValue.goals[0] === "["
                ? JSON.parse(currentValue.goals)
                : undefined,
            dailyQuestionQ: currentValue.daily_question_q,
            dailyQuestionA: currentValue.daily_question_a,
            exercise: currentValue.exercise,
          },
        }
      },
      {},
    )
    console.log(mappedEntries)
    yield put(journalActions.setEntries(mappedEntries))
  } catch (e) {
    console.error(e)
  } finally {
    yield put(journalActions.setIsLoading(false))
  }
}
