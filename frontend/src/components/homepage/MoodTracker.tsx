import React, { useMemo, useState } from "react"
import styled from "@emotion/styled"
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { SubstancesType } from "../../types/journal-types"

const Container = styled(Paper)`
  background-color: #fffcf5;
  padding: 20px 20px 50px 20px;
  border: 1px solid lightgrey;
  margin-left: 24px;
  margin-top: 20px;
`

export type DataType = {
  x: number
  y: number
  marker?: {
    fillColor: string
  }
}

export type SubstancesDataType = {
  x: number
  y: SubstancesType[]
}

const MoodTrackerComponent: React.FunctionComponent = () => {
  const theme = useTheme()
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)
  const userPreferences = useSelector((state: State) => state.user)
  const moodColors = {
    "0": theme.palette.error.main,
    "1": theme.palette.warning.main,
    "2": theme.palette.info.main,
    "3": theme.palette.success.main,
    "4": theme.palette.primary.main,
  }
  const moodData = useMemo(() => {
    let moodData: DataType[] = []
    for (let date in data) {
      if (data[date].mood !== undefined) {
        moodData.push({
          x: new Date(date.replace(/-/g, "/")).valueOf(),
          y: parseInt(data[date].mood!),
        })
      }
    }
    moodData.sort((a, b) => a.x - b.x)
    return moodData
  }, [data])

  const sleepData = useMemo(() => {
    let sleepData: DataType[] = []
    for (let date in data) {
      if (data[date].hoursSleep !== undefined) {
        sleepData.push({
          x: new Date(date.replace(/-/g, "/")).valueOf(),
          y: parseFloat(data[date].hoursSleep!),
        })
      }
    }
    sleepData.sort((a, b) => a.x - b.x)
    return sleepData
  }, [data])

  const exerciseData = useMemo(() => {
    let exerciseData: DataType[] = []
    for (let date in data) {
      if (data[date].exercise !== undefined) {
        exerciseData.push({
          x: new Date(date.replace(/-/g, "/")).valueOf(),
          y: parseInt(data[date].exercise!),
        })
      }
    }
    exerciseData.sort((a, b) => a.x - b.x)
    return exerciseData
  }, [data])

  const substancesData = useMemo(() => {
    let substancesData: SubstancesDataType[] = []
    for (let date in data) {
      if (data[date].substances.length) {
        substancesData.push({
          x: new Date(date.replace(/-/g, "/")).valueOf(),
          y: data[date].substances,
        })
      }
    }
    substancesData.sort((a, b) => a.x - b.x)
    return substancesData
  }, [data])

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )
  const filteredMoodData = useMemo(() => {
    return moodData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [moodData, timeFilter])

  const filteredSleepData = useMemo(() => {
    return sleepData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [sleepData, timeFilter])

  const filteredExerciseData = useMemo(() => {
    return exerciseData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [exerciseData, timeFilter])

  const filteredSubstanceData = useMemo(() => {
    return substancesData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [substancesData, timeFilter])

  const substancesSeries = useMemo(() => {
    let substanceSeries: {
      name: string
      type: string
      visible: boolean
      data: { x: number; y: number }[]
      yAxis: number
    }[] = []
    let seriesData: { [substance: string]: { x: number; y: number }[] } = {}
    for (let i = 0; i < filteredSubstanceData.length; i++) {
      const substances = filteredSubstanceData[i].y
      for (let j = 0; j < substances.length; j++) {
        if (!seriesData[substances[j].substance]) {
          seriesData[substances[j].substance] = []
        }
        seriesData[substances[j].substance].push({
          x: filteredSubstanceData[i].x,
          y: substances[j].amount,
        })
      }
    }
    for (let substance in seriesData) {
      substanceSeries.push({
        name: substance,
        data: seriesData[substance],
        type: "column",
        visible: false,
        yAxis: 3,
      })
    }
    return substanceSeries
  }, [filteredSubstanceData])

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

  const chartOptions: Highcharts.Options = {
    title: {
      text: "",
    },
    xAxis: {
      min: timeFilter,
      labels: {
        formatter: function () {
          return (
            (new Date(this.value).getMonth() + 1).toString() +
            "/" +
            new Date(this.value).getDate().toString()
          )
        },
      },
    },
    yAxis: [
      {
        title: {
          text: "Mood",
        },
        max: 4.5,
        min: 0,
        labels: {
          useHTML: true,
          // @ts-ignore
          formatter: function () {
            let mouth
            let color
            // @ts-ignore
            switch (this.value) {
              case 0:
                mouth = `<>
                  <path d="M8,18 Q12,14 16,18" />
                  <rect x="8" y="18" width="8" height="0.25" />
                </>`
                color = theme.palette.error.main
                break
              case 1:
                mouth = `<path d="M8,17 Q12,14 16,17" />`
                color = theme.palette.warning.main
                break
              case 2:
                mouth = `<path d="M8,17 16,17" />`
                color = theme.palette.info.main
                break
              case 3:
                mouth = `<path d="M8,17 Q12,20 16,17" />`
                color = theme.palette.success.main
                break
              case 4:
                mouth = `<>
                  <path d="M8,17 Q12,20 16,17" />
                  <rect x="7" y="16" width="10" height="0.25" />
                </>`
                color = theme.palette.primary.main
                break
            }
            return `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke=${color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="10" r="1" />
              <circle cx="16" cy="10" r="1" />
              ${mouth}
            </svg>`
          },
        },
      },
      {
        title: {
          text: "Hours Sleep",
        },
        opposite: true,
        plotLines: [
          {
            color: "lightgrey",
            value: parseFloat(userPreferences.idealHoursSleep) + 0.5,
            dashStyle: "Dash",
            width: 2,
          },
          {
            color: "lightgrey",
            value: parseFloat(userPreferences.idealHoursSleep) - 0.5,
            dashStyle: "Dash",
            width: 2,
          },
        ],
      },
      {
        title: {
          text: "Minutes Exercise",
        },
        opposite: true,
      },
      {
        title: {
          text: "Substance Use",
        },
        opposite: true,
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    series: [
      // @ts-ignore
      {
        name: "Mood",
        data: filteredMoodData,
        yAxis: 0,
        zIndex: 1,
        color: theme.palette.info.main,
        zones: [
          {
            value: 0.5,
            color: moodColors["0"],
          },
          {
            value: 1.5,
            color: moodColors["1"],
          },
          {
            value: 2.5,
            color: moodColors["2"],
          },
          {
            value: 3.5,
            color: moodColors["3"],
          },
          {
            value: 4.5,
            color: moodColors["4"],
          },
        ],
      },
      {
        name: "Sleep",
        data: filteredSleepData,
        type: "line",
        visible: false,
        yAxis: 1,
        color: "darkgrey",
        zones: [
          {
            value: parseFloat(userPreferences.idealHoursSleep) - 0.5,
            color: theme.palette.warning.main,
          },
          {
            value: parseFloat(userPreferences.idealHoursSleep) + 0.5,
            color: "darkgrey",
          },
          {
            color: theme.palette.warning.main,
          },
        ],
      },
      {
        name: "Exercise",
        data: filteredExerciseData,
        type: "column",
        yAxis: 2,
        visible: false,
        color: theme.palette.secondary.main,
      },
      // @ts-ignore
      ...substancesSeries,
    ],
    legend: {
      enabled: true,
    },
  }

  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Mood Tracker
      </Typography>
      <Grid container justifyContent={"center"} gap={"20px"}>
        {timeFilters.map((f) => (
          <Button
            key={f.name}
            size="small"
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
      </Grid>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Container>
  )
}

export default MoodTrackerComponent
