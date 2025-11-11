"use client";

import { useBale } from "@/hooks/useBale";

export default function BaleMiniAppPage() {
  const { user, ready, requestPhoneNumber } = useBale();

  if (!ready) return <div>Loading Bale MiniApp...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Bale MiniApp</h1>

      {user ? (
        <div className="space-y-2">
          <p>
            <strong>First Name:</strong> {user.first_name}
          </p>
          {user.last_name && (
            <p>
              <strong>Last Name:</strong> {user.last_name}
            </p>
          )}
          {user.username && (
            <p>
              <strong>Username:</strong> {user.username}
            </p>
          )}
          <p>
            <strong>User ID:</strong> {user.id}
          </p>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={requestPhoneNumber}
          >
            Share Phone Number
          </button>
        </div>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}
