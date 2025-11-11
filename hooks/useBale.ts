"use client";

import { useEffect, useState } from "react";

export interface BaleUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  phone_number?: string;
}

export function useBale() {
  const [user, setUser] = useState<BaleUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Bale?.WebApp) {
      const webApp = window.Bale.WebApp;

      // Access Bale user info
      const baleUser = webApp.initDataUnsafe?.user;
      setUser(baleUser || null);
      setReady(true);

      console.log("Bale initData:", webApp.initData);
      console.log("Bale initDataUnsafe:", webApp.initDataUnsafe);
    }
  }, []);

  // Function to request phone number
  const requestPhoneNumber = () => {
    if (!window.Bale?.WebApp) return;

    window.Bale.WebApp.requestContact((granted, phone) => {
      if (granted && phone) {
        console.log("User phone number:", phone);
        // TODO: send to backend
      } else {
        console.log("User denied phone number");
      }
    });
  };

  return { user, ready, requestPhoneNumber };
}
