import React, { useMemo, useState } from "react"
import { PageContentContainer } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import EntryForm from "../components/shared-components/EntryForm"
import { convertToShortDate } from "../utils/date-utils"
import { Button, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { State } from "../store"

export const SectionHeader = styled.h3`
  margin-top: 50px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
  const [date] = useState(convertToShortDate(new Date()))

  const data = useSelector((state: State) => state.journal.entries[date])

  const [isNewEntry, setIsNewEntry] = useState(data === undefined)

  if (isNewEntry) {
    return (
      <PageContentContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: window.innerHeight,
        }}
      >
        <Button variant="contained" onClick={() => setIsNewEntry(false)}>
          Create Entry
        </Button>
      </PageContentContainer>
    )
  }

  return (
    <PageContentContainer>
      <Typography
        variant="h4"
        sx={{
          my: "20px",
          textShadow:
            "1px 1px 0px #e0f0bb, -1px 1px 0px #e0f0bb, 1px -1px 0px #e0f0bb, -1px -1px 0px #e0f0bb",
        }}
        align="center"
      >
        Today's Entry
      </Typography>
      <EntryForm date={date} />
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(TodaysEntryPage)
