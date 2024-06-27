import { call, delay, put } from "redux-saga/effects"
import { PutEntryAPI } from "../server"
import { journalActions, snackbarActions } from "../store"
import { PutEntryResponseType } from "../server/put-entry-api"

export function* putEntrySaga(action: any) {
  yield put(journalActions.setIsSaving(true))
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
    yield put(snackbarActions.setSnackbar("Error saving entry", "error", true))
  } finally {
    yield put(journalActions.setIsSaving(false))
  }
}
