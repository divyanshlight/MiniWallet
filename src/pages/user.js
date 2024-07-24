import React, { useEffect } from "react";
import UserProfile from "../../Components/UserProfile/UserProfile";
export default function User() {
  useEffect(() => {
    const tele = window.Telegram.WebApp;
    if (tele) {
      tele.ready();
      tele.expand();
      tele.viewportStableHeight;
      console.log(tele);
    }
  }, []);

  return (
    <div>
      <UserProfile />
    </div>
  );
}
