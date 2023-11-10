import React from "react"
import styled from "@emotion/styled"
import { SubHeader } from "../shared-components/styled-components"
import { Bar, BarChart, Label, Line, LineChart, XAxis, YAxis } from "recharts"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { convertToMonthDay } from "../../utils/date-utils"

const Container = styled.div``

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
      <SubHeader>Exercise Tracker - Last 30 days</SubHeader>
      <BarChart
        margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
        width={900}
        height={300}
        data={data}
        style={{
          backgroundColor: "white",
          padding: "20px 20px 10px 0px",
          boxShadow: "1px 1px 1px lightgrey",
          border: "1px solid lightgrey",
        }}
      >
        <Bar type="monotone" dataKey="minutesExercise" fill="#8d5bc1" />
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
