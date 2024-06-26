import React, { useMemo, useState } from "react"
import styled from "@emotion/styled"
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { SubstancesType } from "../../types/journal-types"
import { convertToDayOfWeekMonthDay } from "../../utils/date-utils"

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

const SleepTracker: React.FunctionComponent = () => {
  const theme = useTheme()
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)
  const userPreferences = useSelector((state: State) => state.user)

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

  const getSleepQualityInt = (quality: string) => {
    switch (quality) {
      case "Bad":
        return 0
      case "Interrupted":
        return 1
      case "Good":
        return 2
      default:
        return 0
    }
  }

  const sleepQualityData = useMemo(() => {
    let sleepData: DataType[] = []
    for (let date in data) {
      if (data[date].sleepQuality !== undefined) {
        sleepData.push({
          x: new Date(date.replace(/-/g, "/")).valueOf(),
          y: getSleepQualityInt(data[date].sleepQuality!),
        })
      }
    }
    sleepData.sort((a, b) => a.x - b.x)
    return sleepData
  }, [data])

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )

  const filteredSleepData = useMemo(() => {
    return sleepData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [sleepData, timeFilter])

  const filteredSleepQualityData = useMemo(() => {
    return sleepQualityData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [sleepQualityData, timeFilter])

  const timeFilters = [
    {
      name: "Last 7 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 7),
      ).valueOf(),
    },
    {
      name: "Last 14 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 14),
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
          text: "Hours Sleep",
        },
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
          text: "Sleep Quality",
        },
        opposite: true,
        min: 0,
        max: 3,
        visible: false,
      },
    ],
    plotOptions: {
      column: {
        stacking: "normal",
      },
    },
    tooltip: {
      formatter: function () {
        switch (this.series.name) {
          case "Sleep Quality":
            let value = ""
            if (this.y === 0) {
              value = "Bad"
            } else if (this.y === 1) {
              value = "Interrupted"
            } else if (this.y === 2) {
              value = "Good"
            }
            return `${convertToDayOfWeekMonthDay(
              new Date(this.x!),
            )}: <b>${value}</b>`
          default:
            return `${convertToDayOfWeekMonthDay(new Date(this.x!))}: <b>${
              this.y
            } hours</b>`
        }
      },
    },
    series: [
      {
        name: "Sleep",
        data: filteredSleepData,
        type: "spline",
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
        zIndex: 1,
      },
      {
        name: "Sleep Quality",
        data: filteredSleepQualityData,
        type: "column",
        yAxis: 1,
        zIndex: 0,
        color: theme.palette.secondary.dark,
        visible: false,
      },
    ],
    legend: {
      enabled: true,
    },
  }

  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Sleep Tracker
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

export default SleepTracker
