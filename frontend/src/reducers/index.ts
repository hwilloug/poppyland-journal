import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./user_reducer"
import { journalReducer } from "./journal-reducer"

const rootReducer = combineReducers({
  user: userReducer,
  journal: journalReducer,
})

export default rootReducer
