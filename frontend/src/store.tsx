import { configureStore } from "@reduxjs/toolkit"
import { UserType } from "./reducers/user_reducer"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./reducers"
import rootSaga from "./sagas"
import { JournalState } from "./types/journal-types"
import { createJournalActions } from "./actions/journal-actions"

const sagaMiddleware = createSagaMiddleware()

export type State = {
  user: UserType
  journal: JournalState
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
})

const journalActions = createJournalActions(store.dispatch)

sagaMiddleware.run(rootSaga)

export { store, journalActions }
