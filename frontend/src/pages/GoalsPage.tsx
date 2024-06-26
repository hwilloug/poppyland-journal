import { Button, Checkbox, Grid, Input, Paper, Typography } from "@mui/material"
import {
  HeaderText,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../store"
import React, { useCallback, useMemo } from "react"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
  getFirstDayOfMonth,
  getFirstOfYear,
  getPreviousMonday,
} from "../utils/date-utils"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { GoalsType } from "../types/journal-types"
import DeleteIcon from "@mui/icons-material/Delete"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import LoadingComponent from "../components/shared-components/Loading"

const GoalsPage: React.FC = () => {
  const isLoading = useSelector((state: State) => state.journal.isLoading)

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <PageContentContainer style={{ maxWidth: "none" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <DailyGoals />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          container
          flexDirection={"column"}
          spacing={4}
        >
          <Grid item>
            <WeeklyGoals />
          </Grid>
          <Grid item>
            <MonthlyGoals />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <YearlyGoals />
        </Grid>
      </Grid>
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(GoalsPage)

const DailyGoals: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const userId = useSelector((state: State) => state.user.userId)
  const data = useSelector((state: State) => state.journal.entries)

  const goalsPerDate = useMemo(() => {
    let dates: { [date: string]: GoalsType[] } = {}
    for (let date in data) {
      dates[date] = data[date].goals || []
    }
    return dates
  }, [data])

  const toggleGoals = async (date: string, index: number) => {
    const token = await getAccessTokenSilently()
    if (goalsPerDate[date] !== undefined) {
      if (
        typeof goalsPerDate[date] === "object" &&
        Array.isArray(goalsPerDate[date])
      ) {
        const newGoals = [...(goalsPerDate[date] as GoalsType[])]
        newGoals[index] = {
          ...newGoals[index],
          checked: !newGoals[index].checked,
        }
        journalActions.setGoals(date, [...newGoals])
        journalActions.putEntry(token, userId, date, {
          ...data[date],
          goals: [...newGoals],
        })
      }
    }
  }

  return (
    <>
      <HeaderText>Daily Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
        {[...Array(7).keys()].map((i) => {
          const date = new Date(new Date().setDate(new Date().getDate() - i))
          const shortDate = convertToShortDate(date)
          const dateString = convertToDayOfWeekMonthDay(date)
          return (
            <Grid item container key={`${dateString}-${i}`}>
              <Grid item xs={12}>
                <Typography variant="h6">{dateString}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container flexDirection={"column"} mb={4}>
                  {![shortDate] || !goalsPerDate[shortDate]?.length ? (
                    <Grid item xs={12}>
                      <Typography>None</Typography>
                    </Grid>
                  ) : Array.isArray(goalsPerDate[shortDate]) ? (
                    // @ts-ignore
                    goalsPerDate[shortDate].map((goal, idx) => {
                      if (goal === null) {
                        return null
                      }
                      return (
                        <Grid
                          item
                          xs={12}
                          key={`${dateString}-${idx}`}
                          container
                          wrap="nowrap"
                          alignItems={"center"}
                        >
                          <Grid item>
                            <Checkbox
                              key={`${dateString}-${idx}-checkbox`}
                              checked={goal.checked}
                              onChange={() => toggleGoals(shortDate, idx)}
                            />
                          </Grid>
                          <Grid item xs={10}>
                            <Typography display="inline-block">
                              {goal.goal}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                    })
                  ) : (
                    typeof goalsPerDate[shortDate] === "string" && (
                      <Grid item xs={12}>
                        {/* @ts-ignore */}
                        <Typography>{goalsPerDate[shortDate]}</Typography>
                      </Grid>
                    )
                  )}
                </Grid>
                <hr />
              </Grid>
            </Grid>
          )
        })}
      </Paper>
    </>
  )
}

const WeeklyGoals: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const userId = useSelector((state: State) => state.user.userId)

  const today = convertToShortDate(new Date())
  const lastMonday = useMemo(() => getPreviousMonday(today), [today])

  const lastMondaysEntry = useSelector(
    (state: State) => state.journal.entries[lastMonday],
  )
  const weeklyGoals = useSelector(
    (state: State) => state.journal.entries[lastMonday]?.weeklyGoals,
  )

  const save = async (newGoals: GoalsType[]) => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, userId, lastMonday, {
      ...lastMondaysEntry,
      weeklyGoals: newGoals,
    })
  }

  const onGoalChange = useCallback(
    (index: number, goal: string, checked: boolean) => {
      if (weeklyGoals !== undefined && weeklyGoals !== null) {
        let newGoals = [...weeklyGoals]
        if (!newGoals[index]) {
          newGoals.push({ goal, checked })
        } else {
          newGoals[index] = { goal, checked }
        }
        journalActions.setWeeklyGoals(lastMonday, [...newGoals])
        save(newGoals)
      } else {
        journalActions.setWeeklyGoals(lastMonday, [{ goal, checked }])
        save([{ goal, checked }])
      }
    },
    [weeklyGoals],
  )

  const onGoalRemove = useCallback(
    (index: number) => {
      if (weeklyGoals !== undefined && weeklyGoals !== null) {
        const newGoals = weeklyGoals.filter((_, i) => i !== index)
        journalActions.setWeeklyGoals(lastMonday, [...newGoals])
        save(newGoals)
      }
    },
    [weeklyGoals],
  )

  return (
    <>
      <HeaderText>Weekly Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
        {weeklyGoals &&
          weeklyGoals.map((goal, index) => {
            if (goal === null) {
              return
            }
            return (
              <Grid container key={`weekly-goal-${index}`} textAlign={"center"}>
                <Grid item xs={2}>
                  <Checkbox
                    checked={goal.checked}
                    onChange={() =>
                      onGoalChange(index, goal.goal, !goal.checked)
                    }
                  />
                </Grid>
                <Grid item xs={8}>
                  <Input
                    fullWidth
                    value={goal.goal}
                    onChange={(e) =>
                      onGoalChange(index, e.target.value, goal.checked)
                    }
                    multiline
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => onGoalRemove(index)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            )
          })}
        <Button
          onClick={() => {
            onGoalChange(weeklyGoals ? weeklyGoals.length : 0, "", false)
          }}
        >
          <LibraryAddIcon sx={{ mr: 1 }} /> Add Goal
        </Button>
      </Paper>
    </>
  )
}

