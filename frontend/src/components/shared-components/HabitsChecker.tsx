import { Grid, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { StyledCheckbox } from "./styled-components"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

const HabitsChecker: React.FC<{ date: string }> = ({ date }) => {
  const { getAccessTokenSilently } = useAuth0()

  const entry = useSelector((state: State) => state.journal.entries[date])
  const habits = useSelector(
    (state: State) => state.journal.entries[date]?.habits,
  )
  const userHabits = useSelector((state: State) => state.user.habits)
  const userId = useSelector((state: State) => state.user.userId)

  const saveHabits = async () => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, userId, date, entry)
  }

  useEffect(() => {
    if (habits !== undefined) {
      saveHabits()
    }
  }, [habits])

  const toggleHabit = (habit: string) => {
    const habitToEdit = habits?.filter((h) => h.habit === habit)
    if (habitToEdit?.length) {
      const newHabit = habitToEdit[0]
      let newHabits = habits ? [...habits] : [newHabit]
      const idx = habits?.indexOf(newHabit)
      newHabits[idx!] = { habit, checked: !newHabit.checked }
      journalActions.setHabits(date, newHabits)
    } else {
      journalActions.setHabits(date, [
        ...(habits || []),
        { habit, checked: true },
      ])
    }
  }

  return (
    <>
      {userHabits.map((h) => {
        let checked = false
        const currentHabit = habits?.filter((ha) => ha.habit === h)
        if (currentHabit?.length) {
          checked = currentHabit[0].checked
        }

        return (
          <Grid container alignItems={"center"}>
            <Grid item>
              <StyledCheckbox
                checked={checked}
                onChange={() => toggleHabit(h)}
              />
            </Grid>
            <Grid item>
              <Typography>{h}</Typography>
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default HabitsChecker
