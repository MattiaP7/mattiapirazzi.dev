"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function CodeBlock({ children, ...props }: React.ComponentProps<"pre">) {
  const preRef = React.useRef<HTMLPreElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    // 1. Estrae il testo contenuto nel blocco <pre>
    const text = preRef.current?.textContent || "";
    if (!text) return;

    let success = false;

    // 2. Tenta prima con l'API moderna navigator.clipboard (solo contesti sicuri HTTPS/localhost)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.warn("navigator.clipboard fallito, uso il fallback:", err);
      }
    }

    // 3. Fallback per contesti HTTP non sicuri (es. IP di rete locale)
    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Impossibile copiare il testo:", err);
      }
    }

    // 4. Se la copia ha avuto successo, mostra l'icona di spunta per 2 secondi
    if (success) {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copiato" : "Copia il codice"}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-800/80 backdrop-blur text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-opacity opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  );
}
