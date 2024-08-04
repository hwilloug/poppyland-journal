import React, { useMemo, useState } from "react"
import styled from "@emotion/styled"
import { Button, Grid, Paper, Typography, useTheme } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import { SubstancesType } from "../../types/journal-types"
import { convertToDayOfWeekMonthDay } from "../../utils/date-utils"
import {
  amber,
  blue,
  brown,
  green,
  pink,
  purple,
  red,
} from "@mui/material/colors"

const Container = styled(Paper)`
  background-color: rgba(224, 240, 187, 0.65);
  padding: 20px 20px 50px 20px;
  border: 1px solid lightgrey;
  margin: 20px 24px;
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

const SubstancesTracker: React.FunctionComponent = () => {
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)

  const substancesData = useMemo(() => {
    let substancesData: SubstancesDataType[] = []
    for (let date in data) {
      if (data[date]?.substances?.length) {
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

  const filteredSubstanceData = useMemo(() => {
    return substancesData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [substancesData, timeFilter])

  const substancesColors: { [substance: string]: string } = {
    Caffeine: brown[400],
    "Nicotine (Vape)": blue[400],
    "Nicotine (Cigarrette)": blue[700],
    Alcohol: purple[200],
    "Marijuana (Flower)": green[200],
    "Marijuana (Concentrate)": green[800],
    "Marijuana (Edible)": green[500],
    Cocaine: red[500],
    Mushrooms: amber[500],
    Adderall: pink[100],
    Other: "black",
  }

  const substancesSeries = useMemo(() => {
    let substanceSeries: {
      name: string
      type: string
      data: { x: number; y: number }[]
      color: string
      showInLegend: boolean
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
        color: substancesColors[substance],
        showInLegend: seriesData[substance].filter((s) => s.y !== 0).length > 0,
      })
    }
    return substanceSeries
  }, [filteredSubstanceData])

  const timeFilters = [
    {
      name: "Last Week",
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
    chart: {
      backgroundColor: "#e0f0bb",
      borderRadius: 10,
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
    yAxis: {
      title: {
        text: "Substance Use",
      },
      gridLineColor: "transparent",
    },
    plotOptions: {
      column: {
        stacking: "normal",
        pointPadding: 0.05,
        borderWidth: 0,
        groupPadding: 0,
        shadow: false,
      },
    },
    tooltip: {
      formatter: function () {
        return `${convertToDayOfWeekMonthDay(new Date(this.x!))} - ${
          this.series.name
        }: <b>${this.y}</b>`
      },
    },
    // @ts-ignore
    series: [...substancesSeries],
    legend: {
      enabled: true,
    },
  }

  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px" }} align="center">
        Substance Use Tracker
      </Typography>
      <Grid container justifyContent={"center"} gap={"20px"} mb={4}>
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

export default SubstancesTracker
