import { apiEndpoints } from "../api-endpoints"
import axios from "axios"

export interface DeleteEntryResponseType {}

export const call = async (token: string, date: string): Promise<any> => {
  try {
    const response = await axios.delete(
      apiEndpoints.deleteEntry.insert({ date }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    if (response.status == 200) {
      return response.data
    } else {
      console.log("something went wrong")
      return response.data
    }
  } catch (e: any) {
    return e
  }
}
