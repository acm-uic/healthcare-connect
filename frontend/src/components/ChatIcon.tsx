// ChatIcon.tsx
import React from 'react';
import styles from '../styles/ChatIcon.module.css';

const ChatIcon = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.chatIcon} onClick={onClick}>
      <img src="/chat.png" alt="Chat Icon" />
    </div>
  );
};

export default ChatIcon;