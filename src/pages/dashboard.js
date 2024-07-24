import React, { useState, useEffect } from "react";
import WalletDashboard from "../../Components/WalletDashboard/WalletDashboard";
import WalletSwap from "../../Components/WalletSwap/WalletSwap";
import Dapps from "../../Components/Earn/Earn";
import styles from "../../src/styles/Dashboard.module.css";

import WalletFooterTabs from "../../Components/WalletFooterTabs/WalletFooterTabs";
const Dashboard = () => {
  useEffect(() => {
    const tele = window.Telegram.WebApp;
    if (tele) {
      tele.ready();
      tele.expand();
      console.log(tele.version);
    }
  }, []);
return(
    <div>
      <WalletFooterTabs/>
    </div>
)
};

export default Dashboard;
