// src/components/footer.tsx
export async function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500">
      © {new Date().getFullYear()} pirazzi.blog. Tutti i diritti riservati.
    </footer>
  );
}
