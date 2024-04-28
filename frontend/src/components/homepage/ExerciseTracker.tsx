import React, { useRef, useState } from "react"
import styled from "@emotion/styled"
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Button, Paper, Typography, useTheme } from "@mui/material"

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

export type ExerciseDataType = {
  date: number
  minutesExercise: number
}

interface ExerciseTrackerProps {
  data: ExerciseDataType[]
}

const ExerciseTrackerComponent: React.FunctionComponent<
  ExerciseTrackerProps
> = ({ data }) => {
  const theme = useTheme()

  const today = new Date().valueOf()

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )
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

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Exercise Tracker
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
        <BarChart
          margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
          data={data}
          style={{
            backgroundColor: "white",
            padding: "20px 20px 10px 0px",
          }}
          barCategoryGap={0}
        >
          <Bar
            type="monotone"
            dataKey="minutesExercise"
            fill={theme.palette.primary.main}
          />
          <XAxis
            dataKey="date"
            type="number"
            domain={[timeFilter, today]}
            includeHidden
            interval={0}
            tickFormatter={(value) => convertToMonthDay(new Date(value))}
          />
          <YAxis>
            <Label
              style={{
                textAnchor: "middle",
              }}
              angle={270}
              value={"Minutes Exercised"}
            />
          </YAxis>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default ExerciseTrackerComponent
