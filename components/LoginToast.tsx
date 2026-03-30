"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function LoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginSuccess = searchParams.get("login") === "success";

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Successfully logged in");
      // Remove the query param from URL
      router.replace("/");
    }
  }, [loginSuccess, router]);

  return null;
}
