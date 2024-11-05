import React, { useState } from 'react';
import styles from '../styles/ChatWindow.module.css'; // Assuming you have the styles

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', message: 'Hello! How can we assist you today?' }
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (userInput.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'user', message: userInput },
                { sender: 'bot', message: `You said: ${userInput}` } 
            ]);
            setUserInput('');
        }
    };

    return (
        <div className={styles.chatWindow}>
            <div className={styles.header}>
                <span>Tech Support</span>
                <button className={styles.closeButton} onClick={onClose}>
                    X
                </button>
            </div>
            <div className={styles.messageArea}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                        <strong>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</strong>{msg.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={handleInputChange}
                    className={styles.inputField}
                />
                <button type="submit" className={styles.sendButton} disabled={!userInput.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;