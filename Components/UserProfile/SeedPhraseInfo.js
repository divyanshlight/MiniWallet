import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import { BiSolidCopy } from "react-icons/bi";

function SeedPhraseInfo({
  privateKey,
  mnemonic,
  onBack,
  handleCopy,
  copiedText,
}) {
  const [isBlurred, setIsBlurred] = useState({
    seedPhrase: true,
    privateKey: true,
  });

  const toggleBlur = (section) => {
    setIsBlurred((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={styles.walletInfo}>
      {/* Seed Phrase Container */}
      <div className={styles.seedPhraseContainer}>
        <div className={styles.labelWithIcon}>
          <p>Seed Phrase</p>
          <div className={styles.copyIcon} onClick={() => handleCopy(mnemonic)}>
            <BiSolidCopy />
          </div>
        </div>
        <div className={styles.seedPhraseContent}>
          <p
            className={`${styles.seedPhraseText} ${
              isBlurred.seedPhrase ? styles.blurred : ""
            }`}
            onClick={() => toggleBlur("seedPhrase")}
          >
            {mnemonic}
          </p>
          {copiedText === mnemonic && (
            <span className={styles.copiedText}>Copied!</span>
          )}
        </div>
      </div>

      {/* Private Key Container */}
      <div className={styles.seedPhraseContainer}>
        <div className={styles.labelWithIcon}>
          <p>Private Key</p>
          <div
            className={styles.copyIcon}
            onClick={() => handleCopy(privateKey)}
          >
            <BiSolidCopy />
          </div>
        </div>
        <div className={styles.seedPhraseContent}>
          <p
            className={`${styles.seedPhraseText} ${
              isBlurred.privateKey ? styles.blurred : ""
            }`}
            onClick={() => toggleBlur("privateKey")}
          >
            {privateKey}
          </p>
          {copiedText === privateKey && (
            <span className={styles.copiedText}>Copied!</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SeedPhraseInfo;
