import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import { FaStickyNote, FaCopy, FaArrowLeft } from "react-icons/fa";
import copy from "copy-to-clipboard";
import { BiCheck, BiSolidCopy } from "react-icons/bi";

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
      <div className={styles.seedPhraseContainer}>
        <div className={styles.labelWithIcon}>
          <p>Seed Phrase</p>
          <div className={styles.copyIcon}>
            {copiedText === mnemonic ? (
              <BiCheck className={styles.icon} />
            ) : (
              <BiSolidCopy
                className={styles.icon}
                onClick={() => handleCopy(mnemonic)}
              />
            )}{" "}
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
        </div>
      </div>
      <div className={styles.seedPhraseContainer}>
        <div className={styles.labelWithIcon}>
          <p>Private Key</p>
          <div
            className={styles.copyIcon}
          >
            {copiedText === privateKey ? (
              <BiCheck className={styles.icon} />
            ) : (
              <BiSolidCopy
                className={styles.icon}
                onClick={() => handleCopy(privateKey)}
              />
            )}{" "}
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
        </div>
      </div>
    </div>
  );
}

export default SeedPhraseInfo;
