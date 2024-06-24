import { call, delay } from "redux-saga/effects"
import { PutProfileAPI } from "../server"
import { PutProfileResponseType } from "../server/put-profile-api"

export function* putProfileSaga(action: any) {
  yield delay(500)
  try {
    const response: PutProfileResponseType = yield call(
      PutProfileAPI.call,
      action.payload.token,
      action.payload.user,
    )
  } catch (e) {
    console.error(e)
  }
}
