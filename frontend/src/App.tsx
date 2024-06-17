import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import styled from "@emotion/styled"
import TodaysEntryPage from "./pages/TodaysEntryPage"
import PreviousEntriesPage from "./pages/PreviousEntriesPage"
import EditEntryPage from "./pages/EditEntryPage"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import UserPreferencesPage from "./pages/UserPreferencesPage"
import { ThemeProvider } from "@emotion/react"
import { theme } from "./theme"
import Layout from "./Layout"
import { useEffect } from "react"
import { journalActions } from "./store"
import EntriesPage from "./pages/EntriesPage"

const AppContainer = styled.div`
  min-height: 100vh;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "today",
        element: <TodaysEntryPage />,
      },
      {
        path: "journal",
        element: <PreviousEntriesPage />,
      },
      {
        path: ":date/edit",
        element: <EditEntryPage />,
      },
      {
        path: "preferences",
        element: <UserPreferencesPage />,
      },
      {
        path: "entries",
        element: <EntriesPage />,
      },
    ],
  },
])

function App() {
  const { getAccessTokenSilently } = useAuth0()
  const getEntries = async () => {
    const token = await getAccessTokenSilently()
    journalActions.getEntries(token)
  }
  useEffect(() => {
    getEntries()
  }, [])
  return (
    <AppContainer className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContainer>
  )
}

export default withAuthenticationRequired(App)
