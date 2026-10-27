"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ProgressBar
        height="3px"
        color="#3b82f6" /* Colore blu (Tailwind blue-500) */
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}
