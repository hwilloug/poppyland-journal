import styled from "@emotion/styled"
import { Button, Paper } from "@mui/material"

export const PageContainer = styled.div`
  margin: 0px;
`

export const PageContentContainer = styled.div`
  padding: 20px 50px;
  max-width: 750px;
  margin: 0 auto;
  flex-grow: 1;
`

export const EntrySectionContainer = styled(Paper)`
  background-color: #fffcf5;
  border: 1px solid lightgrey;
  padding: 20px;
  margin-bottom: 50px;
  margin-top: 20px;
`

export const Divider = styled("hr")({
  minWidth: "100%",
  border: "1px solid lightgrey",
})