const MonthlyGoals: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const userId = useSelector((state: State) => state.user.userId)
  const data = useSelector((state: State) => state.journal.entries)

  const today = convertToShortDate(new Date())
  const lastFirst = useMemo(() => getFirstDayOfMonth(today), [today])

  const lastFirstEntry = useSelector(
    (state: State) => state.journal.entries[lastFirst],
  )
  const monthlyGoals = useSelector(
    (state: State) => state.journal.entries[lastFirst]?.monthlyGoals,
  )

  const save = async (newGoals: GoalsType[]) => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, userId, lastFirst, {
      ...lastFirstEntry,
      monthlyGoals: newGoals,
    })
  }

  const onGoalChange = useCallback(
    (index: number, goal: string, checked: boolean) => {
      if (monthlyGoals !== undefined && monthlyGoals !== null) {
        let newGoals = [...monthlyGoals]
        if (!newGoals[index]) {
          newGoals.push({ goal, checked })
        } else {
          newGoals[index] = { goal, checked }
        }
        journalActions.setMonthlyGoals(lastFirst, [...newGoals])
        save(newGoals)
      } else {
        journalActions.setMonthlyGoals(lastFirst, [{ goal, checked }])
        save([{ goal, checked }])
      }
    },
    [monthlyGoals],
  )

  const onGoalRemove = useCallback(
    (index: number) => {
      if (monthlyGoals !== undefined && monthlyGoals !== null) {
        const newGoals = monthlyGoals.filter((_, i) => i !== index)
        journalActions.setMonthlyGoals(lastFirst, [...newGoals])
      }
    },
    [monthlyGoals],
  )

  return (
    <>
      <HeaderText>Monthly Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
        {monthlyGoals &&
          monthlyGoals.map((goal, index) => {
            if (goal === null) {
              return
            }
            return (
              <Grid container key={`weekly-goal-${index}`} textAlign={"center"}>
                <Grid item xs={2}>
                  <Checkbox
                    checked={goal.checked}
                    onChange={() =>
                      onGoalChange(index, goal.goal, !goal.checked)
                    }
                  />
                </Grid>
                <Grid item xs={8}>
                  <Input
                    fullWidth
                    value={goal.goal}
                    onChange={(e) =>
                      onGoalChange(index, e.target.value, goal.checked)
                    }
                    multiline
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => onGoalRemove(index)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            )
          })}
        <Button
          onClick={() => {
            onGoalChange(monthlyGoals ? monthlyGoals.length : 0, "", false)
          }}
        >
          <LibraryAddIcon sx={{ mr: 1 }} /> Add Goal
        </Button>
      </Paper>
    </>
  )
}

