"use client";

import { useEffect, ReactNode } from "react";
import { useTheme } from "@/components/useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useTheme();

  return <>{children}</>;
}
