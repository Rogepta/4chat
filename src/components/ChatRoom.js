import React, { useEffect, useState } from 'react';

export const ChatRoom = () => {
  const [messages, setMessages] = useState([]); // Список сообщений
  const [message, setMessage] = useState(''); // Текущая строка ввода
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, msg]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    const msg = { sender: 'Вы', text: message };
    socket.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  return (
    <div>
      <div
        style={{ height: '300px', overflow: 'auto', border: '1px solid gray' }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Надо что-то написать...'
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};
