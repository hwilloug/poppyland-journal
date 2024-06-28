import { call, delay, put } from "redux-saga/effects"
import { PutProfileAPI } from "../server"
import { PutProfileResponseType } from "../server/put-profile-api"
import { snackbarActions } from "../store"

export function* putProfileSaga(action: any) {
  yield delay(500)
  try {
    const response: PutProfileResponseType = yield call(
      PutProfileAPI.call,
      action.payload.token,
      action.payload.user,
    )
    yield put(
      snackbarActions.setSnackbar(
        "Successfully saved preferences",
        "success",
        true,
      ),
    )
  } catch (e) {
    console.error(e)
    yield put(snackbarActions.setSnackbar("Error saving entry", "error", true))
  }
}
