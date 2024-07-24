import React from "react";
import styles from "./Spinner.module.css";
import { MutatingDots } from "react-loader-spinner";
function Spinner() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderBackground}></div>
      <MutatingDots
        height="100"
        width="100"
        color="#2b73ff"
        secondaryColor="#2b73ff"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner;
