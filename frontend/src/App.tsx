import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import styled from '@emotion/styled';
import TodaysEntryPage from './pages/TodaysEntryPage';
import PreviousEntriesPage from './pages/PreviousEntriesPage';
import MedicationsPage from './pages/MedicationsPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/today",
    element: <TodaysEntryPage />
  },
  {
    path: "/previous",
    element: <PreviousEntriesPage />
  },
  {
    path: "/medications",
    element: <MedicationsPage />
  }
]);

const AppContainer = styled.div`
  min-height: 100vh;
`

function App() {
  return (
    <AppContainer className="App">
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;
