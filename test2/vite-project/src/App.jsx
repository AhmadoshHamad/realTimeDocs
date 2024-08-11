import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';

import { Route,createBrowserRouter,createRoutesFromElements, RouterProvider, Router} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';

import { Provider } from 'react-redux'; // Ensure this is imported correctly
import store from './store'; // Adjust the path if necessary



const router = createBrowserRouter(
  [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/editor", element: <EditorPage /> },
  ]
);
  
const socket = io('http://localhost:5000');

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
