"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        localStorage.removeItem("user");
        router.push("/auth/login");
      }
    } catch {
      console.error("Error during logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-600 p-2 rounded-md font-bold hover:cursor-pointer hover:bg-red-500 "
    >
      <LogOut/>
    </button>
  );
}
