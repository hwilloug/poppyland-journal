import React, { useMemo } from "react"
import MoodTrackerComponent from "../components/homepage/MoodTracker"
import PreviousEntriesListComponent from "../components/homepage/PreviousEntriesList"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { Grid, Paper, Typography, styled, useTheme } from "@mui/material"
import { blue, green, orange, purple, red, yellow } from "@mui/material/colors"
import { convertToShortDate } from "../utils/date-utils"
import { State } from "../store"
import GoalsTrackerComponent from "../components/homepage/GoalsTracker"
import dayjs from "dayjs"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import SleepTracker from "../components/homepage/SleepTracker"
import SubstancesTracker from "../components/homepage/SubstancesTracker"

const HomePageContainer = styled("div")`
  padding: 20px;
  flex-grow: 1;
  max-width: 100%;
  margin-right: 20px;
`

const DailyAffiramtionContainer = styled(Paper)(({ theme }) => ({
  backgroundImage: "url(/affirmation_background.png)",
  backgroundSize: "cover",
  backgroundPosition: "top",
  padding: "20px",
  color: "black",
  textAlign: "center",
  width: "50%",
  margin: "40px auto",
  marginBottom: "40px",
  border: "1px outset white",

  position: "relative",
  ":before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))",
    zIndex: 1,
  },
}))

const HomePage: React.FunctionComponent = () => {
  const journalState = useSelector((state: State) => state.journal)
  const preferences = useSelector((state: State) => state.user.preferences)
  const entries = useSelector((state: State) => state.journal.entries)

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

  const avgMoodBgColor = useMemo(() => {
    switch (Math.round(avgMood)) {
      case 0:
        return `linear-gradient(to bottom, ${red[200]}, ${red[400]})`
      case 1:
        return `linear-gradient(to bottom, ${orange[200]}, ${orange[400]})`
      case 2:
        return `linear-gradient(to bottom, ${blue[200]}, ${blue[400]})`
      case 3:
        return `linear-gradient(to bottom, ${green[200]}, ${green[400]})`
      case 4:
        return `linear-gradient(to bottom, ${purple[200]}, ${purple[400]})`
      default:
        return `linear-gradient(to bottom, ${green[200]}, ${green[400]})`
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
          <>
            <DailyAffiramtionContainer elevation={24}>
              <Typography
                variant="h5"
                align="center"
                position={"relative"}
                zIndex={2}
                sx={{
                  textShadow:
                    "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
                }}
              >
                Daily Affirmation
              </Typography>
              <Typography position={"relative"} zIndex={2} color={"white"}>
                {journalState.entries[today].affirmation}
              </Typography>
            </DailyAffiramtionContainer>
          </>
        )}

      <Grid container>
        <Grid item xs={12}>
          {preferences.showMood && <MoodTrackerComponent />}
        </Grid>
        <Grid item xs={12} md={6}>
          {preferences.showSleep && <SleepTracker />}
        </Grid>
        <Grid item xs={12} md={6}>
          {preferences.showSubstance && <SubstancesTracker />}
        </Grid>
      </Grid>

      <Grid container margin={"20px"} justifyContent={"center"}>
        <StatCard
          name="Number of Entries"
          value={numEntries}
          color={`linear-gradient(to bottom, ${purple[500]}, ${purple[800]})`}
        />
        <StatCard
          name="Streak"
          value={streak}
          color={`linear-gradient(to bottom,${yellow[500]}, ${yellow[800]})`}
        />
        <StatCard
          name="Average Mood Last 7 Days"
          value={avgMoodIcon}
          color={avgMoodBgColor}
        />
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

const StatContainer = styled(Grid)(({ theme }) => ({
  padding: "20px 10px",
  borderRadius: "5px",
  border: "1px outset white",
  margin: "20px",
  backgroundPosition: "bottom",
  backgroundSize: "cover",
  textShadow:
    "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
}))

const StatCard: React.FC<{ name: string; value: any; color: string }> = ({
  name,
  value,
  color,
}) => {
  return (
    <StatContainer
      item
      xs={12}
      sm={3}
      sx={{
        backgroundImage: color,
      }}
      container
      flexDirection={"column"}
      justifyContent={"space-evenly"}
    >
      <Grid item>
        <Typography
          align="center"
          color={"white"}
          fontWeight={"bold"}
          position={"relative"}
          zIndex={2}
          sx={{ textShadow: "none" }}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          align="center"
          fontSize={36}
          fontWeight={"bold"}
          position={"relative"}
          zIndex={2}
        >
          {value}
        </Typography>
      </Grid>
    </StatContainer>
  )
}
