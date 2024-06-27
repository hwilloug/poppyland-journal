import {
  GoalsType,
  JournalEntries,
  JournalEntry,
  SubstancesType,
} from "../types/journal-types"
import { SnackbarTypes } from "../types/snackbar-types"
import { createAction } from "./actions-utils"

export const SnackbarActionTypes = {
  SET_IS_OPEN: "@snackbar/set-isopen",
  SET_SNACKBAR: "@snackbar/set-snackbar",
}

export const createSnackbarActions = (dispatch: any) => ({
  setIsOpen: (isOpen: boolean) =>
    createAction(dispatch, SnackbarActionTypes.SET_IS_OPEN, { isOpen }),
  setSnackbar: (message: string, type: SnackbarTypes, isOpen: boolean) =>
    createAction(dispatch, SnackbarActionTypes.SET_SNACKBAR, {
      message,
      type,
      isOpen,
    }),
})
