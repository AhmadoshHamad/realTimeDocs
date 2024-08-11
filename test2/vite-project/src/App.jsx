import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';

import { Route,createBrowserRouter,createRoutesFromElements, RouterProvider, Router} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';



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
    <RouterProvider router={router}/>
   
  
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // Listen for incoming messages
  //   socket.on('receive_message', (data) => {
  //     setMessages((prevMessages) => [...prevMessages, data]);
  //     setMessage(data.message); // Update the textarea with the received message
  //   });

  //   return () => {
  //     socket.off('receive_message');
  //   };
  // }, []);

  // const handleChange = (e) => {
  //   const newMessage = e.target.value;
  //   setMessage(newMessage);

  //   // Send the message after the state has been updated
  //   socket.emit('send_message', { message: newMessage });
  // };

  // return (
  //   <div className="App">
  //     <textarea
  //       onChange={handleChange}
  //       placeholder="Type your message here..."
  //       value={message} // This will show the last received message in the textarea
  //     ></textarea>
  //     <div>
  //       {messages.map((msg, index) => (
  //         <p key={index}>{msg.message}</p>
  //       ))}
  //     </div>
  //   </div>
  );
}
