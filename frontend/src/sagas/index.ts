import { fork, takeLatest } from "redux-saga/effects"
import { getEntriesSaga } from "./get-entries-saga"
import { JournalActionTypes } from "../actions/journal-actions"
import { deleteEntrySaga } from "./delete-entry-saga"
import { putEntrySaga } from "./put-entry-saga"

function* entrySagas() {
  yield takeLatest(JournalActionTypes.GET_ENTRIES, getEntriesSaga)
  yield takeLatest(JournalActionTypes.PUT_ENTRY, putEntrySaga)
  yield takeLatest(JournalActionTypes.DELETE_ENTRY, deleteEntrySaga)
}

export default function* rootSaga() {
  yield fork(entrySagas)
}
