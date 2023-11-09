import React from "react"
import SideBarComponent from "../components/shared-components/SideBar"
import {
  PageContainer,
  PageContentContainer,
} from "../components/shared-components/styled-components"
import { SubHeader } from "../components/shared-components/styled-components"
import styled from "@emotion/styled"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import EntryForm from "../components/shared-components/EntryForm"
import { useParams } from "react-router-dom"

export const SectionHeader = styled.h3`
  margin-top: 50px;
`

const EditEntryPage: React.FunctionComponent = () => {
  const { date } = useParams()
  return (
    <PageContainer>
      <SideBarComponent />
      <PageContentContainer>
        <SubHeader>Edit Entry</SubHeader>
        <EntryForm date={date!} />
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(EditEntryPage)
