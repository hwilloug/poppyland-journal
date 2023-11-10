import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import {
  PageContainer,
  PageContentContainer,
  SubHeader,
  SubmitButton,
} from "../components/shared-components/styled-components"
import SideBarComponent from "../components/shared-components/SideBar"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import { Alert, Checkbox, Snackbar, Typography } from "@mui/material"
import { PreferencesType, setUserPreference } from "../reducers/user_reducer"
import { getProfile } from "../utils/get-profile"
import { useEffect, useState } from "react"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"

const Container = styled.div``

const SectionHeader = styled.h3``

const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
`

const UserPreferencesPage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  const dispatch = useDispatch()
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")

  const sections = [
    {
      section: "Daily Affirmation",
      preference: "showDailyAffirmation",
    },
    {
      section: "Daily Goal",
      preference: "showDailyGoal",
    },
    {
      section: "Daily Question",
      preference: "showDailyQuestion",
    },
    {
      section: "Mood",
      preference: "showMood",
    },
    {
      section: "Mental Health & Behavior",
      preference: "showMentalHealth",
    },
    {
      section: "Substance Use",
      preference: "showSubstance",
    },
    {
      section: "Exercise",
      preference: "showExercise",
    },
  ]

  const handlePreferenceChange = (preference: string, value: boolean) => {
    dispatch(setUserPreference({ preference, value }))
  }

  const onSubmit = async () => {
    try {
      const token = await getAccessTokenSilently()
      await axios.put(
        apiEndpoints.putUserPreferences.insert(),
        { preferences },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setSnackbarMessage("Successfully saved preferences!")
      setSnackbarOpen(true)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <PageContainer>
      <SideBarComponent />
      <PageContentContainer>
        <SubHeader>Preferences</SubHeader>
        <Container>
          <SectionHeader>Journal Sections</SectionHeader>
          {sections.map((s) => (
            <PreferenceContainer key={s.preference}>
              <Checkbox
                // @ts-ignore
                checked={preferences[s.preference]}
                onChange={() =>
                  handlePreferenceChange(
                    s.preference,
                    // @ts-ignore
                    !preferences[s.preference],
                  )
                }
              />
              <Typography>{s.section}</Typography>
            </PreferenceContainer>
          ))}
          <SubmitButton onClick={() => onSubmit()}>Save</SubmitButton>
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
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(UserPreferencesPage)
