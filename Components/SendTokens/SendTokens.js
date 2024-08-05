import React, { useEffect, useState } from "react";
import styles from "./SendTokens.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ethers } from "ethers";
import {
  createThirdwebClient,
  getContract,
  prepareContractCall,
  resolveMethod,
} from "thirdweb";
import { THIRDWEB_CLIENT_ID, THIRDWEB_SECRET_KEY } from "../Constants";
import { defineChain } from "thirdweb/chains";
import Toast from "../Toast/Toast";
import axios from "axios";
import { Sheet } from "react-modal-sheet";

const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
  secretKey: THIRDWEB_SECRET_KEY,
});

const contract = getContract({
  client,
  chain: defineChain(34443),
  address: "0xdfc7c877a950e49d2610114102175a06c2e3167a",
});

const SendTokens = ({
  signer,
  address,
  showTransferModal,
  setShowTransferModal,
  tokens,
}) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [selectedToken, setSelectedToken] = useState("");

  const handleTransfer = async () => {
    try {
      if (!signer) {
        console.error("Signer not available.");
        setToastMessage("Signer not available.");
        setToastType("error");
        return;
      }
      const amountInWei = ethers.utils.parseEther(amount.toString());
      const transaction = await prepareContractCall({
        contract,
        method: resolveMethod("transfer"),
        params: [recipient, amountInWei],
      });

      const estimatedGasLimit = await signer.estimateGas({
        to: transaction.to,
        data: await transaction.data(),
        value: 0,
      });

      const gasPrice = await signer.getGasPrice();
      const tx = {
        to: transaction.to,
        data: await transaction.data(),
        value: 0,
        gasLimit: estimatedGasLimit,
        gasPrice: gasPrice,
      };

      const txResponse = await signer.sendTransaction(tx);
      console.log("Transfer TX Hash:", txResponse.hash);

      setShowTransferModal(false);
      setToastMessage("Transfer successful!");
      setToastType("success");
    } catch (error) {
      console.error("Transfer failed:", error);
      setToastMessage("Transfer failed.");
      setToastType("error");
    }
  };

  return (
    <>
      <div>
        <Sheet
          isOpen={showTransferModal}
          onClose={() => setShowTransferModal(false)}
          snapPoints={[500, 400, 100, 0]}
          onOpenEnd={true}
        >
          <Sheet.Container
            style={{
              backgroundColor: "#232323",
              color: "#fff",
            }}
          >
            <Sheet.Header className={styles.sheet_header} />
            <div className={styles.modalContent}>
              <h2 className={styles.heading}>Transfer Tokens</h2>
              <input
                type="text"
                className={styles.input}
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <select
                className={styles.input}
                value={selectedToken}
                onChange={(e) => setSelectedToken(e.target.value)}
              >
                <option value="">Select Token</option>
                {tokens.map((token, index) => (
                  <option key={index} value={token.address}>
                    {token.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter amount to transfer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className={styles.confirmButton}
                onClick={handleTransfer}
                disabled={!selectedToken}
              >
                {"Transfer"}
              </button>
            </div>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </>
  );
};

export default SendTokens;
