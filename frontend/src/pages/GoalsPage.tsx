import { Button, Checkbox, Grid, Input, Paper, Typography } from "@mui/material"
import {
  HeaderText,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import { useSelector } from "react-redux"
import { State, journalActions } from "../store"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
  getPreviousMonday,
} from "../utils/date-utils"
import { useAuth0 } from "@auth0/auth0-react"
import { GoalsType } from "../types/journal-types"
import DeleteIcon from "@mui/icons-material/Delete"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
const _ = require("lodash")

const GoalsPage: React.FC = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const data = useSelector((state: State) => state.journal.entries)

  const DailyGoals: React.FC = () => {
    const dates = useMemo(() => {
      let dates: { [date: string]: GoalsType[] | string } = {}
      for (let date in data) {
        dates[date] = data[date].goals || "None"
      }
      return dates
    }, [data])

    const [goals, setGoals] = useState<{
      [date: string]: GoalsType[] | string
    }>()

    useEffect(() => {
      setGoals(dates)
    }, [dates])

    const onSubmit = async (date: string, newGoals: GoalsType[]) => {
      try {
        const token = await getAccessTokenSilently()
        journalActions.putEntry(token, user!.sub!, date, {
          ...data[date],
          date,
          goals: newGoals,
        })
      } catch (e) {
        console.log(e)
      }
    }

    const toggleGoals = (date: string, index: number) => {
      if (goals !== undefined) {
        if (typeof goals[date] === "object" && Array.isArray(goals[date])) {
          const newGoals = [...(goals[date] as GoalsType[])]
          newGoals[index] = {
            ...newGoals[index],
            checked: !newGoals[index].checked,
          }
          setGoals({ ...goals, [date]: newGoals })
          onSubmit(date, newGoals)
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
                    {![shortDate] || dates[shortDate] === "None" ? (
                      <Grid item xs={12}>
                        <Typography>None</Typography>
                      </Grid>
                    ) : Array.isArray(dates[shortDate]) ? (
                      // @ts-ignore
                      dates[shortDate].map((goal, idx) => {
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
                            <Grid item xs={2}>
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
                      typeof dates[shortDate] === "string" && (
                        <Grid item xs={12}>
                          {/* @ts-ignore */}
                          <Typography>{dates[shortDate]}</Typography>
                        </Grid>
                      )
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )
          })}
        </Paper>
      </>
    )
  }

  const WeeklyGoals: React.FC = () => {
    const today = convertToShortDate(new Date())
    const lastMonday = useMemo(() => getPreviousMonday(today), [today])
    const initialWeeklyGoals = useMemo(
      () => data[lastMonday]?.weeklyGoals || [],
      [lastMonday],
    )
    const [weeklyGoals, setWeeklyGoals] =
      useState<GoalsType[]>(initialWeeklyGoals)

    const submitWeeklyGoals = useCallback(async () => {
      const token = await getAccessTokenSilently()
      journalActions.putEntry(token, user?.sub || "", lastMonday, {
        ...data[lastMonday],
        weeklyGoals: weeklyGoals,
      })
    }, [
      data,
      getAccessTokenSilently,
      journalActions,
      lastMonday,
      user?.sub,
      weeklyGoals,
    ])

    useEffect(() => {
      if (
        weeklyGoals !== undefined &&
        !_.isEqual(weeklyGoals, initialWeeklyGoals)
      ) {
        submitWeeklyGoals()
      }
    }, [weeklyGoals, lastMonday])

    const onGoalChange = useCallback(
      (index: number, goal: string, checked: boolean) => {
        if (weeklyGoals !== undefined && weeklyGoals !== null) {
          let newGoals = [...weeklyGoals]
          if (!newGoals[index]) {
            newGoals.push({ goal, checked })
          } else {
            newGoals[index] = { goal, checked }
          }
          setWeeklyGoals([...newGoals])
        } else {
          setWeeklyGoals([{ goal, checked }])
        }
      },
      [weeklyGoals],
    )

    const onGoalRemove = useCallback(
      (index: number) => {
        if (weeklyGoals !== undefined && weeklyGoals !== null) {
          const newGoals = weeklyGoals.filter((_, i) => i !== index)
          setWeeklyGoals([...newGoals])
        }
      },
      [weeklyGoals],
    )

    return (
      <>
        <HeaderText>Weekly Goals</HeaderText>
        <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}>
          {weeklyGoals.map((goal, index) => {
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
              onGoalChange(weeklyGoals.length, "", false)
            }}
          >
            <LibraryAddIcon sx={{ mr: 1 }} /> Add Goal
          </Button>
        </Paper>
      </>
    )
  }

  const MonthlyGoals: React.FC = () => (
    <>
      <HeaderText>Monthly Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}></Paper>
    </>
  )

  const YearlyGoals: React.FC = () => (
    <>
      <HeaderText>Yearly Goals</HeaderText>
      <Paper sx={{ backgroundColor: "#fffcf5", p: 4 }} elevation={24}></Paper>
    </>
  )

  return (
    <PageContentContainer style={{ maxWidth: "none" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <DailyGoals />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WeeklyGoals />
        </Grid>
        <Grid item xs={12}>
          <MonthlyGoals />
        </Grid>
        <Grid item xs={12}>
          <YearlyGoals />
        </Grid>
      </Grid>
    </PageContentContainer>
  )
}

export default GoalsPage
