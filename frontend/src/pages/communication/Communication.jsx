import React, { useState, useEffect } from 'react';
import './ChatBox.css'; // Import the CSS file
import WecomeBackground from '../images/welcome_background.jpeg';

const Chat = ({ loggedInUsername }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [ws, setWs] = useState(null);
  const [notification, setNotification] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [communicationNotification, setCommunicationNotification] = useState(false); // State for communication card notification

  // Connect to WebSocket server
  useEffect(() => {
    connectWebSocket();
    fetchMessages(); // Fetch messages from backend when component mounts
  }, []);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://127.0.0.1:4001');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWs(ws);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, receivedMessage]); // Concatenate new message to existing messages
      
      // Check if notification is needed
      if ((userRole === 'manager' && receivedMessage.sender === 'assistant') ||
          (userRole === 'assistant' && receivedMessage.sender === 'manager')) {
        setNotification('New message received');
        // Set communication card notification to true
        setCommunicationNotification(true);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after a short delay
      setTimeout(connectWebSocket, 100);
    };
  };

  const fetchMessages = () => {
    fetch('http://localhost:4000/messages')
      .then(response => response.json())
      .then(data => {
        setMessages(data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '' && ws) {
      let receiver;
      let sender;
      if (userRole === 'manager') {
        receiver = 'assistant'; // Managers send messages to assistants
        sender = 'manager'; // Managers send messages to assistants
      } else if (userRole === 'assistant') {
        receiver = 'manager'; // Assistants send messages to managers
        sender = 'assistant';
      }
      const newMessage = { sender, receiver, message };
      const jsonString = JSON.stringify(newMessage); // Stringify the message
      ws.send(jsonString);

      // Save the new message to the backend
      fetch('http://localhost:4000/save-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error saving message:', error));

      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${WecomeBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width:'200%',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
  };

  const orderedMessages = userRole === 'manager' ? 
    [...messages].sort((a, b) => a.sender === 'manager' ? -1 : 1) :
    [...messages].sort((a, b) => a.sender === 'assistant' ? -1 : 1);

  return (
    
    <div className="container py-5" style={backgroundImageStyle}>
  {userRole === 'manager' ? <h2 className='chat-role'>Chat With Assistant</h2> : <h2 className='chat-role'>Chat With Manager</h2>}
  <div className="row rounded-lg overflow-hidden shadow chat-container">
    {/* Chat Box */}
    <div className="col-12 px-0">
    {communicationNotification && <div className="notification">New message received</div>}
      <div className="px-4 py-5 chat-box">
        {orderedMessages.map((msg, index) => (
          <div key={index} className={`media w-50 mb-3 ${msg.sender === 'manager' ? 'ml-auto' : ''}`}>
            <div className={`media-body ${msg.sender === 'manager' ? 'text-right' : ''}`}>
              <div className={`bg-${msg.sender === 'manager' ? 'secondary' : 'light'} rounded py-2 px-3 mb-2 ${msg.sender === 'manager' ? 'mr-0' : ''}`} style={{ backgroundColor: msg.sender === 'manager' ? 'rgb(11, 74, 65)' : '' }}>
                <p className={`text-small mb-0 text-${msg.sender === 'manager' ? 'white' : 'black'}` }>
                  {msg.sender === 'manager' ? 'Manager: ' : 'Assistant: '} {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))}
       
      </div>
      {/* Typing area */}
      <form onSubmit={sendMessage} className="bg-light ">
        <div className="input-group">
          <input
            type="text"
            placeholder="Type a message"
            aria-describedby="button-addon2"
            className="form-control rounded-0 border-0 py-3 chat-box-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}

export default Chat;