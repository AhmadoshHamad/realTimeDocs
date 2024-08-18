import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';

import { Route,createBrowserRouter,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route index path="/" element={<LoginPage />} />,
//     <Route path="/login" element={<LoginPage />} />,
//     <Route path="/dashboard" element={<DashboardPage />} />,
//   )
// );
  
const socket = io('http://172.23.194.171:5000');

export default function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('send_message', { message });
    // setMessage('');
  };

  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("message", data => {
  //     setResponse(data);
  //   });

  //   // Cleanup on unmount
  //   return () => socket.disconnect();
  // }, []);

  // const sendMessage = () => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.emit('message', 'Hello from React');
  // };
  // const handleEditorChange = (content, editor) => {
  //   console.log('Content was updated:', content);
  //   socket.emit('content_change', content);
  // };


  return (
    <>
      {/* <SideBar /> */}
      {/* <DashboardPage/> */}
      {/* <LoginPage /> */}
      
      {/* <RouterProvider router={router} /> */}
      
      <div className="App">

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      ></textarea>
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
    </div>
      
     
    
    </>
  );
}