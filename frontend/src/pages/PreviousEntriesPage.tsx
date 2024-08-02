import React, { useMemo } from "react"
import { PageContentContainer } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"

import LoadingComponent from "../components/shared-components/Loading"
import { useSelector } from "react-redux"
import { State } from "../store"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import { convertToDateObject } from "../utils/date-utils"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab"
import { JournalEntry } from "../types/journal-types"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import ViewEntry from "../components/shared-components/ViewEntry"
import { withAuthenticationRequired } from "@auth0/auth0-react"

const ContentContainer = styled.div`
  display: flex;
`

const NoEntriesContainer = styled.div`
  padding: 20px;
`

const PreviousEntriesPage: React.FunctionComponent = () => {
  const theme = useTheme()
  const isLargerThanSm = useMediaQuery(theme.breakpoints.up("sm"))
  const journalName = useSelector((state: State) => state.user.journalName)

  const data = useSelector((state: State) => state.journal.entries)
  const entries = useMemo(() => {
    let entries = []
    for (let date in data) {
      entries.push(data[date])
    }
    return entries
  }, [data])
  const entriesByMonth = useMemo(() => {
    const entriesByMonth: { [monthYear: string]: JournalEntry[] } = {}
    for (let i = 0; i < entries.length; i++) {
      const date = convertToDateObject(entries[i].date)
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ]
      const month = months[date.getMonth()]
      const year = date.getFullYear()
      const monthYear = `${month} ${year}`
      if (Object.keys(entriesByMonth).includes(monthYear)) {
        entriesByMonth[monthYear] = [...entriesByMonth[monthYear], entries[i]]
      } else {
        entriesByMonth[monthYear] = [entries[i]]
      }
    }
    return entriesByMonth
  }, [entries])
  const isLoading = useSelector((state: State) => state.journal.isLoading)

  return (
    <PageContentContainer>
      <Typography
        variant="h4"
        sx={{
          m: "20px 0",
          textShadow:
            "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
        }}
        align="center"
      >
        {journalName || "My Journal"}
      </Typography>
      <ContentContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "80%",
            gap: "50px",
          }}
        >
          {!isLoading && entries.length === 0 && (
            <NoEntriesContainer>
              No entries yet! Head to{" "}
              <Link to="/today">today's entry page</Link> to get started.
            </NoEntriesContainer>
          )}
          {!isLoading &&
            Object.keys(entriesByMonth).map((m) => (
              <React.Fragment key={m}>
                <Typography
                  variant="h5"
                  id={m.replace(" ", "-")}
                  sx={{
                    mx: "auto",
                    textShadow:
                      "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
                  }}
                >
                  {m}
                </Typography>
                {entriesByMonth[m].map((entry, index) => (
                  <ViewEntry key={index} date={entry.date} />
                ))}
              </React.Fragment>
            ))}
          {isLoading && <LoadingComponent />}
        </Box>
      </ContentContainer>
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(PreviousEntriesPage)
