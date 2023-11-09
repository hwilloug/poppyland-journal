import React from "react"
import styled from "@emotion/styled"
import { SubHeader } from "../shared-components/styled-components"
import {
  convertToDayOfWeekMonthDay,
  convertToMonthDay,
  convertToShortDate,
} from "../../utils/date-utils"
import { Link } from "react-router-dom"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material"

const Container = styled.div``

const EntryItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`

interface PreviousEntriesListProps {
  dates: string[]
}

const PreviousEntriesListComponent: React.FunctionComponent<
  PreviousEntriesListProps
> = ({ dates }) => {
  return (
    <Container>
      <SubHeader>Entries (last 7 days)</SubHeader>
      <TableContainer component={Paper}>
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
                  <TableCell>
                    {dates.includes(shortDate) ? "Submitted" : "Not Submitted"}
                  </TableCell>
                  <TableCell>
                    <Link to={`/edit/${shortDate}`}>Edit</Link>
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
