"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      // L'altezza totale della pagina meno l'altezza del viewport visibile
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress(Number((window.scrollY / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll(); // Inizializza al caricamento

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-blue-600 dark:bg-blue-500 z-100 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  );
}
