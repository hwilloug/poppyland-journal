import React from "react"
import { PageContentContainer } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import EntryForm from "../components/shared-components/EntryForm"
import { useParams } from "react-router-dom"
import { Typography } from "@mui/material"

export const SectionHeader = styled.h3`
  margin-top: 50px;
`

const EditEntryPage: React.FunctionComponent = () => {
  const { date } = useParams()
  return (
    <PageContentContainer>
      <Typography
        variant="h4"
        sx={{
          my: "20px",
          textShadow:
            "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
        }}
        align="center"
      >
        Edit Entry
      </Typography>
      <EntryForm date={date!} />
    </PageContentContainer>
  )
}

export default withAuthenticationRequired(EditEntryPage)
