import React, { useMemo, useRef, useState } from "react"
import styled from "@emotion/styled"
import {
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Button, Paper, Typography, useTheme } from "@mui/material"
import { State } from "../../store"
import { useSelector } from "react-redux"

const Container = styled(Paper)`
  background-color: white;
  padding: 20px 20px 50px 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
`

const TimeFiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
`

export type SleepDataType = {
  date: number
  hoursSleep: number
}

const SleepTrackerComponent: React.FunctionComponent = () => {
  const theme = useTheme()

  const idealHoursSleep = useSelector(
    (state: State) => state.user.idealHoursSleep,
  )
  const today = new Date().valueOf()

  const data = useSelector((state: State) => state.journal.entries)
  const sleepData = useMemo(() => {
    let sleepData: SleepDataType[] = []
    for (let date in data) {
      if (data[date].hoursSleep !== undefined) {
        sleepData.push({
          date: new Date(date.replace(/-/g, "/")).valueOf(),
          hoursSleep: parseInt(data[date].hoursSleep!),
        })
      }
    }
    return sleepData
  }, [data])

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )
  const filteredSleepData = useMemo(() => {
    return sleepData.filter((d) => {
      return new Date(d.date) > new Date(timeFilter)
    })
  }, [sleepData, timeFilter])
  const timeFilters = [
    {
      name: "Last 7 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 7),
      ).valueOf(),
    },
    {
      name: "Last 30 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 30),
      ).valueOf(),
    },
    {
      name: "Last 90 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 90),
      ).valueOf(),
    },
    {
      name: "Last 180 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 180),
      ).valueOf(),
    },
    {
      name: "Last Year",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 365),
      ).valueOf(),
    },
  ]

  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Sleep Tracker
      </Typography>
      <TimeFiltersContainer>
        {timeFilters.map((f) => (
          <Button
            key={f.name}
            variant={
              new Date(f.firstDate).toDateString() ===
              new Date(timeFilter).toDateString()
                ? "contained"
                : "outlined"
            }
            onClick={() => setTimeFilter(f.firstDate)}
          >
            {f.name}
          </Button>
        ))}
      </TimeFiltersContainer>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
          data={filteredSleepData}
          style={{
            backgroundColor: "white",
            padding: "20px 20px 10px 0px",
          }}
        >
          <Line
            type="linear"
            dataKey="hoursSleep"
            stroke={theme.palette.primary.main}
            dot={{ stroke: theme.palette.primary.main }}
            connectNulls
          />
          <ReferenceLine
            y={idealHoursSleep}
            stroke="darkgrey"
            strokeDasharray="3 3"
          />
          <XAxis
            dataKey="date"
            type="number"
            domain={[timeFilter, today]}
            includeHidden
            tickFormatter={(value) => convertToMonthDay(new Date(value))}
          />
          <YAxis>
            <Label
              style={{
                textAnchor: "middle",
              }}
              angle={270}
              value={"Hours Slept"}
            />
          </YAxis>
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default SleepTrackerComponent
