import React from "react";
import { Sheet } from "react-modal-sheet";
import styles from "./BottomSheet.module.css";
function PortfolioBottomSheet({ showModal, setShowModal }) {
  return (
    <div>
      <Sheet
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        snapPoints={[600, 400, 100, 0]}
      >
        <Sheet.Container
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #fff",
          }}
        >
          <Sheet.Header className={styles.sheet_header} />
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  );
}

export default PortfolioBottomSheet;
