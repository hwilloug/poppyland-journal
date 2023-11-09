import { SweetPath } from "sweet-path"

const apiBaseUrl = process.env.REACT_APP_API

export type apiEndpointsType = {}

export const apiEndpoints = {
  getEntries: new SweetPath(apiBaseUrl + "/entry"),
  getEntry: new SweetPath(apiBaseUrl + "/entry/:date"),
  createEntry: new SweetPath(apiBaseUrl + "/entry"),
  getMedications: new SweetPath(apiBaseUrl + "/medication"),
  putMedications: new SweetPath(apiBaseUrl + "/medication"),
  getUserPreferences: new SweetPath(apiBaseUrl + "/preferences"),
  putUserPreferences: new SweetPath(apiBaseUrl + "/preferences"),
}
