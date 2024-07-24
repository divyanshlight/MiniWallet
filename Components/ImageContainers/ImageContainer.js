import React from "react";
import styles from './ImageContainer.module.css'
import Image from "next/image";
function ImageContainer({ handleClaimHot}) {
  return (
    <div>
      <div className={styles.imageContainer}>
        <Image
          src="/home-screen-banner.svg"
          layout="responsive"
          width={340}
          height={110}
          alt="stack"
        />
        {/* <div className={styles.overlay}>
          <p className={styles.stackText}>Stake</p>
          <button
            className={styles.stackButton}
            onClick={() => setShowStakingModal(true)}
          >
            Stake
          </button>
        </div> */}
      </div>
      {/* <div className={styles.imageContainer}>
        <Image
          src="/fire2.png"
          layout="responsive"
          width={340}
          height={110}
          alt="fire"
        />
        <div className={styles.overlay}>
          <p className={styles.claimText}>Claim your MODE</p>
          <button className={styles.stackButton} onClick={handleClaimHot}>
            Claim
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default ImageContainer;
