import { fork, takeLatest } from "redux-saga/effects"
import { getEntriesSaga } from "./get-entries-saga"
import { JournalActionTypes } from "../actions/journal-actions"
import { deleteEntrySaga } from "./delete-entry-saga"
import { putEntrySaga } from "./put-entry-saga"
import { UserActionTypes } from "../actions/user-actions"
import { getProfileSaga } from "./get-profile-saga"
import { putProfileSaga } from "./put-profile-saga"

function* entrySagas() {
  yield takeLatest(JournalActionTypes.GET_ENTRIES, getEntriesSaga)
  yield takeLatest(JournalActionTypes.PUT_ENTRY, putEntrySaga)
  yield takeLatest(JournalActionTypes.DELETE_ENTRY, deleteEntrySaga)
}

function* userSagas() {
  yield takeLatest(UserActionTypes.GET_USER, getProfileSaga)
  yield takeLatest(UserActionTypes.PUT_USER, putProfileSaga)
}

export default function* rootSaga() {
  yield fork(entrySagas)
  yield fork(userSagas)
}
