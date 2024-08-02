import { Box, Typography, styled } from "@mui/material"

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: "25px",
}))

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typography align="center" fontSize={16} color={"#e0f0bb"}>
        &copy; {new Date().getFullYear()} Whispering Willow Diary
      </Typography>
    </FooterContainer>
  )
}

export default Footer
