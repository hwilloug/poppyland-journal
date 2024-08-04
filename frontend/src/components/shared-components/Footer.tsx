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
      <Grid item xs={12} sm={3}>
        <Button
          href="https://www.buymeacoffee.com/hannahjanew"
          variant="contained"
          color="warning"
          sx={{ width: "100%", mx: "auto" }}
        >
          Buy me a coffee
        </Button>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography align="center" flexGrow={2} fontSize={16} color={"#e0f0bb"}>
          &copy; {new Date().getFullYear()} Whispering Willow Diary
        </Typography>
      </Grid>
    </FooterContainer>
  )
}

export default Footer
