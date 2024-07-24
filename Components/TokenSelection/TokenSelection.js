import React from 'react';
import { IoChevronForward } from 'react-icons/io5';
import styles from './TokenSelection.module.css';
import Image from 'next/image';

// const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A6", "#A633FF"];

function TokenSelection({ token, onSelect }) {
  // const colorIndex = token.symbol.charCodeAt(0) % colors.length;
  // const circleColor = colors[colorIndex];
  return (
    <div className={styles.tokenItem} onClick={() => onSelect(token)}>
      <div className={styles.circle}>
        <Image
          src={token?.logoUri}
          width={30}
          height={30}
          alt='token icon'
        />
      </div>
      <span className={styles.symbol}>{token.symbol}</span>
      <IoChevronForward size={20} color="#787878" />
    </div>
  );
}

export default TokenSelection;
