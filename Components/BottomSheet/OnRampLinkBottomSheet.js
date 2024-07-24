import React from 'react'
import { Sheet } from 'react-modal-sheet'
import styles from './BottomSheet.module.css'
function OnRampLinkBottomSheet({setShowModal,showModal, transactionType,onRampLink}) {
  return (
    <div>
              <Sheet
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          snapPoints={[900, 400, 100, 0]}
        >
          <Sheet.Container
            style={{
              backgroundColor: "#000",
              color: "#fff",
              border: "1px solid #fff",
            }}
          >
            <Sheet.Header />
            <div className={styles.modalContent}>
              <h2>{transactionType === "buy" ? "Buy Token" : "Sell Token"}</h2>
              <iframe
                src={onRampLink}
                style={{ width: "100%", height: "75vh", border: "none" }}
                title="Onramp"
              ></iframe>
            </div>
          </Sheet.Container>
          <Sheet.Backdrop />
        </Sheet>
    </div>
  )
}

export default OnRampLinkBottomSheet
