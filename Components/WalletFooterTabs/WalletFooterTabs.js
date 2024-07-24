import React, { useState } from "react";
import styles from './WalletFooterTabs.module.css'
import { FaHouse } from "react-icons/fa6";
import { BsArrowLeftRight } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import WalletDashboard from "../WalletDashboard/WalletDashboard";
import WalletSwap from "../WalletSwap/WalletSwap";
import Earn from "../Earn/Earn";
function WalletFooterTabs() {
  const tabs = {
    HOME: "home",
    SWAP: "swap",
    EARN: "earn",
  };

  const getInitialTab = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("activeTab") || tabs.HOME;
    }
    return tabs.HOME;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case tabs.HOME:
        return <WalletDashboard />;
      case tabs.SWAP:
        return <WalletSwap />;
      case tabs.EARN:
        return <Earn />;
      default:
        return <WalletDashboard />;
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardRenderedContent}>
        {renderTabContent()}
      </div>
      <div className={styles.tabBar}>
        <div
          className={`${styles.tab} ${
            activeTab === tabs.HOME ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tabs.HOME)}
        >
          <FaHouse className={styles.icon} />
          <span className={styles.tabLabel}>Home</span>
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === tabs.SWAP ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tabs.SWAP)}
        >
          <BsArrowLeftRight className={styles.icon} />
          <span className={styles.tabLabel}>Swap</span>
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === tabs.EARN ? styles.active : ""
          }`}
          onClick={() => setActiveTab(tabs.EARN)}
        >
          <FaHandHoldingUsd className={styles.icon} />
          <span className={styles.tabLabel}>Earn</span>
        </div>
      </div>
    </div>
  );
}

export default WalletFooterTabs;
