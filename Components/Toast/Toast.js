import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 5500);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message || !isVisible) return null;

  const renderTxHash = () => {
    if (message.transactionHash) {
      return (
        <a
          href={`https://explorer.mode.network/tx/${message.transactionHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.txHash}
        >
          {message.transactionHash}
        </a>
      );
    }
    return null;
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message.text} {renderTxHash()}
    </div>
  );
};

export default Toast;
