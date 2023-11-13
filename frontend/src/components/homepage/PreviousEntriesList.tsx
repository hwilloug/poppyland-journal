import React from "react"
import styled from "@emotion/styled"
import {
  convertToDayOfWeekMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material"

const Container = styled.div`
  background-color: white;
  padding: 20px;
  margin: 50px 20px;
  border: 1px solid lightgrey;
`

interface PreviousEntriesListProps {
  dates: string[]
}

const PreviousEntriesListComponent: React.FunctionComponent<
  PreviousEntriesListProps
> = ({ dates }) => {
  return (
    <Container>
      <Typography variant="h5" sx={{ p: "20px" }}>
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
