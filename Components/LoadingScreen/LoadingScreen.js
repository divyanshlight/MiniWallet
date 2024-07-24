import React from "react";
import styles from "./LoadingScreen.module.css";
import Image from "next/image";

function LoadingScreen() {
  return (
    <div className={styles.container}>
      <div className={styles['logo-container']}>
        <div className={styles['logo-glow']}></div>
        <Image src="/flat-logo.svg" width={120} alt="logo" height={150} />
      </div>
    </div>
  );
}

export default LoadingScreen;
