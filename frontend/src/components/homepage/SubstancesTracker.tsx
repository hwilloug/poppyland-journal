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

const SubstancesTracker: React.FunctionComponent = () => {
  const today = new Date().valueOf()
  const data = useSelector((state: State) => state.journal.entries)

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

  const filteredSubstanceData = useMemo(() => {
    return substancesData.filter((d) => {
      return new Date(d.x) > new Date(timeFilter)
    })
  }, [substancesData, timeFilter])

  const substancesSeries = useMemo(() => {
    let substanceSeries: {
      name: string
      type: string
      data: { x: number; y: number }[]
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
    yAxis: {
      title: {
        text: "Substance Use",
      },
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

export default SubstancesTracker
