"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBale } from "@/hooks/useBale"; // your Bale hook
import LoadingFlip from "@/components/LoadingFlip";

export default function BaleMain() {
  const { user, ready } = useBale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      // Not coming from Bale? redirect to error
      router.replace("/");
      return;
    }

    // Call API to check if user exists in DB
    fetch(`/api/user/check?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.exists) {
          setLoading(false);
        } else {
          // User not registered → redirect to grant access page
          router.replace("/bale/grantaccesss");
        }
      })
  }, [ready, user, router]);

  if (loading) return <div><LoadingFlip/></div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Welcome to the Bale MiniApp</h1>
      <p>User is registered, you can show your dashboard here.</p>
    </div>
  );
}
