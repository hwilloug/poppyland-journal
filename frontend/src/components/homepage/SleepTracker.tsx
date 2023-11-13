import React from "react"
import styled from "@emotion/styled"
import { Label, Line, LineChart, XAxis, YAxis } from "recharts"
import { convertToMonthDay } from "../../utils/date-utils"
import { Typography } from "@mui/material"

const Container = styled.div`
  background-color: white;
  padding: 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
`

export type SleepDataType = {
  date: number
  hoursSleep: number
}

interface SleepTrackerProps {
  sleepData: SleepDataType[]
}

const SleepTrackerComponent: React.FunctionComponent<SleepTrackerProps> = ({
  sleepData,
}) => {
  const today = new Date().valueOf()
  const thirtyDaysAgo = new Date(
    new Date().setDate(new Date().getDate() - 30),
  ).valueOf()

  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }}>
        Sleep Tracker - Last 30 days
      </Typography>
      <LineChart
        margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
        width={900}
        height={300}
        data={sleepData}
        style={{
          backgroundColor: "white",
          padding: "20px 20px 10px 0px",
        }}
      >
        <Line
          type="monotone"
          dataKey="hoursSleep"
          stroke="#8d5bc1"
          dot={{ stroke: "#8d5bc1" }}
          connectNulls
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
            value={"Hours Slept"}
          />
        </YAxis>
      </LineChart>
    </Container>
  )
}

export default SleepTrackerComponent
