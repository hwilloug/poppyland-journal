import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import styled from "@emotion/styled"
import TodaysEntryPage from "./pages/TodaysEntryPage"
import PreviousEntriesPage from "./pages/PreviousEntriesPage"
import MedicationsPage from "./pages/MedicationsPage"
import EditEntryPage from "./pages/EditEntryPage"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import UserPreferencesPage from "./pages/UserPreferencesPage"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material"
import { deepPurple, lightGreen } from "@mui/material/colors"

const AppContainer = styled.div`
  min-height: 100vh;
`

export const theme = createTheme({
  palette: {
    mode: "light",
    secondary: {
      main: "#a6c2a5",
      light: "#c9dec8",
      dark: "#788f77",
    },
    primary: {
      main: deepPurple[500],
      light: deepPurple[300],
      dark: deepPurple[700],
      contrastText: "#fff",
    },
    background: {
      default: "#fffcf5",
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/today",
    element: <TodaysEntryPage />,
  },
  {
    path: "/journal",
    element: <PreviousEntriesPage />,
  },
  {
    path: "/edit/:date",
    element: <EditEntryPage />,
  },
  {
    path: "/preferences",
    element: <UserPreferencesPage />,
  },
])

function App() {
  return (
    <AppContainer className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContainer>
  )
}

export default withAuthenticationRequired(App)
