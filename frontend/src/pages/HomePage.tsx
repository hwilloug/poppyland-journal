import React from "react"
import styled from "@emotion/styled"
import MoodTrackerComponent from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../utils/get-profile"
import { Grid, Paper, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { convertToShortDate } from "../utils/date-utils"
import { State } from "../store"
import GoalsTrackerComponent from "../components/homepage/GoalsTracker"

const HomePageContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  max-width: 100%;
`

const DailyAffiramtionContainer = styled(Paper)`
  background-color: ${deepPurple[500]};
  margin: 20px;
  padding: 20px;
  color: white;
  text-align: center;
  width: 50%;
  margin: 20px auto;
`

const HomePage: React.FunctionComponent = () => {
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const journalState = useSelector((state: State) => state.journal)
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  if (journalState.isLoading) {
    return <LoadingComponent />
  }

  const today = convertToShortDate(new Date())

  return (
    <HomePageContainer>
      <Typography
        variant="h3"
        sx={{
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
        align={"center"}
      >
        Dashboard
      </Typography>
      {preferences.showDailyAffirmation &&
        Object.keys(journalState.entries).includes(today) &&
        journalState.entries[today].affirmation && (
          <DailyAffiramtionContainer elevation={24}>
            <Typography>
              Daily Affirmation:
              <br />
              {journalState.entries[today].affirmation}
            </Typography>
          </DailyAffiramtionContainer>
        )}
      {preferences.showMood && <MoodTrackerComponent />}
      <Grid container>
        <Grid item xs={12} sm={6}>
          <PreviousEntriesListComponent />
        </Grid>
        <Grid item xs={12} sm={6}>
          <GoalsTrackerComponent />
        </Grid>
      </Grid>
    </HomePageContainer>
  )
}

export default withAuthenticationRequired(HomePage)
