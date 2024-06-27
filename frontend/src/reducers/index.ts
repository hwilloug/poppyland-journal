import { combineReducers } from "@reduxjs/toolkit"
import { journalReducer } from "./journal-reducer"
import { userReducer } from "./user-reducer"
import { snackbarReducer } from "./snackbar-reducer"

const rootReducer = combineReducers({
  user: userReducer,
  journal: journalReducer,
  snackbar: snackbarReducer,
})

export default rootReducer
