import {
  EmergencyContactsType,
  PreferencesType,
  SubstancesType,
  UserState,
} from "../types/user-types"
import { createAction } from "./actions-utils"

export const UserActionTypes = {
  SET_IS_LOADING: "@user/set-is-loading",
  PUT_USER: "@user/put-user",
  GET_USER: "@user/get-user",
  SET_USER: "@user/set-user",
  SET_USER_PREFERENCES: "@user/set-user-preferences",
  SET_SUBSTANCES_PREFERENCE: "@user/set-substances-preference",
  SET_USER_ID: "@user/set-user-id",
  SET_FIRST_NAME: "@user/set-first-name",
  SET_LAST_NAME: "@user/set-last-name",
  SET_USER_PREFERENCE: "@user/set-user-preference",
  SET_JOURNAL_NAME: "@user/set-journal-name",
  SET_IS_DARK_MODE: "@user/set-is-dark-mode",
  SET_IDEAL_HOURS_SLEEP: "@user/set-ideal-hours-sleep",
  SET_EMERGENCY_CONTACTS: "@user/set-emergency-contacts",
  SET_EMERGENCY_PLAN: "@user/set-emergency-plan",
}

export const createUserActions = (dispatch: any) => ({
  putUser: (token: string, user: UserState) =>
    createAction(dispatch, UserActionTypes.PUT_USER, { token, user }),
  getUser: (token: string, userId: string) =>
    createAction(dispatch, UserActionTypes.GET_USER, { token, userId }),
  setUser: (user: UserState) =>
    createAction(dispatch, UserActionTypes.SET_USER, { user }),
  setUserPreferences: (preferences: PreferencesType) =>
    createAction(dispatch, UserActionTypes.SET_USER_PREFERENCES, {
      preferences,
    }),
  setUserId: (userId: string) =>
    createAction(dispatch, UserActionTypes.SET_USER_ID, { userId }),
  setFirstName: (firstName: string) =>
    createAction(dispatch, UserActionTypes.SET_FIRST_NAME, { firstName }),
  setLastName: (lastName: string) =>
    createAction(dispatch, UserActionTypes.SET_LAST_NAME, { lastName }),
  setUserPreference: (preference: string, value: boolean) =>
    createAction(dispatch, UserActionTypes.SET_USER_PREFERENCE, {
      preference,
      value,
    }),
  setSubstancesPreference: (substances: SubstancesType[]) =>
    createAction(dispatch, UserActionTypes.SET_SUBSTANCES_PREFERENCE, {
      substances,
    }),
  setJournalName: (journalName: string) =>
    createAction(dispatch, UserActionTypes.SET_JOURNAL_NAME, { journalName }),
  setIsDarkMode: (isDarkMode: boolean) =>
    createAction(dispatch, UserActionTypes.SET_IS_DARK_MODE, { isDarkMode }),
  setIdealHoursSleep: (idealHoursSleep: string) =>
    createAction(dispatch, UserActionTypes.SET_IDEAL_HOURS_SLEEP, {
      idealHoursSleep,
    }),
  setEmergencyContacts: (contacts: EmergencyContactsType[]) =>
    createAction(dispatch, UserActionTypes.SET_EMERGENCY_CONTACTS, {
      contacts,
    }),
  setEmergencyPlan: (plan: string) =>
    createAction(dispatch, UserActionTypes.SET_EMERGENCY_PLAN, { plan }),
  setIsLoading: (isLoading: boolean) =>
    createAction(dispatch, UserActionTypes.SET_IS_LOADING, { isLoading }),
})
