"use client"

import { useState, useEffect } from "react"

export function useAdminToken() {
  const [token, setToken] = useState<string | null>(null)
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("admin_token")
      if (storedToken) {
        setToken(storedToken)
      }
    } catch (error) {
      console.error("Failed to retrieve admin token from localStorage", error);
    } finally {
      setIsTokenLoading(false);
    }
  }, [])

  return { token, isTokenLoading };
}
