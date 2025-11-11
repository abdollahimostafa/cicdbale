"use client";

import { useEffect, useState } from "react";
import { useBale } from "@/hooks/useBale";

export default function BaleMiniAppPage() {
  const { user, ready, requestPhoneNumber } = useBale();
  const [phoneRequested, setPhoneRequested] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !phoneRequested) {
      // Request phone number on load
      requestPhoneNumber(); 
      setPhoneRequested(true);

      // Also set a callback to store phone number when granted
      if (window.Bale?.WebApp) {
        window.Bale.WebApp.requestContact((granted, phone) => {
          if (granted && phone) {
            setPhoneNumber(phone);
          }
        });
      }
    }
  }, [ready, phoneRequested, requestPhoneNumber]);

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
          <p>
            <strong>Phone Number:</strong> {phoneNumber ?? "Not shared yet"}
          </p>
        </div>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}
