import React from "react"
import styled from "@emotion/styled"
import { SubHeader } from "../shared-components/styled-components"
import { Line, LineChart, XAxis, YAxis } from "recharts"
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied"
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied"
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied"
import { convertToMonthDay } from "../../utils/date-utils"

const Container = styled.div``

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
        color = "red"
        break
      case 1:
        mouth = <path d="M8,17 Q12,14 16,17" />
        color = "orange"
        break
      case 2:
        mouth = <path d="M8,17 16,17" />
        color = "blue"
        break
      case 3:
        mouth = <path d="M8,17 Q12,20 16,17" />
        color = "green"
        break
      case 4:
        mouth = (
          <>
            <path d="M8,17 Q12,20 16,17" />
            <rect x="7" y="16" width="10" height="0.25" />
          </>
        )
        color = "purple"
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
      <SubHeader>Mood Tracker - Last 30 days</SubHeader>
      <LineChart
        margin={{ top: 5, left: 5, right: 5, bottom: 5 }}
        width={900}
        height={300}
        data={moodData}
        style={{
          backgroundColor: "white",
          padding: "20px 20px 10px 0px",
          boxShadow: "1px 1px 1px lightgrey",
          border: "1px solid lightgrey",
        }}
      >
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#8d5bc1"
          dot={{ stroke: "#8d5bc1" }}
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
