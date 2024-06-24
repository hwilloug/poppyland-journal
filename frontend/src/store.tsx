import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import { JournalState } from "./types/journal-types"
import { createJournalActions } from "./actions/journal-actions"
import { UserState } from "./types/user-types"
import { createUserActions } from "./actions/user-actions"

const sagaMiddleware = createSagaMiddleware()

export type State = {
  user: UserState
  journal: JournalState
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

const journalActions = createJournalActions(store.dispatch)
const userActions = createUserActions(store.dispatch)

sagaMiddleware.run(rootSaga)

export { store, journalActions, userActions }
