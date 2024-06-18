import styled from "@emotion/styled"
import {
  Button,
  Paper,
  PaperProps,
  Typography,
  TypographyProps,
} from "@mui/material"

export const PageContainer = styled.div`
  margin: 0px;
`

export const PageContentContainer = styled.div`
  padding: 20px 50px;
  max-width: 750px;
  margin: 0 auto;
  flex-grow: 1;
`

export const EntrySectionContainer = styled(
  ({ className, ...props }: PaperProps) => (
    <Paper {...props} className={className} elevation={24} />
  ),
)`
  background-color: #fffcf5;
  border: 1px solid lightgrey;
  padding: 20px;
  margin-bottom: 50px;
  margin-top: 20px;
  text-align: center;
`

export const HeaderText = styled(({ className, ...props }: TypographyProps) => (
  <Typography
    className={className}
    variant="h4"
    textAlign={"center"}
    sx={{
      textShadow:
        "1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff",
    }}
    {...props}
  />
))``

export const Divider = styled("hr")({
  minWidth: "100%",
  border: "1px solid lightgrey",
})
