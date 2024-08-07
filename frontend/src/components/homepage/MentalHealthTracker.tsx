import React, { useMemo, useState } from "react"
import styled from "@emotion/styled"
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { convertToDateObject } from "../../utils/date-utils"
import {
  amber,
  blue,
  brown,
  green,
  pink,
  purple,
  red,
} from "@mui/material/colors"
require("highcharts/highcharts-more")(Highcharts)

const Container = styled(Paper)`
  background-color: rgba(224, 240, 187, 0.65);
  padding: 20px 20px 50px 20px;
  border: 1px solid lightgrey;
  margin: 20px 24px;
  height: 86%;
`

export type DataType = {
  x: number
  y: number
  marker?: {
    fillColor: string
  }
}

export type MentalHealthDataType = {
  value: number
  name: string
}

const MentalHealthTracker: React.FunctionComponent = () => {
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)

  const [timeFilter, setTimeFilter] = useState(
    new Date(new Date(today).setDate(new Date(today).getDate() - 7)).valueOf(),
  )

  const mentalHealthData = useMemo(() => {
    let mentalHealthData: MentalHealthDataType[] = []
    for (let date in data) {
      if (convertToDateObject(date).valueOf() < timeFilter) {
        break
      }
      for (let idx in data[date].mentalHealth) {
        const symptomsData = mentalHealthData.filter(
          (s) => s.name === data[date].mentalHealth[idx],
        )
        if (symptomsData.length) {
          const val =
            mentalHealthData[mentalHealthData.indexOf(symptomsData[0])]
          mentalHealthData[mentalHealthData.indexOf(symptomsData[0])] = {
            ...val,
            value: val.value + 1,
          }
        } else {
          mentalHealthData.push({
            value: 1,
            name: data[date].mentalHealth[idx],
          })
        }
      }
    }
    return mentalHealthData
  }, [data, timeFilter])

  const timeFilters = [
    {
      name: "Last 7 Days",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 7),
      ).valueOf(),
    },
    {
      name: "Last 2 Weeks",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 14),
      ).valueOf(),
    },
    {
      name: "Last Month",
      firstDate: new Date(
        new Date(today).setDate(new Date(today).getDate() - 30),
      ).valueOf(),
    },
  ]

  const chartOptions: Highcharts.Options = {
    chart: {
      type: "packedbubble",
      backgroundColor: "transparent",
    },
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
    tooltip: {
      pointFormat: `<b>{point.name}</b>: {point.y}`,
    },
    series: [
      // @ts-ignore
      {
        name: "Mental Health & Behavior",
        data: mentalHealthData,
      },
    ],
    legend: {
      enabled: false,
    },
    plotOptions: {
      packedbubble: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        color: red[400],
        minSize: 50,
        maxSize: 100,
        draggable: false,
      },
    },
  }

  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Mental Health Summary
      </Typography>
      <Grid container justifyContent={"center"} gap={"20px"}>
        {timeFilters.map((f) => (
          <Button
            key={f.name}
            size="small"
            variant="contained"
            onClick={() => setTimeFilter(f.firstDate)}
            color={
              new Date(f.firstDate).toDateString() ===
              new Date(timeFilter).toDateString()
                ? "primary"
                : "secondary"
            }
          >
            {f.name}
          </Button>
        ))}
      </Grid>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Container>
  )
}

export default MentalHealthTracker
