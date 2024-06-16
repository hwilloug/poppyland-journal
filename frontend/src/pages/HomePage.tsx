import React from "react"
import styled from "@emotion/styled"
import SideBarComponent from "../components/shared-components/SideBar"
import MoodTrackerComponent from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../utils/get-profile"
import { Paper, Typography } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { convertToShortDate } from "../utils/date-utils"
import { State } from "../store"

const PageContainer = styled.div`
  margin: 0px;
  display: flex;
  flex-direction: row;
`

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
      {preferences.showDailyAffirmation &&
        Object.keys(journalState.entries).includes(today) &&
        journalState.entries[today].affirmation && (
          <DailyAffiramtionContainer>
            <Typography>
              Daily Affirmation:
              <br />
              {journalState.entries[today].affirmation}
            </Typography>
          </DailyAffiramtionContainer>
        )}
      {preferences.showMood && <MoodTrackerComponent />}
      <PreviousEntriesListComponent />
    </HomePageContainer>
  )
}

export default withAuthenticationRequired(HomePage)
