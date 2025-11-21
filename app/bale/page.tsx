"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBale } from "@/hooks/useBale"; // your Bale hook

export default function BaleMain() {
  const { user, ready } = useBale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace("/");
      return;
        }
  }, [ready, user, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Welcome to the Bale MiniApp</h1>
      <p>User is registered, you can show your dashboard here.</p>
    </div>
  );
}
