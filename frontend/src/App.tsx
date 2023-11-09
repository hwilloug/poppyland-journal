import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"
import styled from "@emotion/styled"
import TodaysEntryPage from "./pages/TodaysEntryPage"
import PreviousEntriesPage from "./pages/PreviousEntriesPage"
import MedicationsPage from "./pages/MedicationsPage"
import EditEntryPage from "./pages/EditEntryPage"
import { withAuthenticationRequired } from "@auth0/auth0-react"
import NewUserPage from "./pages/NewUserPage"

const AppContainer = styled.div`
  min-height: 100vh;
`

function App() {
  return (
    <AppContainer className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/today" element={<TodaysEntryPage />} />
          <Route path="/previous" element={<PreviousEntriesPage />} />
          <Route path="/medications" element={<MedicationsPage />} />
          <Route path="/edit/:date" element={<EditEntryPage />} />
          <Route path="/new-user" element={<NewUserPage />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  )
}

export default withAuthenticationRequired(App)
