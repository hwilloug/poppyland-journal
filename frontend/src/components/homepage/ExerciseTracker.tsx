import React from "react"
import styled from "@emotion/styled"
import { Bar, BarChart, Label, XAxis, YAxis } from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Typography } from "@mui/material"
import { theme } from "../../App"

const Container = styled.div`
  background-color: white;
  padding: 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
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
  const thirtyDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 30),
  ).valueOf()

  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Exercise Tracker - Last 30 days
      </Typography>
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
          domain={[thirtyDaysAgo, today]}
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
