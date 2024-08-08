import {
  Button,
  Container,
  Grid,
  Input,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, userActions } from "../store"
import React, { useEffect, useState } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import DeleteIcon from "@mui/icons-material/Delete"
import HabitsChecker from "../components/shared-components/HabitsChecker"
import { convertToShortDate } from "../utils/date-utils"
import WestIcon from "@mui/icons-material/West"
import EastIcon from "@mui/icons-material/East"
import { format, addMonths, subMonths, startOfWeek, addDays } from "date-fns"

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
            "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
        }}
        align="center"
      >
        Habits Builder
      </Typography>
      <Grid container spacing={2} alignItems={"stretch"}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            sx={{
              textShadow:
                "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
            }}
            align="center"
          >
            My Habits
          </Typography>
          <Paper sx={{ backgroundColor: "#e0f0bb", p: 4 }} elevation={24}>
            <HabitsList />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            sx={{
              textShadow:
                "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
            }}
            align="center"
          >
            Today
          </Typography>
          <Paper sx={{ backgroundColor: "#e0f0bb", p: 4 }} elevation={24}>
            <HabitsChecker date={today} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ backgroundColor: "#e0f0bb", p: 4 }} elevation={24}>
            <Calendar />
          </Paper>
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

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const onDateClick = () => {}

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  const CalendarHeader: React.FC = () => {
    const dateFormat = "MMMM yyyy"

    return (
      <Grid container alignItems={"center"}>
        <Grid item xs={1}>
          <WestIcon onClick={prevMonth} sx={{ cursor: "pointer" }} />
        </Grid>
        <Grid item xs={10} textAlign={"center"}>
          <Typography>{format(currentMonth, dateFormat)}</Typography>
        </Grid>
        <Grid item xs={1}>
          <EastIcon onClick={nextMonth} sx={{ cursor: "pointer" }} />
        </Grid>
      </Grid>
    )
  }

  const CalendarDaysOfWeek: React.FC = () => {
    const dateFormat = "EEE"
    const startDate = startOfWeek(currentMonth)

    let days = []
    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item key={i} xs={1.71} textAlign={"center"} pt={2}>
          <Typography>{format(addDays(startDate, i), dateFormat)}</Typography>
        </Grid>,
      )
    }

    return <Grid container>{days}</Grid>
  }

  const CalendarDays: React.FC = () => {
    return <></>
  }

  return (
    <Container>
      <CalendarHeader />
      <CalendarDaysOfWeek />
      <CalendarDays />
    </Container>
  )
}
