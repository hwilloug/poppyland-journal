import { call, put } from "redux-saga/effects"
import { DeleteEntryAPI } from "../server"
import { DeleteEntryResponseType } from "../server/delete-entry-api"
import { journalActions, snackbarActions } from "../store"

export function* deleteEntrySaga(action: any) {
  try {
    const response: DeleteEntryResponseType = yield call(
      DeleteEntryAPI.call,
      action.payload.token,
      action.payload.date,
    )
    yield put(journalActions.getEntries(action.payload.token))
    yield put(
      snackbarActions.setSnackbar(
        "Successfully deleted entry",
        "success",
        true,
      ),
    )
  } catch (e) {
    console.error(e)
    yield put(
      snackbarActions.setSnackbar("Error deleting entry", "error", true),
    )
  }
}
