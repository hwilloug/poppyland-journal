import React from "react"
import SideBarComponent from "../components/shared-components/SideBar"
import {
  PageContainer,
  PageContentContainer,
} from "../components/shared-components/styled-components"
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
    <PageContainer>
      <SideBarComponent defaultOpen={false} />
      <PageContentContainer>
        <Typography variant="h5">Edit Entry</Typography>
        <EntryForm date={date!} />
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(EditEntryPage)