const YearlyGoals: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0()

  const userId = useSelector((state: State) => state.user.userId)
  const data = useSelector((state: State) => state.journal.entries)

  const today = convertToShortDate(new Date())
  const lastFirst = useMemo(() => getFirstOfYear(today), [today])

  const lastFirstEntry = useSelector(
    (state: State) => state.journal.entries[lastFirst],
  )
  const yearlyGoals = useSelector(
    (state: State) => state.journal.entries[lastFirst]?.yearlyGoals,
  )

  const save = async (newGoals: GoalsType[]) => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, userId, lastFirst, {
      ...lastFirstEntry,
      yearlyGoals: newGoals,
    })
  }

  const onGoalChange = useCallback(
    (index: number, goal: string, checked: boolean) => {
      if (yearlyGoals !== undefined && yearlyGoals !== null) {
        let newGoals = [...yearlyGoals]
        if (!newGoals[index]) {
          newGoals.push({ goal, checked })
        } else {
          newGoals[index] = { goal, checked }
        }
        journalActions.setYearlyGoals(lastFirst, [...newGoals])
        save(newGoals)
      } else {
        journalActions.setYearlyGoals(lastFirst, [{ goal, checked }])
        save([{ goal, checked }])
      }
    },
    [yearlyGoals],
  )

  const onGoalRemove = useCallback(
    (index: number) => {
      if (yearlyGoals !== undefined && yearlyGoals !== null) {
        const newGoals = yearlyGoals.filter((_, i) => i !== index)
        journalActions.setYearlyGoals(lastFirst, [...newGoals])
      }
    },
    [yearlyGoals],
  )

  return (
    <>
      <HeaderText>Yearly Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
        {yearlyGoals &&
          yearlyGoals.map((goal, index) => {
            if (goal === null) {
              return
            }
            return (
              <Grid container key={`weekly-goal-${index}`} textAlign={"center"}>
                <Grid item xs={2}>
                  <Checkbox
                    checked={goal.checked}
                    onChange={() =>
                      onGoalChange(index, goal.goal, !goal.checked)
                    }
                  />
                </Grid>
                <Grid item xs={8}>
                  <Input
                    fullWidth
                    value={goal.goal}
                    onChange={(e) =>
                      onGoalChange(index, e.target.value, goal.checked)
                    }
                    multiline
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button onClick={() => onGoalRemove(index)}>
                    <DeleteIcon />
                  </Button>
                </Grid>
              </Grid>
            )
          })}
        <Button
          onClick={() => {
            onGoalChange(yearlyGoals ? yearlyGoals.length : 0, "", false)
          }}
        >
          <LibraryAddIcon sx={{ mr: 1 }} /> Add Goal
        </Button>
      </Paper>
    </>
  )
}
