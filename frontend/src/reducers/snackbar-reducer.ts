import { SnackbarActionTypes } from "../actions/snackbar-actions"
import { SnackbarState } from "../types/snackbar-types"

const initialState: SnackbarState = {
  message: "",
  type: "success",
  isOpen: false,
}

export function snackbarReducer(
  state: SnackbarState = initialState,
  action: { type: any; payload: any },
) {
  switch (action.type) {
    case SnackbarActionTypes.SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payload.isOpen,
      }
    case SnackbarActionTypes.SET_SNACKBAR:
      return {
        message: action.payload.message,
        type: action.payload.type,
        isOpen: action.payload.isOpen,
      }
    default:
      return state
  }
}
