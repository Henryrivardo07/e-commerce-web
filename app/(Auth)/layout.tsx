"use client";

import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // 🟢 Case 1: user tries to access /open-store but already has a shop
      if (pathname === "/open-store" && user.shop != null) {
        router.push("/"); // redirect to dashboard or home
        return;
      }

      // 🟢 Case 2: logged in user accessing login/register page
      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
        return;
      }
    } else {
      // 🟡 Not logged in, block private pages
      const isPublicPage = pathname === "/login" || pathname === "/register";
      if (!isPublicPage) {
        router.push("/login");
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div className="auth-layout">{children}</div>;
}
