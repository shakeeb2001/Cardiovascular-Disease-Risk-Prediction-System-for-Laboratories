


import React, { useState, useEffect } from 'react';
import './ChatBox.css'; // Import the CSS file

const Chat = ({ loggedInUsername }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useState(null);
  const [notification, setNotification] = useState('');

  // Fetch all user profiles
  useEffect(() => {
    fetchUserProfiles();
    connectWebSocket();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:4000/user-profiles');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user profiles:', error);
    }
  };

  // Connect to WebSocket server
  const connectWebSocket = () => {
    const ws = new WebSocket('ws://127.0.0.1:4001');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWs(ws);
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages([...messages, receivedMessage]);
      // Check if notification is needed
      if ((userRole === 'manager' && receivedMessage.sender === 'assistant') ||
          (userRole === 'assistant' && receivedMessage.sender === 'manager')) {
        setNotification();
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after a short delay
      setTimeout(connectWebSocket, 100);
    };
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '' && selectedUser && ws) {
      const newMessage = { sender: userRole, receiver: selectedUser.username, message };
      const jsonString = JSON.stringify(newMessage); // Stringify the message
      ws.send(jsonString);
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  // Function to handle user selection
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  // Filter users based on the logged-in user's role
  const filteredUsers = users.filter(user => {
    if (userRole === 'manager') {
      return user.userRole === 'assistant';
    } else if (userRole === 'assistant') {
      return user.userRole === 'manager';
    }
    return false;
  });

  return (
    <div className="container py-5 ">
      <br />
      <header className="text-center">
        {/* Header content */}
      </header>
      <div className="row rounded-lg overflow-hidden shadow chat-container">
        {/* Users box*/}
        <div className="col-3 px-0 ">
          {/* Render available users based on user's role */}
          <div className="bg-light">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Available {userRole === 'manager' ? 'Assistants' : 'Managers'}</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                {filteredUsers.map(user => (
                  <a
                    key={user.username}
                    href="#"
                    className={`list-group-item list-group-item-action list-group-item-light rounded-0 ${
                      selectedUser && selectedUser.username === user.username ? 'active' : ''
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
{/* Chat Box*/}
<div className="col-9 px-0">
  <div className="px-4 py-5 chat-box bg-light">
    {selectedUser && (
      <div className="text-center">
        <h4>{selectedUser.name}</h4>
      </div>
    )}
    {messages.map((msg, index) => (
  <div key={index} className={`media w-50 mb-3 ${msg.sender === loggedInUsername ? 'ml-auto' : ''}`}>
    <div className={`media-body ${msg.sender === loggedInUsername ? 'text-right' : ''}`}>
      <div className={`bg-${msg.sender === loggedInUsername ? 'primary' : 'light'} rounded py-2 px-3 mb-2 ${msg.sender === loggedInUsername ? 'ml-auto' : ''}`}>
        <p className={`text-small mb-0 text-${msg.sender === loggedInUsername ? 'white' : 'black'}`}>
          {msg.sender === 'manager' ? 'Manager: ' : 'Assistant: '} {msg.message}
        </p>
      </div>
    </div>
  </div>
))}

    {notification && <div className="notification">{notification}</div>}
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