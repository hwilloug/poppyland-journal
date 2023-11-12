import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import SideBarComponent from "../components/shared-components/SideBar"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import {
  Button,
  SubmitButton,
} from "../components/shared-components/styled-components"
import MedicationComponent from "../components/medicationspage/Medication"
import { Alert, Snackbar, Typography } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { getProfile } from "../utils/get-profile"

const PageContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
`

const Container = styled.div`
  padding: 20px 50px;
  flex-grow: 1;
  background-color: #fffcf5;
  min-height: 100vh;
`

const MedicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const NoMedicationsContainer = styled.div`
  margin: 20px;
`

const NewMedicationButton = styled(Button)`
  color: black;
  margin: 20px;
`

export type MedicationResponseType = {
  medication_name: string
  dose: string
  start_date: string
  end_date: string
}

export type MedicationType = {
  id: number
  name?: string
  dose?: string
  startDate?: Dayjs
  endDate?: Dayjs
  new?: boolean
}

const MedicationsPage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [snackbarMessage, setSnackbarMessage] = useState<string>()
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [medications, setMedications] = useState<MedicationType[]>([])

  const getMedications = async () => {
    setIsLoading(true)
    try {
      const token = await getAccessTokenSilently()
      const response = await axios.get(apiEndpoints.getMedications.insert(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data: MedicationResponseType[] = response.data
      let meds = []
      for (let i = 0; i < data.length; i++) {
        meds.push({
          id: i,
          name: data[i].medication_name,
          dose: data[i].dose,
          startDate: data[i].start_date ? dayjs(data[i].start_date) : undefined,
          endDate: data[i].end_date ? dayjs(data[i].end_date) : undefined,
          new: false,
        })
      }
      setMedications([...meds])
      setIsLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMedications()
    // eslint-disable-next-line
  }, [])

  const modifyMedications = (medication: MedicationType) => {
    let meds = [...medications]
    let med
    let index
    for (let i = 0; i < meds.length; i++) {
      if (meds[i].id === medication.id) {
        med = meds[i]
        index = i
        break
      }
    }
    if (med !== undefined && index !== undefined) {
      med.name = medication.name
      med.dose = medication.dose
      med.startDate = medication.startDate
      med.endDate = medication.endDate

      meds.splice(index, 1)
      setMedications([...meds, med])
    }
  }

  const addNewMedication = () => {
    setMedications([...medications, { id: medications.length, new: true }])
  }

  const handleSave = async () => {
    for (let i = 0; i < medications.length; i++) {
      try {
        if (medications[i].name) {
          const token = await getAccessTokenSilently()
          await axios.put(
            apiEndpoints.putMedications.insert(),
            {
              user_id: userId,
              medication_name: medications[i].name,
              dose: medications[i].dose,
              start_date: medications[i].startDate?.format("YYYY-MM-DD"),
              end_date: medications[i].endDate?.format("YYYY-MM-DD"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          getMedications()
          setSnackbarMessage("Successfully saved medications!")
          setSnackbarOpen(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleDelete = async (id: number) => {
    for (let i = 0; i < medications.length; i++) {
      try {
        if (medications[i].id === id) {
          const token = await getAccessTokenSilently()
          await axios.delete(
            apiEndpoints.deleteMedication.insert({ name: medications[i].name }),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          getMedications()
          setSnackbarMessage("Successfully deleted medication!")
          setSnackbarOpen(true)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <PageContainer>
      <SideBarComponent defaultOpen={false} />
      <Container>
        <Typography variant="h5" sx={{ m: "25px 0" }}>
          Medications
        </Typography>
        {!isLoading && (
          <>
            <MedicationsContainer>
              {medications.map((m) => (
                <MedicationComponent
                  key={m.id}
                  medication={m}
                  onChange={modifyMedications}
                  onDelete={handleDelete}
                />
              ))}
              {medications.length === 0 && (
                <NoMedicationsContainer>No Medications</NoMedicationsContainer>
              )}
            </MedicationsContainer>
            <NewMedicationButton onClick={() => addNewMedication()}>
              New
            </NewMedicationButton>
            <SubmitButton onClick={() => handleSave()}>Save</SubmitButton>
          </>
        )}
        {isLoading && <LoadingComponent />}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </PageContainer>
  )
}

export default withAuthenticationRequired(MedicationsPage)
