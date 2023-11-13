import React, { useState } from "react"
import styled from "@emotion/styled"
import { Bar, BarChart, Label, XAxis, YAxis } from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Button, Typography } from "@mui/material"
import { theme } from "../../App"

const Container = styled.div`
  background-color: white;
  padding: 20px;
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
              new Date(f.firstDate).getDate() === new Date(timeFilter).getDate()
                ? "contained"
                : "outlined"
            }
            onClick={() => setTimeFilter(f.firstDate)}
          >
            {f.name}
          </Button>
        ))}
      </TimeFiltersContainer>
      <BarChart
        margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
        width={900}
        height={300}
        data={data}
        style={{
          backgroundColor: "white",
          padding: "20px 20px 10px 0px",
        }}
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
    </Container>
  )
}

export default ExerciseTrackerComponent
