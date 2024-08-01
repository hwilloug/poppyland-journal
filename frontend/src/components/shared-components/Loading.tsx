import { Box, CircularProgress } from "@mui/material"

const LoadingComponent: React.FunctionComponent = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={4}
      sx={{
        backgroundColor: "rgba(0,0,0,0)",
        width: "fit-content",
        margin: "100px auto",
      }}
    >
      <img src="/whispering_willow_logo.png" width={"200px"} />
      <CircularProgress color="primary" />
    </Box>
  )
}

export default LoadingComponent
