import React, { useMemo, useRef, useState } from "react"
import styled from "@emotion/styled"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Button, Paper, Typography, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"

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

export type MoodDataType = {
  date: number
  mood: number
}

const MoodTrackerComponent: React.FunctionComponent = () => {
  const theme = useTheme()
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)
  const moodData = useMemo(() => {
    let moodData: MoodDataType[] = []
    for (let date in data) {
      if (data[date].mood !== undefined) {
        moodData.push({
          date: new Date(date.replace(/-/g, "/")).valueOf(),
          mood: parseInt(data[date].mood!),
        })
      }
    }
    return moodData
  }, [data])

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )
  const filteredMoodData = useMemo(() => {
    return moodData.filter((d) => {
      return new Date(d.date) > new Date(timeFilter)
    })
  }, [moodData, timeFilter])
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

  const renderCustomAxisTick = ({
    x,
    y,
    payload,
  }: {
    x: number
    y: number
    payload: any
  }) => {
    let mouth
    let color
    switch (payload.value) {
      case 0:
        mouth = (
          <>
            <path d="M8,18 Q12,14 16,18" />
            <rect x="8" y="18" width="8" height="0.25" />
          </>
        )
        color = theme.palette.error.main
        break
      case 1:
        mouth = <path d="M8,17 Q12,14 16,17" />
        color = theme.palette.warning.main
        break
      case 2:
        mouth = <path d="M8,17 16,17" />
        color = theme.palette.info.main
        break
      case 3:
        mouth = <path d="M8,17 Q12,20 16,17" />
        color = theme.palette.success.main
        break
      case 4:
        mouth = (
          <>
            <path d="M8,17 Q12,20 16,17" />
            <rect x="7" y="16" width="10" height="0.25" />
          </>
        )
        color = theme.palette.primary.main
        break
    }
    return (
      <svg
        x={x - 20}
        y={y - 12}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="10" r="1" />
        <circle cx="16" cy="10" r="1" />
        {mouth}
      </svg>
    )
  }

  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Mood Tracker
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
      <ResponsiveContainer height={250} width="100%">
        <LineChart
          margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
          data={filteredMoodData}
          style={{
            backgroundColor: "white",
            padding: "20px 20px 10px 0px",
          }}
        >
          <Line
            type="linear"
            dataKey="mood"
            stroke={theme.palette.primary.main}
            dot={{ stroke: theme.palette.primary.main }}
            connectNulls
          />
          <XAxis
            dataKey="date"
            type="number"
            domain={[timeFilter, today]}
            includeHidden
            tickFormatter={(value) => convertToMonthDay(new Date(value))}
          />
          <YAxis domain={[0, 4]} includeHidden tick={renderCustomAxisTick} />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default MoodTrackerComponent
