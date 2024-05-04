import { Dispatch } from "@reduxjs/toolkit"

export const createAction = (dispatch: Dispatch, type: any, payload?: any) => {
  return dispatch({ type, payload })
}
