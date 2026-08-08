"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // Remove the client-side login state.
      localStorage.removeItem("user");

      // Tell the Navbar that authentication changed.
      window.dispatchEvent(new Event("storage"));

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      // Even if the API request fails,
      // remove the local authentication state.
      localStorage.removeItem("user");

      window.dispatchEvent(new Event("storage"));

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      title="Logout"
      className="
        inline-flex
        items-center
        gap-2
        rounded-lg
        bg-red-50
        px-3
        py-2
        text-sm
        font-medium
        text-red-600
        transition-all
        hover:bg-red-100
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {loading ? (
        <Loader2
          size={17}
          className="animate-spin"
        />
      ) : (
        <LogOut size={17} />
      )}

      <span className="hidden sm:inline">
        {loading ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}