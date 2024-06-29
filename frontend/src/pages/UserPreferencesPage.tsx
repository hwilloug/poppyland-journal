import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import styled from "@emotion/styled"
import {
  PageContentContainer,
  StyledCheckbox,
} from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, userActions } from "../store"
import { Button, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import TransferList from "../components/shared-components/TransferList"
import { substancesList } from "../components/todaysentrypage/SubstanceEntry"
import { SubstancesType } from "../types/user-types"

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
  const { getAccessTokenSilently } = useAuth0()
  const userProfile = useSelector((state: State) => state.user)
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
      section: "Monthly Goal",
      preference: "showMonthlyGoal",
    },
    {
      section: "Yearly Goal",
      preference: "showYearlyGoal",
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
    {
      section: "Habits",
      preference: "showHabits",
    },
  ]

  const handlePreferenceChange = (preference: string, value: boolean) => {
    userActions.setUserPreference(preference, value)
  }

  const onSubmit = async () => {
    const token = await getAccessTokenSilently()
    userActions.putUser(token, userProfile)
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
            onChange={(e) => userActions.setFirstName(e.target.value)}
            sx={{ backgroundColor: "white", width: "200px", mr: "10px" }}
          />
          <TextField
            label="Last Name"
            InputLabelProps={{
              shrink: true,
            }}
            value={lastName}
            onChange={(e) => userActions.setLastName(e.target.value)}
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
            onChange={(e) => userActions.setJournalName(e.target.value)}
            sx={{ backgroundColor: "white", width: "100%" }}
          />
          <TextField
            label="Ideal Hours Sleep"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={idealHoursSleep}
            onChange={(e) => userActions.setIdealHoursSleep(e.target.value)}
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
              <StyledCheckbox
                // @ts-ignore
                checked={preferences[s.preference] || false}
                onChange={() =>
                  handlePreferenceChange(
                    s.preference,
                    // @ts-ignore
                    !preferences[s.preference],
                  )
                }
              />
              <Typography>{s.section}</Typography>
              {s.section === "Substance Use" &&
                // @ts-ignore
                preferences[s.preference] === true && (
                  <TransferList
                    selectedValues={userProfile.substances || []}
                    allValues={substancesList}
                    setSelected={(v: SubstancesType[]) =>
                      userActions.setSubstancesPreference(v)
                    }
                  />
                )}
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
      </Container>
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(UserPreferencesPage)
