import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import HomePage from './pages/HomePage';
import styled from '@emotion/styled';
import NewEntryPage from './pages/NewEntryPage';
import PreviousEntriesPage from './pages/PreviousEntriesPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new-entry",
    element: <NewEntryPage />
  },
  {
    path: "/previous-entries",
    element: <PreviousEntriesPage />
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
