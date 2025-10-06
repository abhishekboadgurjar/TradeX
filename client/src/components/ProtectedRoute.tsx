"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();


  
  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user]);

  if (!user) return <div>Loading...</div>;

  return <>{children}</>;
}
