import React from "react"
import styled from "@emotion/styled"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Typography } from "@mui/material"
import { theme } from "../../App"

const Container = styled.div`
  background-color: white;
  padding: 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
`

export type MoodDataType = {
  date: number
  mood: number
}

interface MoodTrackerProps {
  moodData: MoodDataType[]
}

const MoodTrackerComponent: React.FunctionComponent<MoodTrackerProps> = ({
  moodData,
}) => {
  const today = new Date().valueOf()
  const thirtyDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 30),
  ).valueOf()

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
        Mood Tracker - Last 30 days
      </Typography>
      <LineChart
        margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
        width={900}
        height={300}
        data={moodData}
        style={{
          backgroundColor: "white",
          padding: "20px 20px 10px 0px",
        }}
      >
        <Line
          type="monotone"
          dataKey="mood"
          stroke={theme.palette.primary.main}
          dot={{ stroke: theme.palette.primary.main }}
          connectNulls
        />
        <XAxis
          dataKey="date"
          type="number"
          domain={[thirtyDaysAgo, today]}
          includeHidden
          tickFormatter={(value) => convertToMonthDay(new Date(value))}
        />
        <YAxis domain={[0, 4]} includeHidden tick={renderCustomAxisTick} />
      </LineChart>
    </Container>
  )
}

export default MoodTrackerComponent
