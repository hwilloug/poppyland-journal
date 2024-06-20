import { Box, Typography, styled } from "@mui/material"

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: "25px",
}))

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typography align="center" fontSize={16}>
        &copy; {new Date().getFullYear()} Willow Tree Diary
      </Typography>
    </FooterContainer>
  )
}

export default Footer
