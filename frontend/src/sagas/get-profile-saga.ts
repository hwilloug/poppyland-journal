import { call, put } from "redux-saga/effects"
import { GetProfileAPI } from "../server"
import { snackbarActions, userActions } from "../store"
import { ProfileResponseType } from "../server/get-profile-api"

export function* getProfileSaga(action: any) {
  yield put(userActions.setIsLoading(true))
  try {
    const response: ProfileResponseType = yield call(
      GetProfileAPI.call,
      action.payload.token,
    )
    yield put(
      userActions.setUser({
        preferences: response.preferences,
        userId: response.user_id,
        firstName: response.first_name,
        lastName: response.last_name,
        journalName: response.journal_name,
        isDarkMode: response.is_dark_mode,
        idealHoursSleep: response.ideal_hours_sleep,
        emergency: response.emergency
          ? JSON.parse(response.emergency)
          : undefined,
      }),
    )
  } catch (e) {
    console.error(e)
    yield put(
      snackbarActions.setSnackbar("Error getting user profile", "error", true),
    )
  } finally {
    yield put(userActions.setIsLoading(false))
  }
}
