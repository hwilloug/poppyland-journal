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
      main: "#91c491",
      light: "#6c9e6c",
      dark: "#4f804e",
    },
    primary: {
      main: deepPurple[500],
      light: deepPurple[300],
      dark: deepPurple[700],
      contrastText: "#fff",
    },
  },
})
