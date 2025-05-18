import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import store from './store';
import 'flowbite';

import LoginPage from './pages/LoginPage';
import DocsDashboardPage from './pages/DocsDashboardPage';
import SheetDashboardPage from './pages/SheetDashboardPage';
import HomePage from './pages/HomePage';
import DocsEditorPage from './pages/DocsEditorPage';
import SheetPage from './pages/SheetPage';
import Playground from './pages/Playground';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ForbiddenPage from './pages/ForbiddenPage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
const socketURL = import.meta.env.VITE_SOCKET_URL + ":" + import.meta.env.VITE_SOCKET_PORT;


const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/docs", element: <DocsDashboardPage /> },
    { path: "/sheets", element: <SheetDashboardPage /> },
    { path: "/editor/:id", element: <DocsEditorPage /> },
    { path: "/sheetEditor/:id", element: <SheetPage /> },
    { path: "/404", element: <NotFoundPage /> },
    { path: "/403", element: <ForbiddenPage /> },
    { path: "/401", element: <UnauthorizedPage /> },
    // { path: "/test", element: <TestPage /> },
    { path: "/playground", element: <Playground /> },
  ]
);
  
const socket = io(socketURL);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
