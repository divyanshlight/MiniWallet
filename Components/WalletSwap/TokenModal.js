import React from 'react'
import styles from './WalletSwap.module.css'
import TokenSelection from '../TokenSelection/TokenSelection';
const TokenModal = ({ title, tokenList, onSelectToken, onClose }) => (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>{title}</h3>
        <div className={styles.tokenList}>
          {tokenList.map((token) => (
            <TokenSelection
              key={token.contractAddress}
              token={token}
              onSelect={onSelectToken}
            />
          ))}
        </div>
        <button className={styles.modalCloseButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );

export default TokenModal
