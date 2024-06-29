import { Button, Grid, Input, Paper, Typography } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, userActions } from "../store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import LoadingComponent from "../components/shared-components/Loading"
import DeleteIcon from "@mui/icons-material/Delete"
import HabitsChecker from "../components/shared-components/HabitsChecker"
import { convertToShortDate } from "../utils/date-utils"

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
