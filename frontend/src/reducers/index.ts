import { combineReducers } from "@reduxjs/toolkit"
import { journalReducer } from "./journal-reducer"
import { userReducer } from "./user-reducer"

const rootReducer = combineReducers({
  user: userReducer,
  journal: journalReducer,
})

export default rootReducer
