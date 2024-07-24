import React, { useState } from "react";
import styles from "./ImportWallet.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { ethers } from "ethers";
import { useRouter } from "next/router";

function ImportWallet({ showImportWallet, setShowImportWallet }) {
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const importWallet = async (e) => {
    e.preventDefault();
    try {
      const wallet = new ethers.Wallet(privateKey);
      const address = await wallet.getAddress();
      const publicKey = wallet.publicKey;
      localStorage.setItem("walletAddress", address);
      localStorage.setItem("walletPublicKey", publicKey);

      setError(null);

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Error importing wallet:", err);
    }
  };

  return (
    <div className={styles.importContainer}>
      <h1 className={styles.heading}>IMPORT WALLET</h1>
      <div
        className={styles.backButton}
        onClick={() => setShowImportWallet(!showImportWallet)}
      >
        <FaArrowLeft />
      </div>{" "}
      <form className={styles.form} onSubmit={importWallet}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Private Key</label>
          <textarea
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">
          Import
        </button>
      </form>
    </div>
  );
}

export default ImportWallet;
