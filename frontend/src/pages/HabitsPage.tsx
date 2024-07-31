import { Button, Grid, Input, Paper, Typography, useTheme } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, userActions } from "../store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import DeleteIcon from "@mui/icons-material/Delete"
import HabitsChecker from "../components/shared-components/HabitsChecker"
import { convertToShortDate } from "../utils/date-utils"
import dayjs from "dayjs"

const HabitsPage: React.FC = () => {
  const isLoading = useSelector((state: State) => state.user.isLoading)
  const today = convertToShortDate(new Date())

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <PageContentContainer>
      <Typography
        variant="h4"
        sx={{
          my: "20px",
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
        align="center"
      >
        Habits Builder
      </Typography>
      <Grid container my={4}>
        <Grid item xs={12}>
          <HabitsStreaks />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            sx={{
              textShadow:
                "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
            align="center"
          >
            My Habits
          </Typography>
          <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
            <HabitsList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            sx={{
              textShadow:
                "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
            align="center"
          >
            Today
          </Typography>
          <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
            <HabitsChecker date={today} />
          </Paper>
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              textShadow:
                "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
            }}
            align="center"
          >
            Visualizer
          </Typography>
          <Paper
            sx={{ backgroundColor: "#fffcf5", p: 4 }}
            elevation={24}
          ></Paper>
        </Grid>
      </Grid>
    </PageContentContainer>
  )
}

export default HabitsPage

const HabitsList: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0()

  const userObject = useSelector((state: State) => state.user)
  const habits = useSelector((state: State) => state.user.habits)

  const saveHabits = async () => {
    const token = await getAccessTokenSilently()
    userActions.putUser(token, { ...userObject })
  }

  useEffect(() => {
    if (habits !== undefined) {
      saveHabits()
    }
  }, [habits])

  const setHabits = (value: string, idx?: number) => {
    let newHabits = [...habits]
    if (idx !== undefined) {
      newHabits[idx] = value
    } else {
      newHabits.push(value)
    }
    userActions.setHabits(newHabits)
  }

  const removeHabit = (idx: number) => {
    if (habits !== undefined) {
      let newHabits = [...habits]
      newHabits.splice(idx, 1)
      userActions.setHabits([...newHabits])
    }
  }

  return (
    <>
      {habits.map((h, idx) => (
        <Grid container key={`${idx}`}>
          <Grid item xs={10}>
            <Input
              value={h}
              onChange={(e) => setHabits(e.target.value, idx)}
              fullWidth
              sx={{
                m: "5px",
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={() => removeHabit(idx)}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button fullWidth onClick={() => setHabits("")}>
        Add Habit
      </Button>
    </>
  )
}

const HabitsStreaks: React.FC = () => {
  const habits = useSelector((state: State) => state.user.habits)
  const entries = useSelector((state: State) => state.journal.entries)

  const theme = useTheme()

  const today = convertToShortDate(new Date())

  return (
    <Grid container justifyContent={"space-evenly"}>
      {habits.map((h) => {
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
            const habitsEntry = entries[shortDate].habits?.filter(
              (ha) => ha.habit === h,
            )
            if (habitsEntry && habitsEntry.length) {
              if (habitsEntry[0].checked) {
                streak++
              }
            }
          } else {
            if (shortDate !== today) {
              break
            }
          }
        }
        return (
          <Grid item xs={3} m={2}>
            <Paper
              elevation={24}
              sx={{
                backgroundColor: theme.palette.primary.light,
                borderRadius: "5px",
                height: "100%",
              }}
            >
              <Grid
                container
                flexDirection={"column"}
                alignContent={"center"}
                alignItems={"center"}
                px={4}
                py={2}
              >
                <Grid item xs={12}>
                  <Typography textAlign={"center"}>{h}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    textAlign={"center"}
                    fontWeight={"bold"}
                    fontSize={24}
                    sx={{
                      border: "1px solid orange",
                      backgroundColor: "yellow",
                      borderRadius: "30%",
                      px: 2,
                    }}
                  >
                    {streak}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}
