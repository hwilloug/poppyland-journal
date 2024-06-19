import { call, put } from "redux-saga/effects"
import { GetEntriesAPI } from "../server"
import { journalActions } from "../store"
import { EntryResponseType } from "../server/get-entries-api"
import { JournalEntries, SubstancesType } from "../types/journal-types"
import { substancesList } from "../components/todaysentrypage/SubstanceEntry"

export function* getEntriesSaga(action: any) {
  yield put(journalActions.setIsLoading(true))
  try {
    const response: EntryResponseType[] = yield call(
      GetEntriesAPI.call,
      action.payload.token,
    )

    const mappedEntries: JournalEntries = response.reduce(
      (previousValue, currentValue: EntryResponseType) => {
        let substancesInitialValue = substancesList.map((s) => ({
          substance: s,
          amount: 0,
        }))
        let substances: string | string[] | SubstancesType[] =
          currentValue.substances
        if (Array.isArray(substances)) {
          if (!substances.length) {
            substances = substancesInitialValue
          } else {
            // @ts-ignore
            substances = substancesInitialValue.map((s) => {
              // @ts-ignore
              if (substances.includes(s.substance)) {
                return { substance: s.substance, amount: 1 }
              } else {
                return s
              }
            })
          }
        } else if (
          substances !== undefined &&
          substances !== null &&
          typeof substances === "string"
        ) {
          substances = JSON.parse(substances)
          if (Array.isArray(substances) || substances.length === 0) {
            // @ts-ignore
            substances = substancesInitialValue.map((s) => {
              let value = s
              // @ts-ignore
              for (let idx in substances) {
                // @ts-ignore
                if (substances[idx].substance === s.substance) {
                  // @ts-ignore
                  value = substances[idx]
                }
              }
              return value
            })
          }
        } else {
          substances = substancesInitialValue
        }
        console.log(substances)
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
            substances: substances,
            entryContent: currentValue.entry_content,
            goals:
              typeof currentValue.goals === "string" &&
              currentValue.goals[0] === "["
                ? JSON.parse(currentValue.goals)
                : currentValue.goals,
            weeklyGoals: JSON.parse(currentValue.weekly_goals) || [],
            dailyQuestionQ: currentValue.daily_question_q,
            dailyQuestionA: currentValue.daily_question_a,
            exercise: currentValue.exercise,
          },
        }
      },
      {},
    )
    yield put(journalActions.setEntries(mappedEntries))
  } catch (e) {
    console.error(e)
  } finally {
    yield put(journalActions.setIsLoading(false))
  }
}
