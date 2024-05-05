import { JournalEntries, JournalEntry } from "../types/journal-types"
import { createAction } from "./actions-utils"

export const JournalActionTypes = {
  GET_ENTRIES: "@journal/get-entries",
  SET_ENTRIES: "@journal/set-entries",
  SET_ENTRY: "@journal/set-entry",
  PUT_ENTRY: "@journal/put-entry",
  DELETE_ENTRY: "@journal/delete-entry",
  SET_IS_LOADING: "@journal/set-is-loading",
}

export const createJournalActions = (dispatch: any) => ({
  getEntries: (token: string) =>
    createAction(dispatch, JournalActionTypes.GET_ENTRIES, { token }),
  setEntries: (entries: JournalEntries) =>
    createAction(dispatch, JournalActionTypes.SET_ENTRIES, { entries }),
  setEntry: (date: string, entry: JournalEntry) =>
    createAction(dispatch, JournalActionTypes.SET_ENTRY, { date, entry }),
  putEntry: (
    token: string,
    userId: string,
    date: string,
    entry: JournalEntry,
  ) =>
    createAction(dispatch, JournalActionTypes.PUT_ENTRY, {
      token,
      date,
      userId,
      entry,
    }),
  deleteEntry: (token: string, date: string) =>
    createAction(dispatch, JournalActionTypes.DELETE_ENTRY, { token, date }),
  setIsLoading: (isLoading: boolean) =>
    createAction(dispatch, JournalActionTypes.SET_IS_LOADING, { isLoading }),
})
