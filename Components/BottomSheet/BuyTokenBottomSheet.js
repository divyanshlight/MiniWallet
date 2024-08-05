import React from "react";
import { Sheet } from "react-modal-sheet";
import styles from "./BottomSheet.module.css";
import { TOKEN_OPTIONS } from "../Constants";
import { IoCloseCircleOutline } from "react-icons/io5";
function BuyTokenBottomSheet({
  showModal,
  setShowModal,
  setTokenAddress,
  setAmount,
  handleFiatPurchase,
  loading,
  tokenAddress,
  amount,
  transactionType
}) {
  return (
    <div>
      <Sheet
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        snapPoints={[500, 400, 100, 0]}
        onOpenEnd={true}
        animate={{ opacity: 1 }}
      >
        <Sheet.Container
          style={{
            backgroundColor: "#232323",
            color: "#fff",
          }}
        
        >
          <Sheet.Header className={styles.sheet_header} />
          <div className={styles.modalContent}>
            <h2 className={styles.heading}>{transactionType === "buy" ? "Buy Token" : "Sell Token"}</h2>
            <select
              className={styles.input}
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            >
              <option value="">Select a token</option>
              {TOKEN_OPTIONS.map((token) => (
                <option key={token.value} value={token.value}>
                  {token.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className={styles.confirmButton}
              onClick={handleFiatPurchase}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default BuyTokenBottomSheet;
