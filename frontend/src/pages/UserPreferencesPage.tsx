import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useDispatch, useSelector } from "react-redux"
import { State } from "../store"
import {
  Alert,
  Button,
  Checkbox,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import {
  setFirstName,
  setLastName,
  setUserPreference,
  setJournalName,
  setIdealHoursSleep,
} from "../reducers/user_reducer"
import { getProfile } from "../utils/get-profile"
import { useMemo, useState } from "react"
import { apiEndpoints } from "../api-endpoints"
import axios from "axios"

const Container = styled.div`
  margin-top: 20px;
`

const SettingSection = styled.div`
  background-color: white;
  border: 1px solid lightgrey;
  margin-bottom: 30px;
  padding: 20px;
`

const PreferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
`

const SubmitButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const UserPreferencesPage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const userId = useSelector((state: State) => state.user.userId)
  const firstName = useSelector((state: State) => state.user.firstName)
  const lastName = useSelector((state: State) => state.user.lastName)
  const preferences = useSelector((state: State) => state.user.preferences)
  const journalName = useSelector((state: State) => state.user.journalName)
  const idealHoursSleepRaw = useSelector(
    (state: State) => state.user.idealHoursSleep,
  )
  const idealHoursSleep = useMemo(
    () => parseFloat(idealHoursSleepRaw),
    [idealHoursSleepRaw],
  )
  const dispatch = useDispatch()
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>("")

  const sections = [
    {
      section: "Mood",
      preference: "showMood",
    },
    {
      section: "Sleep",
      preference: "showSleep",
    },
    {
      section: "Daily Affirmation",
      preference: "showDailyAffirmation",
    },
    {
      section: "Daily Goal",
      preference: "showDailyGoal",
    },
    {
      section: "Weekly Goal",
      preference: "showWeeklyGoal",
    },
    {
      section: "Daily Question",
      preference: "showDailyQuestion",
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
        {
          preferences,
          first_name: firstName,
          last_name: lastName,
          journal_name: journalName,
          ideal_hours_sleep: idealHoursSleep.toString(),
        },
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
    <PageContentContainer>
      <Typography variant="h4" align="center">
        Preferences
      </Typography>
      <Container>
        <SettingSection>
          <Typography variant="h6">Account Preferences</Typography>
          <Typography sx={{ mt: "10px", mb: "20px" }}>
            Options related to your account.
          </Typography>
          <TextField
            label="First Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={firstName}
            defaultValue={0}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
            sx={{ backgroundColor: "white", width: "200px", mr: "10px" }}
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
        </SettingSection>
        <SettingSection>
          <Typography variant="h6">Journal Options</Typography>
          <Typography sx={{ mt: "10px", mb: "20px" }}>
            Options related to your journal.
          </Typography>
          <TextField
            label="Journal Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={journalName}
            onChange={(e) => dispatch(setJournalName(e.target.value))}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <TextField
            label="Ideal Hours Sleep"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={idealHoursSleep}
            onChange={(e) => dispatch(setIdealHoursSleep(e.target.value))}
            sx={{ backgroundColor: "white", mt: "20px" }}
          />
        </SettingSection>
        <SettingSection>
          <Typography variant="h6">Journal Sections</Typography>
          <Typography sx={{ my: "10px" }}>
            Options related to which sections to show in your journal.
          </Typography>
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
        </SettingSection>
        <SubmitButtonContainer>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}
            sx={{ mt: "20px" }}
          >
            Save
          </Button>
        </SubmitButtonContainer>
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
  )
}

export default withAuthenticationRequired(UserPreferencesPage)
