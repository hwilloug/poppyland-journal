import { call, put } from "redux-saga/effects"
import { GetEntriesAPI, PutEntryAPI } from "../server"
import { journalActions } from "../store"
import { EntryResponseType } from "../server/get-entries-api"
import {
  JournalEntries,
  JournalEntry,
  JournalState,
} from "../types/journal-types"
import { PutEntryResponseType } from "../server/put-entry-api"

export function* putEntrySaga(action: any) {
  try {
    const response: PutEntryResponseType = yield call(
      PutEntryAPI.call,
      action.payload.token,
      action.payload.userId,
      action.payload.date,
      action.payload.entry,
    )
    yield put(
      journalActions.setEntry(action.payload.date, action.payload.entry),
    )
  } catch (e) {
    console.error(e)
  }
}
