import { Box } from "@mui/material"

const LoadingComponent: React.FunctionComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0)",
        width: "fit-content",
        margin: "100px auto",
      }}
    >
      <img src="/loading_icon.gif" />
    </Box>
  )
}

export default LoadingComponent
