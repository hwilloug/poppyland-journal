import { Box, Button, Grid, Link, Typography, styled } from "@mui/material"

const FooterContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const Footer: React.FC = () => {
  return (
    <FooterContainer container alignItems={"center"}>
      <Grid item xs={12}>
        <Typography align="center" flexGrow={2} fontSize={16} color={"#e0f0bb"}>
          &copy; {new Date().getFullYear()} Whispering Willow Diary
        </Typography>
      </Grid>
      <Grid item xs={12} textAlign={"center"} mt={2}>
        <Button
          href="https://www.buymeacoffee.com/hannahjanew"
          variant="contained"
          color="warning"
        >
          Buy me a coffee
        </Button>
      </Grid>
    </FooterContainer>
  )
}

export default Footer
