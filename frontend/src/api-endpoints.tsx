import { SweetPath } from "sweet-path"

const apiBaseUrl = process.env.REACT_APP_API

export type apiEndpointsType = {
    
}

export const apiEndpoints = {
    getEntries: new SweetPath(apiBaseUrl + '/entry?user_id=:userId'),
    getEntry: new SweetPath(apiBaseUrl + '/entry/:date?user_id=:userId'),
    createEntry: new SweetPath(apiBaseUrl + '/entry')
}