import React, { useState } from "react"
import { PageContentContainer } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import EntryForm from "../components/shared-components/EntryForm"
import { convertToShortDate } from "../utils/date-utils"
import { Typography } from "@mui/material"

export const SectionHeader = styled.h3`
  margin-top: 50px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
  const [date] = useState(convertToShortDate(new Date()))
  return (
    <PageContentContainer>
      <Typography variant="h4" sx={{ my: "20px" }} align="center">
        Today's Entry
      </Typography>
      <EntryForm date={date} />
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(TodaysEntryPage)
