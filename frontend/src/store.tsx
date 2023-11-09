import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserType } from './reducers/user_reducer'

export type State = {
  user: UserType
}

export default configureStore({
  reducer: {
    user: userReducer,
  }
})