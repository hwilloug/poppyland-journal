import { call, delay, put } from "redux-saga/effects"
import { PutEntryAPI } from "../server"
import { journalActions } from "../store"
import { PutEntryResponseType } from "../server/put-entry-api"

export function* putEntrySaga(action: any) {
  yield put(journalActions.setIsSaving(true))
  yield put(journalActions.setEntry(action.payload.date, action.payload.entry))
  yield delay(500)
  try {
    const response: PutEntryResponseType = yield call(
      PutEntryAPI.call,
      action.payload.token,
      action.payload.userId,
      action.payload.date,
      action.payload.entry,
    )
  } catch (e) {
    console.error(e)
  } finally {
    yield put(journalActions.setIsSaving(false))
  }
}
