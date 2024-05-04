import React from "react"
import styled from "@emotion/styled"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import {
  Button,
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

const Container = styled(Paper)`
  background-color: white;
  padding: 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
`

const PreviousEntriesListComponent: React.FunctionComponent = () => {
  const dates = useSelector((state: State) => {
    let dates = []
    for (let date in state.journal.entries) {
      dates.push(date)
    }
    return dates
  })
  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px", textAlign: "center" }}>
        Entries - last 7 days
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {[...Array(7).keys()].map((i) => {
              const date = new Date(
                new Date().setDate(new Date().getDate() - i),
              )
              const shortDate = convertToShortDate(date)
              const dateString = convertToDayOfWeekMonthDay(date)
              return (
                <TableRow key={dateString}>
                  <TableCell>{dateString}</TableCell>
                  <TableCell align="center">
                    {dates.includes(shortDate) ? "Submitted" : "Not Submitted"}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/edit/${shortDate}`}>
                      <Button color="primary" variant="contained">
                        {dates.includes(shortDate) ? "Edit" : "Create"} Entry
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default PreviousEntriesListComponent
