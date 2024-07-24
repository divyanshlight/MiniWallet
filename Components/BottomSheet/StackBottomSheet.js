import React from "react";
import styles from "./BottomSheet.module.css";
import { Sheet } from "react-modal-sheet";
import { IoCloseCircleOutline } from "react-icons/io5";

function StackBottomSheet({
  showStakingModal,
  setShowStakingModal,
  loading,
  amount,
  setAmount,
  handleOperation,
  isStaking,
  setIsStaking,
}) {
  const handleClose = () => {
    setShowStakingModal(false);
  };

  return (
    <div>
      <Sheet
        isOpen={showStakingModal}
        onClose={handleClose}
        snapPoints={[550, 400, 100, 0]}
      >
        <Sheet.Container
          style={{
            backgroundColor: "#232323",
            color: "#fff",
          }}
        >
          <Sheet.Header className={styles.sheet_header}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tabButton} ${
                  isStaking ? styles.active : ""
                }`}
                onClick={() => setIsStaking(true)}
                disabled={loading}
              >
                Stake
              </button>
              <button
                className={`${styles.tabButton} ${
                  !isStaking ? styles.active : ""
                }`}
                onClick={() => setIsStaking(false)}
                disabled={loading}
              >
                Unstake
              </button>

            </div>
          </Sheet.Header>
          <div className={styles.modalContent}>
            <h2 className={styles.heading}>
              {isStaking ? "Stake Tokens" : "Unstake Tokens"}
            </h2>
            <input
              type="text"
              className={styles.input}
              placeholder={`Enter amount to ${isStaking ? "stake" : "unstake"}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
            <button
              className={styles.confirmButton}
              onClick={handleOperation}
              disabled={loading || amount === ""}
            >
              {loading
                ? `${isStaking ? "Staking" : "Unstaking"}...`
                : `${isStaking ? "Stake" : "Unstake"}`}
            </button>
          </div>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default StackBottomSheet;
