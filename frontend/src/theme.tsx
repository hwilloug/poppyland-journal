import { createTheme } from "@mui/material"
import { deepPurple } from "@mui/material/colors"

export const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "PoetsenOne",
    },
    h4: {
      fontFamily: "PoetsenOne",
    },
    h5: {
      fontFamily: "PoetsenOne",
    },
    h6: {
      fontFamily: "Ubuntu-Bold",
    },
    fontFamily: "Ubuntu",
    fontSize: 18,
  },
  palette: {
    mode: "light",
    secondary: {
      main: "#A8BBA0",
      light: "#84997B",
      dark: "#5F7656",
    },
    primary: {
      main: deepPurple[500],
      light: deepPurple[300],
      dark: deepPurple[700],
      contrastText: "#fff",
    },
  },
})
