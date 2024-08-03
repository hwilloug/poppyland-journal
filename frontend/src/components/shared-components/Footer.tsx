import { Box, Button, Link, Typography, styled } from "@mui/material"

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Typography align="center" flexGrow={2} fontSize={16} color={"#e0f0bb"}>
        &copy; {new Date().getFullYear()} Whispering Willow Diary
      </Typography>
      <Button
        href="https://www.buymeacoffee.com/hannahjanew"
        variant="contained"
        color="warning"
      >
        Buy me a coffee
      </Button>
    </FooterContainer>
  )
}

export default Footer
