import React, { useEffect, useState } from "react";
import styles from "./QRCode.module.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { BiCheck, BiSolidCopy } from "react-icons/bi";
import copy from "copy-to-clipboard";
import QRCode from "react-qr-code";

function QRCodePage({ handleCloseQRCode }) {
  const [copiedText, setCopiedText] = useState(null);
  const [walletInfo, setWalletInfo] = useState({
    address: "",
  });
  useEffect(() => {
    const address = localStorage.getItem("walletAddress");
    setWalletInfo({
      address: address,
    });
  }, []);
  const handleCopy = (text) => {
    copy(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };
  return (
    <div className={styles.qrcodeContainer}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={handleCloseQRCode}>
          <div className={styles.backButtonContainer}>
            <IoChevronBackOutline color="#fff" /> <p>Back</p>
          </div>
        </div>
        <h2 className={styles.title}>QR Code</h2>
      </div>
      <div className={styles.walletAddressContainer}>
        <div className={styles.labelWithIcon}>
          <p>Address</p>
          <div className={styles.copyIcon}>
            {copiedText === walletInfo?.address ? (
              <BiCheck className={styles.icon} />
            ) : (
              <BiSolidCopy
                className={styles.icon}
                onClick={() => handleCopy(walletInfo?.address)}
              />
            )}{" "}
          </div>
        </div>
        <div className={styles.seedPhraseContent}>
          <p className={styles.seedPhraseText}>
            {walletInfo && walletInfo.address}
          </p>
        </div>
        {/* {copiedText === walletInfo?.address && (
          <span className={styles.copiedText}>Copied!</span>
        )} */}
      </div>
      <QRCode
        value={walletInfo?.address}
        size={256}
        style={{
          height: "auto",
          maxWidth: "100%",
          width: "100%",
          marginTop: "10%",
          borderRadius: "15px",
          border: "2px solid #2B73FF",
        }}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default QRCodePage;
