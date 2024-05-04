import { call, put } from "redux-saga/effects"
import { DeleteEntryAPI } from "../server"
import { DeleteEntryResponseType } from "../server/delete-entry-api"
import { journalActions } from "../store"

export function* deleteEntrySaga(action: any) {
  try {
    const response: DeleteEntryResponseType = yield call(
      DeleteEntryAPI.call,
      action.payload.token,
      action.payload.date,
    )
    yield put(journalActions.getEntries(action.payload.token))
  } catch (e) {
    console.error(e)
  }
}
