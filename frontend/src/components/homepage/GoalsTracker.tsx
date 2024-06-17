import React, { useMemo } from "react"
import styled from "@emotion/styled"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../../store"
import MarkdownComponent from "../shared-components/Markdown"
import { Divider } from "../shared-components/styled-components"

const Container = styled(Paper)`
  background-color: #fffcf5;
  padding: 20px;
  margin: 20px;
  border: 1px solid lightgrey;
`

const GoalsTrackerComponent: React.FunctionComponent = () => {
  const data = useSelector((state: State) => state.journal.entries)
  const dates = useMemo(() => {
    let dates: { [date: string]: string } = {}
    for (let date in data) {
      dates[date] = data[date].goal || "None"
    }
    return dates
  }, [data])
  return (
    <Container elevation={24}>
      <Typography variant="h5" sx={{ p: "20px", textAlign: "center" }}>
        Goals
      </Typography>
      <TableContainer>
        <Grid container>
          <Divider />
          {[...Array(3).keys()].map((i) => {
            const date = new Date(new Date().setDate(new Date().getDate() - i))
            const shortDate = convertToShortDate(date)
            const dateString = convertToDayOfWeekMonthDay(date)
            return (
              <Grid item container alignItems={"center"} key={dateString}>
                <Grid item xs={12} md={5} lg={3}>
                  <Typography align="center">{dateString}</Typography>
                </Grid>
                <Grid item xs={12} md={7} lg={9}>
                  <MarkdownComponent
                    view="view"
                    value={dates[shortDate] || "None"}
                  />
                </Grid>
                <Divider />
              </Grid>
            )
          })}
        </Grid>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ minWidth: "100%", padding: "10px" }}
        >
          View All Goals
        </Button>
      </TableContainer>
    </Container>
  )
}

export default GoalsTrackerComponent
