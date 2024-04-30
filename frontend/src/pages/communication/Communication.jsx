import React, { useState } from 'react';
import './ChatBox.css'; // Import the CSS file

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Dummy data for available users
  const availableUsers = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },

  ];

  // Function to handle sending a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      setMessages([...messages, { sender: 'user1', message }]);
      setMessage('');
    }
  };

  return (
    <div className="container py-5 px-4">
      <header className="text-center">
        {/* Header content */}
      </header>
      <div className="row rounded-lg overflow-hidden shadow">
        {/* Users box*/}
        <div className="col-5 px-0">
          {/* Render available users */}
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Available Assistents</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                {availableUsers.map(user => (
                  <a key={user.id} href="#" className="list-group-item list-group-item-action list-group-item-light rounded-0">
                    {user.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Chat Box*/}
        <div className="col-7 px-0">
          <div className="px-4 py-5 chat-box bg-white">
            {/* Render messages */}
            {messages.map((msg, index) => (
              <div key={index} className={`media w-50 mb-3 ${msg.sender === 'user1' ? 'ml-auto' : ''}`}>
                <div className={`media-body ${msg.sender === 'user1' ? 'text-right' : ''}`}>
                  <div className={`bg-${msg.sender === 'user1' ? 'primary' : 'light'} rounded py-2 px-3 mb-2`}>
                    <p className={`text-small mb-0 text-${msg.sender === 'user1' ? 'white' : 'black'}`}>{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Typing area */}
          <form onSubmit={sendMessage} className="bg-light">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type a message"
                aria-describedby="button-addon2"
                className="form-control rounded-0 border-0 py-4 bg-light chat-box-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-link chat-box-send-button">Send <i className="fa fa-paper-plane"></i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
