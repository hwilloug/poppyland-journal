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

export const SectionHeader = styled.h3`
  margin-top: 50px;
`

const TodaysEntryPage: React.FunctionComponent = () => {
  const date = new Date().toLocaleDateString("en-CA")
  return (
    <PageContainer>
      <SideBarComponent />
      <PageContentContainer>
        <SubHeader>Today's Entry</SubHeader>
        <EntryForm date={date} />
      </PageContentContainer>
    </PageContainer>
  )
}

export default withAuthenticationRequired(TodaysEntryPage)
