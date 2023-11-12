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
import { Alert, Checkbox, Snackbar, TextField, Typography } from "@mui/material"
import {
  setFirstName,
  setLastName,
  setUserPreference,
} from "../reducers/user_reducer"
import { getProfile } from "../utils/get-profile"
import { useState } from "react"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"

const Container = styled.div``

const SectionHeader = styled.h3``

const SectionSubheader = styled.h5``

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
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)
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
        { preferences, first_name: firstName, last_name: lastName },
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
      <SideBarComponent defaultOpen={false} />
      <PageContentContainer>
        <SubHeader>Preferences</SubHeader>
        <Container>
          <SectionHeader>Account Preferences</SectionHeader>
          <SectionSubheader>Options related to your account.</SectionSubheader>
          <TextField
            label="First Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={firstName}
            defaultValue={0}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            sx={{ backgroundColor: "white", width: "200px" }}
          />
          <TextField
            label="Last Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastName}
            defaultValue={0}
            onChange={(e) => dispatch(setLastName(e.target.value))}
            sx={{ backgroundColor: "white", width: "200px" }}
          />

          <SectionHeader>Journal Sections</SectionHeader>
          <SectionSubheader>
            Options related to which sections to show in your journal.
          </SectionSubheader>
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
