import React, { useMemo } from "react"
import MoodTrackerComponent from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../utils/get-profile"
import { Grid, Paper, Typography, styled, useTheme } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { convertToShortDate } from "../utils/date-utils"
import { State } from "../store"
import GoalsTrackerComponent from "../components/homepage/GoalsTracker"
import dayjs from "dayjs"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"

const HomePageContainer = styled("div")`
  padding: 20px;
  flex-grow: 1;
  max-width: 100%;
  margin-right: 20px;
`

const DailyAffiramtionContainer = styled(Paper)`
  background-image: linear-gradient(
    to bottom,
    ${deepPurple[400]},
    ${deepPurple[700]}
  );
  padding: 20px;
  color: white;
  text-align: center;
  width: 50%;
  margin: 40px auto;
  border: 1px outset white;
`

const StatContainer = styled(Grid)(({ theme }) => ({
  color: "white",
  padding: "20px 10px",
  borderRadius: "5px",
  border: "1px outset white",
  margin: "20px",
}))

const HomePage: React.FunctionComponent = () => {
  const theme = useTheme()
  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const journalState = useSelector((state: State) => state.journal)
  const userId = useSelector((state: State) => state.user.userId)
  const preferences = useSelector((state: State) => state.user.preferences)
  const entries = useSelector((state: State) => state.journal.entries)

  if (!userId) {
    getProfile(user!.sub!, dispatch, getAccessTokenSilently)
  }

  const today = convertToShortDate(new Date())
  const todayObject = new Date()

  const numEntries = useMemo(() => Object.keys(entries).length, [entries])

  const streak = useMemo(() => {
    let streak = 0
    const todayDayjs = dayjs(today)
    const firstEntryDayjs = dayjs(
      Object.keys(entries)[Object.keys(entries).length - 1],
    )
    const numDays = todayDayjs.diff(firstEntryDayjs, "day")

    for (let i = 0; i < numDays - 1; i++) {
      const date = todayDayjs.subtract(i, "day")
      const shortDate = date.toISOString().split("T")[0]
      if (Object.keys(entries).includes(shortDate)) {
        streak++
      } else {
        if (shortDate !== today) {
          break
        }
      }
    }
    return streak
  }, [entries])

  const avgMood = useMemo(() => {
    const last7entries = Object.keys(entries).slice(0, 7)
    const todayDayjs = dayjs(today)

    let moodTotal = 0
    let moodCount = 0
    for (let i = 0; i <= 7; i++) {
      const date = todayDayjs.subtract(i, "day").toISOString().split("T")[0]
      if (last7entries.includes(date)) {
        if (entries[date].mood) {
          moodTotal += parseInt(entries[date].mood!)
          moodCount += 1
        }
      }
    }
    return moodTotal / moodCount
  }, [entries])

  const avgMoodIcon = useMemo(() => {
    switch (Math.round(avgMood)) {
      case 0:
        return (
          <SentimentVeryDissatisfiedIcon color={"error"} fontSize="large" />
        )
      case 1:
        return <SentimentDissatisfiedIcon color={"warning"} fontSize="large" />
      case 2:
        return <SentimentNeutralIcon color={"info"} fontSize="large" />
      case 3:
        return <SentimentSatisfiedIcon color={"success"} fontSize="large" />
      case 4:
        return (
          <SentimentVerySatisfiedIcon
            sx={{ color: "purple" }}
            fontSize="large"
          />
        )
    }
  }, [avgMood])

  if (journalState.isLoading) {
    return <LoadingComponent />
  }

  return (
    <HomePageContainer>
      <Typography
        variant="h3"
        sx={{
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
        mt={3}
        align={"center"}
      >
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
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
      <Grid container margin={"20px"} justifyContent={"center"}>
        <StatContainer
          item
          xs={12}
          sm={3}
          sx={{
            backgroundImage: `linear-gradient(to bottom, #FFE500, #EFB208)`,
            color: "black",
          }}
        >
          <Typography align="center">Streak:</Typography>
          <Typography align="center" fontWeight={"bold"}>
            {streak}
          </Typography>
        </StatContainer>
        <StatContainer
          item
          xs={12}
          sm={3}
          sx={{
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            color: "black",
          }}
        >
          <Typography align="center">
            Number of Entries:
            <Typography align="center" fontWeight={"bold"}>
              {numEntries}
            </Typography>
          </Typography>
        </StatContainer>
        <StatContainer
          item
          xs={12}
          sm={3}
          sx={{
            backgroundImage: `linear-gradient(to bottom,  #FFE500, #EFB208)`,
            color: "black",
          }}
        >
          <Typography align="center">
            Average Mood Last 7 Days:
            <Typography align="center" fontWeight={"bold"}>
              {avgMoodIcon}
            </Typography>
          </Typography>
        </StatContainer>
      </Grid>
      <Grid container margin={"20px"}>
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
