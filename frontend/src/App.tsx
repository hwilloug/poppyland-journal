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
import { journalActions, State, userActions } from "./store"
import EntriesPage from "./pages/EntriesPage"
import GoalsPage from "./pages/GoalsPage"
import EmergencyPlanPage from "./pages/EmergencyPlanPage"
import { useSelector } from "react-redux"
import ViewEntryPage from "./pages/ViewEntryPage"
import HabitsPage from "./pages/HabitsPage"
import LandingPage from "./pages/LandingPage"

const AppContainer = styled.div`
  min-height: 100vh;
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/diary/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
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
        path: ":date/view",
        element: <ViewEntryPage />,
      },
      {
        path: "preferences",
        element: <UserPreferencesPage />,
      },
      {
        path: "entries",
        element: <EntriesPage />,
      },
      {
        path: "goals",
        element: <GoalsPage />,
      },
      {
        path: "habits",
        element: <HabitsPage />,
      },
      {
        path: "emergency-plan",
        element: <EmergencyPlanPage />,
      },
    ],
  },
])

function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const getEntries = async () => {
    const token = await getAccessTokenSilently()
    journalActions.getEntries(token)
  }
  useEffect(() => {
    if (isAuthenticated) {
      getEntries()
    }
  }, [isAuthenticated])

  const userId = useSelector((state: State) => state.user.userId)

  const getUser = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently()
      userActions.getUser(token, user!.sub!)
    }
  }

  useEffect(() => {
    if (!userId) {
      getUser()
    }
  }, [userId, isAuthenticated])

  return (
    <AppContainer className="App">
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppContainer>
  )
}

export default App
