import React, { useEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { State, journalActions } from "../../store"
import { Divider, StyledCheckbox } from "../shared-components/styled-components"
import { GoalsType } from "../../types/journal-types"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"

const Container = styled(Paper)`
  background-color: rgba(224, 240, 187, 0.65);
  padding: 20px;
  border: 1px solid lightgrey;
  margin: 20px 24px;
`

const GoalsTrackerComponent: React.FunctionComponent = () => {
  const { getAccessTokenSilently, user } = useAuth0()
  const data = useSelector((state: State) => state.journal.entries)
  const dates = useMemo(() => {
    let dates: { [date: string]: GoalsType[] | string } = {}
    for (let date in data) {
      dates[date] = data[date].goals || "None"
    }
    return dates
  }, [data])

  const [goals, setGoals] = useState<{ [date: string]: GoalsType[] | string }>()

  useEffect(() => {
    setGoals(dates)
  }, [dates])

  const onSubmit = async (date: string, newGoals: GoalsType[]) => {
    const token = await getAccessTokenSilently()
    journalActions.putEntry(token, user!.sub!, date, {
      ...data[date],
      date,
      goals: newGoals,
    })
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
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px", textAlign: "center" }}>
        Goals
      </Typography>
      <Grid container>
        <Divider />
        {[...Array(3).keys()].map((i) => {
          const date = new Date(new Date().setDate(new Date().getDate() - i))
          const shortDate = convertToShortDate(date)
          const dateString = convertToDayOfWeekMonthDay(date)
          return (
            <Grid
              item
              container
              alignItems={"center"}
              key={`${dateString}-${i}`}
            >
              <Grid item xs={12} md={5} lg={3}>
                <Typography
                  align="center"
                  fontWeight={"bold"}
                  sx={{ backgroundColor: "#e0f0bb", borderRadius: "10px" }}
                >
                  {dateString}
                </Typography>
              </Grid>
              <Grid item xs={12} md={7} lg={9}>
                <Grid container flexDirection={"column"}>
                  {!dates[shortDate] || dates[shortDate] === "None" ? (
                    <Grid item>
                      <Typography ml={2}>None</Typography>
                    </Grid>
                  ) : Array.isArray(dates[shortDate]) ? (
                    // @ts-ignore
                    dates[shortDate].map((goal, idx) => {
                      if (goal === null) {
                        return
                      }
                      return (
                        <Grid item container alignItems={"center"}>
                          <Grid item>
                            <StyledCheckbox
                              key={`${dateString}-${idx}-checkbox`}
                              checked={goal.checked}
                              onChange={() => toggleGoals(shortDate, idx)}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Typography display="inline-block">
                              {goal.goal}
                            </Typography>
                          </Grid>
                        </Grid>
                      )
                    })
                  ) : (
                    typeof dates[shortDate] === "string" && (
                      // @ts-ignore
                      <Typography>{dates[shortDate]}</Typography>
                    )
                  )}
                </Grid>
              </Grid>
              <Divider />
            </Grid>
          )
        })}
      </Grid>
      <Link to="/diary/goals">
        <Button
          variant="outlined"
          color="secondary"
          sx={{ minWidth: "100%", padding: "10px" }}
        >
          View All Goals
        </Button>
      </Link>
    </Container>
  )
}

export default GoalsTrackerComponent
