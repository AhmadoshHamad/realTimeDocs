import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';

import { Route,createBrowserRouter,createRoutesFromElements, RouterProvider, Router} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DocsDashboardPage from './pages/DocsDashboardPage';
import SheetDashboardPage from './pages/SheetDashboardPage';
import HomePage from './pages/HomePage';
import DocsEditorPage from './pages/DocsEditorPage';

import { Provider } from 'react-redux';
import store from './store'; // Adjust the path if necessary
import SheetPage from './pages/SheetPage';
import TestPage from './pages/TestPage';
import Playground from './pages/Playground';



const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/docs", element: <DocsDashboardPage /> },
    { path: "/sheets", element: <SheetDashboardPage /> },
    { path: "/editor/:id", element: <DocsEditorPage /> },
    { path: "/sheetEditor/:id", element: <SheetPage /> },
    { path: "/test", element: <TestPage /> },
    { path: "/playground", element: <Playground /> },
  ]
);
  
const socket = io('http://172.23.194.171:5000');

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
