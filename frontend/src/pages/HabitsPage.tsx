import { Button, Input, Paper, Typography } from "@mui/material"
import { PageContentContainer } from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, userActions } from "../store"
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react"

const HabitsPage: React.FC = () => {
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
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
        <HabitsList />
      </Paper>
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
    userActions.putUser(token, { ...userObject, habits })
  }

  useEffect(() => {
    if (habits !== undefined) {
      saveHabits()
    }
  }, [habits])

  const setHabits = (value: string, idx?: number) => {
    let newHabits = [...habits]
    if (idx) {
      newHabits[idx] = value
    } else {
      newHabits = [value]
    }
    userActions.setHabits(newHabits)
  }

  return (
    <>
      {habits.map((h, idx) => (
        <Input
          key={idx}
          value={h}
          onChange={(e) => setHabits(e.target.value, idx)}
          fullWidth
        />
      ))}
      <Button fullWidth onClick={() => setHabits("")}>
        Add Habit
      </Button>
    </>
  )
}
