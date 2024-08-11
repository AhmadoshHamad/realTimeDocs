

export default function App() {


  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      setMessage(data.message); // Update the textarea with the received message
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('send_message', { message });
      // setMessage(''); // Clear the input field after sending the message
    }
  };


  return (
    <div className="App">
      <textarea
        onChange={(e) => {setMessage(e.target.value);
        console.log(e.target.value);
          sendMessage(); }}
        placeholder="Type your message here..."
        value={message} // This will show the last received message in the textarea
      ></textarea>
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
    </div>
  );
}












