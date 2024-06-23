import React, { useMemo } from "react"
import styled from "@emotion/styled"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import { Divider } from "../shared-components/styled-components"

const Container = styled(Paper)`
  background-color: #fffcf5;
  padding: 20px;
  border: 1px solid lightgrey;
  margin-right: 20px;
`

const PreviousEntriesListComponent: React.FunctionComponent = () => {
  const data = useSelector((state: State) => state.journal.entries)
  const dates = useMemo(() => {
    let dates = []
    for (let date in data) {
      dates.push(date)
    }
    return dates
  }, [data])
  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px", textAlign: "center" }}>
        Entries
      </Typography>
      <Grid container>
        <Divider />
        {[...Array(5).keys()].map((i) => {
          const date = new Date(new Date().setDate(new Date().getDate() - i))
          const shortDate = convertToShortDate(date)
          const dateString = convertToDayOfWeekMonthDay(date)
          return (
            <Grid item container alignItems={"center"} key={dateString}>
              <Grid item xs={12} md={6}>
                <Typography align="center">{dateString}</Typography>
              </Grid>
              <Grid item xs={12} md={6} textAlign={"center"} padding={"10px"}>
                <Link to={`/${shortDate}/edit`}>
                  <Button
                    color={dates.includes(shortDate) ? "secondary" : "primary"}
                    variant="contained"
                  >
                    {dates.includes(shortDate) ? "Edit" : "Create"} Entry
                  </Button>
                </Link>
              </Grid>
              <Divider />
            </Grid>
          )
        })}
        <Link to={`/entries`} style={{ minWidth: "100%" }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ minWidth: "100%", padding: "10px" }}
          >
            View All Entries
          </Button>
        </Link>
      </Grid>
    </Container>
  )
}

export default PreviousEntriesListComponent
