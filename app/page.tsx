"use client";

import { useEffect, useState } from "react";
import { useBale } from "@/hooks/useBale";

export default function BaleMiniAppPage() {
  const { user, ready, requestPhoneNumber } = useBale();
  const [phoneRequested, setPhoneRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !phoneRequested) {
      requestPhoneNumber(); // try to request phone immediately
      setPhoneRequested(true);
    }
  }, [ready, phoneRequested, requestPhoneNumber]);

  // Update hook to capture phone number
  useEffect(() => {
    if (typeof window !== "undefined" && window.Bale?.WebApp) {
      const webApp = window.Bale.WebApp;

      // Override the callback to store phone in state
      const originalRequestContact = webApp.requestContact;
      webApp.requestContact = (callback) => {
        originalRequestContact((granted, phone) => {
          if (granted && phone) setPhoneNumber(phone);
          callback(granted, phone);
        });
      };
    }
  }, []);

  if (!ready) return <div>Loading Bale MiniApp...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Bale MiniApp</h1>

      {user ? (
        <div className="space-y-2">
          <p>
            <strong>First Name:</strong> {user.first_name}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          {phoneNumber ? (
            <p>
              <strong>Phone Number:</strong> {phoneNumber}
            </p>
          ) : (
            <p>Phone number not shared yet.</p>
          )}
        </div>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}
