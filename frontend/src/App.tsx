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
import { theme } from "./theme"

const AppContainer = styled.div`
  min-height: 100vh;
`

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
